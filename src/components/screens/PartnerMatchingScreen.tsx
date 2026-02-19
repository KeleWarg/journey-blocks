'use client'

import * as React from 'react'
import Image from 'next/image'
import { CheckCircle2, Shield, Check, Users } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { cn } from '@/lib/utils'

const partnerLogos = [
  { src: '/accredited_logo.png', alt: 'Accredited' },
  { src: '/ClearOne.png', alt: 'ClearOne' },
  { src: '/freedom-debt-relief_logo.png', alt: 'Freedom Debt Relief' },
  { src: '/JGW_logo.png', alt: 'JG Wentworth' },
  { src: '/National_logo.png', alt: 'National Debt Relief' },
]

const steps = [
  'Analyzing your debt profile...',
  'Checking partner availability...',
  'Comparing program options...',
  'Selecting your best match...',
]

interface PartnerMatchingScreenProps {
  firstName?: string
  onNext?: () => void
}

/**
 * PartnerMatchingScreen
 * 
 * A loading/matching screen that displays after AddressScreen and before ResultsPage.
 * Creates anticipation while "matching" the user with debt relief partners.
 * Auto-advances to the next screen after ~5.5 seconds.
 */
export function PartnerMatchingScreen({ firstName = 'there', onNext }: PartnerMatchingScreenProps) {
  const [currentStep, setCurrentStep] = React.useState(0)
  const [progress, setProgress] = React.useState(0)

  // Step progression - advances checklist items
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval)
          return prev
        }
        return prev + 1
      })
    }, 1200)
    return () => clearInterval(interval)
  }, [])

  // Progress bar animation
  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 50) // 5 seconds total (100 steps * 50ms)
    return () => clearInterval(interval)
  }, [])

  // Auto-advance to next screen
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onNext?.()
    }, 5500)
    return () => clearTimeout(timeout)
  }, [onNext])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center">
        <div className="max-w-lg mx-auto text-center py-12 px-4 animate-slide-up">
          {/* Headline */}
          <h1 className="font-display text-display sm:text-display-md text-neutral-900">
            Finding your best match, {firstName}...
          </h1>
          <p className="text-body text-neutral-500 mt-3">
            We&apos;re comparing offers from top debt relief partners to find the best fit for your profile.
          </p>

          {/* Partner Logo Carousel */}
          <div className="relative overflow-hidden py-8 my-6">
            {/* Left fade mask */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
            {/* Right fade mask */}
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />
            
            {/* Scrolling track - duplicated logos for seamless loop */}
            <div className="flex animate-scroll items-center">
              {[...partnerLogos, ...partnerLogos].map((logo, index) => (
                <div key={index} className="flex-shrink-0 px-6">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={120}
                    height={40}
                    className="h-8 sm:h-10 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Animated Checklist */}
          <div className="space-y-3 inline-flex flex-col items-start">
            {steps.map((step, index) => {
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
                      'text-body-sm transition-colors duration-300',
                      isPending ? 'text-neutral-500' : 'text-neutral-800'
                    )}
                  >
                    {step}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-xs mx-auto mt-8">
            <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-feedback-success rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-caption text-neutral-500 text-center mt-2">
              {progress}% complete
            </p>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 mt-8 text-neutral-500">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span className="text-caption">Secure & Private</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span className="text-caption">No credit impact</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="text-caption">1M+ Matched</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default PartnerMatchingScreen
