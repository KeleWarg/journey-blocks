'use client'

interface StarburstProps {
  active: boolean
}

/**
 * Starburst Component
 * Displays a gold starburst animation effect on button click
 */
export function Starburst({ active }: StarburstProps) {
  return (
    <svg 
      className={`starburst ${active ? 'active' : ''}`}
      width="120" 
      height="120" 
      viewBox="0 0 120 120"
      aria-hidden="true"
    >
      {/* Radial lines */}
      {[...Array(8)].map((_, i) => {
        const angle = (i * 45) * (Math.PI / 180)
        const x1 = 60 + Math.cos(angle) * 20
        const y1 = 60 + Math.sin(angle) * 20
        const x2 = 60 + Math.cos(angle) * 45
        const y2 = 60 + Math.sin(angle) * 45
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#FFD700"
            strokeWidth="3"
            strokeLinecap="round"
          />
        )
      })}
      {/* Small stars/dots */}
      {[...Array(6)].map((_, i) => {
        const angle = (i * 60 + 30) * (Math.PI / 180)
        const cx = 60 + Math.cos(angle) * 35
        const cy = 60 + Math.sin(angle) * 35
        return (
          <circle
            key={`dot-${i}`}
            cx={cx}
            cy={cy}
            r="3"
            fill="#FFD700"
          />
        )
      })}
    </svg>
  )
}

export default Starburst
