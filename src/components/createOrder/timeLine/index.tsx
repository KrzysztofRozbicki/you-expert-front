import React, { memo, useMemo } from 'react';
import useTranslation from '../../../hooks/useTranslation';
import {
  Wrapper,
  StepItem,
  StepItemTitle,
  StepItemCircle,
  StepLine
} from './style';
import { TimeLineProps } from './interfaces';
import data from './data';

const TimeLine: React.FC<TimeLineProps> = ({ currentStep }) => {
  const { t } = useTranslation();

  const lineWidth = useMemo(
    (): number => (currentStep - 1) * 50,
    [currentStep]
  );

  return (
    <Wrapper>
      {data.map((item, index) => (
        <StepItem
          key={index}
          isFirst={index === 0}
          isLast={index === data.length - 1}
        >
          <StepItemTitle
            p={{ sm: '0 10px', lg: '0' }}
            textAlign="center"
            isActive={currentStep >= item?.step}
            fontSize={{ sm: '0.8rem', md: '1.1rem' }}
          >
            {item?.title && t('createOrder', 'timeLine', item?.title)}
          </StepItemTitle>
          <StepItemCircle
            isActive={currentStep >= item?.step}
            w={{ sm: '43px', md: '53px' }}
            h={{ sm: '43px', md: '53px' }}
            fontSize={{ sm: '1rem', md: '1.1rem' }}
          >
            {item?.step}
          </StepItemCircle>
        </StepItem>
      ))}
      <StepLine lineWidth={lineWidth} bottom={{ sm: '19.5px', md: '23.5px' }} />
    </Wrapper>
  );
};

export default memo(TimeLine);
