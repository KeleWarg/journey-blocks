import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { cn } from '@/lib/utils'
import { formatCurrency } from '@/lib/utils'

export interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  label?: string
  showValue?: boolean
  formatValue?: (value: number) => string
  markers?: { value: number; label: string }[]
}

/**
 * Slider Component
 * 
 * Range slider for debt amount and income selection
 * Uses LLM theme primary-700 (#007AC8) for track fill and thumb
 * 
 * @example
 * <Slider
 *   label="Your credit card debt"
 *   min={10000}
 *   max={60000}
 *   step={1000}
 *   value={[debtAmount]}
 *   onValueChange={([value]) => setDebtAmount(value)}
 *   formatValue={formatCurrency}
 *   markers={[
 *     { value: 10000, label: '10K' },
 *     { value: 30000, label: '30K' },
 *     { value: 50000, label: '50K' },
 *     { value: 60000, label: '60K+' },
 *   ]}
 * />
 */
const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ 
  className, 
  label, 
  showValue = true, 
  formatValue = formatCurrency,
  markers,
  value,
  ...props 
}, ref) => {
  const currentValue = value?.[0] ?? props.defaultValue?.[0] ?? props.min ?? 0
  
  return (
    <div className="w-full">
      {/* Label and Value Display */}
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-4">
          {label && (
            <span className="text-body text-neutral-800">{label}</span>
          )}
          {showValue && (
            <span className="text-headline-md text-primary-700 font-bold">
              {formatValue(currentValue)}
            </span>
          )}
        </div>
      )}
      
      {/* Slider */}
      <SliderPrimitive.Root
        ref={ref}
        value={value}
        className={cn(
          'relative flex w-full touch-none select-none items-center',
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-neutral-200">
          <SliderPrimitive.Range className="absolute h-full bg-primary-700" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className={cn(
            'block h-6 w-6 rounded-full bg-primary-700',
            'border-[3px] border-white shadow-button',
            'cursor-pointer transition-transform',
            'hover:scale-110',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2',
            'disabled:pointer-events-none disabled:opacity-50'
          )}
        />
      </SliderPrimitive.Root>
      
      {/* Markers */}
      {markers && markers.length > 0 && (
        <div className="relative flex justify-between mt-2">
          {markers.map((marker) => (
            <span
              key={marker.value}
              className="text-body-sm text-neutral-500"
            >
              {marker.label}
            </span>
          ))}
        </div>
      )}
    </div>
  )
})

Slider.displayName = 'Slider'

export { Slider }
