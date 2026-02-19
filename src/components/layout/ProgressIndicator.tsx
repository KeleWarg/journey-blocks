'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface ProgressIndicatorProps {
  currentStep: number
  onBack?: () => void
  className?: string
  subtitles?: Record<number, string>
  timeEstimates?: Record<number, number>
  totalSteps?: number
  /** When true, renders a single continuous bar instead of segmented pills */
  unified?: boolean
}

// Default debt relief subtitles
const defaultSubtitles: Record<number, string> = {
  1: "Let's see if you qualify",
  2: 'What kind of debt do you have?',
  3: 'How much debt do you have?',
  4: 'Tell us about your income',
  5: 'Your personalized results',
  6: 'When were you born?',
  7: "What's your name?",
  8: 'Your personalized debt profile',
  9: 'Where should we send your results?',
  10: 'View your matches',
  11: 'Final step - your address',
}

// Default debt relief time estimates (in seconds) - Total: ~3 minutes
const defaultTimeEstimates: Record<number, number> = {
  1: 15,  // Location selection
  2: 10,  // Debt type selection
  3: 10,  // Did you know screen
  4: 15,  // Debt amount
  5: 15,  // Income
  6: 10,  // Results preview
  7: 15,  // Date of birth
  8: 15,  // Name
  9: 10,  // Email
  10: 30, // Phone verification
  11: 25, // Address
}

const TOTAL_SEGMENTS = 6
const DEFAULT_TOTAL_STEPS = 11

// Calculate remaining time from current step onward
const getRemainingTime = (currentStep: number, totalSteps: number, timeEstimates: Record<number, number>): string => {
  let totalSeconds = 0
  for (let i = currentStep; i <= totalSteps; i++) {
    totalSeconds += timeEstimates[i] || 30 // default 30s if not defined
  }
  
  const minutes = Math.ceil(totalSeconds / 60)
  if (minutes < 1) return '<1 min left'
  if (minutes === 1) return '~1 min left'
  return `~${minutes} min left`
}

/**
 * ProgressIndicator Component
 * 
 * Segmented pill-style progress bar with progressive fill within each segment
 * Shows progress through the funnel with dynamic subtitle
 * 
 * currentStep: 1-10 representing each screen in the funnel
 * 
 * @example
 * <ProgressIndicator currentStep={1} onBack={handleBack} />
 */
export function ProgressIndicator({ 
  currentStep, 
  onBack, 
  className,
  subtitles = defaultSubtitles,
  timeEstimates = defaultTimeEstimates,
  totalSteps = DEFAULT_TOTAL_STEPS,
  unified = false
}: ProgressIndicatorProps) {
  // Calculate how much of the total progress we've made (0 to 1)
  const totalProgress = currentStep / totalSteps
  
  // Calculate how many full segments + partial fill (segmented mode)
  const progressInSegments = totalProgress * TOTAL_SEGMENTS
  const fullSegments = Math.floor(progressInSegments)
  const partialFill = (progressInSegments - fullSegments) * 100 // percentage of current segment
  
  // Unified bar fill percentage
  const unifiedFill = Math.round(totalProgress * 100)
  
  // Get subtitle for current step
  const subtitle = subtitles[currentStep] || 'Continue your application'

  if (unified) {
    return (
      <div className={cn('w-full bg-white sticky top-12 z-40', className)}>
        {/* Full-width progress track */}
        <div className="relative w-full pb-10">
          {/* Track background */}
          <div className="w-full h-[5px] bg-[#F3F5FB] overflow-hidden">
            <div
              className="h-full bg-[#003186]"
              style={{ width: `${unifiedFill}%`, transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)' }}
            />
          </div>

          {/* Percentage badge positioned at the end of the fill */}
          <div
            className="absolute top-[5px]"
            style={{
              left: `clamp(24px, ${unifiedFill}%, calc(100% - 24px))`,
              transform: 'translateX(-50%)',
              transition: 'left 1s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {/* Upward-pointing arrow */}
            <div className="flex justify-center">
              <div
                className="w-2 h-2 bg-[#003186]"
                style={{ transform: 'rotate(45deg)', marginBottom: '-4px' }}
              />
            </div>
            {/* Badge */}
            <div className="px-2 py-[5px] bg-[#003186] rounded-[5px] flex items-center justify-center">
              <span className="text-[#F3F5FB] text-base font-semibold leading-5 whitespace-nowrap">
                {unifiedFill}%
              </span>
            </div>
          </div>
        </div>

        {/* Back button below progress bar */}
        {onBack && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-2 pb-1">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-neutral-900 hover:text-primary-700 transition-colors"
              aria-label="Go back"
            >
              <svg
                width="16"
                height="24"
                viewBox="0 0 16 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-5"
              >
                <path
                  d="M10 6L4 12L10 18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-sm font-normal leading-5">Back</span>
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={cn('w-full bg-white sticky top-12 z-40', className)}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        {/* Back Button Row */}
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-neutral-900 hover:text-primary-700 transition-colors mb-4"
            aria-label="Go back"
          >
            <svg 
              width="16" 
              height="24" 
              viewBox="0 0 16 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-5"
            >
              <path 
                d="M10 6L4 12L10 18" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-sm font-normal leading-5">Back</span>
          </button>
        )}

        {/* Subtitle with time remaining */}
        <p className="text-center text-sm text-neutral-500 mb-2">
          {subtitle}
          <span className="text-neutral-300 mx-2">·</span>
          <span className="text-neutral-400">{getRemainingTime(currentStep, totalSteps, timeEstimates)}</span>
        </p>

        {/* Segmented Progress Bar with progressive fill */}
        <div className="flex justify-center gap-1.5">
          {[...Array(TOTAL_SEGMENTS)].map((_, index) => {
            // Determine fill state for this segment
            const isFull = index < fullSegments
            const isPartial = index === fullSegments
            
            return (
              <div
                key={index}
                className="h-1.5 rounded-full w-8 sm:w-10 md:w-12 bg-[#D7DCE5] overflow-hidden"
              >
                <div 
                  className="h-full bg-[#0C7663] rounded-full transition-all duration-500 ease-out"
                  style={{ 
                    width: isFull ? '100%' : isPartial ? `${partialFill}%` : '0%' 
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ProgressIndicator
