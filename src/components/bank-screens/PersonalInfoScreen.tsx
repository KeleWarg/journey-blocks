'use client'

import * as React from 'react'
import { Mail } from 'lucide-react'
import { BankFormLayout } from '@/components/bank-layout'
import type { TransitionDirection } from '@/components/bank-layout'
import { BANK_TOTAL_QUESTIONS } from '@/types/banks'

interface PersonalInfoScreenProps {
  answeredCount: number
  initialEmail?: string
  direction?: TransitionDirection
  onBack?: () => void
  onSubmit?: (data: { email: string; agreedToTerms: boolean }) => void
}

export function PersonalInfoScreen({
  answeredCount,
  initialEmail = '',
  direction = 'none',
  onBack,
  onSubmit,
}: PersonalInfoScreenProps) {
  const [email, setEmail] = React.useState(initialEmail)
  const [agreed, setAgreed] = React.useState(false)
  const [error, setError] = React.useState('')

  const validateEmail = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value)
  }

  const handleSubmit = () => {
    if (!email.trim()) {
      setError('Please enter your email address')
      return
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }
    if (!agreed) {
      setError('You must agree to the Terms & Conditions to continue')
      return
    }
    setError('')
    onSubmit?.({ email, agreedToTerms: agreed })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <BankFormLayout
      answeredQuestions={answeredCount}
      totalQuestions={BANK_TOTAL_QUESTIONS}
      stepKey="personalInfo"
      direction={direction}
      onBack={onBack}
    >
      <div>
        <h2 className="mb-8 text-2xl font-semibold text-neutral-900 sm:text-[28px] sm:leading-9">
          6. Where can we send your offers?
        </h2>

        <div className="space-y-4">
          <div className="relative">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" aria-hidden="true" />
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError('')
              }}
              onKeyDown={handleKeyDown}
              placeholder="Email address"
              className={[
                'w-full rounded-lg border bg-white py-4 pl-12 pr-4 text-base text-neutral-900 outline-none transition-colors',
                'focus:border-[#5B5FC7] focus:ring-2 focus:ring-[#5B5FC7]/20',
                error && !email ? 'border-feedback-error' : 'border-neutral-200',
              ].join(' ')}
            />
          </div>

          <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-neutral-200 bg-white p-4">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => {
                setAgreed(e.target.checked)
                setError('')
              }}
              className="mt-0.5 h-5 w-5 shrink-0 rounded border-neutral-300 text-[#5B5FC7] accent-[#5B5FC7] focus:ring-[#5B5FC7]"
            />
            <div className="text-sm leading-relaxed text-neutral-600">
              <span className="font-semibold text-neutral-800">
                I agree to the Terms &amp; conditions
              </span>
              <p className="mt-1.5">
                We take your privacy seriously and will use your personal and/or
                sensitive information to provide you with account details, or to
                market additional offers, products, and services related to our
                banking services. By ticking this box, you are giving us consent
                to use your information in this way. See{' '}
                <a
                  href="https://www.forbes.com/advisor/privacy-policy/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#5B5FC7] underline hover:text-[#4A4EB5]"
                >
                  Privacy Statement
                </a>{' '}
                and{' '}
                <a
                  href="https://www.forbes.com/terms-and-conditions/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#5B5FC7] underline hover:text-[#4A4EB5]"
                >
                  Terms and Conditions
                </a>
                .
              </p>
            </div>
          </label>

          {error && (
            <p className="text-sm text-feedback-error">{error}</p>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full rounded-lg bg-[#35B782] px-5 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#2DA572]"
          >
            See your matches
          </button>
        </div>
      </div>
    </BankFormLayout>
  )
}

export default PersonalInfoScreen
