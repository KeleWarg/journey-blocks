'use client'

import * as React from 'react'
import { User, Phone, Check, Clock, Shield, DollarSign } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { TrustBadges } from '@/components/layout/TrustBadges'
import { ProgressIndicator } from '@/components/layout/ProgressIndicator'
import { Button, Input, StickyButtonContainer } from '@/components/ui'
import { MOVING_VALIDATION, HOME_SIZE_OPTIONS, MOVING_PROGRESS_SUBTITLES, MOVING_PROGRESS_TIME_ESTIMATES, MOVING_TOTAL_STEPS, type HomeSizeOption } from '@/types/moving'

interface MovingDetailsScreenProps {
  initialFirstName?: string
  initialLastName?: string
  initialPhone?: string
  homeSize: HomeSizeOption
  onBack?: () => void
  onSubmit?: (data: { firstName: string; lastName: string; phone: string }) => void
}

// Phone formatting helper
function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 10)
  
  if (digits.length === 0) return ''
  if (digits.length <= 3) return `(${digits}`
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

/**
 * MovingDetailsScreen
 * 
 * Step 5 of 5 - "Almost there!"
 * Two-column layout: left = what happens next card, right = name/phone form
 */
export function MovingDetailsScreen({ 
  initialFirstName = '',
  initialLastName = '',
  initialPhone = '',
  homeSize,
  onBack, 
  onSubmit 
}: MovingDetailsScreenProps) {
  const [firstName, setFirstName] = React.useState(initialFirstName)
  const [lastName, setLastName] = React.useState(initialLastName)
  const [phone, setPhone] = React.useState(initialPhone)
  const [errors, setErrors] = React.useState<{
    firstName?: string
    lastName?: string
    phone?: string
  }>({})
  
  // Get estimated savings based on home size
  const sizeOption = HOME_SIZE_OPTIONS.find(o => o.value === homeSize)
  const priceRange = sizeOption?.priceRange ?? { low: 600, high: 1200 }
  const avgPrice = (priceRange.low + priceRange.high) / 2
  const estimatedSavings = Math.round(avgPrice * 0.25)
  
  // Validation check
  const isValid = 
    firstName.length >= MOVING_VALIDATION.name.minLength &&
    lastName.length >= MOVING_VALIDATION.name.minLength &&
    MOVING_VALIDATION.phone.pattern.test(phone)
  
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setPhone(formatted)
    if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined }))
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors: typeof errors = {}
    
    if (firstName.length < MOVING_VALIDATION.name.minLength) {
      newErrors.firstName = `First name must be at least ${MOVING_VALIDATION.name.minLength} characters`
    }
    if (lastName.length < MOVING_VALIDATION.name.minLength) {
      newErrors.lastName = `Last name must be at least ${MOVING_VALIDATION.name.minLength} characters`
    }
    if (!MOVING_VALIDATION.phone.pattern.test(phone)) {
      newErrors.phone = MOVING_VALIDATION.phone.message
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    onSubmit?.({ firstName, lastName, phone })
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <Header />
      
      {/* Progress Indicator */}
      <ProgressIndicator 
        currentStep={5} 
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
            Get your free moving quotes
          </h1>
          
          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 items-center">
            
            {/* Left Column - What Happens Next Card */}
            <div className="animate-fade-in-up order-2 lg:order-1">
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-card border border-gray-100">
                {/* Mini Title */}
                <p className="text-xs uppercase tracking-wide text-neutral-500 mb-4">
                  You&apos;re almost done
                </p>
                
                {/* What Happens Next */}
                <div className="bg-primary-300 rounded-xl p-5 mb-4">
                  <p className="text-body-sm font-semibold text-neutral-800 mb-3">
                    What happens next:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-body-sm text-neutral-700">
                      <Check className="w-4 h-4 text-primary-700 flex-shrink-0 mt-0.5" />
                      Compare up to 5 verified movers
                    </li>
                    <li className="flex items-start gap-2 text-body-sm text-neutral-700">
                      <Check className="w-4 h-4 text-primary-700 flex-shrink-0 mt-0.5" />
                      Get personalized quotes instantly
                    </li>
                    <li className="flex items-start gap-2 text-body-sm text-neutral-700">
                      <Check className="w-4 h-4 text-primary-700 flex-shrink-0 mt-0.5" />
                      Save an average of ${estimatedSavings.toLocaleString()}
                    </li>
                    <li className="flex items-start gap-2 text-body-sm text-neutral-700">
                      <Check className="w-4 h-4 text-primary-700 flex-shrink-0 mt-0.5" />
                      Free cancellation anytime
                    </li>
                  </ul>
                </div>
                
                {/* Stats Row */}
                <div className="flex justify-between items-center bg-gray-50 rounded-xl p-4 mb-4">
                  <div className="flex flex-col items-center gap-1 flex-1">
                    <Clock className="w-5 h-5 text-primary-700" />
                    <span className="text-body-sm font-medium text-neutral-800">2 min</span>
                    <span className="text-caption text-neutral-500">Avg. response</span>
                  </div>
                  <div className="h-8 w-px bg-neutral-200" />
                  <div className="flex flex-col items-center gap-1 flex-1">
                    <Shield className="w-5 h-5 text-primary-700" />
                    <span className="text-body-sm font-medium text-neutral-800">Licensed</span>
                    <span className="text-caption text-neutral-500">Verified movers</span>
                  </div>
                  <div className="h-8 w-px bg-neutral-200" />
                  <div className="flex flex-col items-center gap-1 flex-1">
                    <DollarSign className="w-5 h-5 text-primary-700" />
                    <span className="text-body-sm font-medium text-neutral-800">$0</span>
                    <span className="text-caption text-neutral-500">No fees</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Details Form */}
            <div className="animate-fade-in-up order-1 lg:order-2">
              <form id="details-form" onSubmit={handleSubmit}>
                <p className="text-body text-neutral-500 mb-6">
                  Enter your name and phone number so licensed movers in your area can send you free, no-obligation estimates.
                </p>
                
                {/* Form Fields */}
                <div className="space-y-4 mb-6">
                  {/* Name fields side by side */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-2 text-body-sm font-medium text-neutral-800 mb-2">
                        <User className="w-4 h-4 text-primary-700" />
                        First name
                      </label>
                      <Input
                        type="text"
                        placeholder="John"
                        value={firstName}
                        onChange={(e) => {
                          setFirstName(e.target.value)
                          if (errors.firstName) setErrors(prev => ({ ...prev, firstName: undefined }))
                        }}
                        error={errors.firstName}
                        autoComplete="given-name"
                      />
                    </div>
                    <div>
                      <label className="text-body-sm font-medium text-neutral-800 mb-2 block">
                        Last name
                      </label>
                      <Input
                        type="text"
                        placeholder="Smith"
                        value={lastName}
                        onChange={(e) => {
                          setLastName(e.target.value)
                          if (errors.lastName) setErrors(prev => ({ ...prev, lastName: undefined }))
                        }}
                        error={errors.lastName}
                        autoComplete="family-name"
                      />
                    </div>
                  </div>
                  
                  {/* Phone field */}
                  <div>
                    <label className="flex items-center gap-2 text-body-sm font-medium text-neutral-800 mb-2">
                      <Phone className="w-4 h-4 text-primary-700" />
                      Phone number
                    </label>
                    <Input
                      type="tel"
                      placeholder="(555) 555-5555"
                      value={phone}
                      onChange={handlePhoneChange}
                      error={errors.phone}
                      autoComplete="tel"
                    />
                  </div>
                </div>
                
                {/* CTA - Desktop */}
                <div className="hidden sm:block">
                  <Button 
                    type="submit" 
                    fullWidth 
                    showTrailingIcon
                    disabled={!isValid}
                  >
                    Get My Free Quotes
                  </Button>
                  
                  {/* Legal line */}
                  <p className="text-caption text-neutral-500 text-center mt-3">
                    By clicking &ldquo;Get My Free Quotes&rdquo;, you agree to be contacted by our partner moving companies.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        {/* CTA - Sticky on mobile */}
        <StickyButtonContainer className="sm:hidden">
          <Button 
            type="submit" 
            form="details-form"
            fullWidth 
            showTrailingIcon
            disabled={!isValid}
          >
            Get My Free Quotes
          </Button>
          <p className="text-caption text-neutral-500 text-center mt-2">
            By clicking &ldquo;Get My Free Quotes&rdquo;, you agree to be contacted by our partner moving companies.
          </p>
        </StickyButtonContainer>
      </main>
      
      {/* Trust Badges */}
      <TrustBadges />
      
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default MovingDetailsScreen
