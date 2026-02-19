'use client'

import * as React from 'react'
import * as Popover from '@radix-ui/react-popover'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay()
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function isBeforeDay(date: Date, reference: Date): boolean {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const r = new Date(reference.getFullYear(), reference.getMonth(), reference.getDate())
  return d < r
}

function formatDisplayDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

interface DatePickerProps {
  value?: string // ISO date string (YYYY-MM-DD)
  onChange?: (value: string) => void
  minDate?: Date
  label?: string
  placeholder?: string
  className?: string
}

export function DatePicker({
  value,
  onChange,
  minDate = new Date(),
  label,
  placeholder = 'Select a date',
  className,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)

  // Parse value into a Date or null
  const selectedDate = React.useMemo(() => {
    if (!value) return null
    const [y, m, d] = value.split('-').map(Number)
    return new Date(y, m - 1, d)
  }, [value])

  // Calendar view state — start from the selected date's month, or today
  const initial = selectedDate || new Date()
  const [viewYear, setViewYear] = React.useState(initial.getFullYear())
  const [viewMonth, setViewMonth] = React.useState(initial.getMonth())

  // Re-sync view when popover opens
  React.useEffect(() => {
    if (open) {
      const ref = selectedDate || new Date()
      setViewYear(ref.getFullYear())
      setViewMonth(ref.getMonth())
    }
  }, [open, selectedDate])

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth)

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear((y) => y - 1)
    } else {
      setViewMonth((m) => m - 1)
    }
  }

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear((y) => y + 1)
    } else {
      setViewMonth((m) => m + 1)
    }
  }

  const handleSelectDay = (day: number) => {
    const iso = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    onChange?.(iso)
    setOpen(false)
  }

  // Determine if previous month nav should be disabled
  const today = new Date()
  const isPrevDisabled =
    viewYear < minDate.getFullYear() ||
    (viewYear === minDate.getFullYear() && viewMonth <= minDate.getMonth())

  // Build the calendar grid cells
  const cells: React.ReactNode[] = []

  // Empty cells before the first day
  for (let i = 0; i < firstDay; i++) {
    cells.push(<div key={`empty-${i}`} />)
  }

  // Day cells
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(viewYear, viewMonth, day)
    const disabled = isBeforeDay(date, minDate)
    const isSelected = selectedDate ? isSameDay(date, selectedDate) : false
    const isToday = isSameDay(date, today)

    cells.push(
      <button
        key={day}
        type="button"
        disabled={disabled}
        onClick={() => handleSelectDay(day)}
        className={cn(
          'w-9 h-9 rounded-full text-sm font-medium transition-colors duration-150',
          'flex items-center justify-center',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-focus',
          disabled && 'text-neutral-300 cursor-not-allowed',
          !disabled && !isSelected && 'text-neutral-800 hover:bg-primary-300',
          isToday && !isSelected && !disabled && 'border border-primary-700',
          isSelected && 'bg-primary-700 text-white hover:bg-primary-750',
        )}
      >
        {day}
      </button>
    )
  }

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="block text-body-sm font-medium text-neutral-800 mb-2">
          {label}
        </label>
      )}
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <button
            type="button"
            className={cn(
              'flex items-center justify-between w-full bg-white border border-neutral-200 rounded-[8px] px-4 py-3',
              'min-h-[48px] text-body transition-colors duration-200 cursor-pointer',
              'focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-focus/50',
              selectedDate ? 'text-neutral-800' : 'text-neutral-500',
            )}
          >
            <span>{selectedDate ? formatDisplayDate(selectedDate) : placeholder}</span>
            <Calendar className="h-5 w-5 text-neutral-500 flex-shrink-0" />
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            sideOffset={8}
            align="start"
            className={cn(
              'z-50 bg-white rounded-[12px] border border-neutral-200 shadow-card p-4',
              'w-[320px]',
              'data-[state=open]:animate-in data-[state=closed]:animate-out',
              'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
              'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
            )}
          >
            {/* Month / Year Header */}
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={handlePrevMonth}
                disabled={isPrevDisabled}
                className={cn(
                  'w-8 h-8 flex items-center justify-center rounded-full transition-colors',
                  'hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-focus',
                  isPrevDisabled && 'opacity-30 cursor-not-allowed hover:bg-transparent',
                )}
              >
                <ChevronLeft className="w-4 h-4 text-neutral-800" />
              </button>
              <span className="text-sm font-semibold text-neutral-900">
                {MONTH_NAMES[viewMonth]} {viewYear}
              </span>
              <button
                type="button"
                onClick={handleNextMonth}
                className="w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-focus"
              >
                <ChevronRight className="w-4 h-4 text-neutral-800" />
              </button>
            </div>

            {/* Day of Week Headers */}
            <div className="grid grid-cols-7 gap-0 mb-1">
              {DAYS_OF_WEEK.map((d) => (
                <div
                  key={d}
                  className="w-9 h-8 flex items-center justify-center text-xs font-medium text-neutral-500"
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-0">
              {cells}
            </div>

            {/* Today shortcut */}
            <div className="mt-3 pt-3 border-t border-neutral-200">
              <button
                type="button"
                onClick={() => {
                  const t = new Date()
                  const iso = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`
                  onChange?.(iso)
                  setOpen(false)
                }}
                className="text-sm font-medium text-primary-700 hover:text-primary-750 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded"
              >
                Today
              </button>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  )
}

export default DatePicker
