import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: React.ReactNode
}

/**
 * Checkbox Component
 * 
 * Used for consent checkboxes and legal agreements
 * Uses LLM theme primary-700 (#007AC8) for checked state
 * 
 * @example
 * <Checkbox
 *   checked={agreed}
 *   onCheckedChange={setAgreed}
 *   label={
 *     <>
 *       I agree to the <a href="#">Terms and Conditions</a>
 *     </>
 *   }
 * />
 */
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, label, id, ...props }, ref) => {
  const checkboxId = id || `checkbox-${React.useId()}`
  
  return (
    <div className="flex items-start gap-3">
      <CheckboxPrimitive.Root
        ref={ref}
        id={checkboxId}
        className={cn(
          'peer flex h-5 w-5 shrink-0 items-center justify-center',
          'rounded-[4px] border border-neutral-200 bg-white',
          'transition-colors duration-200',
          'hover:border-primary-700',
          'data-[state=checked]:bg-primary-700 data-[state=checked]:border-primary-700',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center text-white">
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      
      {label && (
        <label
          htmlFor={checkboxId}
          className="text-body-sm text-neutral-800 cursor-pointer leading-tight [&_a]:text-primary-700 [&_a]:underline"
        >
          {label}
        </label>
      )}
    </div>
  )
})

Checkbox.displayName = 'Checkbox'

export { Checkbox }
