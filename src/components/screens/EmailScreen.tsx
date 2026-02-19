'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FormLayout } from '@/components/layout/FormLayout'
import { Button, StickyButtonContainer } from '@/components/ui'
import { Input } from '@/components/ui/Input'
import { formatCurrency } from '@/lib/utils'

// Validation schema
const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

type EmailFormData = z.infer<typeof emailSchema>

interface EmailScreenProps {
  initialValue?: string
  firstName?: string
  debtAmount?: number
  income?: number
  onBack?: () => void
  onSubmit?: (email: string) => void
}

/**
 * Capitalize the first letter of a string
 */
function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Get DTI status message based on debt-to-income ratio
 */
function getDtiStatus(dtiPercent: number): string {
  if (dtiPercent < 50) {
    return '✓ Matches program requirements'
  } else if (dtiPercent <= 100) {
    return '✓ Strong fit'
  } else {
    return '✓ Programs available'
  }
}

/**
 * EmailScreen
 * 
 * Celebratory gate screen - asks for email before showing debt profile
 */
export function EmailScreen({ 
  initialValue = '', 
  firstName,
  debtAmount = 20000,
  income = 50000,
  onBack, 
  onSubmit 
}: EmailScreenProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: initialValue,
    },
  })
  
  const onFormSubmit = (data: EmailFormData) => {
    onSubmit?.(data.email)
  }

  // Calculate DTI percentage
  const dtiPercent = income > 0 ? Math.round((debtAmount / income) * 100) : 0
  const dtiStatus = getDtiStatus(dtiPercent)
  
  return (
    <FormLayout currentStep={10} onBack={onBack}>
      <form onSubmit={handleSubmit(onFormSubmit)} className="animate-slide-up space-y-6 has-sticky-button">
        {/* Headline */}
        <h1 className="font-display text-display sm:text-display-md lg:text-display-lg text-neutral-900 text-center">
          {firstName 
            ? `Congrats, ${capitalizeFirstLetter(firstName)}! We found debt relief options for you.`
            : 'Congrats! We found debt relief options for you.'
          }
        </h1>
        
        {/* Subheading */}
        <p className="text-body text-neutral-500 text-center">
          Enter your email to view the programs that match your profile.
        </p>
        
        {/* Email Input */}
        <div className="pt-2 max-w-[410px] mx-auto w-full">
          <Input
            label="Email address"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register('email')}
          />
        </div>
        
        {/* Submit Button - Sticky on mobile */}
        <StickyButtonContainer>
          <Button type="submit" fullWidth showTrailingIcon>
            Continue to matched options
          </Button>
        </StickyButtonContainer>
        
        {/* Profile Summary Card */}
        <div className="bg-neutral-100 rounded-lg p-4 max-w-[410px] mx-auto w-full">
          <p className="text-body-sm font-medium text-neutral-800 mb-3">Your debt snapshot</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-500">Debt</span>
              <span className="text-neutral-800 font-medium">{formatCurrency(debtAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Income</span>
              <span className="text-neutral-800 font-medium">{formatCurrency(income)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">DTI</span>
              <span className="text-neutral-800 font-medium">{dtiPercent}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Status</span>
              <span className="text-feedback-success font-medium">{dtiStatus}</span>
            </div>
          </div>
        </div>
        
        {/* Privacy note */}
        <p className="text-caption text-neutral-500 text-center max-w-[410px] mx-auto">
          We respect your privacy. Your email will only be used to send you 
          information about your debt relief options.
        </p>
      </form>
    </FormLayout>
  )
}

export default EmailScreen
