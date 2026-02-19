'use client'

import { 
  CreditCard, 
  TrendingUp, 
  FileText,
  CheckCircle2
} from 'lucide-react'
import { FormLayout } from '@/components/layout/FormLayout'
import { Button, StickyButtonContainer } from '@/components/ui'
import { LottieIcon } from '@/components/ui/LottieIcon'
import { type DebtTypeOption } from '@/types/funnel'

// Import Lottie animation data
import interstitialAnimation from '../../../public/lottie/interstitial-1.json'

// Card titles based on debt type
const CARD_TITLES: Record<DebtTypeOption | 'default', string> = {
  'credit-card': 'Why credit card debt gets harder over time',
  'personal-loan': 'Why personal loan debt can keep you stuck',
  'both': 'Why mixed debt is harder to get out of',
  'default': 'Why mixed debt is harder to get out of',
}

interface DidYouKnowScreenProps {
  debtType?: DebtTypeOption
  onBack?: () => void
  onNext?: () => void
}

/**
 * DidYouKnowScreen
 * 
 * Interstitial screen between DebtTypeScreen and IncomeScreen
 * A reassurance/social proof "breather" moment with debt-type specific stats
 */
export function DidYouKnowScreen({ 
  debtType,
  onBack, 
  onNext 
}: DidYouKnowScreenProps) {
  // Get card title based on debt type
  const cardTitle = debtType 
    ? CARD_TITLES[debtType] 
    : CARD_TITLES['default']

  // Build data rows based on debt type (two-column layout)
  const renderDataRows = () => {
    if (debtType === 'credit-card') {
      return (
        <>
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary-700 flex-shrink-0" />
            <span className="text-neutral-800 text-left text-sm">Avg balance: $4,180</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary-700 flex-shrink-0" />
            <span className="text-neutral-800 text-left text-sm">Avg APR: 24.7%</span>
          </div>
        </>
      )
    }
    
    if (debtType === 'personal-loan') {
      return (
        <>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary-700 flex-shrink-0" />
            <span className="text-neutral-800 text-left text-sm">Avg balance: $11,676</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary-700 flex-shrink-0" />
            <span className="text-neutral-800 text-left text-sm">Avg APR: 13%–18%</span>
          </div>
        </>
      )
    }
    
    // Default/both/mixed debt
    return (
      <>
        <div className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-primary-700 flex-shrink-0" />
          <span className="text-neutral-800 text-left text-sm">Avg CC balance: $4,180</span>
        </div>
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary-700 flex-shrink-0" />
          <span className="text-neutral-800 text-left text-sm">Avg loan: $11,676</span>
        </div>
      </>
    )
  }
  
  // Get insight line based on debt type
  const renderInsightLine = () => {
    if (debtType === 'credit-card') {
      return "Interest compounds monthly — balances can grow even if you keep paying"
    }
    if (debtType === 'personal-loan') {
      return "Fixed payments mean you can stay in debt for years if nothing changes"
    }
    return "Juggling multiple debts often means higher total interest and slower progress"
  }

  return (
    <FormLayout currentStep={2} onBack={onBack}>
      <div className="animate-slide-up flex flex-col items-center text-center has-sticky-button py-8 space-y-6">
        {/* Lottie Animation */}
        <div className="w-32 h-32">
          <LottieIcon 
            animationData={interstitialAnimation}
            className="w-full h-full"
          />
        </div>
        
        {/* Headline */}
        <h1 className="font-display text-2xl md:text-3xl text-neutral-900 text-center">
          Over 100 million Americans are working to pay down debt. You&apos;re not alone.
        </h1>
        
        {/* Stats Card */}
        <div className="w-full max-w-md bg-white border border-neutral-200 shadow-sm rounded-xl p-6">
          {/* Card Title */}
          <h2 className="font-semibold text-neutral-900 mb-4 text-left">
            {cardTitle}
          </h2>
          
          {/* Data Rows */}
          <div className="grid grid-cols-2 gap-4">
            {renderDataRows()}
          </div>
          
          {/* Divider */}
          <div className="border-t border-neutral-200 my-4" />
          
          {/* Insight Line */}
          <p className="text-neutral-500 italic text-sm text-left">
            {renderInsightLine()}
          </p>
        </div>
        
        {/* Credit Reassurance */}
        <div className="flex items-center justify-center gap-2 mt-2">
          <CheckCircle2 className="w-5 h-5 text-feedback-success flex-shrink-0" />
          <span className="text-feedback-success font-medium">Checking your options won&apos;t affect your credit</span>
        </div>
        
        {/* CTA Button - Sticky on mobile */}
        <StickyButtonContainer className="w-full">
          <Button type="button" fullWidth onClick={onNext} showTrailingIcon>
            Continue
          </Button>
        </StickyButtonContainer>
        
        {/* Disclaimer */}
        <p className="text-xs text-neutral-500 text-center mt-2 pb-4">
          Average rates and balances subject to change. Rates updated as of February 2026.
        </p>
      </div>
    </FormLayout>
  )
}

export default DidYouKnowScreen
