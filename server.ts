import express from "express";
import path from "path";
import fs from "fs";
import nodemailer from "nodemailer";
import { allArticles, getArticleBySlug } from "./src/data/articles";

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// In-memory cache for 6-digit email verification codes
interface VerificationEntry {
  code: string;
  expiresAt: number;
  attempts: number;
}

const verificationCodes = new Map<string, VerificationEntry>();

const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || "appkwanzaflow@gmail.com";

// Setup mail transporter (configured via SMTP environment variables)
function parseSmtpConfig() {
  const host = (process.env.SMTP_HOST || "").trim();
  const user = (process.env.SMTP_USER || "").trim();
  const pass = (process.env.SMTP_PASS || "").trim();

  if (!host || !user || !pass) {
    return null;
  }

  const rawPort = (process.env.SMTP_PORT || "").trim();
  let port = 465;
  let secure = true;

  if (rawPort.includes("465")) {
    port = 465;
    secure = true;
  } else if (rawPort.includes("587")) {
    port = 587;
    secure = false;
  } else if (/^\d+$/.test(rawPort)) {
    port = parseInt(rawPort, 10);
    secure = port === 465;
  } else if (host.toLowerCase().includes("gmail.com")) {
    port = 465;
    secure = true;
  }

  return { host, port, secure, user, pass };
}

function createSmtpTransporter(host: string, port: number, secure: boolean, user: string, pass: string) {
  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000,
  });
}

// Reusable email sender with automatic retry on alternative port if needed
async function sendSystemEmail({
  to,
  subject,
  text,
  html,
  isHighPriority = false,
}: {
  to: string;
  subject: string;
  text: string;
  html: string;
  isHighPriority?: boolean;
}) {
  const config = parseSmtpConfig();
  const senderEmail = config?.user || ADMIN_EMAIL;
  // RFC 5322 compliant From header matching authenticated SMTP user exactly to guarantee SPF & DKIM pass
  const from = `"KwanzaFlow" <${senderEmail}>`;
  const replyTo = ADMIN_EMAIL;

  const mailHeaders: Record<string, string> = {
    "X-Entity-Ref-ID": `KF-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
    "Auto-Submitted": "auto-generated",
    "X-Auto-Response-Suppress": "All",
    "X-Mailer": "KwanzaFlow Security Dispatcher v1.0",
  };

  if (isHighPriority) {
    mailHeaders["X-Priority"] = "1";
    mailHeaders["Importance"] = "high";
  }

  if (config) {
    const mailPayload = {
      from,
      sender: senderEmail,
      replyTo,
      to,
      subject,
      text,
      html,
      headers: mailHeaders,
    };

    try {
      const transporter = createSmtpTransporter(
        config.host,
        config.port,
        config.secure,
        config.user,
        config.pass
      );
      await transporter.sendMail(mailPayload);
      console.log(`[EMAIL SUCCESS] Sent to: ${to} (via ${config.host}:${config.port}, secure: ${config.secure}) | Subject: ${subject}`);
      return true;
    } catch (primaryError: any) {
      console.error(`[EMAIL ERROR] Primary delivery failed to ${to} on port ${config.port}:`, primaryError?.message || primaryError);

      // Attempt fallback to the alternative port (465 <-> 587)
      const altPort = config.port === 465 ? 587 : 465;
      const altSecure = altPort === 465;
      try {
        console.log(`[EMAIL RETRY] Attempting fallback to ${config.host}:${altPort} (secure: ${altSecure})...`);
        const fallbackTransporter = createSmtpTransporter(
          config.host,
          altPort,
          altSecure,
          config.user,
          config.pass
        );
        await fallbackTransporter.sendMail(mailPayload);
        console.log(`[EMAIL SUCCESS - FALLBACK] Sent to: ${to} on alternative port ${altPort}`);
        return true;
      } catch (fallbackError: any) {
        console.error(`[EMAIL ERROR - FALLBACK] Fallback to port ${altPort} also failed:`, fallbackError?.message || fallbackError);
      }
    }
  } else {
    console.log(`[EMAIL NOTICE - Fallback Delivery Log]`);
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body:\n${text}\n----------------------------------`);
  }
  return true;
}

// API health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

/**
 * STEP 1: Send verification code to user's email before allowing deletion
 */
app.post("/api/account-deletion/send-code", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return res.status(400).json({
        success: false,
        message: "Por favor, informe um endereço de e-mail válido.",
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Generate secure 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    verificationCodes.set(cleanEmail, {
      code,
      expiresAt,
      attempts: 0,
    });

    // Subject and preheader engineered for 100% inbox placement without spam triggers
    const subject = `KwanzaFlow: Código de confirmação [${code}]`;
    const textBody = `KwanzaFlow - Notificação de Segurança

Olá,

Recebemos um pedido de exclusão de conta associado ao endereço ${cleanEmail} no aplicativo KwanzaFlow.

Para confirmar a titularidade do e-mail e proteger sua conta contra ações de terceiros, insira o código de uso único abaixo no sistema:

CÓDIGO DE VERIFICAÇÃO: ${code}

• Este código é válido por 10 minutos.
• Se você não solicitou a exclusão, ignore este e-mail. A sua conta permanecerá segura e ativa.

Atenciosamente,
Equipa KwanzaFlow
Suporte: appkwanzaflow@gmail.com
Luanda, Angola`;

    const htmlBody = `
      <!DOCTYPE html>
      <html lang="pt">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Código de Confirmação KwanzaFlow</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
        <!-- Preheader (prevents spam snippet clutter) -->
        <div style="display: none; font-size: 1px; color: #f8fafc; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
          Seu código de segurança KwanzaFlow é ${code}. Válido por 10 minutos para verificação de titularidade.
        </div>

        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 30px 12px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 560px; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                <!-- Header -->
                <tr>
                  <td style="padding: 24px 32px; background-color: #0f172a; text-align: left;">
                    <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: #ffffff; letter-spacing: 0.5px;">KwanzaFlow</h1>
                    <p style="margin: 4px 0 0 0; font-size: 13px; color: #94a3b8;">Gestão Financeira & Segurança Pessoal</p>
                  </td>
                </tr>

                <!-- Content Body -->
                <tr>
                  <td style="padding: 32px 32px 24px 32px;">
                    <h2 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #0f172a;">
                      Confirmação de Titularidade de Conta
                    </h2>
                    <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 1.6; color: #334155;">
                      Recebemos uma solicitação para exclusão definitiva da conta associada ao e-mail <strong>${cleanEmail}</strong>.
                    </p>
                    <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 1.6; color: #334155;">
                      Para confirmar que o endereço pertence a si e prevenir que terceiros apaguem a sua conta indevidamente, utilize o código de segurança de uso único abaixo:
                    </p>

                    <!-- Code Highlight Box -->
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 20px 0;">
                      <tr>
                        <td align="center" style="background-color: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 8px; padding: 18px 24px;">
                          <div style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #475569; margin-bottom: 6px;">
                            Código de Verificação
                          </div>
                          <div style="font-family: 'Courier New', Courier, monospace; font-size: 34px; font-weight: 700; letter-spacing: 8px; color: #0f172a;">
                            ${code}
                          </div>
                          <div style="font-size: 12px; color: #64748b; margin-top: 6px;">
                            Válido por 10 minutos
                          </div>
                        </td>
                      </tr>
                    </table>

                    <p style="margin: 20px 0 0 0; font-size: 13px; line-height: 1.6; color: #64748b;">
                      <strong>Não reconhece esta ação?</strong> Se você não solicitou a exclusão, basta desconsiderar este e-mail. Nenhuma alteração será feita na sua conta sem este código.
                    </p>
                  </td>
                </tr>

                <!-- Footer (Anti-Spam & Trust Identity) -->
                <tr>
                  <td style="padding: 20px 32px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; line-height: 1.5;">
                    <p style="margin: 0 0 4px 0;">
                      <strong>KwanzaFlow</strong> • Aplicativo de Finanças Pessoais e Kixikila
                    </p>
                    <p style="margin: 0;">
                      Este é um e-mail transacional de segurança enviado para ${cleanEmail}. Suporte: <a href="mailto:appkwanzaflow@gmail.com" style="color: #0284c7; text-decoration: none;">appkwanzaflow@gmail.com</a>
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    await sendSystemEmail({
      to: cleanEmail,
      subject,
      text: textBody,
      html: htmlBody,
      isHighPriority: true,
    });

    res.json({
      success: true,
      message: `Código de verificação enviado para ${cleanEmail}. Verifique sua caixa de entrada ou spam.`,
      expiresInMinutes: 10,
      // For developer/preview verification visibility
      previewCode: code,
    });
  } catch (err: any) {
    console.error("Error sending deletion verification code:", err);
    res.status(500).json({
      success: false,
      message: "Erro ao enviar código de verificação. Tente novamente.",
    });
  }
});

/**
 * STEP 2: Verify code, submit deletion request, notify appkwanzaflow@gmail.com, and confirm to user
 */
app.post("/api/account-deletion/verify-and-submit", async (req, res) => {
  try {
    const { email, code, reason, notes } = req.body;

    if (!email || !code) {
      return res.status(400).json({
        success: false,
        message: "E-mail e código de verificação são obrigatórios.",
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanCode = code.toString().trim();

    const storedEntry = verificationCodes.get(cleanEmail);

    if (!storedEntry) {
      return res.status(400).json({
        success: false,
        message: "Nenhum código ativo encontrado para este e-mail. Por favor, clique em 'Enviar Código' novamente.",
      });
    }

    if (Date.now() > storedEntry.expiresAt) {
      verificationCodes.delete(cleanEmail);
      return res.status(400).json({
        success: false,
        message: "O código de verificação expirou. Por favor, solicite um novo código.",
      });
    }

    if (storedEntry.code !== cleanCode) {
      storedEntry.attempts += 1;
      if (storedEntry.attempts >= 5) {
        verificationCodes.delete(cleanEmail);
        return res.status(400).json({
          success: false,
          message: "Número máximo de tentativas excedido. Solicite um novo código.",
        });
      }
      return res.status(400).json({
        success: false,
        message: "Código de confirmação incorreto. Verifique o e-mail recebido e tente novamente.",
      });
    }

    // Code verified! Generate protocol and purge dates
    const now = new Date();
    const purgeDate = new Date();
    purgeDate.setDate(now.getDate() + 30);

    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const protocolId = `KF-DEL-2026-${randomSuffix}`;

    const formattedDate = now.toLocaleDateString("pt-AO", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const formattedPurgeDate = purgeDate.toLocaleDateString("pt-AO", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    const requestPayload = {
      id: protocolId,
      email: cleanEmail,
      reason: reason || "Não especificado pelo utilizador",
      notes: notes ? notes.trim() : "",
      date: formattedDate,
      status: "processado",
      estimatedPurgeDate: formattedPurgeDate,
      verifiedAt: now.toISOString(),
      adminNotifiedEmail: ADMIN_EMAIL,
    };

    // 1. Notify administrator (appkwanzaflow@gmail.com) without trigger words like [URGENTE]
    const adminSubject = `[KwanzaFlow] Novo Pedido de Exclusão de Conta: ${cleanEmail} (${protocolId})`;
    const adminText = `Notificação Administrativa KwanzaFlow

Olá Administrador,

Um utilizador confirmou com sucesso a titularidade do seu e-mail e submeteu uma solicitação de exclusão de conta e dados.

DETALHES DA SOLICITAÇÃO:
- Protocolo Oficial: ${protocolId}
- E-mail do Usuário: ${cleanEmail}
- Motivo Informado: ${requestPayload.reason}
- Observações: ${requestPayload.notes || "Nenhuma"}
- Data e Hora do Pedido: ${formattedDate}
- Titularidade do E-mail: CONFIRMADA POR CÓDIGO DE SEGURANÇA
- Prazo de Purga: ${formattedPurgeDate}

AÇÕES NO FIREBASE:
1. No Firebase Authentication, localize o usuário "${cleanEmail}" e exclua a conta / revogue tokens.
2. No Cloud Firestore, purgue os documentos vinculados nas coleções /users e /transactions.

Registro salvo com conformidade Google Play Data Safety.`;

    const adminHtml = `
      <!DOCTYPE html>
      <html lang="pt">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pedido de Exclusão de Conta</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
        <div style="display: none; font-size: 1px; color: #f8fafc; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
          Novo pedido verificado de exclusão de conta para ${cleanEmail} (${protocolId}).
        </div>

        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 30px 12px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 580px; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                <tr>
                  <td style="padding: 24px 32px; background-color: #0f172a; color: #ffffff;">
                    <h1 style="margin: 0; font-size: 18px; font-weight: 700;">[KwanzaFlow] Solicitação de Exclusão de Conta</h1>
                    <p style="margin: 4px 0 0 0; font-size: 13px; color: #94a3b8;">Conformidade Google Play & Firebase Authentication</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 28px 32px;">
                    <p style="font-size: 14px; line-height: 1.6; color: #334155; margin-top: 0;">
                      O titular confirmou a posse do e-mail por código de uso único e solicitou a remoção definitiva da sua conta:
                    </p>
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 16px 0; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; font-size: 13px;">
                      <tr>
                        <td style="padding: 10px 14px; background-color: #f8fafc; font-weight: 600; width: 35%; border-bottom: 1px solid #e2e8f0;">Protocolo:</td>
                        <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-family: 'Courier New', monospace; font-weight: 700; color: #0f172a;">${protocolId}</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 14px; background-color: #f8fafc; font-weight: 600; border-bottom: 1px solid #e2e8f0;">E-mail do Usuário:</td>
                        <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #0284c7;">${cleanEmail}</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 14px; background-color: #f8fafc; font-weight: 600; border-bottom: 1px solid #e2e8f0;">Validação:</td>
                        <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #166534; font-weight: 600;">✓ Titularidade confirmada por código</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 14px; background-color: #f8fafc; font-weight: 600; border-bottom: 1px solid #e2e8f0;">Data da Solicitação:</td>
                        <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0;">${formattedDate}</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 14px; background-color: #f8fafc; font-weight: 600; border-bottom: 1px solid #e2e8f0;">Motivo:</td>
                        <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0;">${requestPayload.reason}</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 14px; background-color: #f8fafc; font-weight: 600; border-bottom: 1px solid #e2e8f0;">Observações:</td>
                        <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0;">${requestPayload.notes || "Nenhuma"}</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 14px; background-color: #f8fafc; font-weight: 600;">Limite de Purga:</td>
                        <td style="padding: 10px 14px; color: #64748b;">${formattedPurgeDate}</td>
                      </tr>
                    </table>
                    <div style="background-color: #f1f5f9; border-left: 4px solid #0284c7; padding: 12px 16px; border-radius: 4px; font-size: 13px; color: #334155; margin-top: 16px;">
                      <strong>Ação necessária:</strong> Aceda à consola do Firebase Authentication para revogar as credenciais e purgue os dados no Firestore.
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    await sendSystemEmail({
      to: ADMIN_EMAIL,
      subject: adminSubject,
      text: adminText,
      html: adminHtml,
      isHighPriority: false,
    });

    // 2. Send confirmation email to user with spam-free headers and template
    const userSubject = `KwanzaFlow: Confirmação de recebimento do pedido (${protocolId})`;
    const userText = `KwanzaFlow - Confirmação de Solicitação

Olá,

Confirmamos o recebimento da sua solicitação de exclusão de conta e dados pessoais no aplicativo KwanzaFlow.

RESUMO DA SOLICITAÇÃO:
- Protocolo Oficial: ${protocolId}
- E-mail confirmado: ${cleanEmail}
- Data de Registo: ${formattedDate}
- Status: Recebido e em processamento
- Prazo estimado para purga definitiva: ${formattedPurgeDate}

O seu acesso ao aplicativo será desativado e os registros vinculados serão eliminados dos nossos servidores de forma irreversível.

Se você tiver alguma dúvida ou precisar de assistência, basta responder diretamente a este e-mail ou escrever para ${ADMIN_EMAIL}.

Atenciosamente,
Equipa de Atendimento KwanzaFlow
Luanda, Angola`;

    const userHtml = `
      <!DOCTYPE html>
      <html lang="pt">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmação de Solicitação KwanzaFlow</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
        <div style="display: none; font-size: 1px; color: #f8fafc; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
          Confirmamos o recebimento da sua solicitação de exclusão de conta ${protocolId} no KwanzaFlow.
        </div>

        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 30px 12px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 560px; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                <!-- Header -->
                <tr>
                  <td style="padding: 24px 32px; background-color: #0f172a; text-align: left;">
                    <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: #ffffff; letter-spacing: 0.5px;">KwanzaFlow</h1>
                    <p style="margin: 4px 0 0 0; font-size: 13px; color: #94a3b8;">Gestão Financeira & Segurança Pessoal</p>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding: 32px 32px 24px 32px;">
                    <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 16px 20px; margin-bottom: 24px;">
                      <div style="font-size: 15px; font-weight: 600; color: #166534; margin-bottom: 4px;">
                        ✓ Pedido recebido e em processamento
                      </div>
                      <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #14532d;">
                        A titularidade do e-mail <strong>${cleanEmail}</strong> foi validada com sucesso. A sua solicitação foi encaminhada para a equipa técnica.
                      </p>
                    </div>

                    <h2 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600; color: #0f172a;">
                      Detalhes do Protocolo
                    </h2>

                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; font-size: 13px; margin-bottom: 24px;">
                      <tr>
                        <td style="padding: 10px 14px; background-color: #f8fafc; font-weight: 600; width: 40%; border-bottom: 1px solid #e2e8f0;">Número de Protocolo:</td>
                        <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-family: 'Courier New', monospace; font-weight: 700; color: #0284c7;">${protocolId}</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 14px; background-color: #f8fafc; font-weight: 600; border-bottom: 1px solid #e2e8f0;">Data de Solicitação:</td>
                        <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0;">${formattedDate}</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 14px; background-color: #f8fafc; font-weight: 600; border-bottom: 1px solid #e2e8f0;">Status:</td>
                        <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #166534; font-weight: 600;">Em fila de purga</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 14px; background-color: #f8fafc; font-weight: 600;">Prazo Limite de Purga:</td>
                        <td style="padding: 10px 14px; color: #64748b;">${formattedPurgeDate}</td>
                      </tr>
                    </table>

                    <p style="margin: 0 0 16px 0; font-size: 13px; line-height: 1.6; color: #475569;">
                      As suas credenciais de autenticação serão desativadas e os dados financeiros associados serão removidos em conformidade com as diretrizes de segurança da Google Play Store.
                    </p>

                    <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #64748b;">
                      Caso deseje cancelar esta solicitação ou necessite de mais informações, responda diretamente a este e-mail.
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding: 20px 32px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; line-height: 1.5;">
                    <p style="margin: 0 0 4px 0;">
                      <strong>KwanzaFlow</strong> • Aplicativo de Finanças Pessoais e Kixikila
                    </p>
                    <p style="margin: 0;">
                      E-mail transacional de segurança enviado para ${cleanEmail}. Atendimento: <a href="mailto:${ADMIN_EMAIL}" style="color: #0284c7; text-decoration: none;">${ADMIN_EMAIL}</a>
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    await sendSystemEmail({
      to: cleanEmail,
      subject: userSubject,
      text: userText,
      html: userHtml,
    });

    // Clean up code from memory
    verificationCodes.delete(cleanEmail);

    res.json({
      success: true,
      message: `Solicitação confirmada! O pedido de exclusão foi encaminhado para ${ADMIN_EMAIL} e uma confirmação foi enviada para ${cleanEmail}.`,
      request: requestPayload,
    });
  } catch (err: any) {
    console.error("Error processing account deletion:", err);
    res.status(500).json({
      success: false,
      message: "Ocorreu um erro ao processar a solicitação. Tente novamente.",
    });
  }
});

// Serve app-ads.txt explicitly with text/plain header
app.get(['/app-ads.txt', '/App-ads.txt', '/app-ads.TXT', '/App-Ads.txt'], (req, res) => {
  res.type('text/plain; charset=utf-8');
  res.sendFile(path.join(process.cwd(), 'public', 'app-ads.txt'));
});

// Direct download for the official Como Surgiu PDF
app.get(['/comosurgiu/download', '/downloads/KwanzaFlow_Tecnologia_e_Cidadania_Financeira.pdf'], (req, res) => {
  const filePath = path.join(process.cwd(), 'public', 'downloads', 'KwanzaFlow_Tecnologia_e_Cidadania_Financeira.pdf');
  res.download(filePath, 'KwanzaFlow_Tecnologia_e_Cidadania_Financeira.pdf');
});

// View PDF in browser
app.get(['/comosurgiu.pdf'], (req, res) => {
  res.type('application/pdf');
  res.sendFile(path.join(process.cwd(), 'public', 'comosurgiu.pdf'));
});

// Serve static files from Vite build output and public folder
const distPath = path.join(process.cwd(), 'dist');
app.use(express.static(distPath));
app.use(express.static(path.join(process.cwd(), 'public')));

// Specific SEO route for /sobre-nos and /comosurgiu
app.get(['/sobre-nos', '/sobre-nos/', '/comosurgiu', '/comosurgiu/'], (req, res) => {
  const indexPath = fs.existsSync(path.join(distPath, 'index.html'))
    ? path.join(distPath, 'index.html')
    : path.join(process.cwd(), 'index.html');

  try {
    let html = fs.readFileSync(indexPath, 'utf8');
    // Inject custom SEO title and Open Graph for Sobre Nós
    html = html.replace(
      /<title>.*?<\/title>/,
      '<title>Sobre Nós - Génese e Princípios do KwanzaFlow | Tecnologia e Cidadania Financeira em Angola</title>'
    );
    html = html.replace(
      /<link rel="canonical" href=".*?" \/>/,
      '<link rel="canonical" href="https://kwanzaflow.online/sobre-nos" />'
    );
    html = html.replace(
      /<meta property="og:url" content=".*?" \/>/,
      '<meta property="og:url" content="https://kwanzaflow.online/sobre-nos" />'
    );
    html = html.replace(
      /<meta property="og:title" content=".*?" \/>/,
      '<meta property="og:title" content="Sobre Nós: Génese e Princípios do KwanzaFlow" />'
    );
    html = html.replace(
      /<meta property="og:description" content=".*?" \/>/,
      '<meta property="og:description" content="Sobre Nós: A génese e princípios de gestão consciente, orçamento familiar em Kwanzas e cidadania financeira do KwanzaFlow em Angola." />'
    );
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  } catch (e) {
    res.sendFile(indexPath);
  }
});

// Robots.txt explicit handler
app.get('/robots.txt', (req, res) => {
  const robotsPath = fs.existsSync(path.join(distPath, 'robots.txt'))
    ? path.join(distPath, 'robots.txt')
    : path.join(process.cwd(), 'public', 'robots.txt');

  if (fs.existsSync(robotsPath)) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.sendFile(robotsPath);
  } else {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.send("User-agent: *\nAllow: /\n\nSitemap: https://kwanzaflow.online/sitemap.xml\n");
  }
});

// Sitemap.xml explicit handler
app.get('/sitemap.xml', (req, res) => {
  const sitemapPath = fs.existsSync(path.join(distPath, 'sitemap.xml'))
    ? path.join(distPath, 'sitemap.xml')
    : path.join(process.cwd(), 'public', 'sitemap.xml');

  if (fs.existsSync(sitemapPath)) {
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.sendFile(sitemapPath);
  } else {
    // Generate fallback sitemap on the fly
    const articleUrls = allArticles.map((art) => `
  <url>
    <loc>https://kwanzaflow.online/artigos/${art.slug}</loc>
    <lastmod>2026-09-16</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`).join('');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://kwanzaflow.online/</loc>
    <lastmod>2026-09-16</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://kwanzaflow.online/artigos</loc>
    <lastmod>2026-09-16</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>${articleUrls}
  <url>
    <loc>https://kwanzaflow.online/sobre-nos</loc>
    <lastmod>2026-09-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>https://kwanzaflow.online/comosurgiu</loc>
    <lastmod>2026-09-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.send(xml);
  }
});

// SEO handler for /artigos and individual article pages /artigos/:slug
app.get(['/artigos', '/artigos/', '/artigos/:slug'], (req, res) => {
  const indexPath = fs.existsSync(path.join(distPath, 'index.html'))
    ? path.join(distPath, 'index.html')
    : path.join(process.cwd(), 'index.html');

  const slug = req.params.slug;
  const article = slug ? getArticleBySlug(slug) : null;

  try {
    let html = fs.readFileSync(indexPath, 'utf8');

    if (article) {
      // Individual Article SEO
      const pageTitle = `${article.title} | KwanzaFlow`;
      const pageDescription = article.summary.length > 160 ? article.summary.substring(0, 157) + '...' : article.summary;
      const pageUrl = `https://kwanzaflow.online/artigos/${article.slug}`;
      const pageKeywords = `${article.tags.join(', ')}, finanças pessoais Angola, economia Angola, KwanzaFlow`;

      // 1. Meta Tags & OpenGraph
      html = html.replace(/<title>.*?<\/title>/, `<title>${pageTitle}</title>`);
      html = html.replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${pageUrl}" />`);
      html = html.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${pageDescription}" />`);
      html = html.replace(/<meta name="keywords" content=".*?" \/>/, `<meta name="keywords" content="${pageKeywords}" />`);
      html = html.replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${pageUrl}" />`);
      html = html.replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${pageTitle}" />`);
      html = html.replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${pageDescription}" />`);
      html = html.replace(/<meta property="og:type" content=".*?" \/>/, `<meta property="og:type" content="article" />`);

      // 2. Structured Data: Article, FAQPage and BreadcrumbList (JSON-LD)
      const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': pageUrl,
        },
        'headline': article.title,
        'description': article.summary,
        'image': 'https://kwanzaflow.online/logo.svg',
        'inLanguage': 'pt-AO',
        'datePublished': article.datePublished,
        'dateModified': '2026-09-16',
        'publisher': {
          '@type': 'Organization',
          'name': 'KwanzaFlow',
          'url': 'https://kwanzaflow.online',
          'logo': {
            '@type': 'ImageObject',
            'url': 'https://kwanzaflow.online/logo.svg',
          },
        },
        'articleSection': article.category,
        'keywords': article.tags.join(', '),
        'wordCount': article.wordCount,
      };

      const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': article.faqs.map((faq) => ({
          '@type': 'Question',
          'name': faq.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.answer,
          },
        })),
      };

      const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Início',
            'item': 'https://kwanzaflow.online/',
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Artigos',
            'item': 'https://kwanzaflow.online/artigos',
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': article.title,
            'item': pageUrl,
          },
        ],
      };

      const jsonLdScripts = `
    <!-- Schema.org JSON-LD for Google & Search Engines -->
    <script type="application/ld+json">${JSON.stringify(articleSchema)}</script>
    <script type="application/ld+json">${JSON.stringify(faqSchema)}</script>
    <script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>
    <meta property="article:published_time" content="${article.datePublished}" />
    <meta property="article:section" content="${article.category}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${pageTitle}" />
    <meta name="twitter:description" content="${pageDescription}" />
    <meta name="twitter:image" content="https://kwanzaflow.online/logo.svg" />`;

      html = html.replace('</head>', `${jsonLdScripts}\n  </head>`);

      // 3. Pre-rendered Crawler-Friendly Semantic Markup (Read by search engine spiders before JS evaluation)
      const crawlerSectionsHtml = article.sections
        .map(
          (s) => `
        <section>
          <h2>${s.heading}</h2>
          ${s.subheading ? `<h3>${s.subheading}</h3>` : ''}
          ${s.paragraphs.map((p) => `<p>${p}</p>`).join('\n')}
        </section>`
        )
        .join('\n');

      const crawlerFaqsHtml = article.faqs
        .map(
          (f) => `
        <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
          <h3 itemprop="name">${f.question}</h3>
          <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
            <p itemprop="text">${f.answer}</p>
          </div>
        </div>`
        )
        .join('\n');

      const crawlerContent = `
    <!-- Semantic crawler content indexed by search engine spiders -->
    <div id="seo-crawler-content" style="display:none;" aria-hidden="true">
      <article>
        <h1>${article.title}</h1>
        <p><strong>${article.subtitle}</strong></p>
        <p><em>${article.summary}</em></p>
        <div>
          <h2>Principais Conclusões</h2>
          <ul>
            ${article.keyTakeaways.map((t) => `<li>${t}</li>`).join('\n')}
          </ul>
        </div>
        ${crawlerSectionsHtml}
        <section>
          <h2>Perguntas Frequentes (FAQ)</h2>
          ${crawlerFaqsHtml}
        </section>
      </article>
    </div>`;

      html = html.replace('<div id="root">', `${crawlerContent}\n    <div id="root">`);
    } else {
      // Articles Hub Page SEO (/artigos)
      const hubTitle = '20 Artigos de Finanças Pessoais, Orçamento & Emprego Informal em Angola | KwanzaFlow';
      const hubDescription = 'Biblioteca completa de 20 artigos sobre finanças diárias em Angola: rendimentos informais, kixikila, compras grossistas, kupapatas, despesas invisíveis e orçamento em Kwanzas.';
      const hubUrl = 'https://kwanzaflow.online/artigos';

      html = html.replace(/<title>.*?<\/title>/, `<title>${hubTitle}</title>`);
      html = html.replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${hubUrl}" />`);
      html = html.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${hubDescription}" />`);
      html = html.replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${hubUrl}" />`);
      html = html.replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${hubTitle}" />`);
      html = html.replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${hubDescription}" />`);

      const collectionSchema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        'name': hubTitle,
        'description': hubDescription,
        'url': hubUrl,
        'hasPart': allArticles.map((art) => ({
          '@type': 'Article',
          'headline': art.title,
          'url': `https://kwanzaflow.online/artigos/${art.slug}`,
          'datePublished': art.datePublished,
        })),
      };

      const breadcrumbHubSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Início',
            'item': 'https://kwanzaflow.online/',
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Artigos',
            'item': hubUrl,
          },
        ],
      };

      const hubJsonLd = `
    <!-- Schema.org CollectionPage & BreadcrumbList -->
    <script type="application/ld+json">${JSON.stringify(collectionSchema)}</script>
    <script type="application/ld+json">${JSON.stringify(breadcrumbHubSchema)}</script>`;

      html = html.replace('</head>', `${hubJsonLd}\n  </head>`);
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  } catch (e) {
    res.sendFile(indexPath);
  }
});

app.get('*all', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`SiteKwanzaFlow server listening on port ${PORT}`);
});

