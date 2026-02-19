'use client'

import * as React from 'react'
import {
  ZipcodesScreen,
  SearchingAreaInterstitial,
  HomeSizeScreen,
  EstimateAndEmailScreen,
  MoveDateScreen,
  MatchingMoversInterstitial,
  MovingDetailsScreen,
  MovingResultsPage,
} from '@/components/moving-screens'
import type { MovingFunnelData, HomeSizeOption, MoveDateOption } from '@/types/moving'

// Funnel steps
type MovingFunnelStep =
  | 'zipcodes'
  | 'searching'
  | 'homeSize'
  | 'estimateEmail'  // Combined estimate recap + email capture
  | 'moveDate'
  | 'matching'
  | 'details'
  | 'results'

// Step order for navigation
const STEP_ORDER: MovingFunnelStep[] = [
  'zipcodes',
  'homeSize',
  'searching',
  'estimateEmail',
  'moveDate',
  'matching',
  'details',
  'results',
]

/**
 * Moving Funnel Page
 * 
 * Manages the state and navigation between all moving funnel screens
 */
export default function MovingPage() {
  const [currentStep, setCurrentStep] = React.useState<MovingFunnelStep>('zipcodes')
  const [funnelData, setFunnelData] = React.useState<MovingFunnelData>({})
  
  // Scroll to top when step changes
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [currentStep])
  
  // Navigation helpers
  const goToNextStep = () => {
    const currentIndex = STEP_ORDER.indexOf(currentStep)
    if (currentIndex < STEP_ORDER.length - 1) {
      setCurrentStep(STEP_ORDER[currentIndex + 1])
    }
  }
  
  const goToPreviousStep = () => {
    const currentIndex = STEP_ORDER.indexOf(currentStep)
    if (currentIndex > 0) {
      // Skip auto-advancing interstitial screens when going back
      let prevIndex = currentIndex - 1
      while (
        prevIndex > 0 && 
        ['searching', 'matching'].includes(STEP_ORDER[prevIndex])
      ) {
        prevIndex--
      }
      setCurrentStep(STEP_ORDER[prevIndex])
    }
  }
  
  // Update funnel data helper
  const updateFunnelData = (data: Partial<MovingFunnelData>) => {
    setFunnelData((prev) => ({ ...prev, ...data }))
  }
  
  // Render current step
  const renderStep = () => {
    switch (currentStep) {
      case 'zipcodes':
        return (
          <ZipcodesScreen
            initialFromZip={funnelData.zipFrom}
            initialToZip={funnelData.zipTo}
            onSubmit={({ zipFrom, zipTo }) => {
              updateFunnelData({ zipFrom, zipTo })
              goToNextStep()
            }}
          />
        )
      
      case 'searching':
        return (
          <SearchingAreaInterstitial
            zipFrom={funnelData.zipFrom || ''}
            zipTo={funnelData.zipTo || ''}
            onNext={goToNextStep}
          />
        )
      
      case 'homeSize':
        return (
          <HomeSizeScreen
            initialValue={funnelData.homeSize}
            zipFrom={funnelData.zipFrom}
            zipTo={funnelData.zipTo}
            onBack={goToPreviousStep}
            onSubmit={(homeSize: HomeSizeOption) => {
              updateFunnelData({ homeSize })
              goToNextStep()
            }}
          />
        )
      
      case 'estimateEmail':
        return (
          <EstimateAndEmailScreen
            homeSize={funnelData.homeSize || '2-bedroom'}
            zipFrom={funnelData.zipFrom || ''}
            zipTo={funnelData.zipTo || ''}
            initialEmail={funnelData.email}
            onBack={goToPreviousStep}
            onSubmit={(email) => {
              updateFunnelData({ email })
              goToNextStep()
            }}
          />
        )
      
      case 'moveDate':
        return (
          <MoveDateScreen
            initialValue={funnelData.moveDate}
            initialSpecificDate={funnelData.specificMoveDate}
            homeSize={funnelData.homeSize || '2-bedroom'}
            onBack={goToPreviousStep}
            onSubmit={(moveDate: MoveDateOption, specificMoveDate?: string) => {
              updateFunnelData({ moveDate, specificMoveDate })
              goToNextStep()
            }}
          />
        )
      
      case 'matching':
        return (
          <MatchingMoversInterstitial
            homeSize={funnelData.homeSize || '2-bedroom'}
            onNext={goToNextStep}
          />
        )
      
      case 'details':
        return (
          <MovingDetailsScreen
            initialFirstName={funnelData.firstName}
            initialLastName={funnelData.lastName}
            initialPhone={funnelData.phone}
            homeSize={funnelData.homeSize || '2-bedroom'}
            onBack={goToPreviousStep}
            onSubmit={({ firstName, lastName, phone }) => {
              updateFunnelData({ firstName, lastName, phone })
              goToNextStep()
            }}
          />
        )
      
      case 'results':
        return (
          <MovingResultsPage
            firstName={funnelData.firstName || 'there'}
            email={funnelData.email || ''}
            homeSize={funnelData.homeSize || '2-bedroom'}
            moveDate={funnelData.moveDate || 'within-2-weeks'}
            zipFrom={funnelData.zipFrom || ''}
            zipTo={funnelData.zipTo || ''}
          />
        )
      
      default:
        return null
    }
  }
  
  return renderStep()
}
