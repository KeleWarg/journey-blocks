'use client'

import * as React from 'react'

interface AnimatedCounterProps {
  /** The target value to animate to (changes on click/selection) */
  value: number
  /** Optional instant display value (for hover preview, no animation) */
  displayValue?: number
  /** Animation duration in milliseconds */
  duration?: number
  /** Prefix to display before the number (e.g., "$") */
  prefix?: string
  /** Suffix to display after the number */
  suffix?: string
  /** Additional CSS classes */
  className?: string
}

/**
 * AnimatedCounter Component
 * 
 * Displays a number that animates (counts up/down) when `value` changes,
 * with a shake effect when it reaches the final value.
 * 
 * If `displayValue` is provided, it shows that instantly (for hover previews).
 * Animation only triggers when `value` changes (on click/selection).
 */
export function AnimatedCounter({ 
  value, 
  displayValue,
  duration = 800, 
  prefix = '', 
  suffix = '',
  className = ''
}: AnimatedCounterProps) {
  const [animatedValue, setAnimatedValue] = React.useState(value)
  const [isShaking, setIsShaking] = React.useState(false)
  const prevValue = React.useRef(value)

  // Animate only when `value` changes (click/selection)
  React.useEffect(() => {
    if (prevValue.current === value) return

    const startValue = prevValue.current
    const endValue = value
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function (ease-out cubic)
      const eased = 1 - Math.pow(1 - progress, 3)
      
      const current = Math.round(startValue + (endValue - startValue) * eased)
      setAnimatedValue(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        // Trigger shake when animation completes
        setIsShaking(true)
        setTimeout(() => setIsShaking(false), 400)
      }
    }

    requestAnimationFrame(animate)
    prevValue.current = value
  }, [value, duration])

  // Show displayValue (hover) if provided, otherwise show animated value
  const shownValue = displayValue !== undefined ? displayValue : animatedValue

  return (
    <span className={`${className} ${isShaking ? 'shake' : ''}`}>
      {prefix}{shownValue.toLocaleString()}{suffix}
    </span>
  )
}

export default AnimatedCounter
