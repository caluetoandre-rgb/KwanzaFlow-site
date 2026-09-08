export function KwanzaLogo({
  className = "w-9 h-9",
  withText = true,
  subtitle = true,
  variant = 'light'
}: {
  className?: string;
  withText?: boolean;
  subtitle?: boolean;
  variant?: 'light' | 'dark';
}) {
  return (
    <div className="flex items-center gap-2.5">
      {/* Official KwanzaFlow 100% Authentic Vector Logo */}
      <div className={`relative flex-shrink-0 ${className} rounded-[22%] shadow-md overflow-hidden flex items-center justify-center`}>
        <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            {/* Background Dark Forest Green Gradient */}
            <linearGradient id="klBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#0e4938" />
              <stop offset="45%" stop-color="#0b3d2e" />
              <stop offset="100%" stop-color="#05241b" />
            </linearGradient>

            {/* Golden Yellow Gradient for Ring, Line and Badge */}
            <linearGradient id="klGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#ffd54f" />
              <stop offset="35%" stop-color="#f7b900" />
              <stop offset="100%" stop-color="#e6a400" />
            </linearGradient>

            {/* Bar 1 Gradient (Bright Light Green) */}
            <linearGradient id="klBar1Grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#4ade80" />
              <stop offset="100%" stop-color="#22c55e" />
            </linearGradient>

            {/* Bar 2 Gradient (Mid Green) */}
            <linearGradient id="klBar2Grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#22c55e" />
              <stop offset="100%" stop-color="#16a34a" />
            </linearGradient>

            {/* Bar 3 Gradient (Deep Green) */}
            <linearGradient id="klBar3Grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#16a34a" />
              <stop offset="100%" stop-color="#15803d" />
            </linearGradient>

            {/* Drop Shadow for Golden Ring & Bars */}
            <filter id="klShadow" x="-15%" y="-15%" width="130%" height="130%">
              <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#02140e" flood-opacity="0.6" />
            </filter>

            {/* Badge Shadow */}
            <filter id="klBadgeShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="5" stdDeviation="6" flood-color="#02140e" flood-opacity="0.75" />
            </filter>
          </defs>

          {/* Squircle Base (App Icon Frame) */}
          <rect width="512" height="512" rx="114" fill="url(#klBgGrad)" />
          <rect width="510" height="510" x="1" y="1" rx="113" fill="none" stroke="#1c6a53" stroke-width="2" opacity="0.4" />

          {/* Central Ring and Visual Chart */}
          <g filter="url(#klShadow)">
            {/* Golden Circular Ring */}
            <circle
              cx="256"
              cy="256"
              r="164"
              fill="none"
              stroke="url(#klGoldGrad)"
              stroke-width="26"
            />

            {/* Three Vertical Bar Chart Columns */}
            {/* Column 1 (Left: shortest, light green) */}
            <rect
              x="186"
              y="272"
              width="34"
              height="62"
              rx="6"
              fill="url(#klBar1Grad)"
            />

            {/* Column 2 (Middle: medium, emerald green) */}
            <rect
              x="236"
              y="228"
              width="34"
              height="106"
              rx="6"
              fill="url(#klBar2Grad)"
            />

            {/* Column 3 (Right: tallest, deep green) */}
            <rect
              x="286"
              y="192"
              width="34"
              height="142"
              rx="6"
              fill="url(#klBar3Grad)"
            />

            {/* Golden Upward Zigzag Trend Line */}
            <path
              d="M 166 288 L 224 218 L 264 256 L 314 196"
              fill="none"
              stroke="url(#klGoldGrad)"
              stroke-width="22"
              stroke-linecap="round"
              stroke-linejoin="round"
            />

            {/* Golden Arrow Head */}
            <path
              d="M 292 188 L 334 168 L 332 216 Z"
              fill="url(#klGoldGrad)"
              stroke="url(#klGoldGrad)"
              stroke-width="6"
              stroke-linejoin="round"
            />
          </g>

          {/* Golden Circular "K" Coin / Badge in Lower Right */}
          <g filter="url(#klBadgeShadow)">
            <circle
              cx="326"
              cy="318"
              r="54"
              fill="url(#klGoldGrad)"
            />
            {/* The bold 'K' letter inside the coin badge */}
            <text
              x="326"
              y="323"
              text-anchor="middle"
              dominant-baseline="central"
              font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
              font-weight="900"
              font-size="64"
              fill="#0b1712"
              letter-spacing="-1"
            >K</text>
          </g>
        </svg>
      </div>

      {withText && (
        <div className="flex flex-col">
          <span className={`text-xl font-extrabold tracking-tight flex items-center gap-1.5 ${variant === 'dark' ? 'text-white' : 'text-[#0f172a]'}`}>
            Kwanza<span className="text-[#10b981]">Flow</span>
            <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider bg-emerald-50 text-[#059669] px-1.5 py-0.5 rounded border border-emerald-200">
              AO
            </span>
          </span>
          {subtitle && (
            <span className={`text-[10px] sm:text-[11px] font-medium -mt-0.5 truncate max-w-[220px] ${variant === 'dark' ? 'text-slate-400' : 'text-[#64748b]'}`}>
              Finanças Pessoais e Orçamento Familiar
            </span>
          )}
        </div>
      )}
    </div>
  );
}
