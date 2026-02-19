'use client'

import * as React from 'react'
import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BankSidebar } from './BankSidebar'
import { BankMobileHeader } from './BankMobileHeader'
import { BankProgressCounter } from './BankProgressCounter'
import { BankFooter } from './BankFooter'

export type TransitionDirection = 'next' | 'prev' | 'none'

interface BankFormLayoutProps {
  children: React.ReactNode
  answeredQuestions: number
  totalQuestions: number
  stepKey: string
  direction?: TransitionDirection
  onBack?: () => void
  className?: string
}

export function BankFormLayout({
  children,
  answeredQuestions,
  totalQuestions,
  stepKey,
  direction = 'none',
  onBack,
  className,
}: BankFormLayoutProps) {
  const incomingClass =
    direction === 'next'
      ? 'animate-slideInFromBottom'
      : direction === 'prev'
        ? 'animate-slideInFromTop'
        : ''

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <BankMobileHeader />

      <div className="flex flex-1">
        <BankSidebar className="hidden md:flex md:w-[50%] lg:w-[40%]" />

        <main className="relative flex flex-1 flex-col bg-white pt-[42px] md:pt-0">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="flex w-full items-center justify-center gap-2 bg-white pt-7 pb-0 text-sm text-neutral-500 hover:text-neutral-700 md:hidden"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Go to previous question
            </button>
          )}

          <div className="flex flex-1 items-center justify-center overflow-hidden">
            <div className={cn('w-full max-w-[540px] px-6 py-12 sm:px-10', className)}>
              {onBack && (
                <button
                  type="button"
                  onClick={onBack}
                  className="mb-3 hidden items-center gap-2 text-sm text-neutral-500 hover:text-neutral-700 md:flex"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  Go to previous question
                </button>
              )}

              <div key={stepKey} className={incomingClass}>
                {children}
              </div>
            </div>
          </div>

          <BankProgressCounter
            answeredQuestions={answeredQuestions}
            totalQuestions={totalQuestions}
            className="py-3"
          />
        </main>
      </div>

      <BankFooter />
    </div>
  )
}

export default BankFormLayout
