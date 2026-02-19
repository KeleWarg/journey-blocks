'use client'

import * as React from 'react'
import { Edit3, Quote, Star, Search } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { TrustBadges } from '@/components/layout/TrustBadges'
import { ProgressIndicator } from '@/components/layout/ProgressIndicator'
import { Button, StickyButtonContainer } from '@/components/ui'
import { Input } from '@/components/ui/Input'
import { AddressAutocomplete, type ParsedAddress } from '@/components/ui/AddressAutocomplete'
import { formatCurrency, cn } from '@/lib/utils'

// Testimonials data (experience-focused, no specific dollar amounts)
const testimonials = [
  {
    quote: "I was drowning in debt and didn't know where to turn. This process helped me understand my options and finally feel in control.",
    name: "Michael R.",
    location: "Florida",
    rating: 5
  },
  {
    quote: "The team was supportive and explained everything clearly. I finally have a plan that works for my situation.",
    name: "Sarah K.",
    location: "Ohio",
    rating: 5
  },
  {
    quote: "I was skeptical at first, but the process was simple and the guidance was invaluable. I feel hopeful again.",
    name: "Jessica M.",
    location: "Texas",
    rating: 5
  },
  {
    quote: "I wish I had done this sooner. Understanding my options made all the difference in getting my finances back on track.",
    name: "David L.",
    location: "California",
    rating: 5
  }
]

// Determine ratio badge based on debt-to-income ratio
function getRatioBadge(ratio: number): { label: string; className: string } {
  if (ratio < 50) {
    return { label: 'Low', className: 'bg-green-100 text-green-700' }
  } else if (ratio <= 100) {
    return { label: 'Moderate', className: 'bg-yellow-100 text-yellow-700' }
  } else {
    return { label: 'Elevated', className: 'bg-red-100 text-red-700' }
  }
}

// Get status based on DTI
function getDtiStatus(ratio: number): string {
  if (ratio < 50) {
    return '✓ Matches program requirements'
  } else if (ratio <= 100) {
    return '✓ Strong fit'
  } else {
    return '✓ Programs available'
  }
}

// Partner logos data
const partnerLogos = [
  { src: '/accredited_logo.png', alt: 'Accredited' },
  { src: '/ClearOne.png', alt: 'ClearOne' },
  { src: '/freedom-debt-relief_logo.png', alt: 'Freedom Debt Relief' },
  { src: '/JGW_logo.png', alt: 'JG Wentworth' },
  { src: '/National_logo.png', alt: 'National Debt Relief' },
]

// Testimonial Carousel Component
function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isPaused, setIsPaused] = React.useState(false)

  React.useEffect(() => {
    if (isPaused) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [isPaused])

  const testimonial = testimonials[currentIndex]

  return (
    <div 
      className="border border-gray-100 rounded-xl p-5 mb-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Quote className="w-6 h-6 text-gray-200 mb-2" />
      
      <div key={currentIndex} className="animate-testimonial">
        <p className="text-sm text-neutral-800 italic leading-relaxed">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
        
        <div className="flex gap-1 mt-3">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          ))}
        </div>
        
        <p className="text-xs text-neutral-500 mt-2">
          — {testimonial.name}, {testimonial.location}
        </p>
      </div>
      
      {/* Progress dots */}
      <div className="flex justify-center gap-1.5 mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              'h-1.5 rounded-full transition-all min-w-[44px] min-h-[44px] flex items-center justify-center',
              'sm:min-w-0 sm:min-h-0'
            )}
            aria-label={`Go to testimonial ${index + 1}`}
          >
            <span className={cn(
              'h-1.5 rounded-full transition-all',
              index === currentIndex 
                ? 'bg-primary-700 w-3' 
                : 'bg-gray-300 w-1.5'
            )} />
          </button>
        ))}
      </div>
    </div>
  )
}

// Partner Logo Carousel Component
function PartnerCarousel() {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-neutral-500 text-center mb-3">
        Trusted Partners
      </p>
      
      <div className="relative overflow-hidden">
        {/* Fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        
        {/* Scrolling track */}
        <div className="flex animate-scroll w-max">
          {[...partnerLogos, ...partnerLogos].map((logo, index) => (
            <div key={index} className="flex-shrink-0 px-4 flex items-center">
              <img 
                src={logo.src} 
                alt={logo.alt} 
                className="h-6 w-auto object-contain grayscale opacity-60"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

interface AddressScreenProps {
  firstName?: string
  debtAmount?: number
  income?: number
  initialValue?: {
    line1: string
    line2?: string
    zipCode: string
  }
  onBack?: () => void
  onSubmit?: (address: { line1: string; line2?: string; zipCode: string }) => void
}

/**
 * AddressScreen
 * 
 * Step 10 of the funnel - "Your Address"
 * Two-column layout with context card and smart address autocomplete
 */
export function AddressScreen({ 
  firstName,
  debtAmount = 25000,
  income = 50000,
  initialValue, 
  onBack, 
  onSubmit 
}: AddressScreenProps) {
  // Form state
  const [selectedAddress, setSelectedAddress] = React.useState<ParsedAddress | null>(
    initialValue ? {
      street: initialValue.line1,
      city: '',
      state: '',
      zip: initialValue.zipCode,
      apt: initialValue.line2,
    } : null
  )
  const [isManualEntry, setIsManualEntry] = React.useState(!!initialValue)
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  
  // Manual entry form state
  const [manualStreet, setManualStreet] = React.useState(initialValue?.line1 || '')
  const [manualCity, setManualCity] = React.useState('')
  const [manualState, setManualState] = React.useState('')
  const [manualZip, setManualZip] = React.useState(initialValue?.zipCode || '')
  const [manualApt, setManualApt] = React.useState(initialValue?.line2 || '')
  
  // Calculate DTI
  const ratio = income > 0 ? Math.round((debtAmount / income) * 100) : 0
  const ratioBadge = getRatioBadge(ratio)
  const dtiStatus = getDtiStatus(ratio)
  
  // Handle address selection from autocomplete
  const handleAddressSelect = (address: ParsedAddress) => {
    setSelectedAddress(address)
    setErrors({})
  }
  
  // Update selected address fields
  const updateAddressField = (field: keyof ParsedAddress, value: string) => {
    if (selectedAddress) {
      setSelectedAddress({ ...selectedAddress, [field]: value })
    }
  }
  
  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    if (isManualEntry) {
      if (!manualStreet || manualStreet.length < 5) {
        newErrors.street = 'Please enter your street address'
      }
      if (!manualCity || manualCity.length < 2) {
        newErrors.city = 'Please enter your city'
      }
      if (!manualState || manualState.length < 2) {
        newErrors.state = 'Please enter your state'
      }
      if (!manualZip || !/^\d{5}$/.test(manualZip)) {
        newErrors.zip = 'Please enter a valid 5-digit ZIP code'
      }
    } else if (selectedAddress) {
      if (!selectedAddress.street || selectedAddress.street.length < 5) {
        newErrors.street = 'Please enter your street address'
      }
      if (!selectedAddress.zip || !/^\d{5}$/.test(selectedAddress.zip)) {
        newErrors.zip = 'Please enter a valid 5-digit ZIP code'
      }
    } else {
      newErrors.address = 'Please enter your address'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    if (isManualEntry) {
      onSubmit?.({
        line1: `${manualStreet}, ${manualCity}, ${manualState}`,
        line2: manualApt || undefined,
        zipCode: manualZip,
      })
    } else if (selectedAddress) {
      onSubmit?.({
        line1: `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}`,
        line2: selectedAddress.apt || undefined,
        zipCode: selectedAddress.zip,
      })
    }
  }
  
  // Switch to manual entry
  const enableManualEntry = () => {
    setIsManualEntry(true)
    if (selectedAddress) {
      setManualStreet(selectedAddress.street)
      setManualCity(selectedAddress.city)
      setManualState(selectedAddress.state)
      setManualZip(selectedAddress.zip)
      setManualApt(selectedAddress.apt || '')
    }
  }
  
  // Switch back to autocomplete
  const enableAutocomplete = () => {
    setIsManualEntry(false)
    setSelectedAddress(null)
    setErrors({})
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <Header />
      
      {/* Progress Indicator */}
      <ProgressIndicator currentStep={11} onBack={onBack} />
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 flex-1">
          {/* Page Headline - Celebratory momentum */}
          <h1 className="font-display text-display sm:text-display-md lg:text-display-lg text-neutral-900 text-center mb-8">
            {firstName ? `You're on your way to debt relief, ${firstName}.` : "You're on your way to debt relief."}
          </h1>
          
          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* Left Column - Context Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 order-2 lg:order-none">
              {/* Mini Title */}
              <p className="text-xs uppercase tracking-wide text-neutral-500 mb-4">
                Based on what you told us
              </p>
              
              {/* Profile Snapshot */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm font-medium text-neutral-800 mb-3">Your debt snapshot</p>
                <div className="text-sm">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-neutral-500">Total Debt</span>
                    <span className="text-neutral-800 font-medium">{formatCurrency(debtAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-neutral-500">DTI</span>
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-800 font-medium">{ratio}%</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${ratioBadge.className}`}>
                        {ratioBadge.label}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-neutral-500">Status</span>
                    <span className="text-feedback-success font-medium">{dtiStatus}</span>
                  </div>
                </div>
              </div>
              
              {/* Rotating Testimonials */}
              <TestimonialCarousel />
              
              {/* Partner Logo Carousel */}
              <PartnerCarousel />
            </div>
            
            {/* Right Column - Address Form */}
            <div className="order-1 lg:order-none">
              <form onSubmit={handleSubmit} className="animate-slide-up has-sticky-button">
                {/* Subheading */}
                <p className="text-neutral-500 text-sm mb-6">
                  Your address helps us find the best debt relief options where you 
                  live, including protections and benefits.
                </p>
                
                {!isManualEntry ? (
                  <>
                    {/* Smart Address Autocomplete */}
                    <AddressAutocomplete 
                      onAddressSelect={handleAddressSelect}
                      error={errors.address}
                    />
                    
                    {/* Manual entry link */}
                    <button
                      type="button"
                      onClick={enableManualEntry}
                      className="mt-2 text-sm text-primary-700 hover:text-primary-750 underline flex items-center gap-1"
                    >
                      <Edit3 className="w-3 h-3" />
                      Enter address manually
                    </button>
                    
                    {/* Expanded fields after selection */}
                    {selectedAddress && (
                      <div className="mt-6 space-y-4 animate-fade-in">
                        {/* Street Address - pre-filled, editable */}
                        <Input
                          label="Street Address"
                          value={selectedAddress.street}
                          onChange={(e) => updateAddressField('street', e.target.value)}
                          error={errors.street}
                        />
                        
                        {/* City, State, ZIP in a row */}
                        <div className="grid grid-cols-3 gap-3">
                          <Input
                            label="City"
                            value={selectedAddress.city}
                            onChange={(e) => updateAddressField('city', e.target.value)}
                            error={errors.city}
                          />
                          <Input
                            label="State"
                            value={selectedAddress.state}
                            onChange={(e) => updateAddressField('state', e.target.value)}
                            error={errors.state}
                          />
                          <Input
                            label="ZIP Code"
                            value={selectedAddress.zip}
                            onChange={(e) => updateAddressField('zip', e.target.value)}
                            maxLength={5}
                            error={errors.zip}
                          />
                        </div>
                        
                        {/* Apt/Suite - always optional */}
                        <Input
                          label="Apt, suite, etc. (optional)"
                          placeholder="Apartment 4B"
                          value={selectedAddress.apt || ''}
                          onChange={(e) => updateAddressField('apt', e.target.value)}
                        />
                      </div>
                    )}
                  </>
                ) : (
                  /* Manual Entry Mode */
                  <div className="space-y-4 animate-fade-in">
                    {/* Link to switch back to autocomplete */}
                    <button
                      type="button"
                      onClick={enableAutocomplete}
                      className="text-sm text-primary-700 hover:text-primary-750 underline flex items-center gap-1 mb-2"
                    >
                      <Search className="w-3 h-3" />
                      Use address search instead
                    </button>
                    
                    <Input
                      label="Street Address"
                      placeholder="123 Main Street"
                      value={manualStreet}
                      onChange={(e) => setManualStreet(e.target.value)}
                      error={errors.street}
                    />
                    
                    {/* City, State, ZIP in a row */}
                    <div className="grid grid-cols-3 gap-3">
                      <Input
                        label="City"
                        placeholder="New York"
                        value={manualCity}
                        onChange={(e) => setManualCity(e.target.value)}
                        error={errors.city}
                      />
                      <Input
                        label="State"
                        placeholder="NY"
                        value={manualState}
                        onChange={(e) => setManualState(e.target.value)}
                        maxLength={2}
                        error={errors.state}
                      />
                      <Input
                        label="ZIP Code"
                        placeholder="10001"
                        value={manualZip}
                        onChange={(e) => setManualZip(e.target.value)}
                        maxLength={5}
                        error={errors.zip}
                      />
                    </div>
                    
                    {/* Apt/Suite - always optional */}
                    <Input
                      label="Apt, suite, etc. (optional)"
                      placeholder="Apartment 4B"
                      value={manualApt}
                      onChange={(e) => setManualApt(e.target.value)}
                    />
                  </div>
                )}
                
                {/* Submit Button - Sticky on mobile */}
                <StickyButtonContainer className="mt-6">
                  <Button 
                    type="submit" 
                    fullWidth 
                    className={cn(
                      !isManualEntry && !selectedAddress && 'opacity-50'
                    )}
                    disabled={!isManualEntry && !selectedAddress}
                  >
                    See Your Options
                  </Button>
                </StickyButtonContainer>
                
                {/* Privacy Note */}
                <p className="text-xs text-neutral-500 mt-4 text-center">
                  Your address is used to verify your identity and find location-specific 
                  debt relief options. We never share your address with third parties 
                  without your consent.
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>
      
      {/* Trust Badges */}
      <TrustBadges />
      
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default AddressScreen
