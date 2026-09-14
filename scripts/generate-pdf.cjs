const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

async function generateOfficialPdf() {
  const pdfDoc = await PDFDocument.create();
  
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // A4 size: 595.28 x 841.89 points
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const margin = 45;
  const contentWidth = pageWidth - margin * 2; // 505.28

  // Colors
  const darkNavy = rgb(15 / 255, 23 / 255, 42 / 255); // #0f172a
  const accentGold = rgb(234 / 255, 179 / 255, 8 / 255); // #eab308
  const amberBg = rgb(254 / 255, 252 / 255, 232 / 255); // #fefce8
  const amberBorder = rgb(245 / 255, 158 / 255, 11 / 255); // #f59e0b
  const lightBlueBg = rgb(240 / 255, 249 / 255, 255 / 255); // #f0f9ff
  const blueBorder = rgb(14 / 255, 165 / 255, 233 / 255); // #0ea5e9
  const textDark = rgb(30 / 255, 41 / 255, 59 / 255); // #1e293b
  const textMuted = rgb(100 / 255, 116 / 255, 139 / 255); // #64748b
  const grayLight = rgb(241 / 255, 245 / 255, 249 / 255); // #f1f5f9
  const grayBorder = rgb(226 / 255, 232 / 255, 240 / 255); // #e2e8f0

  function drawFooter(page, pageNum) {
    const footerText = `KwanzaFlow — Tecnologia e Cidadania Financeira • Página ${pageNum} de 3`;
    page.drawText(footerText, {
      x: (pageWidth - fontRegular.widthOfTextAtSize(footerText, 8.5)) / 2,
      y: 28,
      size: 8.5,
      font: fontRegular,
      color: textMuted,
    });
  }

  // ==================== PAGE 1 ====================
  const page1 = pdfDoc.addPage([pageWidth, pageHeight]);

  // Header Banner (Navy)
  const bannerHeight = 140;
  const bannerY = pageHeight - margin - bannerHeight;
  page1.drawRectangle({
    x: margin,
    y: bannerY,
    width: contentWidth,
    height: bannerHeight,
    color: darkNavy,
  });

  // Badge: INICIATIVA & CIDADANIA FINANCEIRA
  const badgeText = 'INICIATIVA & CIDADANIA FINANCEIRA';
  const badgeWidth = fontBold.widthOfTextAtSize(badgeText, 7.5) + 16;
  page1.drawRectangle({
    x: margin + 18,
    y: bannerY + bannerHeight - 26,
    width: badgeWidth,
    height: 15,
    color: accentGold,
  });
  page1.drawText(badgeText, {
    x: margin + 26,
    y: bannerY + bannerHeight - 22,
    size: 7.5,
    font: fontBold,
    color: darkNavy,
  });

  // Title: KwanzaFlow: Tecnologia e Cidadania Financeira ao
  // Alcance de Todos
  page1.drawText('KwanzaFlow: Tecnologia e Cidadania Financeira ao', {
    x: margin + 18,
    y: bannerY + bannerHeight - 50,
    size: 16,
    font: fontBold,
    color: rgb(1, 1, 1),
  });
  page1.drawText('Alcance de Todos', {
    x: margin + 18,
    y: bannerY + bannerHeight - 70,
    size: 16,
    font: fontBold,
    color: rgb(1, 1, 1),
  });

  // Subtitle
  page1.drawText('Promovendo a autonomia financeira, inclusão social e gestão ética e prudente de recursos', {
    x: margin + 18,
    y: bannerY + bannerHeight - 92,
    size: 9.5,
    font: fontRegular,
    color: rgb(226 / 255, 232 / 255, 240 / 255),
  });

  // Divider inside banner
  page1.drawLine({
    start: { x: margin + 18, y: bannerY + 34 },
    end: { x: margin + contentWidth - 18, y: bannerY + 34 },
    thickness: 0.5,
    color: rgb(51 / 255, 65 / 255, 85 / 255),
  });

  // Meta author & origin inside banner
  page1.drawText('Iniciativa: ', {
    x: margin + 18,
    y: bannerY + 16,
    size: 8.5,
    font: fontRegular,
    color: rgb(148 / 255, 163 / 255, 184 / 255),
  });
  page1.drawText('KwanzaFlow Angola', {
    x: margin + 18 + fontRegular.widthOfTextAtSize('Iniciativa: ', 8.5),
    y: bannerY + 16,
    size: 8.5,
    font: fontBold,
    color: rgb(1, 1, 1),
  });

  const originText = 'Âmbito: Finanças Pessoais & Cidadania em Angola';
  page1.drawText(originText, {
    x: margin + contentWidth - 18 - fontRegular.widthOfTextAtSize(originText, 8.5),
    y: bannerY + 16,
    size: 8.5,
    font: fontRegular,
    color: rgb(226 / 255, 232 / 255, 240 / 255),
  });

  // Section 1: Da Consciência à Prática: A Génese do Projeto
  let curY = bannerY - 28;
  page1.drawText('Da Consciência à Prática: A Génese do Projeto', {
    x: margin,
    y: curY,
    size: 13,
    font: fontBold,
    color: darkNavy,
  });

  curY -= 16;
  const p1Text = 'A verdadeira transformação económica, social e individual começa na base: no domínio do orçamento doméstico, na gestão responsável dos recursos e na educação financeira. Foi com este propósito que nasceu o KwanzaFlow.';
  const p1Lines = wrapText(p1Text, contentWidth, fontRegular, 9.5);
  for (const line of p1Lines) {
    page1.drawText(line, { x: margin, y: curY, size: 9.5, font: fontRegular, color: textDark });
    curY -= 14;
  }

  curY -= 4;
  const p2Text = 'A ideia do aplicativo nasceu inspirada diretamente pelas discussões e reflexões vivenciadas durante encontros formativos sobre Mordomia e Finanças Pessoais, realizados com jovens e famílias em Angola. Observando de perto os desafios quotidianos da juventude e das famílias na administração do orçamento mensal e na disciplina de poupança, tornou-se evidente a necessidade de uma ferramenta prática, acessível e contextualizada à realidade sociocultural angolana.';
  const p2Lines = wrapText(p2Text, contentWidth, fontRegular, 9.5);
  for (const line of p2Lines) {
    page1.drawText(line, { x: margin, y: curY, size: 9.5, font: fontRegular, color: textDark });
    curY -= 14;
  }

  // Section 2: Princípio Norteador: Gestão Consciente e Responsabilidade Integral
  curY -= 12;
  page1.drawText('Princípio Norteador: Gestão Consciente e Responsabilidade Integral', {
    x: margin,
    y: curY,
    size: 13,
    font: fontBold,
    color: darkNavy,
  });

  // Callout Box
  curY -= 20;
  const calloutText = 'O KwanzaFlow foi concebido com uma missão que ultrapassa o simples registo de números: apoiar os jovens e as famílias na vivência prática da administração responsável e equilibrada dos seus recursos.';
  const calloutLines = wrapText(calloutText, contentWidth - 30, fontRegular, 9.5);
  const calloutBoxHeight = calloutLines.length * 15 + 18;

  page1.drawRectangle({
    x: margin,
    y: curY - calloutBoxHeight + 12,
    width: contentWidth,
    height: calloutBoxHeight,
    color: lightBlueBg,
  });
  page1.drawRectangle({
    x: margin,
    y: curY - calloutBoxHeight + 12,
    width: 3.5,
    height: calloutBoxHeight,
    color: blueBorder,
  });

  let calloutY = curY + 2;
  for (const line of calloutLines) {
    page1.drawText(line, { x: margin + 16, y: calloutY, size: 9.5, font: fontRegular, color: darkNavy });
    calloutY -= 14;
  }

  curY = curY - calloutBoxHeight - 6;
  const p3Text = 'Na perspetiva da mordomia cristã, a responsabilidade financeira não termina com a devolução fiel dos dízimos e a entrega das ofertas; pelo contrário, é a partir desse ato de reconhecimento e fidelidade a Deus que começa o dever de administrar com prudência, temperança e sabedoria os restantes recursos sob cuidado do indivíduo. O KwanzaFlow propõe-se a ser o assistente prático diário para que os jovens cristãos e a sociedade mantenham uma conduta financeira equilibrada, honrada e livre do endividamento desnecessário.';
  const p3Lines = wrapText(p3Text, contentWidth, fontRegular, 9.5);
  for (const line of p3Lines) {
    page1.drawText(line, { x: margin, y: curY, size: 9.5, font: fontRegular, color: textDark });
    curY -= 14;
  }

  // Objectives
  curY -= 10;
  page1.drawText('Objetivos Fundamentais', {
    x: margin,
    y: curY,
    size: 13,
    font: fontBold,
    color: darkNavy,
  });

  const objectives = [
    { title: 'Fidelidade e Responsabilidade Contínua: ', text: 'Fornecer suporte para que o compromisso moral e espiritual com Deus se traduza também numa administração diária equilibrada e ética do orçamento pessoal.' },
    { title: 'Desmistificar a Gestão Orçamental: ', text: 'Tornar a organização de receitas e despesas compreensível e natural para qualquer cidadão, independentemente do seu nível de escolaridade formal.' },
    { title: 'Fomentar o Hábito da Poupança: ', text: 'Estimular a criação de reservas de emergência e o planeamento de metas pessoais a curto, médio e longo prazo.' },
    { title: 'Preservar Tradições Colaborativas: ', text: 'Fornecer suporte tecnológico e transparência a práticas comunitárias e culturais de entreajuda, como a Kixikila.' },
    { title: 'Garantir Acessibilidade Digital e Inclusão: ', text: 'Disponibilizar uma solução leve, eficiente em consumo de dados e plenamente funcional mesmo em ligações instáveis de internet.' },
  ];

  curY -= 16;
  for (const obj of objectives) {
    page1.drawText('•', { x: margin + 4, y: curY, size: 11, font: fontBold, color: darkNavy });
    const fullText = obj.title + obj.text;
    const lines = wrapText(fullText, contentWidth - 22, fontRegular, 9);
    for (let i = 0; i < lines.length; i++) {
      if (i === 0) {
        // Draw title bold part and remainder
        page1.drawText(obj.title, { x: margin + 18, y: curY, size: 9, font: fontBold, color: darkNavy });
        const titleWidth = fontBold.widthOfTextAtSize(obj.title, 9);
        const restOfFirstLine = lines[0].replace(obj.title, '');
        page1.drawText(restOfFirstLine, { x: margin + 18 + titleWidth, y: curY, size: 9, font: fontRegular, color: textDark });
      } else {
        page1.drawText(lines[i], { x: margin + 18, y: curY, size: 9, font: fontRegular, color: textDark });
      }
      curY -= 12.5;
    }
    curY -= 3;
  }

  drawFooter(page1, 1);

  // ==================== PAGE 2 ====================
  const page2 = pdfDoc.addPage([pageWidth, pageHeight]);
  let p2Y = pageHeight - margin - 10;

  page2.drawText('Principais Funcionalidades', {
    x: margin,
    y: p2Y,
    size: 13,
    font: fontBold,
    color: darkNavy,
  });

  p2Y -= 18;
  // Table
  const col1Width = 140;
  const col2Width = contentWidth - col1Width;
  const tableX = margin;

  // Table Header
  const headerHeight = 24;
  page2.drawRectangle({
    x: tableX,
    y: p2Y - headerHeight,
    width: contentWidth,
    height: headerHeight,
    color: darkNavy,
  });
  page2.drawText('Funcionalidade', {
    x: tableX + 10,
    y: p2Y - 16,
    size: 9.5,
    font: fontBold,
    color: rgb(1, 1, 1),
  });
  page2.drawText('Finalidade e Impacto', {
    x: tableX + col1Width + 10,
    y: p2Y - 16,
    size: 9.5,
    font: fontBold,
    color: rgb(1, 1, 1),
  });

  p2Y -= headerHeight;

  const features = [
    { name: 'Registo Rápido de\nMovimentações', desc: 'Interface simplificada para anotação imediata de entradas e saídas diárias, reduzindo o esquecimento de pequenas despesas.' },
    { name: 'Categorização Inteligente', desc: 'Separação clara de gastos essenciais (alimentação, transporte, habitação, educação, compromissos morais/espirituais) e não essenciais.' },
    { name: 'Gestão de Metas de Poupança', desc: 'Painel visual para definir objetivos claros (reserva familiar, formação, reforma de habitação) com acompanhamento em tempo real.' },
    { name: 'Módulo Integrado de Kixikila', desc: 'Ferramenta dedicada para registar participantes, montantes de contribuição, ordem das rondas e histórico de pagamentos de grupos de poupança rotativa.' },
    { name: 'Relatórios Visuais e Resumos', desc: 'Gráficos e indicadores fáceis de interpretar, permitindo ao utilizador saber com clareza para onde foi o seu dinheiro ao longo do mês.' },
  ];

  for (let idx = 0; idx < features.length; idx++) {
    const f = features[idx];
    const descLines = wrapText(f.desc, col2Width - 20, fontRegular, 8.8);
    const rowHeight = Math.max(descLines.length * 13 + 14, 34);

    // Row background (alternating)
    if (idx % 2 === 1) {
      page2.drawRectangle({
        x: tableX,
        y: p2Y - rowHeight,
        width: contentWidth,
        height: rowHeight,
        color: grayLight,
      });
    }

    // Outer border
    page2.drawRectangle({
      x: tableX,
      y: p2Y - rowHeight,
      width: contentWidth,
      height: rowHeight,
      borderWidth: 0.5,
      borderColor: grayBorder,
    });

    // Col divider
    page2.drawLine({
      start: { x: tableX + col1Width, y: p2Y },
      end: { x: tableX + col1Width, y: p2Y - rowHeight },
      thickness: 0.5,
      color: grayBorder,
    });

    // Name text
    const nameLines = f.name.split('\n');
    let nY = p2Y - 14;
    for (const nl of nameLines) {
      page2.drawText(nl, {
        x: tableX + 10,
        y: nY,
        size: 8.8,
        font: fontBold,
        color: textDark,
      });
      nY -= 12;
    }

    // Desc text
    let dY = p2Y - 14;
    for (const dl of descLines) {
      page2.drawText(dl, {
        x: tableX + col1Width + 10,
        y: dY,
        size: 8.8,
        font: fontRegular,
        color: textDark,
      });
      dY -= 12;
    }

    p2Y -= rowHeight;
  }

  // Valências e Diferenciais
  p2Y -= 20;
  page2.drawText('Valências e Diferenciais', {
    x: margin,
    y: p2Y,
    size: 13,
    font: fontBold,
    color: darkNavy,
  });

  p2Y -= 16;
  const diffs = [
    {
      title: 'Contextualização Local e Comunitária',
      text: 'Moldado a partir das necessidades reais das famílias e jovens angolanos, integrando valores de solidariedade e responsabilidade mútua.',
    },
    {
      title: 'Caráter Educativo e Sem Especulação',
      text: 'Concebido sob a premissa de mordomia responsável — administração prudente, ética e equilibrada para a paz de espírito e bem-estar familiar.',
    },
    {
      title: 'Privacidade e Segurança Absolutas',
      text: 'Foco rigoroso na salvaguarda e confidencialidade dos dados inseridos, garantindo soberania e discrição ao utilizador.',
    },
    {
      title: 'Interface Sem Atrito',
      text: 'Design moderno, intuitivo e com foco em usabilidade prática e imediata, garantindo fluidez e facilidade em qualquer telemóvel.',
    },
  ];

  const cardW = (contentWidth - 12) / 2;
  const cardH = 58;

  for (let i = 0; i < diffs.length; i++) {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const cX = margin + col * (cardW + 12);
    const cY = p2Y - (row + 1) * (cardH + 10) + 10;

    page2.drawRectangle({
      x: cX,
      y: cY,
      width: cardW,
      height: cardH,
      color: grayLight,
      borderWidth: 0.5,
      borderColor: grayBorder,
    });

    page2.drawText(diffs[i].title, {
      x: cX + 8,
      y: cY + cardH - 14,
      size: 8.8,
      font: fontBold,
      color: darkNavy,
    });

    const dLines = wrapText(diffs[i].text, cardW - 16, fontRegular, 7.8);
    let tY = cY + cardH - 26;
    for (const tl of dLines) {
      page2.drawText(tl, {
        x: cX + 8,
        y: tY,
        size: 7.8,
        font: fontRegular,
        color: textDark,
      });
      tY -= 10;
    }
  }

  p2Y = p2Y - 2 * (cardH + 10) - 10;

  // Termos de Utilização, Avisos Legais e Sustentabilidade
  page2.drawText('Termos de Utilização, Avisos Legais e Sustentabilidade', {
    x: margin,
    y: p2Y,
    size: 13,
    font: fontBold,
    color: darkNavy,
  });

  p2Y -= 14;

  // Box 1: Natureza da Aplicação
  const legal1Title = '1. Natureza da Aplicação (Caderno Digital de Anotações)';
  const legal1Text = 'O KwanzaFlow funciona exclusivamente como uma ferramenta informativa e um caderno digital para registo e organização de finanças pessoais. O aplicativo não constitui instituição financeira, não realiza custódia de valores monetários, não efetua transferências bancárias e não guarda títulos, ações ou ativos financeiros de qualquer natureza. Todos os valores exibidos são inserções declaratórias feitas manualmente pelo próprio utilizador para fins de controlo orçamental doméstico.';
  const legal1Lines = wrapText(legal1Text, contentWidth - 26, fontRegular, 8.5);
  const legal1Height = legal1Lines.length * 12 + 28;

  page2.drawRectangle({
    x: margin,
    y: p2Y - legal1Height,
    width: contentWidth,
    height: legal1Height,
    color: amberBg,
    borderWidth: 0.5,
    borderColor: rgb(253 / 255, 230 / 255, 138 / 255),
  });
  page2.drawRectangle({
    x: margin,
    y: p2Y - legal1Height,
    width: 3.5,
    height: legal1Height,
    color: amberBorder,
  });

  page2.drawText(legal1Title, {
    x: margin + 12,
    y: p2Y - 14,
    size: 9,
    font: fontBold,
    color: rgb(180 / 255, 83 / 255, 9 / 255),
  });

  let l1Y = p2Y - 28;
  for (const line of legal1Lines) {
    page2.drawText(line, {
      x: margin + 12,
      y: l1Y,
      size: 8.5,
      font: fontRegular,
      color: textDark,
    });
    l1Y -= 12;
  }

  p2Y = p2Y - legal1Height - 12;

  // Box 2: Compromisso com o Uso Responsável de IA
  const legal2Title = '2. Compromisso com o Uso Responsável de Inteligência Artificial';
  const legal2Text = 'Quaisquer recursos baseados em inteligência artificial presentes na plataforma destinam-se unicamente a categorizar dados, auxiliar na visualização de resumos e sugerir boas práticas educativas de gestão. A tecnologia opera dentro de padrões rigorosos de ética, transparência e respeito à privacidade individual, não recolhendo dados sensíveis nem realizando aconselhamento de investimentos.';
  const legal2Lines = wrapText(legal2Text, contentWidth - 26, fontRegular, 8.5);
  const legal2Height = legal2Lines.length * 12 + 28;

  page2.drawRectangle({
    x: margin,
    y: p2Y - legal2Height,
    width: contentWidth,
    height: legal2Height,
    color: amberBg,
    borderWidth: 0.5,
    borderColor: rgb(253 / 255, 230 / 255, 138 / 255),
  });
  page2.drawRectangle({
    x: margin,
    y: p2Y - legal2Height,
    width: 3.5,
    height: legal2Height,
    color: amberBorder,
  });

  page2.drawText(legal2Title, {
    x: margin + 12,
    y: p2Y - 14,
    size: 9,
    font: fontBold,
    color: rgb(180 / 255, 83 / 255, 9 / 255),
  });

  let l2Y = p2Y - 28;
  for (const line of legal2Lines) {
    page2.drawText(line, {
      x: margin + 12,
      y: l2Y,
      size: 8.5,
      font: fontRegular,
      color: textDark,
    });
    l2Y -= 12;
  }

  drawFooter(page2, 2);

  // ==================== PAGE 3 ====================
  const page3 = pdfDoc.addPage([pageWidth, pageHeight]);
  let p3TopY = pageHeight - margin - 20;

  // Box 3: Modelo de Gratuidade e Exibição de Anúncios
  const legal3Title = '3. Modelo de Gratuidade e Exibição de Anúncios';
  const legal3Text = 'Para garantir o acesso livre, democrático e 100% gratuito a toda a comunidade — sem mensalidades ou cobranças ocultas —, o projeto recorre à exibição responsável e não invasiva de anúncios publicitários. Esta receita destina-se integralmente a cobrir os custos de infraestrutura técnica, alojamento de servidores e continuidade do desenvolvimento.';
  const legal3Lines = wrapText(legal3Text, contentWidth - 26, fontRegular, 9);
  const legal3Height = legal3Lines.length * 14 + 32;

  page3.drawRectangle({
    x: margin,
    y: p3TopY - legal3Height,
    width: contentWidth,
    height: legal3Height,
    color: amberBg,
    borderWidth: 0.5,
    borderColor: rgb(253 / 255, 230 / 255, 138 / 255),
  });
  page3.drawRectangle({
    x: margin,
    y: p3TopY - legal3Height,
    width: 3.5,
    height: legal3Height,
    color: amberBorder,
  });

  page3.drawText(legal3Title, {
    x: margin + 12,
    y: p3TopY - 16,
    size: 9.5,
    font: fontBold,
    color: rgb(180 / 255, 83 / 255, 9 / 255),
  });

  let l3Y = p3TopY - 32;
  for (const line of legal3Lines) {
    page3.drawText(line, {
      x: margin + 12,
      y: l3Y,
      size: 9,
      font: fontRegular,
      color: textDark,
    });
    l3Y -= 14;
  }

  // Summary Stamp / Verification Box on Page 3
  const certY = p3TopY - legal3Height - 40;
  const certHeight = 160;
  page3.drawRectangle({
    x: margin,
    y: certY - certHeight,
    width: contentWidth,
    height: certHeight,
    color: lightBlueBg,
    borderWidth: 0.5,
    borderColor: rgb(186 / 255, 230 / 255, 253 / 255),
  });

  page3.drawText('Documento Institucional Oficial — KwanzaFlow Angola', {
    x: margin + 20,
    y: certY - 26,
    size: 11,
    font: fontBold,
    color: darkNavy,
  });

  const certLines = [
    'Este documento sintetiza as diretrizes, princípios de mordomia cristã, salvaguardas legais e',
    'o propósito social que nortearam a génese e o lançamento do aplicativo KwanzaFlow.',
    '',
    '• Portal Oficial: https://kwanzaflow.online/comosurgiu',
    '• Iniciativa: KwanzaFlow Angola — Cidadania Financeira e Inclusão Social',
    '• Versão: 1.0.0 — Documento de Cidadania Financeira e Inclusão Social',
    '• Suporte e Atendimento: appkwanzaflow@gmail.com',
  ];

  let cY = certY - 46;
  for (const cl of certLines) {
    if (cl.startsWith('•')) {
      page3.drawText(cl, { x: margin + 20, y: cY, size: 8.5, font: fontBold, color: darkNavy });
    } else {
      page3.drawText(cl, { x: margin + 20, y: cY, size: 8.5, font: fontRegular, color: textDark });
    }
    cY -= 14;
  }

  drawFooter(page3, 3);

  const pdfBytes = await pdfDoc.save();
  
  // Ensure output directories exist
  const publicDir = path.join(process.cwd(), 'public');
  const downloadsDir = path.join(publicDir, 'downloads');
  if (!fs.existsSync(downloadsDir)) {
    fs.mkdirSync(downloadsDir, { recursive: true });
  }

  const outPath1 = path.join(downloadsDir, 'KwanzaFlow_Tecnologia_e_Cidadania_Financeira.pdf');
  const outPath2 = path.join(publicDir, 'comosurgiu.pdf');
  fs.writeFileSync(outPath1, pdfBytes);
  fs.writeFileSync(outPath2, pdfBytes);

  console.log('PDF successfully generated at:');
  console.log('-', outPath1);
  console.log('-', outPath2);
  console.log('Size:', (pdfBytes.length / 1024).toFixed(1), 'KB');
}

// Helper to word-wrap text given a max width
function wrapText(text, maxWidth, font, fontSize) {
  const words = text.split(/\s+/);
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const testWidth = font.widthOfTextAtSize(testLine, fontSize);
    if (testWidth <= maxWidth) {
      currentLine = testLine;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines;
}

generateOfficialPdf().catch(console.error);
