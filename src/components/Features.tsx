import { useState } from 'react';
import { Wallet, Users, Store, BrainCircuit, Calculator, ArrowRight, CheckCircle2, TrendingUp, DollarSign } from 'lucide-react';
import { ActiveTab } from '../types';

interface FeaturesProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export function Features({ setActiveTab }: FeaturesProps) {
  // Interactive 50/30/20 Budget Calculator
  const [incomeInput, setIncomeInput] = useState<number>(150000);

  // Simulador de Poder de Compra (Inflação)
  const [inflationInitial, setInflationInitial] = useState<number>(10000);

  const needs = Math.round(incomeInput * 0.5);
  const wants = Math.round(incomeInput * 0.3);
  const savings = Math.round(incomeInput * 0.2);

  const formatKz = (val: number) => {
    return new Intl.NumberFormat('pt-AO', {
      style: 'decimal',
      maximumFractionDigits: 0,
    }).format(val) + ' Kz';
  };

  return (
    <section id="recursos" className="py-16 sm:py-20 bg-[#f8fafc] text-[#1e293b] border-b border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#059669] text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-200">
            <span>Soluções Financeiras Completas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0f172a]">
            Tudo o que precisa para fazer o seu dinheiro render
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#64748b]">
            Desenvolvido para responder à realidade económica de Angola: desde o salário individual até ao pequeno comércio de bairro e às tradicionais Kixikilas de confiança.
          </p>
        </div>

        {/* 4 Core Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Card 1: Orçamento Pessoal 50/30/20 */}
          <div className="bg-white rounded-2xl p-7 shadow-2xs border border-[#e2e8f0] hover:border-[#10b981] transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#10b981] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform border border-emerald-100">
                <Wallet className="w-6 h-6 text-[#10b981]" />
              </div>
              <h3 className="text-xl font-extrabold text-[#0f172a] mb-2">
                1. Orçamento Pessoal em Kwanzas
              </h3>
              <p className="text-sm text-[#64748b] leading-relaxed mb-4">
                Domine as suas finanças através da consagrada regra <strong>50/30/20</strong>: divida o seu salário entre necessidades básicas (alimentação, renda e energia), estilo de vida e poupança protegida para emergências.
              </p>
              <ul className="space-y-2 text-xs text-[#64748b]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10b981] flex-shrink-0" />
                  <span>Acompanhamento de teto de gastos por categoria em tempo real</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10b981] flex-shrink-0" />
                  <span>Gráficos simples de receitas versus despesas mensais</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#10b981] flex-shrink-0" />
                  <span>Cálculo automático de saldo disponível e projeção para o fim do mês</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <span className="text-xs font-semibold text-[#10b981]">Simule seu orçamento 50/30/20 abaixo ↓</span>
            </div>
          </div>

          {/* Card 2: Grupos de Kixikila Transparentes */}
          <div className="bg-white rounded-2xl p-7 shadow-2xs border border-[#e2e8f0] hover:border-amber-300 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-900 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform border border-amber-100">
                <Users className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-extrabold text-[#0f172a] mb-2">
                2. Grupos de Kixikila Transparentes
              </h3>
              <p className="text-sm text-[#64748b] leading-relaxed mb-4">
                A tradicional poupança coletiva de Angola com a clareza e segurança da era digital. Organize rondas entre familiares, colegas ou amigos com total transparência de quem pagou e quem recebe em cada mês.
              </p>
              <ul className="space-y-2 text-xs text-[#64748b]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>Sorteio ou agendamento de ordem de recebimento da bolada</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>Registo de comprovativos e marcação de quotas pagas ou em atraso</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>Histórico completo acessível por todos os membros do grupo</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  setActiveTab('kixikila');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
              >
                <span>Ver módulo completo de Kixikila</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: Micro-Negócios e Relatórios DRE */}
          <div className="bg-white rounded-2xl p-7 shadow-2xs border border-[#e2e8f0] hover:border-[#10b981] transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-900 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform border border-teal-100">
                <Store className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-extrabold text-[#0f172a] mb-2">
                3. Relatórios DRE para Pequenos Negócios
              </h3>
              <p className="text-sm text-[#64748b] leading-relaxed mb-4">
                Criado para cantinas, roulotes, quitandeiras, salões e pequenos comércios. Separe o dinheiro da casa do dinheiro do negócio e saiba exatamente quanto lucrou no fim de cada semana.
              </p>
              <ul className="space-y-2 text-xs text-[#64748b]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                  <span>Caderno de "Fiados": registo de clientes devedores e cobranças</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                  <span>DRE Simplificado: Receita Bruta - Custos de Mercadoria = Lucro Real</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                  <span>Exportação de relatórios resumidos em PDF ou planilha Excel</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <span className="text-xs font-semibold text-teal-700">Controle prático sem necessidade de contabilidade complexa</span>
            </div>
          </div>

          {/* Card 4: Assistente IA Financeiro */}
          <div className="bg-white rounded-2xl p-7 shadow-2xs border border-[#e2e8f0] hover:border-indigo-300 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-900 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform border border-indigo-100">
                <BrainCircuit className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-extrabold text-[#0f172a] mb-2">
                4. Assistente IA Financeiro Angolano
              </h3>
              <p className="text-sm text-[#64748b] leading-relaxed mb-4">
                Consultoria e diagnóstico automático de despesas. O assistente inteligente analisa o seu histórico de lançamentos e sugere cortes em despesas supérfluas para acelerar as suas metas de poupança.
              </p>
              <ul className="space-y-2 text-xs text-[#64748b]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <span>Dicas práticas adaptadas ao custo de vida de Luanda e demais províncias</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <span>Alertas preventivos para evitar estourar o orçamento antes do fim do mês</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <span>Definição de prazos realistas para comprar moto, terreno ou investir no negócio</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <span className="text-xs font-semibold text-indigo-700">Consultoria financeira ao alcance de todos</span>
            </div>
          </div>
        </div>

        {/* Interactive Feature: 50/30/20 Budget Calculator in Kwanzas */}
        <div className="bg-[#0f172a] rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-slate-800">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 text-[#10b981] font-bold text-xs uppercase tracking-wider mb-1">
                  <Calculator className="w-4 h-4" />
                  <span>Simulador Interativo KwanzaFlow</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  Calcule a sua Regra 50 / 30 / 20
                </h3>
                <p className="text-sm text-slate-300 mt-1">
                  Insira o seu rendimento mensal líquido em Kwanzas (AOA) e veja a distribuição recomendada.
                </p>
              </div>

              {/* Quick Input Box */}
              <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700 min-w-[280px]">
                <label className="block text-xs text-slate-300 font-medium mb-1.5">
                  Renda Mensal Estimada (Kwanzas):
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="10000"
                    min="10000"
                    value={incomeInput}
                    onChange={(e) => setIncomeInput(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full bg-[#0f172a] text-white font-bold text-lg px-3 py-2 rounded-xl border border-[#10b981] focus:outline-none focus:ring-2 focus:ring-[#10b981] pl-3 pr-12"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-[#10b981] font-bold">
                    Kz
                  </span>
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => setIncomeInput(100000)}
                    className="text-[10px] bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded text-slate-200 cursor-pointer"
                  >
                    100.000 Kz
                  </button>
                  <button
                    onClick={() => setIncomeInput(250000)}
                    className="text-[10px] bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded text-slate-200 cursor-pointer"
                  >
                    250.000 Kz
                  </button>
                  <button
                    onClick={() => setIncomeInput(500000)}
                    className="text-[10px] bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded text-slate-200 cursor-pointer"
                  >
                    500.000 Kz
                  </button>
                </div>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
              {/* 50% Necessidades */}
              <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">50% Essenciais</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-200 font-bold">Necessidades</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white my-2">
                  {formatKz(needs)}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Alimentação, renda de casa, luz, água, gás, saúde e transporte diário para o trabalho.
                </p>
              </div>

              {/* 30% Desejos e Lazer */}
              <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300">30% Estilo de Vida</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-950/80 text-amber-300 font-bold border border-amber-800/50">Desejos</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-amber-300 my-2">
                  {formatKz(wants)}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Lazer, saídas com amigos, recargas adicionais de internet/telefone e pequenas compras pessoais.
                </p>
              </div>

              {/* 20% Poupança & Kixikila */}
              <div className="bg-slate-800/80 border border-[#10b981]/50 rounded-2xl p-5 ring-2 ring-[#10b981]/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#10b981]">20% Futuro</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-950 text-[#10b981] font-bold border border-emerald-800">Poupança & Kixikila</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#10b981] my-2">
                  {formatKz(savings)}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Reserva de emergência, quotas mensais de Kixikila e investimento no seu micro-negócio.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Feature 2: Simulador de Poder de Compra (Inflação) */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 text-[#1e293b] shadow-xl border border-slate-200 mt-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>Simulador de Poder de Compra</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#0f172a]">
                  Como a Inflação Afeta o seu Dinheiro ao Longo de 12 Meses
                </h3>
                <p className="text-sm text-[#64748b] mt-1">
                  Veja em tempo real a erosão do poder de compra de um montante (ex: 10.000 Kz) face à desvalorização cambial e inflação estimada.
                </p>
              </div>

              {/* Quick Config Box */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 min-w-[280px]">
                <label className="block text-xs text-slate-700 font-bold mb-1.5">
                  Montante Inicial (Kwanzas):
                </label>
                <div className="relative mb-3">
                  <input
                    type="number"
                    step="5000"
                    min="1000"
                    value={inflationInitial}
                    onChange={(e) => setInflationInitial(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full bg-white text-[#0f172a] font-bold text-base px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#10b981] pl-3 pr-12"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-500 font-bold">
                    Kz
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setInflationInitial(10000)}
                    className="text-[10px] bg-emerald-100 hover:bg-emerald-200 px-2.5 py-1 rounded-lg text-emerald-800 font-bold cursor-pointer"
                  >
                    10.000 Kz
                  </button>
                  <button
                    onClick={() => setInflationInitial(50000)}
                    className="text-[10px] bg-slate-200 hover:bg-slate-300 px-2.5 py-1 rounded-lg text-slate-700 font-bold cursor-pointer"
                  >
                    50.000 Kz
                  </button>
                  <button
                    onClick={() => setInflationInitial(100000)}
                    className="text-[10px] bg-slate-200 hover:bg-slate-300 px-2.5 py-1 rounded-lg text-slate-700 font-bold cursor-pointer"
                  >
                    100.000 Kz
                  </button>
                </div>
              </div>
            </div>

            {/* 12 Months Purchasing Power Breakdown */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-extrabold text-[#0f172a] uppercase tracking-wider">
                  Evolução do Poder de Compra Real (Base: {formatKz(inflationInitial)})
                </h4>
                <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg font-medium">
                  Estimativa de Inflação Anual: ~20% (~1.5% ao mês)
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[1, 3, 6, 9, 12].map((month) => {
                  const monthlyRate = 0.20 / 12;
                  const realValue = Math.round(inflationInitial / Math.pow(1 + monthlyRate, month));
                  const lossPercent = Math.round((1 - realValue / inflationInitial) * 100);

                  return (
                    <div key={month} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center hover:border-emerald-300 transition-colors">
                      <div className="text-xs font-bold text-slate-500 uppercase mb-1">Mês {month}</div>
                      <div className="text-lg font-black text-[#0f172a] my-1">
                        {formatKz(realValue)}
                      </div>
                      <div className="text-[11px] text-rose-600 font-semibold bg-rose-50 px-2 py-0.5 rounded-full inline-block">
                        -{lossPercent}% poder
                      </div>
                    </div>
                  );
                })}

                {/* Summary Card for End of Year */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center flex flex-col justify-between">
                  <div className="text-xs font-bold text-emerald-800 uppercase mb-1">Resumo Anual</div>
                  <div>
                    <div className="text-xs text-slate-600">Poder final</div>
                    <div className="text-sm font-black text-emerald-900">
                      {formatKz(Math.round(inflationInitial / Math.pow(1 + 0.20/12, 12)))}
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-medium mt-1">Proteja com ativos produtivos</span>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200/80 flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-amber-100 text-amber-800 shrink-0 mt-0.5">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  <strong>Dica de Cidadania Financeira:</strong> Deixar dinheiro parado em notas sem rendimento sob efeito da inflação corrói o seu poder de compra. Conforme os artigos do <strong>KwanzaFlow</strong>, a melhor forma de defender o capital familiar é investir em ativos reais (como Títulos do Tesouro na BODIVA, Kixikila produtiva ou stock de mercadoria de giro rápido).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
