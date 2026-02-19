'use client'

import * as React from 'react'
import { CheckCircle2, Truck, Star } from 'lucide-react'
import { FormLayout } from '@/components/layout/FormLayout'
import { cn } from '@/lib/utils'
import { HOME_SIZE_OPTIONS, FEATURED_MOVERS, type HomeSizeOption } from '@/types/moving'

const STEPS = [
  'Reviewing mover credentials...',
  'Checking recent customer reviews...',
  'Comparing pricing for your route...',
  'Selecting your best matches!',
]

interface MatchingMoversInterstitialProps {
  homeSize: HomeSizeOption
  onNext?: () => void
}

/**
 * MatchingMoversInterstitial
 * 
 * Animated loading screen before details
 * Shows matching progress and mover preview cards
 */
export function MatchingMoversInterstitial({ 
  homeSize, 
  onNext 
}: MatchingMoversInterstitialProps) {
  const [currentStep, setCurrentStep] = React.useState(0)
  const [progress, setProgress] = React.useState(0)
  const [visibleMovers, setVisibleMovers] = React.useState<number[]>([])
  
  // Get label for selected size
  const sizeOption = HOME_SIZE_OPTIONS.find(o => o.value === homeSize)
  const sizeLabel = sizeOption?.label ?? 'home'
  
  React.useEffect(() => {
    // Step through checklist items
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= STEPS.length - 1) {
          clearInterval(stepInterval)
          return prev
        }
        return prev + 1
      })
    }, 875)

    // Stagger mover card reveals
    const moverTimeouts = FEATURED_MOVERS.map((_, index) => {
      return setTimeout(() => {
        setVisibleMovers(prev => [...prev, index])
      }, 1200 + (index * 600))
    })

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
    }, 875 * STEPS.length + 800)

    return () => {
      clearInterval(stepInterval)
      clearInterval(progressInterval)
      moverTimeouts.forEach(clearTimeout)
      clearTimeout(advanceTimeout)
    }
  }, [onNext])

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
    <FormLayout currentStep={4} showProgress={false}>
      <div className="flex flex-col items-center py-8 animate-slide-up">
        {/* Icon */}
        <div className="w-16 h-16 mx-auto flex items-center justify-center bg-primary-300 rounded-full">
          <Truck className="w-8 h-8 text-primary-700" />
        </div>

        {/* Headline */}
        <h1 className="font-display text-display sm:text-display-md text-neutral-900 text-center mt-6">
          Matching you with top movers...
        </h1>
        
        {/* Subhead */}
        <p className="text-body text-neutral-500 text-center mt-2">
          Finding the best rates for your {sizeLabel.toLowerCase()} move
        </p>

        {/* Checklist */}
        <div className="flex flex-col items-start gap-3 mt-8">
          {STEPS.map((step, index) => renderStep(step, index))}
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

        {/* Mover Preview Cards */}
        {visibleMovers.length > 0 && (
          <div className="w-full max-w-sm mt-8">
            <p className="text-caption uppercase tracking-wider text-neutral-500 font-medium mb-3 text-center">
              MOVERS COMPETING FOR YOUR BUSINESS
            </p>
            <div className="space-y-3">
              {FEATURED_MOVERS.map((mover, index) => (
                visibleMovers.includes(index) && (
                  <div 
                    key={mover.name}
                    className="bg-white border border-neutral-200 rounded-lg p-4 flex items-center justify-between animate-fade-in shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center">
                        <Truck className="w-5 h-5 text-neutral-600" />
                      </div>
                      <div>
                        <p className="text-body font-medium text-neutral-800">{mover.name}</p>
                        <div className="flex items-center gap-1 text-body-sm text-neutral-500">
                          <Star className="w-3 h-3 text-secondary-500 fill-secondary-500" />
                          <span>{mover.rating}</span>
                          <span>·</span>
                          <span>{mover.reviews.toLocaleString()} reviews</span>
                        </div>
                      </div>
                    </div>
                    <span className={cn(
                      'text-caption px-2 py-1 rounded-full',
                      mover.badge === 'Top Rated' && 'bg-secondary-300 text-secondary-700',
                      mover.badge === 'Best Value' && 'bg-feedback-success/10 text-feedback-success',
                      mover.badge === 'Most Reliable' && 'bg-primary-300 text-primary-700'
                    )}>
                      {mover.badge}
                    </span>
                  </div>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </FormLayout>
  )
}

export default MatchingMoversInterstitial
