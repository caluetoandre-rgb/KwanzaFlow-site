import { useState } from 'react';
import { Users, ShieldCheck, CheckCircle2, Award, Calendar, Bell, ArrowRight, UserCheck } from 'lucide-react';
import { ActiveTab } from '../types';

interface KixikilaSectionProps {
  onOpenDownloadModal: () => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export function KixikilaSection({ onOpenDownloadModal, setActiveTab }: KixikilaSectionProps) {
  const [members, setMembers] = useState<number>(8);
  const [quota, setQuota] = useState<number>(25000);

  const totalPot = members * quota;

  const formatKz = (val: number) => {
    return new Intl.NumberFormat('pt-AO', {
      style: 'decimal',
      maximumFractionDigits: 0,
    }).format(val) + ' Kz';
  };

  return (
    <section id="kixikila" className="py-16 sm:py-20 bg-white text-[#1e293b] border-b border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Badge & Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-200">
            <span>Tradição Angolana com Tecnologia Moderna</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0f172a]">
            Kixikila Digital: Poupança Coletiva com Total Confiança
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#64748b]">
            A Kixikila é o pilar da entreajuda em Angola. O KwanzaFlow modernizou a gestão das rondas, trazendo transparência em tempo real para que ninguém fique com dúvidas sobre quotas e entregas.
          </p>
        </div>

        {/* 3 Pillars of Digital Kixikila */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-[#f8fafc] rounded-2xl p-6 border border-[#e2e8f0] shadow-2xs">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#10b981] flex items-center justify-center mb-4 border border-emerald-100">
              <Calendar className="w-6 h-6 text-[#10b981]" />
            </div>
            <h3 className="text-lg font-extrabold text-[#0f172a] mb-2">
              Ordem de Recebimento Clara
            </h3>
            <p className="text-sm text-[#64748b] leading-relaxed">
              Defina o calendário de sorteio ou a ordem combinada entre os participantes. Todo membro sabe com antecedência exata em que mês recebe a sua bolada.
            </p>
          </div>

          <div className="bg-[#f8fafc] rounded-2xl p-6 border border-[#e2e8f0] shadow-2xs">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center mb-4 border border-amber-100">
              <UserCheck className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-lg font-extrabold text-[#0f172a] mb-2">
              Comprovativos e Quotas Pagas
            </h3>
            <p className="text-sm text-[#64748b] leading-relaxed">
              O administrador e os membros acompanham quem já depositou a sua quota no Multicaixa ou transferência bancária, com status verde e histórico permanente.
            </p>
          </div>

          <div className="bg-[#f8fafc] rounded-2xl p-6 border border-[#e2e8f0] shadow-2xs">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center mb-4 border border-teal-100">
              <Bell className="w-6 h-6 text-teal-600" />
            </div>
            <h3 className="text-lg font-extrabold text-[#0f172a] mb-2">
              Lembretes Automáticos Amigáveis
            </h3>
            <p className="text-sm text-[#64748b] leading-relaxed">
              Acabou o constrangimento de cobrar parentes ou colegas. O aplicativo emite lembretes amigáveis dias antes do vencimento da ronda.
            </p>
          </div>
        </div>

        {/* Interactive Kixikila Simulator */}
        <div className="bg-[#0f172a] rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Simulator Controls */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-bold text-[#10b981] uppercase tracking-wider">
                  Simulador de Ronda
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                  Quanto cada membro recebe na sua vez?
                </h3>
                <p className="text-sm text-slate-300 mt-2">
                  Ajuste o número de pessoas no grupo e o valor que cada um poupa mensalmente.
                </p>
              </div>

              {/* Slider / Members */}
              <div className="space-y-2 bg-slate-800/90 p-4 rounded-2xl border border-slate-700">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300 font-medium">Número de Membros no Grupo:</span>
                  <span className="text-amber-400 font-bold text-base">{members} pessoas</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="20"
                  value={members}
                  onChange={(e) => setMembers(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#10b981]"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>2 membros</span>
                  <span>10 membros</span>
                  <span>20 membros</span>
                </div>
              </div>

              {/* Quota Options */}
              <div className="space-y-2 bg-slate-800/90 p-4 rounded-2xl border border-slate-700">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-300 font-medium">Quota Mensal por Pessoa:</span>
                  <span className="text-[#10b981] font-bold text-base">{formatKz(quota)}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {[10000, 25000, 50000, 100000, 200000].map((val) => (
                    <button
                      key={val}
                      onClick={() => setQuota(val)}
                      className={`text-xs py-2 px-2.5 rounded-xl font-bold transition-all cursor-pointer ${
                        quota === val
                          ? 'bg-[#10b981] text-white shadow'
                          : 'bg-slate-700/80 hover:bg-slate-600 text-slate-200'
                      }`}
                    >
                      {formatKz(val)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Bolada Result Card */}
            <div className="lg:col-span-6">
              <div className="bg-gradient-to-br from-[#10b981] to-[#059669] p-6 sm:p-8 rounded-3xl shadow-xl text-white relative overflow-hidden">
                <div className="text-xs font-bold text-emerald-100 uppercase tracking-wider mb-2">
                  Resultado da Ronda
                </div>

                <div className="text-sm text-emerald-50 font-medium">
                  Montante a receber quando chegar a sua vez:
                </div>

                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight my-3">
                  {formatKz(totalPot)}
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-emerald-400/40 text-xs">
                  <div>
                    <div className="text-emerald-100">Duração do Ciclo:</div>
                    <div className="font-bold text-white text-sm">{members} meses</div>
                  </div>
                  <div>
                    <div className="text-emerald-100">Beneficiários por mês:</div>
                    <div className="font-bold text-white text-sm">1 membro sorteado</div>
                  </div>
                </div>

                <div className="mt-6 pt-2">
                  <button
                    onClick={onOpenDownloadModal}
                    className="w-full py-3 px-4 rounded-[8px] bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold text-sm shadow-md transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Criar Kixikila no App KwanzaFlow</span>
                    <ArrowRight className="w-4 h-4 text-[#10b981]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
