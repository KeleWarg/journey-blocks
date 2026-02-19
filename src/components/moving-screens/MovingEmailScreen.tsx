'use client'

import * as React from 'react'
import { Mail, Shield, Lock, Clock, Star } from 'lucide-react'
import { FormLayout } from '@/components/layout/FormLayout'
import { Button, Input, StickyButtonContainer } from '@/components/ui'
import { MOVING_VALIDATION, MOVING_PROGRESS_SUBTITLES, MOVING_PROGRESS_TIME_ESTIMATES, MOVING_TOTAL_STEPS } from '@/types/moving'

interface MovingEmailScreenProps {
  initialValue?: string
  onBack?: () => void
  onSubmit?: (email: string) => void
}

/**
 * MovingEmailScreen
 * 
 * Step 4 of 5 - "Where should we send your quotes?"
 * Email input with trust icons and testimonial
 */
export function MovingEmailScreen({ 
  initialValue = '',
  onBack, 
  onSubmit 
}: MovingEmailScreenProps) {
  const [email, setEmail] = React.useState(initialValue)
  const [error, setError] = React.useState<string | null>(null)
  
  const isValid = MOVING_VALIDATION.email.pattern.test(email)
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (error) setError(null)
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!MOVING_VALIDATION.email.pattern.test(email)) {
      setError(MOVING_VALIDATION.email.message)
      return
    }
    
    onSubmit?.(email)
  }
  
  return (
    <FormLayout 
      currentStep={4} 
      onBack={onBack}
      progressSubtitles={MOVING_PROGRESS_SUBTITLES}
      progressTimeEstimates={MOVING_PROGRESS_TIME_ESTIMATES}
      totalSteps={MOVING_TOTAL_STEPS}
      progressUnified
    >
      <form onSubmit={handleSubmit} className="animate-slide-up has-sticky-button">
        <div className="space-y-6">
          {/* Headline */}
          <div className="text-center space-y-2">
            <h1 className="font-display text-2xl sm:text-3xl text-neutral-900">
              Where should we send your quotes?
            </h1>
            <p className="text-body-sm text-neutral-500">
              Compare personalized quotes from verified movers — delivered in minutes.
            </p>
          </div>
          
          {/* Email Input */}
          <div className="max-w-md mx-auto">
            <label className="flex items-center gap-2 text-body-sm font-medium text-neutral-800 mb-2">
              <Mail className="w-4 h-4 text-primary-700" />
              Email address
            </label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={handleEmailChange}
              error={error ?? undefined}
              autoComplete="email"
            />
          </div>
          
          {/* Trust Icons */}
          <div className="flex justify-center items-center gap-6 max-w-md mx-auto">
            <div className="flex flex-col items-center gap-1">
              <Shield className="w-6 h-6 text-primary-700" />
              <span className="text-caption text-neutral-500">No spam</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Lock className="w-6 h-6 text-primary-700" />
              <span className="text-caption text-neutral-500">100% secure</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Clock className="w-6 h-6 text-primary-700" />
              <span className="text-caption text-neutral-500">Quotes in hours</span>
            </div>
          </div>
          
          {/* Testimonial */}
          <div className="bg-neutral-100 rounded-xl p-6 max-w-md mx-auto">
            <div className="flex justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-secondary-500 fill-secondary-500"
                />
              ))}
            </div>
            <p className="text-body text-neutral-800 italic text-center">
              &ldquo;Saved $600 on my move. The comparison made it easy to see who was overcharging and who was legit.&rdquo;
            </p>
            <p className="text-body-sm text-neutral-500 text-center mt-3">
              — Michael T., Austin, TX
            </p>
          </div>
          
          {/* CTA */}
          <StickyButtonContainer>
            <Button 
              type="submit" 
              fullWidth 
              showTrailingIcon
              disabled={!isValid}
            >
              Get My Quotes
            </Button>
            
            {/* Privacy line */}
            <p className="text-caption text-neutral-500 text-center mt-3">
              Your email is only used to send moving quotes. We never sell your data.
            </p>
          </StickyButtonContainer>
        </div>
      </form>
    </FormLayout>
  )
}

export default MovingEmailScreen
