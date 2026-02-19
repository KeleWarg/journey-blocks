'use client'

import * as React from 'react'
import {
  CreditCard,
  Banknote,
  Home,
  Calendar,
  CheckCircle2,
  Shield,
  Check,
  Users,
  Star,
  Quote,
  Phone,
  Lock,
  Handshake,
  TrendingDown,
  AlertTriangle,
  HelpCircle,
  Gift,
  Clock,
  MapPin,
  ChevronDown,
  ChevronRight,
  Info,
  Lightbulb,
  FileText,
  TrendingUp,
  Layers,
} from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/Select'
import { Checkbox } from '@/components/ui/Checkbox'
import { Slider } from '@/components/ui/Slider'
import {
  RadioGroup,
  RadioCard,
  RadioGridCard,
  RadioListItem,
} from '@/components/ui/RadioCard'
import { DatePicker } from '@/components/ui/DatePicker'
import { Tooltip } from '@/components/ui/Tooltip'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { LottieIcon } from '@/components/ui/LottieIcon'
import { Starburst } from '@/components/ui/Starburst'
import { USMap } from '@/components/ui/USMap'
import { AddressAutocomplete } from '@/components/ui/AddressAutocomplete'
import { OTPVerificationModal } from '@/components/ui/OTPVerificationModal'
import { StickyButtonContainer } from '@/components/ui/StickyButtonContainer'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { TrustBadges } from '@/components/layout/TrustBadges'
import { ProgressIndicator } from '@/components/layout/ProgressIndicator'
import { FormLayout } from '@/components/layout/FormLayout'

import { cn, formatCurrency } from '@/lib/utils'

import creditCardAnimation from '../../../public/lottie/credit-card.json'

// ---------------------------------------------------------------------------
// Navigation data
// ---------------------------------------------------------------------------
type NavSection = { id: string; label: string; children: { id: string; label: string }[] }

const NAV: NavSection[] = [
  {
    id: 'primitives',
    label: 'Primitives',
    children: [
      { id: 'primitives-showcase', label: 'All Primitives' },
    ],
  },
  {
    id: 'layouts',
    label: 'Layouts',
    children: [
      { id: 'form-layout', label: 'FormLayout' },
      { id: 'educational-layout', label: 'Educational' },
      { id: 'pattern-form', label: 'Context Form' },
      { id: 'pattern-interstitial', label: 'Interstitial' },
    ],
  },
  {
    id: 'disclaimers',
    label: 'Disclaimers',
    children: [
      { id: 'privacy-note', label: 'Privacy Note' },
      { id: 'reassurance', label: 'Reassurance' },
      { id: 'legal-consent', label: 'Legal Consent Block' },
    ],
  },
  {
    id: 'content-blocks',
    label: 'Content Blocks',
    children: [
      { id: 'qualification-message', label: 'Qualification Message' },
      { id: 'badge-banner', label: 'Badge Banner' },
      { id: 'trust-stats-row', label: 'Trust Stats Row' },
    ],
  },
  {
    id: 'composed',
    label: 'Composed Blocks',
    children: [
      { id: 'context-card', label: 'Context Card' },
    ],
  },
  {
    id: 'social-proof',
    label: 'Social Proof',
    children: [
      { id: 'social-proof-overlay', label: 'Social Proof Overlay' },
      { id: 'trust-indicators', label: 'Trust Indicators' },
    ],
  },
  {
    id: 'widgets',
    label: 'Widgets',
    children: [
      { id: 'map-widget', label: 'Map Widget' },
      { id: 'address-autocomplete', label: 'AddressAutocomplete' },
      { id: 'otp-modal', label: 'OTPVerificationModal' },
    ],
  },
  {
    id: 'results-page',
    label: 'Results Page',
    children: [
      { id: 'pattern-results', label: 'Results / Profile' },
      { id: 'urgency-banner', label: 'Urgency Banner' },
      { id: 'partner-match-card', label: 'Partner Match Card' },
      { id: 'what-to-expect', label: 'What to Expect' },
      { id: 'faq-accordion', label: 'FAQ Accordion' },
      { id: 'educational-steps', label: 'Educational Steps' },
      { id: 'call-cta-card', label: 'Call CTA Card' },
    ],
  },
]

// ---------------------------------------------------------------------------
// Specimen card wrapper
// ---------------------------------------------------------------------------
function Specimen({
  id,
  title,
  description,
  children,
  className,
}: {
  id: string
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section id={id} className="scroll-mt-20 mb-12">
      <h3 className="text-lg font-semibold text-neutral-900 mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-neutral-500 mb-4">{description}</p>
      )}
      <div
        className={cn(
          'border border-neutral-200 rounded-xl bg-white p-6 overflow-hidden',
          className
        )}
      >
        {children}
      </div>
    </section>
  )
}

function SectionHeader({ id, label }: { id: string; label: string }) {
  return (
    <h2
      id={id}
      className="scroll-mt-20 text-xs font-bold uppercase tracking-widest text-neutral-400 mt-16 mb-6 first:mt-0"
    >
      {label}
    </h2>
  )
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------
export default function ShowcasePage() {
  const [activeId, setActiveId] = React.useState<string>('')

  // Scroll spy
  React.useEffect(() => {
    const ids = NAV.flatMap((s) => [s.id, ...s.children.map((c) => c.id)])
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0 border-r border-neutral-200 bg-white sticky top-0 h-screen overflow-y-auto">
        <div className="p-4 border-b border-neutral-200">
          <p className="text-sm font-bold text-neutral-900">Component Showcase</p>
          <p className="text-xs text-neutral-500 mt-0.5">Lead Gen Funnel</p>
        </div>
        <nav className="p-3 text-sm">
          {NAV.map((section) => (
            <div key={section.id} className="mb-3">
              <a
                href={`#${section.id}`}
                className={cn(
                  'block px-2 py-1 rounded text-xs font-bold uppercase tracking-wider',
                  activeId === section.id
                    ? 'text-primary-700'
                    : 'text-neutral-400 hover:text-neutral-600'
                )}
              >
                {section.label}
              </a>
              <div className="ml-2 mt-0.5">
                {section.children.map((child) => (
                  <a
                    key={child.id}
                    href={`#${child.id}`}
                    className={cn(
                      'block px-2 py-1 rounded text-[13px] transition-colors',
                      activeId === child.id
                        ? 'text-primary-700 bg-primary-300/50 font-medium'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                    )}
                  >
                    {child.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* Mobile top nav */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-neutral-200 overflow-x-auto">
        <div className="flex gap-1 px-3 py-2 min-w-max">
          {NAV.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors',
                activeId === section.id || section.children.some((c) => c.id === activeId)
                  ? 'bg-primary-700 text-white'
                  : 'bg-neutral-100 text-neutral-600'
              )}
            >
              {section.label}
            </a>
          ))}
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-8 pt-16 lg:pt-8">
        <div className="mb-12">
          <h1 className="text-2xl font-bold text-neutral-900">Component Showcase</h1>
          <p className="text-neutral-500 mt-1">
            Every primitive, block, and page pattern used in the lead generation journey.
          </p>
        </div>

        {/* ================================================================ */}
        {/* PRIMITIVES                                                       */}
        {/* ================================================================ */}
        <SectionHeader id="primitives" label="Primitives" />

        <PrimitivesSpecimen />

        {/* ================================================================ */}
        {/* LAYOUTS                                                          */}
        {/* ================================================================ */}
        <SectionHeader id="layouts" label="Layouts" />

        <FormLayoutSpecimen />
        <EducationalLayoutSpecimen />
        <FormCapturePatternSpecimen />
        <InterstitialPatternSpecimen />

        {/* ================================================================ */}
        {/* DISCLAIMERS                                                      */}
        {/* ================================================================ */}
        <SectionHeader id="disclaimers" label="Disclaimers" />

        <PrivacyNoteSpecimen />
        <ReassuranceSpecimen />
        <LegalConsentSpecimen />

        {/* ================================================================ */}
        {/* CONTENT BLOCKS                                                   */}
        {/* ================================================================ */}
        <SectionHeader id="content-blocks" label="Content Blocks" />

        <QualificationMessageSpecimen />
        <BadgeBannerSpecimen />
        <TrustStatsRowSpecimen />

        {/* ================================================================ */}
        {/* COMPOSED BLOCKS                                                  */}
        {/* ================================================================ */}
        <SectionHeader id="composed" label="Composed Blocks" />

        <ContextCardSpecimen />

        {/* ================================================================ */}
        {/* SOCIAL PROOF                                                     */}
        {/* ================================================================ */}
        <SectionHeader id="social-proof" label="Social Proof" />

        <SocialProofOverlaySpecimen />
        <TrustIndicatorsSpecimen />

        {/* ================================================================ */}
        {/* WIDGETS                                                          */}
        {/* ================================================================ */}
        <SectionHeader id="widgets" label="Widgets" />

        <MapWidgetSpecimen />
        <AddressAutocompleteSpecimen />
        <OTPModalSpecimen />

        {/* ================================================================ */}
        {/* RESULTS PAGE                                                     */}
        {/* ================================================================ */}
        <ResultsPageSection />

        <div className="h-32" />
      </main>
    </div>
  )
}

// ===========================================================================
// PRIMITIVES
// ===========================================================================

function PrimitivesSpecimen() {
  const [activeTab, setActiveTab] = React.useState('button')
  const [selectVal, setSelectVal] = React.useState('')
  const [c1, setC1] = React.useState(false)
  const [c2, setC2] = React.useState(true)
  const [sliderVal, setSliderVal] = React.useState([25000])
  const [rv1, setRv1] = React.useState('a')
  const [rv2, setRv2] = React.useState('x')
  const [rv3, setRv3] = React.useState('1')
  const [dateVal, setDateVal] = React.useState('')
  const [counterVal, setCounterVal] = React.useState(5340)
  const [burstActive, setBurstActive] = React.useState(false)

  const tabs = [
    { key: 'button', label: 'Button' },
    { key: 'input', label: 'Input' },
    { key: 'select', label: 'Select' },
    { key: 'checkbox', label: 'Checkbox' },
    { key: 'slider', label: 'Slider' },
    { key: 'radio', label: 'RadioCard' },
    { key: 'date', label: 'DatePicker' },
    { key: 'tooltip', label: 'Tooltip' },
    { key: 'counter', label: 'Counter' },
    { key: 'lottie', label: 'Lottie' },
    { key: 'starburst', label: 'Starburst' },
  ]

  return (
    <Specimen
      id="primitives-showcase"
      title="Primitives"
      description="All base-level UI components. Use the tabs to cycle through each primitive."
    >
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
              activeTab === t.key
                ? 'bg-primary-700 text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Button */}
      {activeTab === 'button' && (
        <div className="space-y-6">
          <div>
            <p className="text-xs font-medium text-neutral-400 uppercase mb-3">Variants</p>
            <div className="flex flex-wrap gap-3 items-center">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-neutral-400 uppercase mb-3">Sizes</p>
            <div className="flex flex-wrap gap-3 items-center">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-neutral-400 uppercase mb-3">States</p>
            <div className="flex flex-wrap gap-3 items-center">
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
              <Button showTrailingIcon>With Arrow</Button>
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-neutral-400 uppercase mb-3">Full Width</p>
            <Button fullWidth>Full Width Button</Button>
          </div>
        </div>
      )}

      {/* Input */}
      {activeTab === 'input' && (
        <div className="space-y-4 max-w-sm">
          <Input label="Default" placeholder="Enter text..." />
          <Input label="With hint" hint="We'll never share this." placeholder="you@example.com" />
          <Input label="With error" error="This field is required" placeholder="Required..." />
          <Input label="With suffix" suffix={<span className="text-neutral-400">/year</span>} placeholder="50,000" />
          <Input label="Disabled" disabled placeholder="Can't edit" />
        </div>
      )}

      {/* Select */}
      {activeTab === 'select' && (
        <div className="space-y-4 max-w-sm">
          <div>
            <p className="text-xs font-medium text-neutral-400 uppercase mb-2">Default</p>
            <Select value={selectVal} onValueChange={setSelectVal}>
              <SelectTrigger>
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CA">California</SelectItem>
                <SelectItem value="NY">New York</SelectItem>
                <SelectItem value="TX">Texas</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <p className="text-xs font-medium text-neutral-400 uppercase mb-2">Error State</p>
            <Select>
              <SelectTrigger error>
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CA">California</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Checkbox */}
      {activeTab === 'checkbox' && (
        <div className="space-y-4">
          <Checkbox checked={c1} onCheckedChange={() => setC1(!c1)} label="Unchecked" />
          <Checkbox checked={c2} onCheckedChange={() => setC2(!c2)} label="Checked" />
          <Checkbox
            checked={false}
            onCheckedChange={() => {}}
            label={
              <span>
                I agree to the{' '}
                <a href="#" className="text-primary-700 underline">Terms of Service</a>{' '}
                and <a href="#" className="text-primary-700 underline">Privacy Policy</a>
              </span>
            }
          />
          <Checkbox checked={false} disabled label="Disabled" />
        </div>
      )}

      {/* Slider */}
      {activeTab === 'slider' && (
        <div className="max-w-md space-y-4">
          <div className="text-center py-2">
            <p className="text-[56px] font-display leading-none text-neutral-900">{formatCurrency(sliderVal[0])}</p>
            <p className="text-sm text-feedback-success mt-2">&#8595; Save up to <span className="font-bold">{formatCurrency(Math.round(sliderVal[0] * 0.4))}</span></p>
          </div>
          <Slider
            min={5000}
            max={100000}
            step={1000}
            value={sliderVal}
            onValueChange={setSliderVal}
            showValue={false}
            markers={[
              { value: 5000, label: '$5K' },
              { value: 25000, label: '$25K' },
              { value: 50000, label: '$50K' },
              { value: 75000, label: '$75K' },
              { value: 100000, label: '$100K+' },
            ]}
          />
        </div>
      )}

      {/* RadioCard */}
      {activeTab === 'radio' && (
        <div className="space-y-8">
          <div>
            <p className="text-xs font-medium text-neutral-400 uppercase mb-3">RadioCard</p>
            <RadioGroup value={rv1} onValueChange={setRv1} className="flex flex-col gap-3">
              <RadioCard value="a" icon={<CreditCard className="w-6 h-6" />}>Option A</RadioCard>
              <RadioCard value="b" icon={<Banknote className="w-6 h-6" />}>Option B</RadioCard>
              <RadioCard value="c">Both</RadioCard>
            </RadioGroup>
          </div>
          <div>
            <p className="text-xs font-medium text-neutral-400 uppercase mb-3">RadioGridCard</p>
            <RadioGroup value={rv2} onValueChange={setRv2} className="grid grid-cols-3 gap-3">
              <RadioGridCard value="x" icon={<Home className="w-5 h-5" />}>Studio</RadioGridCard>
              <RadioGridCard value="y" icon={<Home className="w-5 h-5" />}>1 Bedroom</RadioGridCard>
              <RadioGridCard value="z" icon={<Home className="w-5 h-5" />}>2 Bedroom</RadioGridCard>
            </RadioGroup>
          </div>
          <div>
            <p className="text-xs font-medium text-neutral-400 uppercase mb-3">RadioListItem</p>
            <RadioGroup value={rv3} onValueChange={setRv3}>
              <RadioListItem value="1" icon={<Calendar className="w-4 h-4" />} tag="Most popular">
                Within 2 weeks
              </RadioListItem>
              <RadioListItem value="2" icon={<Calendar className="w-4 h-4" />} tag="Save 10%" tagVariant="success">
                2-4 weeks
              </RadioListItem>
              <RadioListItem value="3" icon={<Calendar className="w-4 h-4" />}>
                1+ month
              </RadioListItem>
            </RadioGroup>
          </div>
        </div>
      )}

      {/* DatePicker */}
      {activeTab === 'date' && (
        <div className="max-w-xs">
          <DatePicker value={dateVal} onChange={setDateVal} label="Select a date" placeholder="MM/DD/YYYY" />
        </div>
      )}

      {/* Tooltip */}
      {activeTab === 'tooltip' && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-neutral-800">Key Score</span>
          <Tooltip content="This ratio compares your total obligations to your annual income.">
            <Info className="w-4 h-4 text-neutral-400 cursor-help" />
          </Tooltip>
        </div>
      )}

      {/* AnimatedCounter */}
      {activeTab === 'counter' && (
        <div className="flex items-center gap-6">
          <AnimatedCounter value={counterVal} prefix="$" className="text-2xl font-bold text-neutral-800" duration={800} />
          <Button size="sm" variant="secondary" onClick={() => setCounterVal(counterVal === 5340 ? 8920 : 5340)}>
            Toggle Value
          </Button>
        </div>
      )}

      {/* LottieIcon */}
      {activeTab === 'lottie' && (
        <div className="w-24 h-24">
          <LottieIcon animationData={creditCardAnimation} className="w-full h-full" />
        </div>
      )}

      {/* Starburst */}
      {activeTab === 'starburst' && (
        <div className="flex items-center gap-6">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <Starburst active={burstActive} />
          </div>
          <Button size="sm" variant="secondary" onClick={() => { setBurstActive(true); setTimeout(() => setBurstActive(false), 500) }}>
            Trigger
          </Button>
        </div>
      )}
    </Specimen>
  )
}

// ===========================================================================
// LAYOUT
// ===========================================================================

function FormLayoutSpecimen() {
  const [supportOpen, setSupportOpen] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState<'input' | 'radio' | 'slider'>('input')
  const [radioVal, setRadioVal] = React.useState('')
  const [sliderVal, setSliderVal] = React.useState([35000])
  const supportRef = React.useRef<HTMLDivElement>(null)

  const handleSupportClick = () => {
    setSupportOpen(true)
    setTimeout(() => {
      supportRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  const sideContent = (
    <button
      type="button"
      onClick={handleSupportClick}
      className="w-full bg-neutral-100 rounded-lg p-3 text-center hover:bg-neutral-200 transition-colors"
    >
      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-700">
        Support Blocks
        <ChevronDown className="w-4 h-4" />
      </span>
      <p className="text-xs text-neutral-500 mt-1">Click to expand below</p>
    </button>
  )

  const tabs = [
    { key: 'input' as const, label: 'Text Input' },
    { key: 'radio' as const, label: 'Radio Cards' },
    { key: 'slider' as const, label: 'Slider' },
  ]

  return (
    <Specimen
      id="form-layout"
      title="FormLayout"
      description="Full page wrapper composing Header, ProgressIndicator, centered content well, optional side content, TrustBadges, and Footer. Every form and interstitial screen uses this."
      className="p-0"
    >
      {/* Tab switcher */}
      <div className="flex gap-2 px-6 pt-6 pb-3">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
              activeTab === t.key
                ? 'bg-primary-700 text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Live preview */}
      <div className="h-[520px] overflow-y-auto rounded-lg border border-neutral-200 mx-6">
        {activeTab === 'input' && (
          <FormLayout currentStep={5} onBack={() => {}} sideContent={sideContent}>
            <div className="space-y-4 has-sticky-button">
              <h1 className="font-display text-display text-neutral-900 text-center">Sample Headline</h1>
              <p className="text-body text-neutral-500 text-center">Supporting description text explaining what this step collects and why it matters.</p>
              <Input label="Email address" placeholder="you@example.com" />
              <StickyButtonContainer>
                <Button fullWidth showTrailingIcon>Continue</Button>
              </StickyButtonContainer>
              <p className="text-xs text-neutral-400 text-center">Your info is encrypted and secure.</p>
            </div>
          </FormLayout>
        )}

        {activeTab === 'radio' && (
          <FormLayout currentStep={2} onBack={() => {}} sideContent={sideContent}>
            <div className="space-y-6 has-sticky-button">
              <h1 className="font-display text-display text-neutral-900 text-center">Select an option</h1>
              <p className="text-body text-neutral-500 text-center">Choose the category that best describes your situation.</p>
              <RadioGroup value={radioVal} onValueChange={setRadioVal} className="grid grid-cols-3 gap-3">
                <RadioGridCard value="option-a" icon={<CreditCard className="w-6 h-6" />}>Option A</RadioGridCard>
                <RadioGridCard value="option-b" icon={<Banknote className="w-6 h-6" />}>Option B</RadioGridCard>
                <RadioGridCard value="option-c" icon={<Layers className="w-6 h-6" />}>Both A &amp; B</RadioGridCard>
              </RadioGroup>
            </div>
          </FormLayout>
        )}

        {activeTab === 'slider' && (
          <FormLayout currentStep={3} onBack={() => {}} sideContent={sideContent}>
            <div className="space-y-6 has-sticky-button">
              <h1 className="font-display text-display text-neutral-900 text-center">Sample Headline</h1>
              <p className="text-body text-neutral-500 text-center">Drag to estimate your total</p>
              <div className="text-center py-4">
                <p className="text-[56px] font-display leading-none text-neutral-900">${sliderVal[0].toLocaleString()}</p>
                <p className="text-sm text-feedback-success mt-2">&#8595; Save up to <span className="font-bold">${Math.round(sliderVal[0] * 0.4).toLocaleString()}</span></p>
              </div>
              <Slider
                min={5000}
                max={100000}
                step={1000}
                value={sliderVal}
                onValueChange={setSliderVal}
                showValue={false}
                markers={[
                  { value: 5000, label: '$5K' },
                  { value: 25000, label: '$25K' },
                  { value: 50000, label: '$50K' },
                  { value: 75000, label: '$75K' },
                  { value: 100000, label: '$100K+' },
                ]}
              />
              <StickyButtonContainer>
                <Button fullWidth showTrailingIcon>Continue</Button>
              </StickyButtonContainer>
              <p className="text-xs text-neutral-400 text-center">*This is an estimate. Your actual amount is subject to change due to a variety of factors.</p>
            </div>
          </FormLayout>
        )}

      </div>

      {/* Sub-component dropdowns */}
      <div className="mt-6 space-y-3 px-6">
        <p className="text-xs font-medium text-neutral-400 uppercase">Sub-components</p>

        <SubComponentDropdown label="Header">
          <div className="space-y-4 -mx-4">
            <div>
              <p className="text-xs font-medium text-neutral-400 uppercase mb-2 px-4">Default</p>
              <Header />
            </div>
            <div>
              <p className="text-xs font-medium text-neutral-400 uppercase mb-2 px-4">With trust text</p>
              <Header trustText="Trusted by XXk+ people" />
            </div>
          </div>
        </SubComponentDropdown>

        <SubComponentDropdown label="ProgressIndicator">
          <div className="space-y-6">
            <div>
              <p className="text-xs font-medium text-neutral-400 uppercase mb-3">Segmented (step 5 of 11)</p>
              <ProgressIndicator currentStep={5} onBack={() => {}} />
            </div>
            <div>
              <p className="text-xs font-medium text-neutral-400 uppercase mb-3">Unified bar (step 3)</p>
              <ProgressIndicator currentStep={3} unified onBack={() => {}} />
            </div>
          </div>
        </SubComponentDropdown>

        <SubComponentDropdown label="StickyButtonContainer">
          <div className="space-y-3 max-w-sm">
            <StickyButtonContainer>
              <Button fullWidth showTrailingIcon>Continue</Button>
              <p className="text-sm text-gray-500 text-center mt-2">No impact to your score</p>
            </StickyButtonContainer>
            <p className="text-xs text-neutral-500 mt-2">Fixed to the bottom of the viewport on mobile. Inline on desktop. Handles keyboard offset.</p>
          </div>
        </SubComponentDropdown>

        <SubComponentDropdown label="TrustBadges">
          <div className="space-y-4 -mx-4">
            <div>
              <p className="text-xs font-medium text-neutral-400 uppercase mb-2 px-4">Default</p>
              <TrustBadges />
            </div>
            <div>
              <p className="text-xs font-medium text-neutral-400 uppercase mb-2 px-4">Longevity</p>
              <TrustBadges variant="longevity" />
            </div>
          </div>
        </SubComponentDropdown>

        <SubComponentDropdown label="Footer">
          <div className="-mx-4">
            <Footer />
          </div>
        </SubComponentDropdown>

        <div ref={supportRef} className="pt-4">
          <p className="text-xs font-medium text-neutral-400 uppercase mb-3">Support blocks (used within form pages)</p>
        </div>

        <SubComponentDropdown label="Support Box — Plain text (expandable)" forceOpen={supportOpen}>
          <div className="max-w-lg">
            <button
              type="button"
              className="inline-flex items-center gap-2 text-primary-700 text-sm font-medium hover:underline"
            >
              Why we ask for this information
              <ChevronDown className="w-4 h-4 text-primary-700" />
            </button>
            <div className="w-full bg-neutral-100 rounded-lg p-4 mt-2">
              <p className="text-sm text-neutral-800">
                This information helps us determine the best options for your situation.
                Providers use this data to create a personalized plan that fits your needs.
              </p>
              <p className="text-sm text-neutral-500 mt-2">
                Your information is kept confidential and only shared with potential partners.
              </p>
            </div>
          </div>
        </SubComponentDropdown>

        <SubComponentDropdown label="Support Box — Icon + text rows" forceOpen={supportOpen}>
          <div className="max-w-lg bg-neutral-100 rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-primary-700 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-neutral-900">Your data is secure</p>
                <p className="text-xs text-neutral-500">256-bit encryption protects all personal information.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-primary-700 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-neutral-900">Takes about 3 minutes</p>
                <p className="text-xs text-neutral-500">A few quick questions to match you with the right options.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary-700 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-neutral-900">No obligation</p>
                <p className="text-xs text-neutral-500">Compare options and decide what works best for you.</p>
              </div>
            </div>
          </div>
        </SubComponentDropdown>

        <SubComponentDropdown label="Support Box — 2-column grid" forceOpen={supportOpen}>
          <div className="max-w-lg">
            <h3 className="text-center text-lg font-bold text-neutral-900 mb-3">How it works</h3>
            <div className="w-full bg-[#FEF9EF] rounded-lg p-4 flex flex-col sm:flex-row items-stretch gap-4">
              <div className="flex-1 flex items-center gap-4">
                <Star className="w-6 h-6 text-neutral-900 flex-shrink-0" />
                <p className="text-sm text-neutral-900">Get matched with specialists who work on your behalf to find the best options</p>
              </div>
              <div className="h-px sm:h-auto sm:w-px bg-[#C0C0C0]" />
              <div className="flex-1 flex items-center gap-4">
                <CreditCard className="w-6 h-6 text-neutral-900 flex-shrink-0" />
                <p className="text-sm text-neutral-900">Simplify the process — work with one partner instead of juggling multiple providers</p>
              </div>
            </div>
          </div>
        </SubComponentDropdown>

        <SubComponentDropdown label="Support Box — 3-column grid" forceOpen={supportOpen}>
          <div className="max-w-lg">
            <div className="w-full bg-[#FEF9EF] rounded-lg p-4 flex flex-col sm:flex-row items-stretch gap-4">
              <div className="flex-1 flex items-center gap-3">
                <Users className="w-5 h-5 text-neutral-900 flex-shrink-0" />
                <p className="text-sm text-neutral-900">XM+ people matched with a partner</p>
              </div>
              <div className="h-px sm:h-auto sm:w-px bg-[#C0C0C0]" />
              <div className="flex-1 flex items-center gap-3">
                <Shield className="w-5 h-5 text-neutral-900 flex-shrink-0" />
                <p className="text-sm text-neutral-900">Vetted, accredited provider network</p>
              </div>
              <div className="h-px sm:h-auto sm:w-px bg-[#C0C0C0]" />
              <div className="flex-1 flex items-center gap-3">
                <Gift className="w-5 h-5 text-neutral-900 flex-shrink-0" />
                <p className="text-sm text-neutral-900">Free consultation, no upfront fees</p>
              </div>
            </div>
          </div>
        </SubComponentDropdown>
      </div>
    </Specimen>
  )
}

function EducationalLayoutSpecimen() {
  const [activeTab, setActiveTab] = React.useState<'results' | 'content-box'>('results')

  const tabs = [
    { key: 'results' as const, label: 'Results' },
    { key: 'content-box' as const, label: 'Content Box' },
  ]

  return (
    <Specimen
      id="educational-layout"
      title="Educational"
      description="Informational page layout for results, qualification screens, and educational content. No side content — full-width content well."
      className="p-0"
    >
      {/* Tab switcher */}
      <div className="flex gap-2 px-6 pt-6 pb-3">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
              activeTab === t.key
                ? 'bg-primary-700 text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Live preview */}
      <div className="h-[600px] overflow-y-auto rounded-lg border border-neutral-200 mx-6">
        {activeTab === 'results' && (
          <FormLayout currentStep={7} onBack={() => {}}>
            <div className="space-y-6 has-sticky-button text-center">
              <div className="flex justify-center">
                <div className="w-16 h-16">
                  <LottieIcon animationData={creditCardAnimation} className="w-full h-full" />
                </div>
              </div>

              <div>
                <h1 className="font-display text-display text-neutral-900">Good news — here&apos;s what we found.</h1>
                <p className="text-body text-neutral-500 mt-3">
                  Based on your $XX,XXX in estimated obligations and $XX,XXX income, you could be a strong candidate.
                </p>
              </div>

              <div className="bg-primary-300 rounded-xl p-6">
                <p className="text-sm text-neutral-600">You could save up to</p>
                <p className="text-[48px] font-display leading-none text-primary-700 mt-1">$X,XXX<span className="text-lg align-super">*</span></p>
                <p className="text-sm text-neutral-800 mt-3">and complete your plan in as little as <span className="font-bold">36 months</span></p>
              </div>

              <p className="text-body text-neutral-600">
                Your ratio of 50% shows you&apos;re carrying significant obligations relative to income — which is exactly what these programs are designed to help with.
              </p>

              <p className="text-xs text-neutral-400">*Estimated savings. Actual results vary based on your specific situation and enrolled program.</p>

              <StickyButtonContainer>
                <Button fullWidth showTrailingIcon>See my profile</Button>
              </StickyButtonContainer>
            </div>
          </FormLayout>
        )}

        {activeTab === 'content-box' && (
          <FormLayout currentStep={4} onBack={() => {}}>
            <div className="space-y-6 has-sticky-button text-center">
              <div className="flex justify-center">
                <div className="w-16 h-16">
                  <LottieIcon animationData={creditCardAnimation} className="w-full h-full" />
                </div>
              </div>

              <div>
                <h1 className="font-display text-display text-neutral-900">Over XXM people are working to improve their situation.</h1>
                <p className="text-body text-feedback-success font-medium mt-2">The good news? Thousands have found relief.</p>
              </div>

              <div className="bg-white border border-neutral-200 rounded-lg p-5 space-y-5 text-left">
                <div>
                  <h3 className="text-base font-semibold text-neutral-900">Why this matters</h3>
                  <p className="text-sm text-neutral-500 mt-1">Here&apos;s what the data says about people in a similar situation.</p>
                </div>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2.5">
                    <CreditCard className="w-5 h-5 text-primary-700 flex-shrink-0" />
                    <span className="text-sm text-neutral-800">Avg. balance: $X,XXX</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <TrendingUp className="w-5 h-5 text-primary-700 flex-shrink-0" />
                    <span className="text-sm text-neutral-800">Avg. rate: XX.X%</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Users className="w-5 h-5 text-primary-700 flex-shrink-0" />
                    <span className="text-sm text-neutral-800">XM+ people in similar programs</span>
                  </div>
                </div>
                <div className="h-px bg-neutral-200" />
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-neutral-900">What you&apos;ll get:</p>
                  {['Personalized recommendations', 'Side-by-side comparison', 'No obligation — compare and decide'].map((t, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-feedback-success flex-shrink-0" />
                      <p className="text-sm text-neutral-800">{t}</p>
                    </div>
                  ))}
                </div>
                <div className="h-px bg-neutral-200" />
                <div className="bg-secondary-300 border-l-4 border-secondary-500 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Lightbulb className="w-4 h-4 text-secondary-500" />
                    <p className="text-sm font-semibold text-neutral-800">Did you know?</p>
                  </div>
                  <p className="text-xs text-neutral-800">The average person pays over $X,XXX a year in unnecessary fees.</p>
                  <p className="text-xs text-neutral-500 mt-1">Source: Sample Source</p>
                </div>
              </div>

              <StickyButtonContainer>
                <Button fullWidth showTrailingIcon>Continue</Button>
              </StickyButtonContainer>

              <p className="text-xs text-neutral-400">*Average rates and balances subject to change.</p>
            </div>
          </FormLayout>
        )}
      </div>

      {/* Sub-component dropdowns */}
      <div className="mt-6 space-y-3 px-6 pb-6">
        <p className="text-xs font-medium text-neutral-400 uppercase">Sub-components</p>

        <SubComponentDropdown label="Content Box (composed block)">
          <div className="space-y-4">
            <div className="max-w-md">
              <div className="bg-white border border-neutral-200 rounded-lg p-5 space-y-5">
                <div>
                  <h3 className="text-base font-semibold text-neutral-900">Why this matters</h3>
                  <p className="text-sm text-neutral-500 mt-1">Here&apos;s what the data says about people in a similar situation.</p>
                </div>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2.5">
                    <CreditCard className="w-5 h-5 text-primary-700 flex-shrink-0" />
                    <span className="text-sm text-neutral-800">Avg. balance: $X,XXX</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <TrendingUp className="w-5 h-5 text-primary-700 flex-shrink-0" />
                    <span className="text-sm text-neutral-800">Avg. rate: XX.X%</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Users className="w-5 h-5 text-primary-700 flex-shrink-0" />
                    <span className="text-sm text-neutral-800">XM+ people in similar programs</span>
                  </div>
                </div>
                <div className="h-px bg-neutral-200" />
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-neutral-900">What you&apos;ll get:</p>
                  {['Personalized recommendations', 'Side-by-side comparison', 'No obligation — compare and decide'].map((t, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-feedback-success flex-shrink-0" />
                      <p className="text-sm text-neutral-800">{t}</p>
                    </div>
                  ))}
                </div>
                <div className="h-px bg-neutral-200" />
                <div className="bg-secondary-300 border-l-4 border-secondary-500 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Lightbulb className="w-4 h-4 text-secondary-500" />
                    <p className="text-sm font-semibold text-neutral-800">Did you know?</p>
                  </div>
                  <p className="text-xs text-neutral-800">The average person pays over $X,XXX a year in unnecessary fees.</p>
                  <p className="text-xs text-neutral-500 mt-1">Source: Sample Source</p>
                </div>
              </div>
            </div>

            <p className="text-xs font-medium text-neutral-400 uppercase pt-2">Content Box sub-components</p>
            <SubComponentDropdown label="Icon + Stat Row">
              <div className="space-y-2">
                <div className="flex items-center gap-2"><CreditCard className="w-5 h-5 text-primary-700 flex-shrink-0" /><span className="text-sm text-neutral-800">Avg. balance: $X,XXX</span></div>
                <div className="flex items-center gap-2"><TrendingUp className="w-5 h-5 text-primary-700 flex-shrink-0" /><span className="text-sm text-neutral-800">Avg. rate: XX.X%</span></div>
                <div className="flex items-center gap-2"><Users className="w-5 h-5 text-primary-700 flex-shrink-0" /><span className="text-sm text-neutral-800">XM+ people in similar programs</span></div>
              </div>
            </SubComponentDropdown>
            <SubComponentDropdown label="Value Checklist">
              <div className="space-y-2 max-w-sm">
                <p className="text-sm font-semibold text-neutral-900 mb-3">Verify to unlock:</p>
                {['Personalized recommendations', 'Side-by-side partner comparison', 'No obligation — compare and decide'].map((t, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-feedback-success flex-shrink-0" />
                    <p className="text-sm text-neutral-800">{t}</p>
                  </div>
                ))}
              </div>
            </SubComponentDropdown>
            <SubComponentDropdown label={'"Did You Know" Callout'}>
              <div className="max-w-md">
                <div className="bg-secondary-300 border-l-4 border-secondary-500 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-4 h-4 text-secondary-500" />
                    <p className="font-semibold text-neutral-800">Did you know?</p>
                  </div>
                  <p className="text-sm text-neutral-800">
                    The average person pays over $X,XXX a year in unnecessary fees — that&apos;s more than most monthly bills.
                  </p>
                  <p className="text-xs text-neutral-500 mt-2">Source: Sample Source</p>
                </div>
              </div>
            </SubComponentDropdown>
          </div>
        </SubComponentDropdown>

        <SubComponentDropdown label="Lottie Icon">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16">
              <LottieIcon animationData={creditCardAnimation} className="w-full h-full" />
            </div>
            <p className="text-xs text-neutral-500">Animated icon placed above the headline to set context for the page.</p>
          </div>
        </SubComponentDropdown>

        <SubComponentDropdown label="StickyButtonContainer">
          <div className="max-w-sm">
            <StickyButtonContainer>
              <Button fullWidth showTrailingIcon>See my profile</Button>
            </StickyButtonContainer>
            <p className="text-xs text-neutral-500 mt-2">Fixed to the bottom of the viewport on mobile. Inline on desktop.</p>
          </div>
        </SubComponentDropdown>

        <SubComponentDropdown label="Disclaimer / Sub-copy">
          <div className="max-w-md space-y-3">
            <p className="text-body text-neutral-600 text-center">
              Your ratio of 50% shows you&apos;re carrying significant obligations relative to income — which is exactly what these programs are designed to help with.
            </p>
            <p className="text-xs text-neutral-400 text-center">*Estimated savings. Actual results vary based on your specific situation and enrolled program.</p>
          </div>
        </SubComponentDropdown>
      </div>
    </Specimen>
  )
}

// ===========================================================================
// WIDGETS
// ===========================================================================

function MapWidgetSpecimen() {
  const [selected, setSelected] = React.useState<string | null>('California')
  const [hovered, setHovered] = React.useState<string | null>(null)
  return (
    <Specimen
      id="map-widget"
      title="Map Widget"
      description="Master map block: interactive USMap + regional stats panel + reassurance badge. The USMap primitive handles state selection and hover."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assembled widget */}
        <div>
          <div className="relative pt-6">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
              <div className="inline-flex items-center gap-2 rounded bg-secondary-500 px-2 py-1">
                <span className="text-xs leading-4 text-neutral-900 font-medium whitespace-nowrap">
                  Better outcomes &bull; No obligations &bull; 3 minutes
                </span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-6 mt-8">
              <div className="flex justify-center w-full flex-[3]">
                <USMap
                  selectedState={selected}
                  hoveredState={hovered}
                  onStateSelect={setSelected}
                  onStateHover={setHovered}
                  className="w-full max-w-sm"
                />
              </div>
              <div className="py-2 flex flex-col gap-4 justify-center min-w-[180px]">
                <span className="text-sm font-medium text-primary-700">{selected || 'Select a state'}</span>
                <div className="flex flex-col gap-1">
                  <div className="text-xs font-normal text-neutral-500">Sample stat A:</div>
                  <AnimatedCounter value={5340} prefix="$" className="font-display text-xl font-bold text-neutral-800" duration={800} />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-xs font-normal text-neutral-500">Sample stat B:</div>
                  <AnimatedCounter value={6973} prefix="$" className="font-display text-xl font-bold text-neutral-800" duration={800} />
                </div>
                <div className="text-[10px] text-neutral-400 mt-1">Source: Sample Source</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-component breakdown */}
        <div>
          <p className="text-xs font-medium text-neutral-400 uppercase mb-3">Sub-components</p>
          <div className="space-y-2">
            {[
              { label: 'USMap', desc: 'SVG map with state selection, hover, and highlight' },
              { label: 'AnimatedCounter', desc: 'Counts up to target value with formatting' },
              { label: 'Badge Banner', desc: 'Reassurance strip above the map' },
            ].map((sub) => (
              <div key={sub.label} className="flex items-center gap-2 text-sm">
                <span className="font-medium text-neutral-800">{sub.label}</span>
                <span className="text-neutral-400">— {sub.desc}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-neutral-500 mt-4">
            The stats panel and layout container are part of the Map Widget.
            USMap can also be used standalone for simple state pickers.
          </p>
        </div>
      </div>
    </Specimen>
  )
}

function AddressAutocompleteSpecimen() {
  return (
    <Specimen
      id="address-autocomplete"
      title="AddressAutocomplete"
      description="Smart address input with autocomplete suggestions and parsed result."
    >
      <div className="max-w-sm">
        <AddressAutocomplete onAddressSelect={(addr) => console.log(addr)} />
      </div>
    </Specimen>
  )
}

function OTPModalSpecimen() {
  const [open, setOpen] = React.useState(false)
  return (
    <Specimen id="otp-modal" title="OTPVerificationModal" description="6-digit OTP modal with auto-focus, paste support, and resend.">
      <Button variant="secondary" onClick={() => setOpen(true)}>Open OTP Modal</Button>
      <OTPVerificationModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onVerify={(otp) => { console.log('Verified:', otp); setOpen(false) }}
        onSkip={() => setOpen(false)}
        onResend={() => console.log('Resent')}
      />
    </Specimen>
  )
}

// ===========================================================================
// SOCIAL PROOF
// ===========================================================================

const TESTIMONIALS = [
  { quote: "I didn't know where to turn. This process helped me understand my options and take the right next step.", name: "Sample User A", location: "Sample Region", rating: 5 },
  { quote: "The team was supportive and explained everything clearly. I finally have a plan.", name: "Sample User B", location: "Sample Region", rating: 5 },
  { quote: "I was skeptical at first, but the process was simple and the guidance was invaluable.", name: "Sample User C", location: "Sample Region", rating: 5 },
]

const PARTNER_LOGOS = [
  { src: '/accredited_logo.png', alt: 'Partner A' },
  { src: '/ClearOne.png', alt: 'Partner B' },
  { src: '/freedom-debt-relief_logo.png', alt: 'Partner C' },
  { src: '/JGW_logo.png', alt: 'Partner D' },
  { src: '/National_logo.png', alt: 'Partner E' },
]

function SocialProofOverlaySpecimen() {
  return (
    <Specimen
      id="social-proof-overlay"
      title="Social Proof Overlay"
      description="Image with status badge and social proof message card. Used on profile screens."
    >
      <div className="max-w-md relative rounded-2xl overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&auto=format&fit=crop&q=80"
          alt="Person"
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 right-4 inline-flex items-center gap-2 bg-white rounded-full px-3 py-1.5 shadow-sm text-sm">
          <Check className="w-4 h-4 text-feedback-success" />
          Profile ready
        </div>
        <div className="absolute inset-x-4 bottom-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-300 flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-primary-700" />
            </div>
            <p className="text-sm text-neutral-800">
              Your profile matches thousands of people in your area. Our partners have worked with over <strong>X million people</strong>.
            </p>
          </div>
        </div>
      </div>
    </Specimen>
  )
}

function TrustIndicatorsSpecimen() {
  return (
    <Specimen
      id="trust-indicators"
      title="Trust Indicators"
      description="Inline icon + text rows for reassurance. Used on selection, processing, and matching screens."
    >
      <div className="space-y-6">
        <div>
          <p className="text-xs font-medium text-neutral-400 uppercase mb-3">Check style</p>
          <div className="flex items-center justify-center gap-6 text-sm text-neutral-600">
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-feedback-success" />No impact to your score</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-feedback-success" />No obligation</span>
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-neutral-400 uppercase mb-3">Icon style</p>
          <div className="flex items-center justify-center gap-6 text-neutral-500">
            <div className="flex items-center gap-2"><Shield className="w-4 h-4" /><span className="text-xs">Secure &amp; Private</span></div>
            <div className="flex items-center gap-2"><Check className="w-4 h-4" /><span className="text-xs">No impact</span></div>
            <div className="flex items-center gap-2"><Users className="w-4 h-4" /><span className="text-xs">XM+ Matched</span></div>
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-neutral-400 uppercase mb-3">Stats style</p>
          <div className="flex justify-center items-center gap-6">
            <div className="text-center"><p className="text-lg font-bold text-neutral-900">XM+</p><p className="text-xs text-neutral-500">Sample stat</p></div>
            <div className="h-8 w-px bg-neutral-200" />
            <div className="text-center"><p className="text-lg font-bold text-neutral-900">24/7</p><p className="text-xs text-neutral-500">Sample stat</p></div>
            <div className="h-8 w-px bg-neutral-200" />
            <div className="text-center"><p className="text-lg font-bold text-neutral-900">&#10003;</p><p className="text-xs text-neutral-500">Sample stat</p></div>
            <div className="h-8 w-px bg-neutral-200" />
            <div className="text-center"><Lock className="w-5 h-5 text-neutral-900 mx-auto" /><p className="text-xs text-neutral-500">Sample stat</p></div>
          </div>
        </div>
      </div>
    </Specimen>
  )
}


// ===========================================================================
// CONTENT BLOCKS
// ===========================================================================

function QualificationMessageSpecimen() {
  return (
    <Specimen
      id="qualification-message"
      title="Qualification Message"
      description="Inline CheckCircle2 icon with colored status text. Success (green) and neutral (grey) states."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <p className="text-xs font-medium text-neutral-400 uppercase mb-3">Qualified (success)</p>
          <p className="text-feedback-success font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            This qualifies for most programs
          </p>
          <p className="text-sm text-neutral-500 mt-1">Based on quoted partner outcomes of up to 50% savings</p>
        </div>
        <div>
          <p className="text-xs font-medium text-neutral-400 uppercase mb-3">Not yet qualified (neutral)</p>
          <p className="text-neutral-500 font-medium">Some programs may be available — let&apos;s check your options.</p>
          <p className="text-sm text-neutral-500 mt-1">Based on quoted partner outcomes of up to 50% savings</p>
        </div>
      </div>
    </Specimen>
  )
}

function BadgeBannerSpecimen() {
  return (
    <Specimen
      id="badge-banner"
      title="Badge Banner"
      description="Compact horizontal pill with icon and bullet-separated text. Used as a reassurance strip above content areas."
    >
      <div className="flex flex-wrap gap-3">
        <div className="inline-flex items-center gap-2 rounded bg-secondary-500 px-3 py-1.5">
          <Star className="w-4 h-4 text-neutral-900" />
          <span className="text-xs text-neutral-900 font-medium">Better outcomes &bull; No obligations &bull; 3 minutes</span>
        </div>
        <div className="inline-flex items-center gap-2 rounded bg-primary-300 px-3 py-1.5">
          <Shield className="w-4 h-4 text-primary-700" />
          <span className="text-xs text-primary-700 font-medium">Secure &bull; Private &bull; No impact</span>
        </div>
        <div className="inline-flex items-center gap-2 rounded bg-green-100 px-3 py-1.5">
          <CheckCircle2 className="w-4 h-4 text-green-700" />
          <span className="text-xs text-green-700 font-medium">Free consultation &bull; No upfront fees &bull; 24/7 support</span>
        </div>
      </div>
    </Specimen>
  )
}

function TrustStatsRowSpecimen() {
  return (
    <Specimen
      id="trust-stats-row"
      title="Trust Stats Row"
      description="4-column divider-separated stat row. Each column supports a text value or icon on top with a label below."
    >
      <div className="space-y-8">
        <div>
          <p className="text-xs font-medium text-neutral-400 uppercase mb-3">Text values + icon mix</p>
          <div className="flex justify-center items-center gap-6">
            <div className="text-center">
              <p className="text-lg font-bold text-neutral-900">XM+</p>
              <p className="text-xs text-neutral-500">Sample stat</p>
            </div>
            <div className="h-8 w-px bg-neutral-200" />
            <div className="text-center">
              <p className="text-lg font-bold text-neutral-900">24/7</p>
              <p className="text-xs text-neutral-500">US Support</p>
            </div>
            <div className="h-8 w-px bg-neutral-200" />
            <div className="text-center">
              <Check className="w-5 h-5 text-neutral-900 mx-auto" />
              <p className="text-xs text-neutral-500 mt-1">No impact</p>
            </div>
            <div className="h-8 w-px bg-neutral-200" />
            <div className="text-center">
              <Lock className="w-5 h-5 text-neutral-900 mx-auto" />
              <p className="text-xs text-neutral-500 mt-1">Info is secure</p>
            </div>
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-neutral-400 uppercase mb-3">All icons</p>
          <div className="flex justify-center items-center gap-6">
            <div className="text-center">
              <Shield className="w-5 h-5 text-neutral-500 mx-auto" />
              <p className="text-xs text-neutral-500 mt-1">30-Day Guarantee</p>
            </div>
            <div className="h-8 w-px bg-neutral-200" />
            <div className="text-center">
              <Clock className="w-5 h-5 text-neutral-500 mx-auto" />
              <p className="text-xs text-neutral-500 mt-1">24/7 Support</p>
            </div>
            <div className="h-8 w-px bg-neutral-200" />
            <div className="text-center">
              <MapPin className="w-5 h-5 text-neutral-500 mx-auto" />
              <p className="text-xs text-neutral-500 mt-1">US-Based Team</p>
            </div>
            <div className="h-8 w-px bg-neutral-200" />
            <div className="text-center">
              <Users className="w-5 h-5 text-neutral-500 mx-auto" />
              <p className="text-xs text-neutral-500 mt-1">XM+ Matched</p>
            </div>
          </div>
        </div>
      </div>
    </Specimen>
  )
}

// ===========================================================================
// DISCLAIMERS
// ===========================================================================

function PrivacyNoteSpecimen() {
  return (
    <Specimen id="privacy-note" title="Privacy Note" description="Short centered disclaimer below CTAs.">
      <div className="space-y-4 text-center max-w-md mx-auto">
        <p className="text-xs text-neutral-500">We respect your privacy. Your email will only be used to send you information about your options.</p>
        <p className="text-xs text-neutral-500">Your address is used to verify your identity and find location-specific options. We never share your address with third parties without your consent.</p>
      </div>
    </Specimen>
  )
}

function ReassuranceSpecimen() {
  return (
    <Specimen id="reassurance" title="Reassurance" description="Appears below Continue buttons to reduce friction.">
      <div className="space-y-4 text-center">
        <p className="text-sm text-gray-500">No impact to your score</p>
        <div className="flex items-center justify-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-feedback-success" />
          <span className="text-feedback-success font-medium">Checking your options won&apos;t affect your score</span>
        </div>
      </div>
    </Specimen>
  )
}

function LegalConsentSpecimen() {
  const [consent, setConsent] = React.useState(false)
  return (
    <Specimen
      id="legal-consent"
      title="Legal Consent Block"
      description="Full TCPA consent with checkbox and linked terms. Used on phone and profile screens."
    >
      <div className="p-4 bg-neutral-100 rounded-lg max-w-lg">
        <Checkbox
          checked={consent}
          onCheckedChange={(c) => setConsent(c === true)}
          label={
            <span className="text-sm text-neutral-800">
              By clicking &quot;Agree &amp; Continue&quot; I consent to be contacted by
              the company and/or its{' '}
              <a href="#" className="text-primary-700 underline">marketing partners</a>{' '}
              using automated technology at the phone number I have provided.
              I agree to the{' '}
              <a href="#" className="text-primary-700 underline">Terms of Service</a>{' '}
              and{' '}
              <a href="#" className="text-primary-700 underline">Privacy Statement</a>.
              Message and data rates may apply.
            </span>
          }
        />
      </div>
    </Specimen>
  )
}

// ===========================================================================
// COMPOSED BLOCKS
// ===========================================================================

function SubComponentDropdown({ label, children, forceOpen }: { label: string; children: React.ReactNode; forceOpen?: boolean }) {
  const [open, setOpen] = React.useState(false)
  const isOpen = forceOpen || open
  return (
    <div className="border border-neutral-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-neutral-50 hover:bg-neutral-100 transition-colors text-left"
      >
        <span className="text-sm font-medium text-neutral-800">{label}</span>
        <ChevronDown className={cn('w-4 h-4 text-neutral-500 transition-transform', isOpen && 'rotate-180')} />
      </button>
      {isOpen && <div className="p-4 border-t border-neutral-200">{children}</div>}
    </div>
  )
}

function ContextCardSpecimen() {
  return (
    <Specimen
      id="context-card"
      title="Context Card (Master Block)"
      description="Master sidebar aggregator composing all sub-components into a single side panel. Passed as sideContent to FormLayout."
    >
      <div className="max-w-md">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <p className="text-xs uppercase tracking-wide text-neutral-500 mb-4">Based on what you told us</p>

          {/* Potential Savings */}
          <div className="bg-secondary-300 rounded-lg p-4 mb-5">
            <p className="text-xs text-neutral-600">Potential Savings</p>
            <p className="text-2xl font-bold text-feedback-success">$XX,XXX*</p>
            <p className="text-xs text-neutral-600 mt-0.5">Timeline: XX-XX months</p>
          </div>

          {/* Score header row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-neutral-500" />
              <span className="text-sm text-neutral-800">Key Ratio</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-neutral-900">XX%</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">Elevated</span>
            </div>
          </div>

          {/* Status Banner */}
          <div className="bg-green-50 rounded-lg p-3 mb-4">
            <p className="text-feedback-success text-sm font-medium">&#10003; Matches multiple programs</p>
            <p className="text-xs text-neutral-600 mt-0.5">Your profile is a strong fit for the programs we partner with.</p>
          </div>

          {/* Snapshot rows */}
          <div className="border border-neutral-200 rounded-lg divide-y divide-neutral-200 mb-5">
            <div className="flex justify-between items-center px-4 py-3">
              <span className="text-sm text-neutral-500 flex items-center gap-1">Category <HelpCircle className="w-3.5 h-3.5 text-neutral-400" /></span>
              <span className="text-sm font-semibold text-neutral-900">Plan Type</span>
            </div>
            <div className="flex justify-between items-center px-4 py-3"><span className="text-sm text-neutral-500">Total Amount</span><span className="text-sm font-semibold text-neutral-900">$XX,XXX</span></div>
            <div className="flex justify-between items-center px-4 py-3"><span className="text-sm text-neutral-500">Annual Income</span><span className="text-sm font-semibold text-neutral-900">$XXX,XXX</span></div>
          </div>

          {/* Approach Tags */}
          <div className="mb-5">
            <p className="text-xs uppercase tracking-wide text-neutral-500 mb-2">Recommended Approach</p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-primary-300 text-primary-700 px-3 py-1 rounded-full text-xs flex items-center gap-1.5"><Handshake className="w-3.5 h-3.5" />Negotiation</span>
              <span className="bg-primary-300 text-primary-700 px-3 py-1 rounded-full text-xs flex items-center gap-1.5"><TrendingDown className="w-3.5 h-3.5" />Lower Rate</span>
              <span className="bg-primary-300 text-primary-700 px-3 py-1 rounded-full text-xs flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />Payment Plan</span>
            </div>
          </div>

          {/* Value Checklist */}
          <div className="mb-5">
            <p className="text-sm font-semibold text-neutral-900 mb-2">Verify to unlock:</p>
            <div className="space-y-1.5">
              {['Personalized recommendations', 'Side-by-side partner comparison', 'No obligation — compare and decide'].map((t, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-feedback-success flex-shrink-0" />
                  <span className="text-sm text-neutral-800">{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Partner Logos */}
          <div className="mb-4">
            <p className="text-xs uppercase tracking-wide text-neutral-500 text-center mb-2">Trusted Partners</p>
            <div className="flex justify-center gap-6">
              {PARTNER_LOGOS.slice(0, 3).map((logo, i) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img key={i} src={logo.src} alt={logo.alt} className="h-6 w-auto object-contain grayscale opacity-60" />
              ))}
            </div>
          </div>

          {/* Source attribution */}
          <p className="text-xs text-neutral-400">*Estimated savings. Results vary.</p>
        </div>

      </div>

      {/* Sub-component dropdowns */}
      <div className="mt-6 space-y-3">
        <p className="text-xs font-medium text-neutral-400 uppercase">Sub-components</p>

        <SubComponentDropdown label="Profile Snapshot">
          <div className="max-w-sm">
            <div className="border border-neutral-200 rounded-lg divide-y divide-neutral-200">
              <div className="flex justify-between items-center px-4 py-3"><span className="text-sm text-neutral-500">Amount</span><span className="text-sm font-medium text-neutral-800">$XX,XXX</span></div>
              <div className="flex justify-between items-center px-4 py-3"><span className="text-sm text-neutral-500">Income</span><span className="text-sm font-medium text-neutral-800">$XX,XXX/year</span></div>
              <div className="flex justify-between items-center px-4 py-3"><span className="text-sm text-neutral-500">Score</span><span className="text-sm font-medium text-neutral-900">XX%</span></div>
              <div className="flex justify-between items-center px-4 py-3">
                <span className="text-sm text-neutral-500">Status</span>
                <span className="text-sm font-medium text-feedback-success flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" />Matches program requirements</span>
              </div>
            </div>
          </div>
        </SubComponentDropdown>

        <SubComponentDropdown label="Score Badge">
          <div className="flex gap-3">
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Low</span>
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">Moderate</span>
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">Elevated</span>
          </div>
        </SubComponentDropdown>

        <SubComponentDropdown label="Status Banner">
          <div className="bg-green-50 rounded-lg p-4 max-w-md">
            <p className="text-feedback-success font-medium">Status: &#10003; Matches multiple programs</p>
            <p className="text-sm text-neutral-600 mt-1">Your profile is a strong fit for the programs we partner with.</p>
          </div>
        </SubComponentDropdown>

        <SubComponentDropdown label="Approach Tags">
          <div className="inline-flex flex-wrap gap-2">
            <span className="bg-primary-300 text-primary-700 px-3 py-1.5 rounded-full text-sm flex items-center gap-1.5"><Handshake className="w-4 h-4" />Negotiation</span>
            <span className="bg-primary-300 text-primary-700 px-3 py-1.5 rounded-full text-sm flex items-center gap-1.5"><TrendingDown className="w-4 h-4" />Lower Rate</span>
            <span className="bg-primary-300 text-primary-700 px-3 py-1.5 rounded-full text-sm flex items-center gap-1.5"><Calendar className="w-4 h-4" />Payment Plan</span>
          </div>
        </SubComponentDropdown>

        <SubComponentDropdown label="Testimonial Card">
          <div className="max-w-md">
            <div className="bg-neutral-50 rounded-xl p-5">
              <Quote className="w-6 h-6 text-gray-200 mb-2" />
              <p className="text-sm text-neutral-800 italic leading-relaxed">&ldquo;{TESTIMONIALS[0].quote}&rdquo;</p>
              <div className="flex gap-0.5 mt-3">
                {[...Array(TESTIMONIALS[0].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-xs text-neutral-500 mt-2">&mdash; {TESTIMONIALS[0].name}, {TESTIMONIALS[0].location}</p>
            </div>
          </div>
        </SubComponentDropdown>

        <SubComponentDropdown label="Partner Logo Carousel">
          <div>
            <p className="text-xs uppercase tracking-wide text-neutral-500 text-center mb-3">Trusted Partners</p>
            <div className="relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
              <div className="flex animate-scroll w-max">
                {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, i) => (
                  <div key={i} className="flex-shrink-0 px-6 flex items-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={logo.src} alt={logo.alt} className="h-8 w-auto object-contain grayscale opacity-60" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SubComponentDropdown>

        <SubComponentDropdown label="Source Attribution">
          <div className="text-[10px] text-neutral-400">Source: Sample Source</div>
        </SubComponentDropdown>
      </div>
    </Specimen>
  )
}

function UrgencyBannerSpecimen() {
  const [countdown, setCountdown] = React.useState(180)
  React.useEffect(() => {
    const t = setInterval(() => setCountdown((p) => (p > 0 ? p - 1 : 180)), 1000)
    return () => clearInterval(t)
  }, [])
  const mins = Math.floor(countdown / 60)
  const secs = countdown % 60
  return (
    <Specimen id="urgency-banner" title="Urgency Banner" description="Sticky countdown timer. Used on results pages.">
      <div className="bg-feedback-warning text-neutral-900 py-3 px-4 rounded-lg">
        <div className="flex items-center justify-center gap-2">
          <Phone className="w-4 h-4 animate-pulse" />
          <span className="text-sm font-medium">
            A specialist will call you in{' '}
            <span className="bg-black/10 px-2 py-0.5 rounded font-bold">{mins}:{secs.toString().padStart(2, '0')}</span>
          </span>
        </div>
      </div>
    </Specimen>
  )
}

function PartnerMatchCardSpecimen() {
  return (
    <Specimen
      id="partner-match-card"
      title="Partner Match Card"
      description="Full partner card: logo, stats, features, rating. Used on results pages."
    >
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden max-w-lg">
        <div className="bg-feedback-success text-white text-center py-2 text-sm font-medium">&#10003; Best Match for Your Profile</div>
        <div className="p-6">
          <div className="flex items-start gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/freedom-debt-relief_logo.png" alt="Partner" className="w-16 h-16 object-contain" />
            <div>
              <p className="text-xs text-primary-700 font-medium uppercase">Top Match for Your Profile</p>
              <h3 className="text-xl font-bold text-neutral-900">Sample Partner</h3>
              <p className="text-sm text-neutral-500 mt-1">One of the largest and most trusted providers in this category.</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-neutral-100">
            <div className="text-center"><p className="text-lg font-bold text-neutral-900">XX-XX%</p><p className="text-xs text-neutral-500">Avg. Fee</p></div>
            <div className="text-center"><p className="text-lg font-bold text-neutral-900">A+</p><p className="text-xs text-neutral-500">Industry Rating</p></div>
            <div className="text-center"><p className="text-lg font-bold text-neutral-900">XX-XX mo</p><p className="text-xs text-neutral-500">Avg. Timeline</p></div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-6">
            {['No upfront fees', 'Free consultation', 'Top industry rating', '24/7 support', '$XB+ resolved', 'Dedicated advisor'].map((f, i) => (
              <div key={i} className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-feedback-success" /><span className="text-sm text-neutral-800">{f}</span></div>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-6 pt-4 border-t border-neutral-100">
            <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}</div>
            <span className="text-sm text-neutral-500">X.X/5 from X,XXX+ reviews</span>
          </div>
        </div>
      </div>
    </Specimen>
  )
}

function WhatToExpectSpecimen() {
  return (
    <Specimen id="what-to-expect" title="What to Expect Callout" description="Colored callout with icon and guidance. Used on results pages.">
      <div className="bg-primary-300 rounded-xl p-5 max-w-lg">
        <div className="flex items-start gap-3">
          <Phone className="w-6 h-6 text-primary-700 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-neutral-900">What to expect now</h4>
            <p className="text-sm text-neutral-800 mt-1">Expect a call from your matched partner in just a few minutes. Be sure to answer — speaking with them right away will help tailor the best options for your needs.</p>
          </div>
        </div>
      </div>
    </Specimen>
  )
}

function FAQAccordionSpecimen() {
  const [open, setOpen] = React.useState<number | null>(null)
  const faqs = [
    { q: 'How much does this service cost?', a: 'Providers typically charge XX-XX% of the total amount, on a performance-based fee structure.' },
    { q: 'How long does the process take?', a: 'Most programs take XX-XX months depending on the amount and complexity.' },
    { q: 'Will it affect my score?', a: 'Some programs can temporarily lower your score, but many people recover over time.' },
  ]
  return (
    <Specimen id="faq-accordion" title="FAQ Accordion" description="Expandable Q&A list. Used on results pages.">
      <div className="max-w-lg space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="border-b border-neutral-100 pb-3 last:border-b-0">
            <button onClick={() => setOpen(open === i ? null : i)} className="flex items-center justify-between w-full text-left">
              <span className="font-medium text-neutral-800 pr-4">{faq.q}</span>
              <ChevronDown className={cn('w-5 h-5 text-neutral-500 transition-transform flex-shrink-0', open === i && 'rotate-180')} />
            </button>
            {open === i && <p className="text-sm text-neutral-500 mt-2 pr-8">{faq.a}</p>}
          </div>
        ))}
      </div>
    </Specimen>
  )
}

function EducationalStepsSpecimen() {
  const steps = [
    { title: 'Research providers', desc: 'Identify reputable companies by reading reviews and checking credentials.' },
    { title: 'Verify credentials', desc: 'Check accreditation with relevant industry bodies.' },
    { title: 'Schedule a consultation', desc: 'Most providers offer free initial consultations.' },
  ]
  return (
    <Specimen id="educational-steps" title="Educational Steps" description="Numbered ordered list with circled step numbers. Used on results pages.">
      <div className="max-w-lg">
        <ol className="divide-y divide-neutral-100">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-3 py-4 first:pt-0 last:pb-0">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-300 text-primary-700 text-sm font-medium flex items-center justify-center">{i + 1}</span>
              <div><p className="font-medium text-neutral-800">{step.title}</p><p className="text-sm text-neutral-500 mt-0.5">{step.desc}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </Specimen>
  )
}

function CallCTACardSpecimen() {
  return (
    <Specimen id="call-cta-card" title="Call CTA Card" description="Phone link button with mini trust badges. Used on results pages.">
      <div className="bg-white rounded-2xl border border-neutral-200 p-5 max-w-xs">
        <h4 className="font-semibold text-neutral-900 mb-3">Can&apos;t wait for the call?</h4>
        <a href="#" className="flex items-center justify-center gap-2 w-full bg-primary-700 text-white py-3 rounded-[8px] font-semibold hover:bg-primary-750 transition">
          <Phone className="w-5 h-5" />Call Now: 800-XXX-XXXX
        </a>
        <p className="text-xs text-neutral-500 text-center mt-3">Speak with a specialist immediately</p>
        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-neutral-100">
          <div className="text-center"><Shield className="w-5 h-5 text-neutral-500 mx-auto" /><p className="text-xs text-neutral-500 mt-1">30-Day Guarantee</p></div>
          <div className="text-center"><Clock className="w-5 h-5 text-neutral-500 mx-auto" /><p className="text-xs text-neutral-500 mt-1">24/7 Support</p></div>
          <div className="text-center"><MapPin className="w-5 h-5 text-neutral-500 mx-auto" /><p className="text-xs text-neutral-500 mt-1">US-Based Team</p></div>
        </div>
      </div>
    </Specimen>
  )
}

// ===========================================================================
// PAGE PATTERNS
// ===========================================================================

function PatternCard({ title, description, screens, children }: { title: string; description: string; screens: string[]; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <div>
        <h4 className="font-semibold text-neutral-900">{title}</h4>
        <p className="text-sm text-neutral-500 mt-1">{description}</p>
        <p className="text-xs text-neutral-400 mt-2">Used by: {screens.join(', ')}</p>
      </div>
      <div className="border border-neutral-200 rounded-lg bg-neutral-50 p-4 overflow-hidden">
        {children}
      </div>
    </div>
  )
}

function FormCapturePatternSpecimen() {
  const [sliderVal, setSliderVal] = React.useState([35000])
  return (
    <Specimen
      id="pattern-form"
      title="Context Form"
      description="The primary screen archetype: full-width headline, two-column layout with context card on the left and form + sub-copy on the right. Stacked on mobile."
    >
      {/* Live rendered form page */}
      <div className="border border-neutral-200 rounded-xl overflow-hidden bg-white">
        {/* Progress bar mock */}
        <div className="h-1 bg-neutral-100">
          <div className="h-full bg-primary-700 w-2/3 rounded-r-full" />
        </div>

        <div className="p-6 lg:p-8">
          {/* Full-width headline */}
          <h2 className="font-display text-2xl lg:text-3xl font-bold text-neutral-900 text-center mb-6">
            Ready to see your options?
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left: Context Card placeholder */}
            <a href="#context-card" className="block rounded-2xl border-2 border-dashed border-neutral-300 bg-neutral-50 p-6 hover:border-primary-700 hover:bg-primary-300/10 transition-colors group">
              <div className="space-y-3">
                <div className="h-16 bg-neutral-200/60 rounded-lg" />
                <div className="space-y-2">
                  <div className="h-3 bg-neutral-200/60 rounded w-full" />
                  <div className="h-3 bg-neutral-200/60 rounded w-full" />
                  <div className="h-3 bg-neutral-200/60 rounded w-3/4" />
                </div>
                <div className="h-10 bg-neutral-200/40 rounded-lg" />
                <div className="space-y-1.5">
                  <div className="h-2.5 bg-neutral-200/60 rounded w-5/6" />
                  <div className="h-2.5 bg-neutral-200/60 rounded w-4/6" />
                  <div className="h-2.5 bg-neutral-200/60 rounded w-5/6" />
                </div>
                <div className="h-16 bg-neutral-200/40 rounded-lg" />
                <div className="h-6 bg-neutral-200/40 rounded w-2/3 mx-auto" />
              </div>
              <p className="text-sm font-medium text-neutral-500 group-hover:text-primary-700 text-center mt-4">
                Context Card (Master Block) &rarr;
              </p>
              <p className="text-xs text-neutral-400 text-center mt-1">
                Profile snapshot, savings, status, checklist, testimonial, partner logos
              </p>
            </a>

            {/* Right: Form column */}
            <div>
              {/* Sub-copy */}
              <p className="text-body text-neutral-500 mb-6">
                Enter your phone number to confirm your identity and move one step closer to finding the right option.
              </p>

              {/* Phone input */}
              <div className="mb-4">
                <label className="text-sm font-medium text-neutral-700 mb-1.5 block">Phone number</label>
                <div className="h-[48px] border border-neutral-200 rounded-[8px] px-3 flex items-center justify-between text-sm text-neutral-500">
                  <span>(555) 555-5555</span>
                  <Phone className="w-4 h-4 text-neutral-400" />
                </div>
              </div>

              {/* Consent checkbox */}
              <div className="bg-neutral-50 rounded-xl p-4 mb-6 max-h-[200px] overflow-y-auto">
                <div className="flex items-start gap-2.5">
                  <div className="w-4 h-4 mt-0.5 rounded border-2 border-neutral-300 flex-shrink-0" />
                  <p className="text-sm text-neutral-800 leading-relaxed">
                    By clicking &ldquo;Agree &amp; Continue&rdquo; I consent to be contacted by the service and/or its{' '}
                    <span className="text-primary-700 underline">marketing partners</span>{' '}
                    using automated technology at the phone number I have provided. I agree to the{' '}
                    <span className="text-primary-700 underline">Terms of Service</span>{' '}
                    and{' '}
                    <span className="text-primary-700 underline">Privacy Statement</span>.
                    Message and data rates may apply. Message frequency varies.
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <Button variant="primary" fullWidth>Agree &amp; Continue</Button>

              {/* Disclaimer below CTA */}
              <p className="text-xs text-neutral-500 text-center mt-4 leading-relaxed">
                Your address is used to verify your identity and find location-specific options. We never share your address with third parties without your consent.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-component dropdowns */}
      <div className="mt-6 space-y-3">
        <p className="text-xs font-medium text-neutral-400 uppercase">Sub-components</p>

        <SubComponentDropdown label="Text Inputs (single & side-by-side)">
          <div className="space-y-4 max-w-md">
            <Input label="Email address" placeholder="you@example.com" />
            <div className="grid grid-cols-2 gap-3">
              <Input label="First name" placeholder="Jane" />
              <Input label="Last name" placeholder="Doe" />
            </div>
            <Input label="Phone number" placeholder="(555) 555-5555" />
          </div>
        </SubComponentDropdown>

        <SubComponentDropdown label="Select Dropdown">
          <div className="max-w-sm">
            <Select value="CA" onValueChange={() => {}}>
              <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="CA">California</SelectItem>
                <SelectItem value="TX">Texas</SelectItem>
                <SelectItem value="NY">New York</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </SubComponentDropdown>

        <SubComponentDropdown label="Slider">
          <div className="max-w-sm">
            <Slider
              min={10000} max={60000} step={1000}
              value={sliderVal} onValueChange={setSliderVal}
              formatValue={(v: number) => `$${v.toLocaleString()}`}
            />
          </div>
        </SubComponentDropdown>

        <SubComponentDropdown label="Checkbox / Legal Consent">
          <div className="max-w-md bg-neutral-50 rounded-lg p-4">
            <Checkbox
              checked={true}
              onCheckedChange={() => {}}
              label={
                <span className="text-sm text-neutral-800">
                  I agree to the <span className="text-primary-700 underline">Terms of Service</span> and <span className="text-primary-700 underline">Privacy Policy</span>. Message and data rates may apply.
                </span>
              }
            />
          </div>
        </SubComponentDropdown>

        <SubComponentDropdown label="Sticky CTA Button">
          <div className="max-w-sm space-y-3">
            <Button variant="primary" fullWidth>Continue</Button>
            <Button variant="primary" fullWidth>Agree &amp; Continue</Button>
            <Button variant="primary" fullWidth>See Your Options</Button>
            <p className="text-xs text-neutral-500">Rendered inside a StickyButtonContainer — fixed to the bottom on mobile, inline on desktop.</p>
          </div>
        </SubComponentDropdown>

        <SubComponentDropdown label="Context Card (left column)">
          <p className="text-xs text-neutral-500 mb-3">The left column uses the Context Card master block — passed as sideContent to FormLayout. It renders on the left on desktop and stacks above the form on mobile. Contains profile snapshot, savings, status banner, value checklist, testimonial, and partner logos.</p>
          <a href="#context-card" className="text-sm text-primary-700 font-medium hover:underline">Jump to Context Card &rarr;</a>
        </SubComponentDropdown>

        <SubComponentDropdown label="Sub-copy &amp; Disclaimers">
          <div className="space-y-3 max-w-md">
            <div>
              <p className="text-xs font-medium text-neutral-400 uppercase mb-2">Below headline</p>
              <p className="text-sm text-neutral-500">Enter your phone number to confirm your identity and move one step closer to finding the right option.</p>
            </div>
            <div>
              <p className="text-xs font-medium text-neutral-400 uppercase mb-2">Below CTA</p>
              <p className="text-xs text-neutral-500">Your address is used to verify your identity and find location-specific options. We never share your address with third parties without your consent.</p>
            </div>
            <div>
              <p className="text-xs font-medium text-neutral-400 uppercase mb-2">Qualification status</p>
              <p className="text-feedback-success font-medium flex items-center gap-1.5 text-sm">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                Matches multiple programs
              </p>
            </div>
          </div>
        </SubComponentDropdown>
      </div>
    </Specimen>
  )
}

function InterstitialPatternSpecimen() {
  const LOADING_STEPS = ['Analyzing your responses...', 'Checking partner availability...', 'Comparing program options...', 'Selecting your best match...']
  const [current, setCurrent] = React.useState(0)
  const [progress, setProgress] = React.useState(0)
  const [barDemo, setBarDemo] = React.useState(65)

  React.useEffect(() => {
    const si = setInterval(() => setCurrent((p) => p >= LOADING_STEPS.length - 1 ? 0 : p + 1), 1200)
    const pi = setInterval(() => setProgress((p) => p >= 100 ? 0 : p + 1), 50)
    return () => { clearInterval(si); clearInterval(pi) }
  }, [LOADING_STEPS.length])

  return (
    <Specimen
      id="pattern-interstitial"
      title="Interstitial / Loading Screen"
      description="Centered layout for loading states, educational pauses, and selection screens. Composes animated checklist, progress bar, trust indicators, testimonials, and partner logos."
    >
      {/* Live loading screen preview */}
      <div className="max-w-lg mx-auto text-center border border-neutral-200 rounded-xl p-8 bg-white">
        <div className="w-16 h-16 mx-auto flex items-center justify-center bg-primary-300 rounded-full mb-4">
          <Lock className="w-8 h-8 text-primary-700" />
        </div>

        <h2 className="font-display text-xl font-bold text-neutral-900">Finding your best match...</h2>
        <p className="text-sm text-neutral-500 mt-2 mb-6">Comparing options from top partners to find the best fit for your profile.</p>

        {/* Partner logo strip */}
        <div className="relative overflow-hidden mb-6">
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <div className="flex animate-scroll w-max">
            {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, i) => (
              <div key={i} className="flex-shrink-0 px-6 flex items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logo.src} alt={logo.alt} className="h-7 w-auto object-contain grayscale opacity-60" />
              </div>
            ))}
          </div>
        </div>

        {/* Animated checklist */}
        <div className="space-y-3 inline-flex flex-col items-start mb-6">
          {LOADING_STEPS.map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              {i < current && <CheckCircle2 className="w-5 h-5 text-feedback-success fill-feedback-success" />}
              {i === current && <div className="w-5 h-5 rounded-full border-2 border-primary-700 border-t-transparent animate-spin" />}
              {i > current && <div className="w-5 h-5 rounded-full border-2 border-neutral-200" />}
              <span className={cn('text-sm', i > current ? 'text-neutral-500' : 'text-neutral-800')}>{step}</span>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-xs mx-auto mb-6">
          <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
            <div className="h-full bg-feedback-success rounded-full transition-all duration-100" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-neutral-500 text-center mt-2">{progress}% complete</p>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center items-center gap-4 text-neutral-500">
          <div className="flex items-center gap-1.5"><Shield className="w-4 h-4" /><span className="text-xs">Secure & Private</span></div>
          <div className="flex items-center gap-1.5"><Check className="w-4 h-4" /><span className="text-xs">No credit impact</span></div>
          <div className="flex items-center gap-1.5"><Users className="w-4 h-4" /><span className="text-xs">XM+ Matched</span></div>
        </div>
      </div>

      {/* Sub-component dropdowns */}
      <div className="mt-6 space-y-3">
        <p className="text-xs font-medium text-neutral-400 uppercase">Sub-components</p>

        <SubComponentDropdown label="Animated Checklist">
          <p className="text-xs text-neutral-500 mb-3">Spinner-to-check step progression. Steps auto-advance on a timer, looping for demo purposes.</p>
          <div className="space-y-3 inline-flex flex-col items-start">
            {LOADING_STEPS.map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                {i < current && <CheckCircle2 className="w-5 h-5 text-feedback-success fill-feedback-success" />}
                {i === current && <div className="w-5 h-5 rounded-full border-2 border-primary-700 border-t-transparent animate-spin" />}
                {i > current && <div className="w-5 h-5 rounded-full border-2 border-neutral-200" />}
                <span className={cn('text-sm', i > current ? 'text-neutral-500' : 'text-neutral-800')}>{step}</span>
              </div>
            ))}
          </div>
        </SubComponentDropdown>

        <SubComponentDropdown label="Progress Bar">
          <p className="text-xs text-neutral-500 mb-3">Determinate progress bar with percentage label. Click values to preview states.</p>
          <div className="space-y-4 max-w-sm">
            <div>
              <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                <div className="h-full bg-feedback-success rounded-full transition-all duration-300" style={{ width: `${barDemo}%` }} />
              </div>
              <p className="text-xs text-neutral-500 text-center mt-2">{barDemo}% complete</p>
            </div>
            <div className="flex gap-2">
              {[0, 25, 50, 75, 100].map((v) => (
                <Button key={v} size="sm" variant={barDemo === v ? 'primary' : 'secondary'} onClick={() => setBarDemo(v)}>
                  {v}%
                </Button>
              ))}
            </div>
          </div>
        </SubComponentDropdown>

        <SubComponentDropdown label="Trust Indicators">
          <p className="text-xs text-neutral-500 mb-3">Inline icon + text reassurance row. Various configurations.</p>
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-4 text-neutral-500">
              <div className="flex items-center gap-2"><Shield className="w-4 h-4" /><span className="text-xs">Secure & Private</span></div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4" /><span className="text-xs">No credit impact</span></div>
              <div className="flex items-center gap-2"><Users className="w-4 h-4" /><span className="text-xs">XM+ Matched</span></div>
            </div>
            <div className="flex justify-center items-center gap-6">
              <div className="text-center"><p className="text-lg font-bold text-neutral-900">XM+</p><p className="text-xs text-neutral-500">People matched</p></div>
              <div className="h-8 w-px bg-neutral-200" />
              <div className="text-center"><p className="text-lg font-bold text-neutral-900">24/7</p><p className="text-xs text-neutral-500">US Support</p></div>
              <div className="h-8 w-px bg-neutral-200" />
              <div className="text-center"><p className="text-lg font-bold text-neutral-900">&#10003;</p><p className="text-xs text-neutral-500">No credit impact</p></div>
              <div className="h-8 w-px bg-neutral-200" />
              <div className="text-center"><Lock className="w-5 h-5 text-neutral-900 mx-auto" /><p className="text-xs text-neutral-500">Info is secure</p></div>
            </div>
          </div>
        </SubComponentDropdown>

        <SubComponentDropdown label="Testimonial Card">
          <div className="max-w-md">
            <div className="bg-neutral-50 rounded-xl p-5">
              <Quote className="w-6 h-6 text-gray-200 mb-2" />
              <p className="text-sm text-neutral-800 italic leading-relaxed">&ldquo;{TESTIMONIALS[0].quote}&rdquo;</p>
              <div className="flex gap-0.5 mt-3">
                {[...Array(TESTIMONIALS[0].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-xs text-neutral-500 mt-2">&mdash; {TESTIMONIALS[0].name}, {TESTIMONIALS[0].location}</p>
            </div>
          </div>
        </SubComponentDropdown>

        <SubComponentDropdown label="Partner Logo Carousel">
          <div>
            <p className="text-xs uppercase tracking-wide text-neutral-500 text-center mb-3">Trusted Partners</p>
            <div className="relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
              <div className="flex animate-scroll w-max">
                {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, i) => (
                  <div key={i} className="flex-shrink-0 px-6 flex items-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={logo.src} alt={logo.alt} className="h-8 w-auto object-contain grayscale opacity-60" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SubComponentDropdown>
      </div>
    </Specimen>
  )
}

function ResultsPatternSpecimen() {
  return (
    <Specimen id="pattern-results" title="Results / Profile" description="Two-column layouts for showing computed results, partner matches, and profiles.">
      <div className="space-y-6">
        <PatternCard
          title="Results Pattern"
          description="Full-width layout. Left column: partner card with feature grid, educational content, FAQ. Right column: sticky recap sidebar, CTA card. Urgency banner at top."
          screens={['Profile', 'Results']}
        >
          <div className="space-y-2">
            <div className="h-6 bg-feedback-warning rounded w-full" />
            <div className="h-5 bg-neutral-200 rounded w-1/2 mx-auto" />
            <div className="grid grid-cols-3 gap-3 mt-3">
              <div className="col-span-2 space-y-2">
                <div className="h-24 bg-white border border-neutral-200 rounded-lg" />
                <div className="h-10 bg-primary-300 rounded-lg" />
                <div className="h-16 bg-white border border-neutral-200 rounded-lg" />
              </div>
              <div className="space-y-2">
                <div className="h-20 bg-white border border-neutral-200 rounded-lg" />
                <div className="h-16 bg-white border border-neutral-200 rounded-lg" />
              </div>
            </div>
          </div>
        </PatternCard>

        <div>
          <p className="text-xs font-medium text-neutral-400 uppercase mb-3">Feature Grid (embedded in partner cards)</p>
          <div className="border border-neutral-200 rounded-lg bg-neutral-50 p-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-md">
              {['No upfront fees', 'Free consultation', 'Top industry rating', '24/7 support', '$XB+ resolved', 'Dedicated advisor'].map((f, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-feedback-success flex-shrink-0" />
                  <span className="text-sm text-neutral-800">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Specimen>
  )
}

function ResultsPageSection() {
  const [expanded, setExpanded] = React.useState(false)
  return (
    <>
      <SectionHeader id="results-page" label="Results Page" />
      <div className="mb-8">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-100 transition-colors text-sm font-medium text-neutral-800"
        >
          {expanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
          {expanded ? 'Hide' : 'Show'} Results Page Components
        </button>
      </div>
      {expanded && (
        <div className="animate-slide-up">
          <ResultsPatternSpecimen />
          <UrgencyBannerSpecimen />
          <PartnerMatchCardSpecimen />
          <WhatToExpectSpecimen />
          <FAQAccordionSpecimen />
          <EducationalStepsSpecimen />
          <CallCTACardSpecimen />
        </div>
      )}
    </>
  )
}
