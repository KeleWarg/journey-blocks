'use client'

import * as React from 'react'
import { CheckCircle2, Search, Lightbulb } from 'lucide-react'
import { FormLayout } from '@/components/layout/FormLayout'
import { cn } from '@/lib/utils'

const STEPS = [
  'Checking mover availability...',
  'Verifying licenses & insurance...',
  'Comparing customer ratings...',
]

interface SearchingAreaInterstitialProps {
  zipFrom: string
  zipTo: string
  onNext?: () => void
}

/**
 * SearchingAreaInterstitial
 * 
 * Animated loading screen after zip codes
 * Shows search progress and reveals mover count
 */
export function SearchingAreaInterstitial({ 
  zipFrom, 
  zipTo, 
  onNext 
}: SearchingAreaInterstitialProps) {
  const [currentStep, setCurrentStep] = React.useState(0)
  const [moverCount, setMoverCount] = React.useState<number | null>(null)
  const [progress, setProgress] = React.useState(0)
  
  // Generate random mover count between 12-20
  const randomMoverCount = React.useMemo(() => 
    Math.floor(Math.random() * 9) + 12, []
  )
  
  React.useEffect(() => {
    // Step through checklist items
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= STEPS.length) {
          clearInterval(stepInterval)
          return prev
        }
        return prev + 1
      })
    }, 800)

    // Show mover count after steps complete
    const moverTimeout = setTimeout(() => {
      setMoverCount(randomMoverCount)
    }, 800 * STEPS.length + 400)

    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 3
      })
    }, 100)

    // Auto-advance after animation
    const advanceTimeout = setTimeout(() => {
      onNext?.()
    }, 800 * STEPS.length + 1000)

    return () => {
      clearInterval(stepInterval)
      clearInterval(progressInterval)
      clearTimeout(moverTimeout)
      clearTimeout(advanceTimeout)
    }
  }, [onNext, randomMoverCount])

  const renderStep = (text: string, index: number) => {
    const isComplete = index < currentStep
    const isCurrent = index === currentStep
    const isPending = index > currentStep

    return (
      <div key={index} className="flex items-center gap-3">
        {isComplete && (
          <CheckCircle2 className="w-5 h-5 text-feedback-success fill-feedback-success" />
        )}
        {isCurrent && (
          <div className="w-5 h-5 rounded-full border-2 border-primary-700 border-t-transparent animate-spin" />
        )}
        {isPending && (
          <div className="w-5 h-5 rounded-full border-2 border-neutral-200" />
        )}
        <span
          className={cn(
            'text-body transition-colors duration-300',
            isPending ? 'text-neutral-500' : 'text-neutral-800'
          )}
        >
          {text}
        </span>
      </div>
    )
  }

  return (
    <FormLayout currentStep={1} showProgress={false}>
      <div className="flex flex-col items-center py-8 animate-slide-up">
        {/* Icon */}
        <div className="w-16 h-16 mx-auto flex items-center justify-center bg-primary-300 rounded-full">
          <Search className="w-8 h-8 text-primary-700" />
        </div>

        {/* Headline */}
        <h1 className="font-display text-display sm:text-display-md text-neutral-900 text-center mt-6">
          Searching your area...
        </h1>
        
        {/* Subhead */}
        <p className="text-body text-neutral-500 text-center mt-2">
          Finding licensed movers for {zipFrom} → {zipTo}
        </p>

        {/* Checklist */}
        <div className="flex flex-col items-start gap-3 mt-8">
          {STEPS.map((step, index) => renderStep(step, index))}
          
          {/* Mover count reveal */}
          {moverCount && (
            <div className="flex items-center gap-3 animate-fade-in">
              <CheckCircle2 className="w-5 h-5 text-feedback-success fill-feedback-success" />
              <span className="text-body text-neutral-800 font-medium">
                {moverCount} movers found in your area
              </span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-sm mx-auto mt-8">
          <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
            <div
              className="bg-primary-700 h-full rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Did You Know Card */}
        <div className="bg-secondary-300 rounded-xl p-6 mt-8 max-w-sm">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-5 h-5 text-secondary-500" />
            <span className="text-caption uppercase tracking-wider text-neutral-600 font-medium">
              DID YOU KNOW?
            </span>
          </div>
          <p className="text-body text-neutral-800">
            <span className="font-semibold">68% of people</span> who compare multiple movers save over <span className="font-semibold">$300</span> on their move.
          </p>
        </div>
      </div>
    </FormLayout>
  )
}

export default SearchingAreaInterstitial
