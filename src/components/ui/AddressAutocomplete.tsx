'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { MapPin, Search } from 'lucide-react'

export interface ParsedAddress {
  street: string
  city: string
  state: string
  zip: string
  apt?: string
}

// Pre-populated dummy suggestions
const DUMMY_SUGGESTIONS = [
  { street: '123 Main Street', city: 'Austin', state: 'TX', zip: '78701' },
  { street: '456 Oak Avenue', city: 'Denver', state: 'CO', zip: '80202' },
  { street: '789 Pine Boulevard', city: 'Seattle', state: 'WA', zip: '98101' },
  { street: '321 Elm Drive', city: 'Miami', state: 'FL', zip: '33101' },
  { street: '555 Maple Lane', city: 'Chicago', state: 'IL', zip: '60601' },
  { street: '888 Cedar Court', city: 'Phoenix', state: 'AZ', zip: '85001' },
  { street: '999 Birch Way', city: 'Portland', state: 'OR', zip: '97201' },
  { street: '222 Willow Street', city: 'Atlanta', state: 'GA', zip: '30301' },
]

interface AddressAutocompleteProps {
  onAddressSelect: (address: ParsedAddress) => void
  initialValue?: string
  error?: string
  disabled?: boolean
}

/**
 * AddressAutocomplete Component
 * 
 * Dummy address autocomplete with pre-populated suggestions
 */
export function AddressAutocomplete({ 
  onAddressSelect, 
  initialValue = '',
  error,
  disabled = false 
}: AddressAutocompleteProps) {
  const [value, setValue] = React.useState(initialValue)
  const [isOpen, setIsOpen] = React.useState(false)
  const [filteredSuggestions, setFilteredSuggestions] = React.useState(DUMMY_SUGGESTIONS)
  const wrapperRef = React.useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Filter suggestions based on input
  React.useEffect(() => {
    if (!value.trim()) {
      setFilteredSuggestions(DUMMY_SUGGESTIONS.slice(0, 4))
      return
    }
    
    const searchTerm = value.toLowerCase()
    const filtered = DUMMY_SUGGESTIONS.filter(addr => 
      addr.street.toLowerCase().includes(searchTerm) ||
      addr.city.toLowerCase().includes(searchTerm) ||
      addr.state.toLowerCase().includes(searchTerm) ||
      addr.zip.includes(searchTerm)
    )
    
    // If no matches, show suggestions that start with similar numbers/letters
    if (filtered.length === 0) {
      const firstChar = value.charAt(0)
      if (/\d/.test(firstChar)) {
        // User typed a number, show addresses with numbers
        setFilteredSuggestions(DUMMY_SUGGESTIONS.slice(0, 4))
      } else {
        // Show addresses matching first letter
        const byLetter = DUMMY_SUGGESTIONS.filter(addr =>
          addr.street.toLowerCase().includes(firstChar.toLowerCase()) ||
          addr.city.toLowerCase().startsWith(firstChar.toLowerCase())
        )
        setFilteredSuggestions(byLetter.length > 0 ? byLetter : DUMMY_SUGGESTIONS.slice(0, 3))
      }
    } else {
      setFilteredSuggestions(filtered)
    }
  }, [value])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    setIsOpen(true)
  }

  const handleSelect = (address: typeof DUMMY_SUGGESTIONS[0]) => {
    const fullAddress = `${address.street}, ${address.city}, ${address.state} ${address.zip}`
    setValue(fullAddress)
    setIsOpen(false)

    onAddressSelect({
      street: address.street,
      city: address.city,
      state: address.state,
      zip: address.zip,
    })
  }

  const showSuggestions = isOpen && filteredSuggestions.length > 0

  return (
    <div ref={wrapperRef} className="relative">
      {/* Label */}
      <label className="block text-label text-neutral-800 mb-1.5">
        Start typing your address
      </label>
      
      {/* Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 pointer-events-none" />
        <input
          value={value}
          onChange={handleInput}
          onFocus={() => setIsOpen(true)}
          disabled={disabled}
          placeholder="123 Main Street, City, State"
          className={cn(
            'w-full min-h-[48px] pl-10 pr-4 py-3 rounded-[8px] border bg-white',
            'text-body text-neutral-800 placeholder:text-neutral-500',
            'transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:ring-focus focus:border-primary-700',
            error 
              ? 'border-feedback-error' 
              : 'border-neutral-200 hover:border-neutral-500',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
          aria-invalid={!!error}
          aria-describedby={error ? 'address-error' : undefined}
          autoComplete="off"
        />
      </div>

      {/* Error message */}
      {error && (
        <p id="address-error" className="mt-1.5 text-body-sm text-feedback-error" role="alert">
          {error}
        </p>
      )}

      {/* Suggestions dropdown */}
      {showSuggestions && (
        <ul 
          className="absolute z-[60] w-full bg-white border border-neutral-200 rounded-lg mt-1 shadow-lg max-h-60 overflow-auto"
          role="listbox"
        >
          {filteredSuggestions.map((address, index) => (
            <li
              key={index}
              onClick={() => handleSelect(address)}
              className="px-4 py-3 hover:bg-neutral-100 cursor-pointer transition-colors flex items-start gap-3"
              role="option"
            >
              <MapPin className="w-4 h-4 text-neutral-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-neutral-900 font-medium">
                  {address.street}
                </p>
                <p className="text-xs text-neutral-500">
                  {address.city}, {address.state} {address.zip}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default AddressAutocomplete
