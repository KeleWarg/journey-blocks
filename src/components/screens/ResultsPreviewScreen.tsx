'use client'

import * as React from 'react'
import { CheckCircle2 } from 'lucide-react'
import { FormLayout } from '@/components/layout/FormLayout'
import { Button, StickyButtonContainer } from '@/components/ui'
import { LottieIcon } from '@/components/ui/LottieIcon'
import { formatCurrency } from '@/lib/utils'
import type { DebtTypeOption } from '@/types/funnel'

// Import Lottie animation data
import interstitialAnimation from '../../../public/lottie/interstitial-1.json'

interface ResultsPreviewScreenProps {
  debtAmount: number
  debtType: DebtTypeOption
  income: number
  onBack?: () => void
  onNext?: () => void
}

/**
 * Format debt type to readable string
 */
function formatDebtType(debtType: DebtTypeOption): string {
  switch (debtType) {
    case 'credit-card':
      return 'credit card'
    case 'personal-loan':
      return 'personal loan'
    case 'both':
      return 'credit card and personal loan'
    default:
      return 'debt'
  }
}

/**
 * Get status message based on DTI
 */
function getStatusMessage(dtiPercent: number): string {
  if (dtiPercent < 50) {
    return 'Matches program requirements'
  }
  if (dtiPercent <= 100) {
    return 'Strong fit for relief programs'
  }
  return 'Programs available for your situation'
}

/**
 * Get contextual DTI explanation based on ratio
 */
function getDTIExplanation(dtiPercent: number): string {
  if (dtiPercent < 40) {
    return `Your debt-to-income ratio of ${dtiPercent}% is manageable, but relief programs can still help you pay down debt faster.`
  }
  if (dtiPercent <= 100) {
    return `Your debt-to-income ratio of ${dtiPercent}% shows you're carrying significant debt relative to income, which is exactly what debt relief programs are designed to help with.`
  }
  return `Your debt-to-income ratio of ${dtiPercent}% shows significant debt relative to income. Relief programs are specifically designed for situations like yours.`
}

/**
 * ResultsPreviewScreen
 * 
 * Interstitial "value moment" screen that shows personalized profile summary
 * based on what the user has shared. Builds trust and momentum
 * before asking for contact information.
 */
export function ResultsPreviewScreen({
  debtAmount,
  debtType,
  income,
  onBack,
  onNext,
}: ResultsPreviewScreenProps) {
  // Calculate DTI
  const dtiPercent = income > 0 ? Math.round((debtAmount / income) * 100) : 0
  const statusMessage = getStatusMessage(dtiPercent)
  const dtiExplanation = getDTIExplanation(dtiPercent)

  return (
    <FormLayout currentStep={5} onBack={onBack}>
      <div className="flex flex-col items-center text-center has-sticky-button">
        {/* Lottie Animation - plays immediately, no fade-in */}
        <div className="w-20 h-20 mb-4">
          <LottieIcon 
            animationData={interstitialAnimation} 
            className="w-full h-full"
          />
        </div>

        {/* Headline - 0.2s delay */}
        <h1 
          className="font-display text-display sm:text-display-md lg:text-display-lg text-neutral-900 animate-fade-in-up"
          style={{ animationDelay: '200ms' }}
        >
          Good news! You may be a fit.
        </h1>

        {/* Personalized Intro - 0.4s delay */}
        <p 
          className="text-body text-neutral-500 mt-4 max-w-md mx-auto animate-fade-in-up"
          style={{ animationDelay: '400ms' }}
        >
          Based on your {formatCurrency(debtAmount)} in {formatDebtType(debtType)} debt 
          and {formatCurrency(income)} income, you could be a strong candidate for debt relief.
        </p>

        {/* Profile Summary Card - 0.6s delay */}
        <div 
          className="w-full bg-primary-300 rounded-xl p-6 mt-8 animate-fade-in-up"
          style={{ animationDelay: '600ms' }}
        >
          {/* Card Title */}
          <h2 className="font-body text-sm font-semibold text-neutral-900 mb-4 text-left">
            Your profile summary
          </h2>

          {/* Debt row */}
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-neutral-600">Debt</span>
            <span className="text-sm text-neutral-800">
              {formatCurrency(debtAmount)}
            </span>
          </div>

          <div className="h-px bg-neutral-300/50" />

          {/* Income row */}
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-neutral-600">Income</span>
            <span className="text-sm text-neutral-800">
              {formatCurrency(income)}/year
            </span>
          </div>

          <div className="h-px bg-neutral-300/50" />

          {/* DTI row */}
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-neutral-600">DTI</span>
            <span className="text-sm font-medium text-neutral-900">
              {dtiPercent}%
            </span>
          </div>

          <div className="h-px bg-neutral-300/50" />

          {/* Status row */}
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-neutral-600">Status</span>
            <span className="text-sm font-medium text-feedback-success flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              {statusMessage}
            </span>
          </div>

          {/* Divider before explanation */}
          <div className="h-px bg-neutral-300/50 my-3" />

          {/* DTI Explanation */}
          <p className="text-body-sm text-neutral-600 text-left">
            {dtiExplanation}
          </p>
        </div>

        {/* CTA Button - Sticky on mobile */}
        <div className="w-full mt-8">
          <StickyButtonContainer>
            <Button 
              type="button" 
              fullWidth 
              showTrailingIcon
              onClick={onNext}
            >
              See my debt profile
            </Button>
          </StickyButtonContainer>
        </div>
      </div>
    </FormLayout>
  )
}

export default ResultsPreviewScreen
