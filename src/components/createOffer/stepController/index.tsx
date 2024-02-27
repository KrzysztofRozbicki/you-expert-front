import React, { memo } from 'react';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import Step4 from './step4';
import Step5 from './step5';
import Step6 from './step6';
import Step7 from './step7';
import { StepProps } from './interfaces';

interface StepsProps extends StepProps {
  currentStep: number;
}

const Steps: React.FC<StepsProps> = (props) => {
  const { goNextStep, goPrevStep, currentStep } = props;

  const ComponentByStep: React.FC<StepProps> = (props) => {
    if (currentStep === 1) {
      return <Step1 {...props} />;
    } else if (currentStep === 2) {
      return <Step2 {...props} />;
    } else if (currentStep === 3) {
      return <Step3 {...props} />;
    } else if (currentStep === 4) {
      return <Step4 {...props} />;
    } else if (currentStep === 5) {
      return <Step5 {...props} />;
    } else if (currentStep === 6) {
      return <Step6 {...props} />;
    } else if (currentStep === 7) {
      return <Step7 {...props} />;
    } else {
      return <></>;
    }
  };

  return <ComponentByStep goNextStep={goNextStep} goPrevStep={goPrevStep} />;
};

export default memo(Steps);
