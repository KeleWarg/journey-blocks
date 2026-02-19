import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  /** Content rendered inside the input on the right side (e.g. validation badge) */
  suffix?: React.ReactNode
}

/**
 * Input Component
 * 
 * Text input with label, error, and hint support
 * Uses LLM theme tokens for styling
 * 
 * @example
 * <Input 
 *   label="Email" 
 *   placeholder="you@example.com"
 *   error="Please enter a valid email"
 * />
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, suffix, type = 'text', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
    
    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={inputId}
            className="block text-body-sm font-medium text-neutral-800 mb-2"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type={type}
            className={cn(
              'w-full bg-white border border-neutral-200 rounded-[8px] px-4 py-3',
              'min-h-[48px] text-body text-neutral-800',
              'placeholder:text-neutral-500',
              'focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-focus/50',
              'disabled:bg-neutral-50 disabled:cursor-not-allowed',
              'transition-colors duration-200',
              error && 'border-feedback-error focus:border-feedback-error focus:ring-feedback-error/20',
              suffix && 'pr-28',
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...props}
          />
          {suffix && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none flex items-center">
              {suffix}
            </div>
          )}
        </div>
        {error && (
          <p 
            id={`${inputId}-error`}
            className="mt-2 text-body-sm text-feedback-error"
            role="alert"
          >
            {error}
          </p>
        )}
        {hint && !error && (
          <p 
            id={`${inputId}-hint`}
            className="mt-2 text-body-sm text-neutral-500"
          >
            {hint}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
