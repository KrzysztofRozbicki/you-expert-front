import React, { memo } from 'react';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import { StepProps } from './interfaces';

interface StepControllerProps extends StepProps {
  currentStep: number;
}

const StepController: React.FC<StepControllerProps> = (props) => {
  const {
    currentStep,
    goNextStep,
    offerData,
    packageName,
    orderData,
    goPrevStep
  } = props;

  const ComponentByStep: React.FC<StepProps> = (props) => {
    if (currentStep === 1) {
      return <Step1 {...props} />;
    } else if (currentStep === 2) {
      return <Step2 {...props} />;
    } else if (currentStep === 3) {
      return <Step3 {...props} />;
    } else {
      return <></>;
    }
  };

  return (
    <ComponentByStep
      goNextStep={goNextStep}
      goPrevStep={goPrevStep}
      offerData={offerData}
      packageName={packageName}
      orderData={orderData}
    />
  );
};

export default memo(StepController);
