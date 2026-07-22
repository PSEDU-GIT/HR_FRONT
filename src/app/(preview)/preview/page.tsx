'use client';

import { useShallow } from 'zustand/react/shallow';
import { useDiagnosticStore } from './_state/useDiagnosticStore';
import DiagnosticLandingArea from './_area/DiagnosticLanding.area';
import DiagnosticQuestionArea from './_area/DiagnosticQuestion.area';
import DiagnosticFormArea from './_area/DiagnosticForm.area';
import DiagnosticResultArea from './_area/DiagnosticResult.area';

export default function PreviewDiagnosticPage() {
  const currentStep = useDiagnosticStore(useShallow((state) => state.currentStep));

  switch (currentStep) {
    case 'landing':
      return <DiagnosticLandingArea />;
    case 'question':
      return <DiagnosticQuestionArea />;
    case 'form':
      return <DiagnosticFormArea />;
    case 'result':
      return <DiagnosticResultArea />;
    default:
      return <DiagnosticLandingArea />;
  }
}
