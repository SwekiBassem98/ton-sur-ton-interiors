type Variant = "light" | "dark";

type LogoProps = {
  /** "light" = warm cream wordmark for dark backgrounds; "dark" = charcoal wordmark for light backgrounds. */
  variant?: Variant;
  className?: string;
  /** Hide the "MEUBLES CONTEMPORAINS" subtitle (useful for very compact placements). */
  withSubtitle?: boolean;
};

/**
 * Pure typography logo for "Ton sur Ton — Meubles Contemporains".
 * - Wide-spaced serif TON (twice), italic script "Sur" between, with a metallic sheen.
 * - Subtitle in thin tracked-out sans.
 */
export function Logo({ variant = "light", className, withSubtitle = true }: LogoProps) {
  const isLight = variant === "light";
  const sheenId = `tst-sheen-${variant}`;
  const scriptSheenId = `tst-sheen-script-${variant}`;
  const ruleColor = isLight ? "#cfc3ad" : "#7a6a5d";
  const subtitleColor = isLight ? "#e9dfcc" : "#3a2f25";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 260"
      role="img"
      aria-label="Ton sur Ton — Meubles Contemporains"
      className={className}
    >
      <title>Ton sur Ton — Meubles Contemporains</title>
      <defs>
        {isLight ? (
          <>
            <linearGradient id={sheenId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e9dfcc" />
              <stop offset="35%" stopColor="#fbf6ec" />
              <stop offset="55%" stopColor="#ffffff" />
              <stop offset="75%" stopColor="#f1e7d4" />
              <stop offset="100%" stopColor="#cfc3ad" />
            </linearGradient>
            <linearGradient id={scriptSheenId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f5ead6" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#d8c9ad" />
            </linearGradient>
          </>
        ) : (
          <>
            <linearGradient id={sheenId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3a2f25" />
              <stop offset="35%" stopColor="#5b4a3a" />
              <stop offset="55%" stopColor="#2b2218" />
              <stop offset="75%" stopColor="#4a3c2d" />
              <stop offset="100%" stopColor="#2b2218" />
            </linearGradient>
            <linearGradient id={scriptSheenId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7a5a3e" />
              <stop offset="50%" stopColor="#c0623e" />
              <stop offset="100%" stopColor="#7a5a3e" />
            </linearGradient>
          </>
        )}
      </defs>

      <g textAnchor="middle">
        {/* Left TON */}
        <text
          x="180"
          y="155"
          fontFamily="'Cormorant Garamond', 'Playfair Display', 'Times New Roman', serif"
          fontSize="120"
          fontWeight="600"
          letterSpacing="14"
          fill={`url(#${sheenId})`}
        >
          TON
        </text>

        {/* Cursive "Sur" */}
        <text
          x="400"
          y="160"
          fontFamily="'Cormorant Garamond', 'Playfair Display', 'Times New Roman', serif"
          fontSize="78"
          fontStyle="italic"
          fontWeight="400"
          fill={`url(#${scriptSheenId})`}
        >
          Sur
        </text>

        {/* Right TON */}
        <text
          x="620"
          y="155"
          fontFamily="'Cormorant Garamond', 'Playfair Display', 'Times New Roman', serif"
          fontSize="120"
          fontWeight="600"
          letterSpacing="14"
          fill={`url(#${sheenId})`}
        >
          TON
        </text>

        {/* Hairline rule */}
        <line x1="220" y1="195" x2="580" y2="195" stroke={ruleColor} strokeWidth="0.75" opacity="0.55" />

        {withSubtitle && (
          <text
            x="400"
            y="225"
            fontFamily="'Inter', 'Helvetica Neue', system-ui, sans-serif"
            fontSize="16"
            fontWeight="300"
            letterSpacing="9"
            fill={subtitleColor}
          >
            MEUBLES CONTEMPORAINS
          </text>
        )}
      </g>
    </svg>
  );
}
