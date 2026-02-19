'use client'

import * as React from 'react'
import { Calendar, Lightbulb, Check } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { TrustBadges } from '@/components/layout/TrustBadges'
import { ProgressIndicator } from '@/components/layout/ProgressIndicator'
import { StickyButtonContainer, Button, RadioGroup, RadioListItem, DatePicker } from '@/components/ui'
import { 
  MOVE_DATE_OPTIONS, 
  HOME_SIZE_OPTIONS,
  MOVING_PROGRESS_SUBTITLES,
  MOVING_PROGRESS_TIME_ESTIMATES,
  MOVING_TOTAL_STEPS,
  type MoveDateOption, 
  type HomeSizeOption 
} from '@/types/moving'

interface MoveDateScreenProps {
  initialValue?: MoveDateOption
  initialSpecificDate?: string
  homeSize: HomeSizeOption
  onBack?: () => void
  onSubmit?: (value: MoveDateOption, specificDate?: string) => void
}

/**
 * MoveDateScreen
 * 
 * Step 4 of 5 - "When are you planning to move?"
 * Two-column layout: left = savings info card, right = date selection
 */
export function MoveDateScreen({ 
  initialValue,
  initialSpecificDate,
  homeSize,
  onBack, 
  onSubmit 
}: MoveDateScreenProps) {
  const [selected, setSelected] = React.useState<MoveDateOption | undefined>(initialValue)
  const [specificDate, setSpecificDate] = React.useState<string>(initialSpecificDate || '')
  
  // OR logic: picking a specific date clears the timeframe, and vice versa
  const handleDateChange = (val: string) => {
    setSpecificDate(val)
    if (val) setSelected(undefined)
  }
  
  const handleTimeframeChange = (value: string) => {
    setSelected(value as MoveDateOption)
    setSpecificDate('')
  }
  
  // Get price range for current home size
  const sizeOption = HOME_SIZE_OPTIONS.find(o => o.value === homeSize)
  const sizeLabel = sizeOption?.label ?? 'Home'
  const priceRange = sizeOption?.priceRange ?? { low: 600, high: 1200 }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (specificDate) {
      // User picked a specific date — pass it without a timeframe
      onSubmit?.(undefined as unknown as MoveDateOption, specificDate)
    } else if (selected) {
      onSubmit?.(selected, undefined)
    }
  }
  
  const canSubmit = !!selected || !!specificDate
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <Header />
      
      {/* Progress Indicator */}
      <ProgressIndicator 
        currentStep={4} 
        onBack={onBack}
        subtitles={MOVING_PROGRESS_SUBTITLES}
        timeEstimates={MOVING_PROGRESS_TIME_ESTIMATES}
        totalSteps={MOVING_TOTAL_STEPS}
        unified
      />
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8 pb-24 sm:pb-8 flex-1">
          {/* Page Headline */}
          <h1 className="font-display text-display sm:text-display-md lg:text-display-lg text-neutral-900 text-center mb-4 sm:mb-8">
            When are you planning<br className="hidden sm:block" /> to move?
          </h1>
          
          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 items-center">
            
            {/* Left Column - Savings Info Card */}
            <div className="animate-fade-in-up order-2 lg:order-1">
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-card border border-gray-100">
                {/* Mini Title */}
                <p className="text-xs uppercase tracking-wide text-neutral-500 mb-4">
                  Timing matters
                </p>
                
                {/* Move Summary */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm font-medium text-neutral-800 mb-3">Your move details</p>
                  
                  {/* Row 1 - Home Size */}
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-sm text-neutral-800">Your move</span>
                    <span className="font-semibold text-neutral-900">{sizeLabel}</span>
                  </div>
                  
                  {/* Row 2 - Price Range */}
                  <div className="flex justify-between items-center pt-3">
                    <span className="text-sm text-neutral-800">Est. cost range</span>
                    <span className="font-semibold text-neutral-900">
                      ${priceRange.low.toLocaleString()}–${priceRange.high.toLocaleString()}
                    </span>
                  </div>
                </div>
                
                {/* Pro Tip */}
                <div className="bg-secondary-300 rounded-lg p-4 mt-4 mb-4">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-secondary-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-body-sm font-semibold text-neutral-800">Pro tip:</p>
                      <p className="text-body-sm text-neutral-600">
                        Mid-week moves (Tue–Thu) are typically 15% cheaper than weekends.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Key benefits */}
                <p className="text-sm font-semibold text-neutral-900 mb-3">
                  Why timing helps:
                </p>
                <div className="space-y-2">
                  {[
                    "Off-peak dates = lower mover rates",
                    "More availability for top-rated movers",
                    "Better scheduling flexibility"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-feedback-success flex-shrink-0" />
                      <p className="text-sm text-neutral-800">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Column - Date Selection */}
            <div className="animate-fade-in-up order-1 lg:order-2">
              <form id="date-form" onSubmit={handleSubmit}>
                <p className="text-body text-neutral-500 mb-6">
                  Knowing your timeline helps us match you with available movers.
                </p>
                
                {/* Date Picker */}
                <div className="mb-4">
                  <DatePicker
                    label="Select your move date"
                    value={specificDate}
                    onChange={handleDateChange}
                    placeholder="Pick a date"
                  />
                </div>
                
                {/* OR Divider */}
                <div className="flex items-center gap-4 my-4">
                  <div className="flex-1 h-px bg-neutral-200" />
                  <span className="text-body-sm font-medium text-neutral-500 uppercase tracking-wider">or</span>
                  <div className="flex-1 h-px bg-neutral-200" />
                </div>
                
                {/* Selection List */}
                <RadioGroup 
                  value={selected} 
                  onValueChange={handleTimeframeChange}
                >
                  {MOVE_DATE_OPTIONS.map((option) => (
                    <RadioListItem
                      key={option.value}
                      value={option.value}
                      icon={<Calendar className="w-4 h-4" />}
                      tag={option.tag}
                      tagVariant={option.tag === 'Best value' ? 'success' : 'default'}
                    >
                      {option.label}
                    </RadioListItem>
                  ))}
                </RadioGroup>
                
                {/* CTA - Desktop */}
                <div className="hidden sm:block mt-6">
                  <Button 
                    type="submit" 
                    fullWidth 
                    showTrailingIcon
                    disabled={!canSubmit}
                  >
                    Continue
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        {/* CTA - Sticky on mobile */}
        <StickyButtonContainer className="sm:hidden">
          <Button 
            type="submit" 
            form="date-form"
            fullWidth 
            showTrailingIcon
            disabled={!canSubmit}
          >
            Continue
          </Button>
        </StickyButtonContainer>
      </main>
      
      {/* Trust Badges */}
      <TrustBadges />
      
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default MoveDateScreen
