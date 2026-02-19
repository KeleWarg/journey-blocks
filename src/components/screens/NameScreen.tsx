'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FormLayout } from '@/components/layout/FormLayout'
import { Button, StickyButtonContainer } from '@/components/ui'
import { Input } from '@/components/ui/Input'

// Validation schema
const nameSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .regex(/^[a-zA-Z]+$/, 'First name must contain only letters'),
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .regex(/^[a-zA-Z]+$/, 'Last name must contain only letters'),
})

type NameFormData = z.infer<typeof nameSchema>

interface NameScreenProps {
  initialValue?: {
    firstName: string
    lastName: string
  }
  onBack?: () => void
  onSubmit?: (data: { firstName: string; lastName: string }) => void
}

/**
 * NameScreen
 * 
 * Step 6 of the funnel - "Your name"
 * Shows First Name and Last Name inputs side by side on desktop
 */
export function NameScreen({ 
  initialValue, 
  onBack, 
  onSubmit 
}: NameScreenProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NameFormData>({
    resolver: zodResolver(nameSchema),
    defaultValues: {
      firstName: initialValue?.firstName || '',
      lastName: initialValue?.lastName || '',
    },
  })
  
  const onFormSubmit = (data: NameFormData) => {
    onSubmit?.(data)
  }
  
  return (
    <FormLayout currentStep={7} onBack={onBack}>
      <form onSubmit={handleSubmit(onFormSubmit)} className="animate-slide-up space-y-6 has-sticky-button">
        {/* Headline */}
        <div className="space-y-2 text-center">
          <h1 className="font-display text-display sm:text-display-md lg:text-display-lg text-neutral-900 text-center">
            What&apos;s your name?
          </h1>
          <p className="text-body text-neutral-500 text-center">
            Use your legal name as it appears on your accounts. This helps us 
            match you with the right creditor records.
          </p>
        </div>
        
        {/* Name Inputs */}
        <div className="flex flex-col gap-4 max-w-[410px] mx-auto w-full">
          <Input
            label="First Name"
            placeholder="Enter your first name"
            error={errors.firstName?.message}
            {...register('firstName')}
          />
          <Input
            label="Last Name"
            placeholder="Enter your last name"
            error={errors.lastName?.message}
            {...register('lastName')}
          />
        </div>
        
        {/* Submit Button - Sticky on mobile */}
        <StickyButtonContainer>
          <Button type="submit" fullWidth showTrailingIcon>
            Continue
          </Button>
        </StickyButtonContainer>
      </form>
    </FormLayout>
  )
}

export default NameScreen
