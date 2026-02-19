import * as React from 'react'

interface BankProgressCounterProps {
  answeredQuestions: number
  totalQuestions: number
  className?: string
}

export function BankProgressCounter({
  answeredQuestions,
  totalQuestions,
  className,
}: BankProgressCounterProps) {
  const percentage = totalQuestions > 0
    ? Math.round((answeredQuestions / totalQuestions) * 100)
    : 0

  return (
    <div className={className}>
      {/* Desktop/tablet: text label */}
      <p className="hidden text-center text-xs italic text-neutral-400 md:block">
        {answeredQuestions} of {totalQuestions} questions answered
      </p>

      {/* Mobile: progress bar pinned to bottom */}
      <div className="md:hidden">
        <p className="mb-2 text-center text-xs text-neutral-500">
          {answeredQuestions} of {totalQuestions} questions answered
        </p>
        <div className="h-1 w-full bg-[#D1E5E1]">
          <div
            className="h-full bg-[#35B782] transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export default BankProgressCounter
