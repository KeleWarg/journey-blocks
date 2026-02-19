'use client'

import * as React from 'react'
import {
  LocationScreen,
  DebtTypeScreen,
  DidYouKnowScreen,
  DebtAmountScreen,
  IncomeScreen,
  ResultsPreviewScreen,
  DateOfBirthScreen,
  NameScreen,
  ProcessingScreen,
  DebtProfileScreen,
  EmailScreen,
  PhoneScreen,
  AddressScreen,
  PartnerMatchingScreen,
  ResultsPage,
} from '@/components/screens'
import type { FunnelData, DebtTypeOption } from '@/types/funnel'

type DebtReliefStep =
  | 'location'
  | 'debtType'
  | 'didYouKnow'
  | 'debtAmount'
  | 'income'
  | 'resultsPreview'
  | 'dateOfBirth'
  | 'name'
  | 'processing'
  | 'debtProfile'
  | 'email'
  | 'phone'
  | 'address'
  | 'partnerMatching'
  | 'results'

const STEP_ORDER: DebtReliefStep[] = [
  'location',
  'debtType',
  'didYouKnow',
  'debtAmount',
  'income',
  'resultsPreview',
  'dateOfBirth',
  'name',
  'processing',
  'debtProfile',
  'email',
  'phone',
  'address',
  'partnerMatching',
  'results',
]

const INTERSTITIAL_STEPS: DebtReliefStep[] = [
  'didYouKnow',
  'processing',
  'partnerMatching',
]

export default function DebtReliefPage() {
  const [currentStep, setCurrentStep] = React.useState<DebtReliefStep>('location')
  const [funnelData, setFunnelData] = React.useState<FunnelData>({})

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [currentStep])

  const goToNextStep = () => {
    const currentIndex = STEP_ORDER.indexOf(currentStep)
    if (currentIndex < STEP_ORDER.length - 1) {
      setCurrentStep(STEP_ORDER[currentIndex + 1])
    }
  }

  const goToPreviousStep = () => {
    const currentIndex = STEP_ORDER.indexOf(currentStep)
    if (currentIndex > 0) {
      let prevIndex = currentIndex - 1
      while (prevIndex > 0 && INTERSTITIAL_STEPS.includes(STEP_ORDER[prevIndex])) {
        prevIndex--
      }
      setCurrentStep(STEP_ORDER[prevIndex])
    }
  }

  const updateFunnelData = (data: Partial<FunnelData>) => {
    setFunnelData((prev) => ({ ...prev, ...data }))
  }

  const renderStep = () => {
    switch (currentStep) {
      case 'location':
        return (
          <LocationScreen
            initialValue={funnelData.state}
            onSubmit={(state: string) => {
              updateFunnelData({ state })
              goToNextStep()
            }}
          />
        )

      case 'debtType':
        return (
          <DebtTypeScreen
            initialValue={funnelData.debtType}
            onBack={goToPreviousStep}
            onSubmit={(debtType: DebtTypeOption) => {
              updateFunnelData({ debtType })
              goToNextStep()
            }}
          />
        )

      case 'didYouKnow':
        return (
          <DidYouKnowScreen
            debtType={funnelData.debtType}
            onBack={goToPreviousStep}
            onNext={goToNextStep}
          />
        )

      case 'debtAmount':
        return (
          <DebtAmountScreen
            initialValue={funnelData.debtAmount}
            userState={funnelData.state}
            debtType={funnelData.debtType}
            onBack={goToPreviousStep}
            onSubmit={(debtAmount: number) => {
              updateFunnelData({ debtAmount })
              goToNextStep()
            }}
          />
        )

      case 'income':
        return (
          <IncomeScreen
            initialValue={funnelData.annualIncome}
            debtAmount={funnelData.debtAmount}
            onBack={goToPreviousStep}
            onSubmit={(income: number) => {
              updateFunnelData({ annualIncome: income })
              goToNextStep()
            }}
          />
        )

      case 'resultsPreview':
        return (
          <ResultsPreviewScreen
            debtAmount={funnelData.debtAmount || 20000}
            debtType={funnelData.debtType || 'credit-card'}
            income={funnelData.annualIncome || 50000}
            onBack={goToPreviousStep}
            onNext={goToNextStep}
          />
        )

      case 'dateOfBirth':
        return (
          <DateOfBirthScreen
            initialValue={funnelData.dateOfBirth}
            onBack={goToPreviousStep}
            onSubmit={(dob) => {
              updateFunnelData({ dateOfBirth: dob })
              goToNextStep()
            }}
          />
        )

      case 'name':
        return (
          <NameScreen
            initialValue={
              funnelData.firstName && funnelData.lastName
                ? { firstName: funnelData.firstName, lastName: funnelData.lastName }
                : undefined
            }
            onBack={goToPreviousStep}
            onSubmit={({ firstName, lastName }) => {
              updateFunnelData({ firstName, lastName })
              goToNextStep()
            }}
          />
        )

      case 'processing':
        return <ProcessingScreen onNext={goToNextStep} />

      case 'debtProfile':
        return (
          <DebtProfileScreen
            firstName={funnelData.firstName}
            debtType={funnelData.debtType}
            debtAmount={funnelData.debtAmount || 20000}
            income={funnelData.annualIncome || 50000}
            state={funnelData.state}
            dateOfBirth={funnelData.dateOfBirth}
            initialPhone={funnelData.phone}
            onBack={goToPreviousStep}
            onSubmit={goToNextStep}
            onPhoneSubmit={({ phone, consent }) => {
              updateFunnelData({ phone, phoneConsent: consent })
              goToNextStep()
            }}
          />
        )

      case 'email':
        return (
          <EmailScreen
            initialValue={funnelData.email}
            firstName={funnelData.firstName}
            debtAmount={funnelData.debtAmount}
            income={funnelData.annualIncome}
            onBack={goToPreviousStep}
            onSubmit={(email: string) => {
              updateFunnelData({ email })
              goToNextStep()
            }}
          />
        )

      case 'phone':
        return (
          <PhoneScreen
            initialValue={funnelData.phone}
            onBack={goToPreviousStep}
            onSubmit={({ phone, consent }) => {
              updateFunnelData({ phone, phoneConsent: consent })
              goToNextStep()
            }}
            onSkipOTP={goToNextStep}
          />
        )

      case 'address':
        return (
          <AddressScreen
            firstName={funnelData.firstName}
            debtAmount={funnelData.debtAmount}
            income={funnelData.annualIncome}
            initialValue={funnelData.address}
            onBack={goToPreviousStep}
            onSubmit={(address) => {
              updateFunnelData({ address })
              goToNextStep()
            }}
          />
        )

      case 'partnerMatching':
        return (
          <PartnerMatchingScreen
            firstName={funnelData.firstName}
            onNext={goToNextStep}
          />
        )

      case 'results':
        return (
          <ResultsPage
            firstName={funnelData.firstName || 'there'}
            debtAmount={funnelData.debtAmount || 20000}
            debtType={funnelData.debtType || 'credit-card'}
            income={funnelData.annualIncome || 50000}
          />
        )

      default:
        return null
    }
  }

  return renderStep()
}
