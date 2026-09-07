export function KwanzaLogo({ className = "w-9 h-9", withText = true, subtitle = true }: { className?: string; withText?: boolean; subtitle?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      {/* Vibrant Palette Logo Icon matching theme */}
      <div className={`relative flex-shrink-0 ${className} rounded-xl bg-[#10b981] p-1.5 shadow-xs flex items-center justify-center text-white font-black`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Outer Ring */}
          <circle cx="50" cy="50" r="42" stroke="white" strokeWidth="6" opacity="0.9" />
          
          {/* Bar Chart Behind Arrow */}
          <rect x="32" y="52" width="6.5" height="20" rx="2" fill="#ecfdf5" />
          <rect x="42" y="44" width="6.5" height="28" rx="2" fill="#d1fae5" />
          <rect x="52" y="34" width="6.5" height="38" rx="2" fill="#ffffff" />
          
          {/* Trend Line & Arrow */}
          <path
            d="M 27 58 L 40 45 L 50 51 L 68 31"
            stroke="#fde047"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 60 30 L 70 30 L 70 40"
            stroke="#fde047"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Golden Coin with 'K' */}
          <circle cx="64" cy="64" r="14" fill="#fbbf24" />
          <text
            x="64"
            y="69"
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="15"
            fill="#0f172a"
          >
            K
          </text>
        </svg>
      </div>

      {withText && (
        <div className="flex flex-col">
          <span className="text-xl font-extrabold tracking-tight text-[#0f172a] flex items-center gap-1.5">
            Kwanza<span className="text-[#10b981]">Flow</span>
            <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider bg-emerald-50 text-[#059669] px-1.5 py-0.5 rounded border border-emerald-200">
              AO
            </span>
          </span>
          {subtitle && (
            <span className="text-[10px] sm:text-[11px] text-[#64748b] font-medium -mt-0.5 truncate max-w-[220px]">
              Finanças Pessoais e Orçamento Familiar
            </span>
          )}
        </div>
      )}
    </div>
  );
}
