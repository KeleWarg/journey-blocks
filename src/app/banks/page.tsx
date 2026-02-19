'use client'

import * as React from 'react'
import {
  AccountTypeScreen,
  MinimumBalanceScreen,
  AccountConsiderationsScreen,
  BankingServicesScreen,
  LocationScreen,
  PersonalInfoScreen,
  ResultsScreen,
} from '@/components/bank-screens'
import type { TransitionDirection } from '@/components/bank-layout'
import type {
  BankAccountType,
  BankConsideration,
  BankFunnelData,
  BankingService,
} from '@/types/banks'

type BankFunnelStep =
  | 'accountType'
  | 'minimumBalance'
  | 'considerations'
  | 'bankingServices'
  | 'location'
  | 'personalInfo'
  | 'results'

const STEP_ORDER: BankFunnelStep[] = [
  'accountType',
  'minimumBalance',
  'considerations',
  'bankingServices',
  'location',
  'personalInfo',
  'results',
]

export default function BanksPage() {
  const [currentStep, setCurrentStep] = React.useState<BankFunnelStep>('accountType')
  const [funnelData, setFunnelData] = React.useState<BankFunnelData>({})
  const [direction, setDirection] = React.useState<TransitionDirection>('none')

  const updateFunnelData = (data: Partial<BankFunnelData>) => {
    setFunnelData((prev) => ({ ...prev, ...data }))
  }

  const goToStep = (step: BankFunnelStep, dir: TransitionDirection) => {
    setDirection(dir)
    setCurrentStep(step)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goToNextStep = () => {
    const currentIndex = STEP_ORDER.indexOf(currentStep)
    if (currentIndex < STEP_ORDER.length - 1) {
      goToStep(STEP_ORDER[currentIndex + 1], 'next')
    }
  }

  const goToPrevStep = () => {
    const currentIndex = STEP_ORDER.indexOf(currentStep)
    if (currentIndex > 0) {
      goToStep(STEP_ORDER[currentIndex - 1], 'prev')
    }
  }

  const getAnsweredCount = (): number => {
    const currentIndex = STEP_ORDER.indexOf(currentStep)
    return currentIndex
  }

  const renderStep = () => {
    switch (currentStep) {
      case 'accountType':
        return (
          <AccountTypeScreen
            initialValue={funnelData.accountType}
            direction={direction}
            onSubmit={(accountType: BankAccountType) => {
              updateFunnelData({ accountType })
              goToNextStep()
            }}
          />
        )

      case 'minimumBalance':
        return (
          <MinimumBalanceScreen
            answeredCount={getAnsweredCount()}
            initialValue={funnelData.depositAmount}
            direction={direction}
            onBack={goToPrevStep}
            onSubmit={(depositAmount: string) => {
              updateFunnelData({ depositAmount })
              goToNextStep()
            }}
          />
        )

      case 'considerations':
        return (
          <AccountConsiderationsScreen
            answeredCount={getAnsweredCount()}
            initialValue={funnelData.consideration}
            direction={direction}
            onBack={goToPrevStep}
            onSubmit={(consideration: BankConsideration) => {
              updateFunnelData({ consideration })
              goToNextStep()
            }}
          />
        )

      case 'bankingServices':
        return (
          <BankingServicesScreen
            answeredCount={getAnsweredCount()}
            initialValue={funnelData.interestedServices}
            direction={direction}
            onBack={goToPrevStep}
            onSubmit={(interestedServices: BankingService[]) => {
              updateFunnelData({ interestedServices })
              goToNextStep()
            }}
            onSkip={goToNextStep}
          />
        )

      case 'location':
        return (
          <LocationScreen
            answeredCount={getAnsweredCount()}
            initialValue={funnelData.zipCode}
            direction={direction}
            onBack={goToPrevStep}
            onSubmit={(zipCode: string) => {
              updateFunnelData({ zipCode })
              goToNextStep()
            }}
          />
        )

      case 'personalInfo':
        return (
          <PersonalInfoScreen
            answeredCount={getAnsweredCount()}
            initialEmail={funnelData.email}
            direction={direction}
            onBack={goToPrevStep}
            onSubmit={({ email, agreedToTerms }) => {
              updateFunnelData({ email, agreedToTerms })
              goToNextStep()
            }}
          />
        )

      case 'results':
        return <ResultsScreen funnelData={funnelData} />

      default:
        return null
    }
  }

  return renderStep()
}
