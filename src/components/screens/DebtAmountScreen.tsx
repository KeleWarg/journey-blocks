'use client'

import * as React from 'react'
import { CheckCircle2, Lightbulb } from 'lucide-react'
import { FormLayout } from '@/components/layout/FormLayout'
import { Button, StickyButtonContainer } from '@/components/ui'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { creditCardDebtByState, personalLoanDebtByState } from '@/data/stateDebtData'
import { US_STATES, type DebtTypeOption } from '@/types/funnel'

interface DebtAmountScreenProps {
  initialValue?: number
  userState?: string
  debtType?: DebtTypeOption
  onBack?: () => void
  onSubmit?: (value: number) => void
}

// Helper to get state name from state code
function getStateName(stateCode: string): string {
  const state = US_STATES.find(s => s.value === stateCode)
  return state?.label || stateCode
}

// Helper to format currency
function formatCurrency(amount: number): string {
  return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

// Get "Did you know" content based on debt type and state
function getDidYouKnowContent(
  debtAmount: number,
  userState: string,
  debtType: DebtTypeOption
): { message: string; source: string } | null {
  const stateName = getStateName(userState)
  const ccAvg = creditCardDebtByState[userState]
  const plAvg = personalLoanDebtByState[userState]
  
  if (!ccAvg && !plAvg) return null
  
  if (debtType === 'credit-card' && ccAvg) {
    const isBelowAvg = debtAmount <= ccAvg
    return {
      message: isBelowAvg
        ? `In ${stateName}, the average credit card debt is ${formatCurrency(ccAvg)}. You're below that — and well within the range most relief programs work with.`
        : `In ${stateName}, the average credit card debt is ${formatCurrency(ccAvg)}. You're not alone — and relief programs regularly work with balances like yours.`,
      source: 'Source: NY Fed, Q4 2024'
    }
  }
  
  if (debtType === 'personal-loan' && plAvg) {
    const isBelowAvg = debtAmount <= plAvg
    return {
      message: isBelowAvg
        ? `In ${stateName}, the average personal loan debt is ${formatCurrency(plAvg)}. You're below that — and well within the range most relief programs work with.`
        : `In ${stateName}, the average personal loan debt is ${formatCurrency(plAvg)}. You're not alone — and relief programs regularly work with balances like yours.`,
      source: 'Source: TransUnion'
    }
  }
  
  if (debtType === 'both' && ccAvg && plAvg) {
    return {
      message: `In ${stateName}, average credit card debt is ${formatCurrency(ccAvg)} and personal loan debt is ${formatCurrency(plAvg)}. Relief programs are built for exactly this.`,
      source: 'Source: NY Fed, TransUnion'
    }
  }
  
  return null
}

const MIN_DEBT = 5000
const MAX_DEBT = 200000
const STEP = 1000
const QUALIFICATION_THRESHOLD = 7500

const TICK_MARKS = [5000, 50000, 100000, 150000, 200000]

/**
 * DebtAmountScreen
 * 
 * Step 3 of the funnel - "How much debt do you have?"
 * Shows a slider with animated counter and qualification messaging
 * 
 * @example
 * <DebtAmountScreen 
 *   initialValue={15000}
 *   onBack={handleBack}
 *   onSubmit={(value) => router.push('/income')}
 * />
 */
export function DebtAmountScreen({ 
  initialValue = 25000,
  userState,
  debtType,
  onBack, 
  onSubmit 
}: DebtAmountScreenProps) {
  const [debtAmount, setDebtAmount] = React.useState(initialValue)
  const [hasInteracted, setHasInteracted] = React.useState(false)
  const sliderRef = React.useRef<HTMLInputElement>(null)
  
  // Check if amount qualifies for most programs
  const qualifiesForMostPrograms = debtAmount >= QUALIFICATION_THRESHOLD
  
  // Get "Did you know" content
  const didYouKnowContent = userState && debtType 
    ? getDidYouKnowContent(debtAmount, userState, debtType)
    : null
  
  // Update CSS variable for track fill
  React.useEffect(() => {
    if (sliderRef.current) {
      const progress = ((debtAmount - MIN_DEBT) / (MAX_DEBT - MIN_DEBT)) * 100
      sliderRef.current.style.setProperty('--progress', `${progress}%`)
    }
  }, [debtAmount])
  
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!hasInteracted) {
      setHasInteracted(true)
    }
    setDebtAmount(Number(e.target.value))
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(debtAmount)
  }
  
  return (
    <FormLayout 
      currentStep={3} 
      onBack={onBack}
    >
      <form onSubmit={handleSubmit} className="animate-slide-up has-sticky-button">
        <div className="space-y-8 text-center">
          {/* Headline */}
          <div>
            <h1 className="font-display text-display md:text-display-md lg:text-display-lg text-neutral-900">
              How much debt do you have?
            </h1>
            <p className="text-body text-neutral-500 mt-2">
              Drag to estimate your total debt
            </p>
          </div>

          {/* Big animated number - hero element */}
          <div className="py-6">
            <AnimatedCounter 
              value={debtAmount} 
              prefix="$" 
              className="font-display text-5xl md:text-6xl font-bold text-neutral-900"
              duration={300}
            />
            {/* Qualification messaging */}
            <div className="mt-3">
              {qualifiesForMostPrograms ? (
                <p className="text-feedback-success font-medium text-center flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  This amount qualifies for most relief programs
                </p>
              ) : (
                <p className="text-neutral-500 font-medium text-center">
                  Some programs may be available — let&apos;s check your options.
                </p>
              )}
              <p className="text-sm text-neutral-500 text-center mt-1">
                Based on quoted partner outcomes of up to 50% reduction in total debt
              </p>
            </div>
          </div>

          {/* Slider with tick marks */}
          <div className="space-y-3 px-2">
            {/* Tick marks */}
            <div className="relative h-2 mb-4">
              {TICK_MARKS.map((tick) => {
                const position = ((tick - MIN_DEBT) / (MAX_DEBT - MIN_DEBT)) * 100
                return (
                  <div 
                    key={tick}
                    className="absolute top-0 w-0.5 h-2 bg-neutral-300 -translate-x-1/2"
                    style={{ left: `${position}%` }}
                  />
                )
              })}
            </div>
            
            {/* Range slider */}
            <input
              ref={sliderRef}
              type="range"
              min={MIN_DEBT}
              max={MAX_DEBT}
              step={STEP}
              value={debtAmount}
              onChange={handleSliderChange}
              className="debt-slider w-full"
              aria-label="Debt amount"
            />
            
            {/* Scale labels */}
            <div className="flex justify-between text-body-sm text-neutral-500 pt-1">
              <span>$5K</span>
              <span>$50K</span>
              <span>$100K</span>
              <span>$150K</span>
              <span>$200K+</span>
            </div>
          </div>

          {/* Submit Button - Sticky on mobile */}
          <StickyButtonContainer>
            <Button type="submit" fullWidth showTrailingIcon>
              Continue
            </Button>
          </StickyButtonContainer>
          
          {/* Did You Know Card - appears after slider interaction */}
          {hasInteracted && didYouKnowContent && (
            <div 
              className="bg-secondary-300 border-l-4 border-secondary-500 rounded-lg p-4 mt-6 text-left animate-fade-in"
              style={{ animationDelay: '150ms' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-secondary-500" />
                <p className="font-semibold text-neutral-800">
                  Did you know?
                </p>
              </div>
              <p className="text-body-sm text-neutral-800">
                {didYouKnowContent.message}
              </p>
              <p className="text-caption text-neutral-500 mt-2">
                {didYouKnowContent.source}
              </p>
            </div>
          )}
        </div>
      </form>
    </FormLayout>
  )
}

export default DebtAmountScreen
