'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Starburst } from './Starburst'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
  fullWidth?: boolean
  loading?: boolean
  showTrailingIcon?: boolean
  children: React.ReactNode
}

/**
 * Button Component
 * 
 * Primary button: Blue fill (#007AC8), white text
 * Secondary button: White fill, blue border and text
 * Ghost button: Transparent, blue text
 * 
 * Features:
 * - Arrow slides right on hover (primary variant)
 * - Shimmer/sheen effect on hover (primary variant)
 * - Click depression + gold starburst effect (primary variant)
 * 
 * @example
 * <Button variant="primary" onClick={handleClick}>Continue</Button>
 * <Button variant="secondary" fullWidth>See Your Options</Button>
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'default',
    fullWidth = false,
    loading = false,
    showTrailingIcon = false,
    disabled,
    children,
    onClick,
    ...props 
  }, ref) => {
    const [showStarburst, setShowStarburst] = React.useState(false)
    
    const baseStyles = 'flex items-center justify-center gap-2 font-semibold rounded-[8px] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variants = {
      primary: 'btn-continue bg-primary-700 !text-white hover:bg-primary-750 active:bg-primary-800',
      secondary: 'bg-white text-primary-700 border border-primary-700 hover:bg-neutral-100 active:bg-neutral-100',
      ghost: 'bg-transparent text-primary-700 hover:bg-neutral-100 active:bg-neutral-100',
    }
    
    const sizes = {
      sm: 'px-4 py-2 min-h-[36px] text-body-sm',
      default: 'px-6 py-3 min-h-[48px] text-body',
      lg: 'px-8 py-4 min-h-[56px] text-body-lg',
    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (variant === 'primary' && !disabled && !loading) {
        setShowStarburst(true)
        setTimeout(() => setShowStarburst(false), 500)
      }
      onClick?.(e)
    }

    // For primary buttons, wrap in starburst container
    if (variant === 'primary') {
      return (
        <div className={cn('btn-continue-wrapper', fullWidth && 'w-full')}>
          <button
            ref={ref}
            className={cn(
              baseStyles,
              variants[variant],
              sizes[size],
              fullWidth && 'w-full',
              className
            )}
            disabled={disabled || loading}
            onClick={handleClick}
            {...props}
          >
            {loading ? (
              <>
                <svg 
                  className="animate-spin -ml-1 mr-2 h-4 w-4" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                  />
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Loading...
              </>
            ) : (
              <>
                <span>{children}</span>
                {showTrailingIcon && (
                  <svg 
                    className="btn-arrow w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M17 8l4 4m0 0l-4 4m4-4H3" 
                    />
                  </svg>
                )}
              </>
            )}
          </button>
          <Starburst active={showStarburst} />
        </div>
      )
    }
    
    // Non-primary buttons render without starburst wrapper
    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        disabled={disabled || loading}
        onClick={onClick}
        {...props}
      >
        {loading ? (
          <>
            <svg 
              className="animate-spin -ml-1 mr-2 h-4 w-4" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Loading...
          </>
        ) : (
          <>
            {children}
            {showTrailingIcon && (
              <img src="/trailing icon.svg" alt="" className="w-6 h-6" aria-hidden="true" />
            )}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
