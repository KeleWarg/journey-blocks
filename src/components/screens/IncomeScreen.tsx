'use client'

import * as React from 'react'
import { ChevronDown, ChevronUp, Info, CheckCircle2 } from 'lucide-react'
import { FormLayout } from '@/components/layout/FormLayout'
import { Button, StickyButtonContainer } from '@/components/ui'
import { Slider } from '@/components/ui/Slider'
import { Tooltip } from '@/components/ui/Tooltip'
import { formatCurrency } from '@/lib/utils'

/**
 * MoneyPyramid Component
 * Displays a pyramid of money icons that grows based on income tier
 */
interface MoneyPyramidProps {
  income: number
}

function MoneyPyramid({ income }: MoneyPyramidProps) {
  const getTier = (income: number): number => {
    if (income < 40000) return 1
    if (income < 80000) return 2
    if (income < 140000) return 3
    return 4
  }

  const tier = getTier(income)
  
  // Build rows: row 1 has 1 icon, row 2 has 2, etc.
  const rows = Array.from({ length: tier }, (_, i) => i + 1)

  return (
    <div className="flex flex-col items-center -space-y-2">
      {rows.map((count, rowIndex) => (
        <div
          key={`row-${rowIndex}-${tier}`}
          className={`flex -space-x-2 animate-money-fade-in pyramid-row-${rowIndex + 1}`}
        >
          {Array.from({ length: count }).map((_, iconIndex) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={`icon-${rowIndex}-${iconIndex}`}
              src="/Money.svg"
              alt=""
              width={52}
              height={40}
              className={`w-[52px] h-[40px] animate-money-fade-in pyramid-icon-${iconIndex}`}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

interface IncomeScreenProps {
  initialValue?: number
  debtAmount?: number
  onBack?: () => void
  onSubmit?: (income: number) => void
}

/**
 * Get DTI-based encouragement message
 */
function getDtiMessage(dtiPercent: number): string {
  if (dtiPercent <= 60) {
    return 'Your profile matches most relief program requirements'
  }
  if (dtiPercent <= 100) {
    return 'This puts you in a range many debt relief programs look for.'
  }
  return 'Programs exist specifically for high debt-to-income situations'
}

/**
 * IncomeScreen
 * 
 * Step 4 of the funnel - "What is your annual income?"
 * Shows a slider for income with debt-to-income ratio calculation
 */
export function IncomeScreen({ 
  initialValue = 50000,
  debtAmount = 20000,
  onBack, 
  onSubmit 
}: IncomeScreenProps) {
  const [income, setIncome] = React.useState(initialValue)
  const [showWhyWeAsk, setShowWhyWeAsk] = React.useState(false)
  
  // Calculate debt-to-income ratio
  const dtiPercent = income > 0 ? Math.round((debtAmount / income) * 100) : 0
  const dtiMessage = getDtiMessage(dtiPercent)
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(income)
  }
  
  const markers = [
    { value: 20000, label: '20K' },
    { value: 60000, label: '60K' },
    { value: 100000, label: '100K' },
    { value: 200000, label: '200K+' },
  ]
  
  // Format income display with K notation for large values
  const formatIncomeDisplay = (value: number) => {
    if (value >= 200000) return { amount: '$200K+', suffix: '' }
    if (value >= 1000) {
      return { 
        amount: formatCurrency(value), 
        suffix: '/year' 
      }
    }
    return { amount: formatCurrency(value), suffix: '/year' }
  }
  
  const incomeDisplay = formatIncomeDisplay(income)
  
  return (
    <FormLayout 
      currentStep={4} 
      onBack={onBack}
    >
      <form onSubmit={handleSubmit} className="animate-slide-up space-y-6 flex flex-col items-center has-sticky-button">
        {/* Headline */}
        <div className="w-full space-y-2 text-center">
          <h1 className="font-display text-display sm:text-display-md lg:text-display-lg text-neutral-900 text-center">
            What is your annual income?
          </h1>
          <p className="text-body text-neutral-500 text-center">
            Your individual income before taxes
          </p>
          
          {/* Why we ask accordion */}
          <button
            type="button"
            onClick={() => setShowWhyWeAsk(!showWhyWeAsk)}
            className="inline-flex items-center justify-center gap-2 text-primary-700 text-body-sm font-medium hover:underline"
          >
            Why we ask for this information?
            {showWhyWeAsk ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          
          {showWhyWeAsk && (
            <div className="w-full bg-neutral-100 rounded-lg p-4 animate-slide-up text-left">
              <p className="text-body-sm text-neutral-800">
                Your income helps us determine the best debt relief options for your situation. 
                Debt-to-income ratio is an important factor that debt relief providers use to 
                create a personalized plan that fits your budget.
              </p>
              <p className="text-body-sm text-neutral-500 mt-2">
                This information is kept confidential and only shared with potential debt relief partners.
              </p>
            </div>
          )}
        </div>
        
        {/* Income Card - Matching Figma Design */}
        <div className="w-full bg-white rounded-lg px-8 py-6 flex flex-col items-center gap-4">
          {/* Money Pyramid - responds to income slider */}
          <MoneyPyramid income={income} />
          
          {/* Income Display */}
          <div className="flex flex-col items-center gap-1">
            <div className="pb-2 border-b border-neutral-200">
              <span className="text-3xl font-bold font-display text-neutral-900">
                {incomeDisplay.amount}
              </span>
              {incomeDisplay.suffix && (
                <span className="text-3xl font-bold font-display text-neutral-500">
                  {incomeDisplay.suffix}
                </span>
              )}
            </div>
            <span className="text-caption text-neutral-800">
              Your income before taxes
            </span>
          </div>
          
          {/* Slider Section */}
          <div className="w-full max-w-xs">
            <Slider
              min={10000}
              max={200000}
              step={5000}
              value={[income]}
              onValueChange={([value]) => setIncome(value)}
              markers={markers}
              showValue={false}
            />
          </div>
          
          {/* Debt-to-Income Ratio Card */}
          <div className="w-full bg-primary-300 rounded-lg p-4 border border-neutral-200">
            {/* Card Title with Tooltip */}
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-sm font-semibold text-neutral-900">Your debt-to-income ratio</span>
              <Tooltip content="Debt-to-income ratio (DTI) compares what you owe to what you earn. Relief programs use this to understand your financial situation — it's not a credit score and doesn't affect your credit.">
                <Info className="w-4 h-4 text-neutral-400 cursor-help" />
              </Tooltip>
            </div>
            
            {/* Debt row */}
            <div className="flex justify-between items-center py-1.5">
              <span className="text-sm text-neutral-600">Debt</span>
              <span className="text-sm text-neutral-800">
                {formatCurrency(debtAmount)}
              </span>
            </div>
            
            {/* Income row */}
            <div className="flex justify-between items-center py-1.5">
              <span className="text-sm text-neutral-600">Income</span>
              <span className="text-sm text-neutral-800">
                {formatCurrency(income)}/year
              </span>
            </div>
            
            {/* DTI row - emphasized */}
            <div className="flex justify-between items-center py-1.5">
              <span className="text-sm text-neutral-600">DTI</span>
              <span className="text-sm font-medium text-neutral-900">
                {dtiPercent}%
              </span>
            </div>
            
            {/* Divider */}
            <div className="h-px bg-neutral-300 my-3" />
            
            {/* Qualification message */}
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-feedback-success flex-shrink-0 mt-0.5" />
              <span className="text-sm font-medium text-feedback-success">
                {dtiMessage}
              </span>
            </div>
          </div>
        </div>
        
        {/* Submit Button - Sticky on mobile */}
        <StickyButtonContainer className="w-full">
          <Button type="submit" fullWidth showTrailingIcon>
            Continue
          </Button>
        </StickyButtonContainer>
      </form>
    </FormLayout>
  )
}

export default IncomeScreen
