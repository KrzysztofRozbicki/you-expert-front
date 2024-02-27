import React, { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Flex } from '@chakra-ui/react';
import useTranslation from '../../../hooks/useTranslation';
import {
  Wrapper,
  StepItem,
  StepItemTitle,
  StepItemCircle,
  StepLine
} from './style';
import { TimeLineProps } from './interfaces';
import { initialStateType } from '../../../redux/interfaces/app';
import { screenSizesNumber } from '../../../styles/theme/breakpoints';
import data from './data';

const TimeLine: React.FC<TimeLineProps> = ({ currentStep }) => {
  const { t } = useTranslation();
  const { windowWidth } = useSelector(
    (state: any): initialStateType => state.app
  );

  const isMobile = useMemo(
    (): boolean => windowWidth < screenSizesNumber?.md,
    [windowWidth]
  );

  const lineWidth = useMemo(
    (): number => currentStep === 1 ? 0 : 20 + (currentStep - 2) * 15,
    [currentStep]
  );

  return (
    <Wrapper
      flexDirection={{ sm: 'column', md: 'row' }}
      justifyContent="center"
    >
      {isMobile && (
        <Flex w="100%" mb="10px">
          <StepItemTitle
            isActive={currentStep >= 1}
            fontSize={{ sm: '0.8rem', md: '1.1rem' }}
          >
            {t('createOffer', 'timeLine', 'overview')}
          </StepItemTitle>
        </Flex>
      )}
      <Flex position="relative" justifyConten="space-between" overflow="hidden">
        {data.map((item, index) => (
          <StepItem
            key={index}
            isFirst={index === 0}
            isLast={index === data.length - 1}
          >
            {!isMobile && (
              <StepItemTitle
                mb="10px"
                isActive={currentStep >= item?.step}
                fontSize={{ sm: '0.8rem', md: '0.9rem', lg: '1.1rem' }}
              >
                {item?.title && t('createOffer', 'timeLine', item?.title)}
              </StepItemTitle>
            )}
            <StepItemCircle
              isActive={currentStep >= item?.step}
              w={{ sm: '38px', md: '53px' }}
              h={{ sm: '38px', md: '53px' }}
              fontSize={{ sm: '1rem', md: '1.1rem' }}
            >
              {item?.step}
            </StepItemCircle>
          </StepItem>
        ))}
        <StepLine
          lineWidth={lineWidth}
          bottom={{ sm: '17.5px', md: '23.5px' }}
        />
      </Flex>
      {isMobile && (
        <Flex w="100%" mt="10px" justifyContent="flex-end">
          <StepItemTitle
            isActive={currentStep >= 7}
            fontSize={{ sm: '0.8rem', md: '1.1rem' }}
          >
            {t('createOffer', 'timeLine', 'published')}
          </StepItemTitle>
        </Flex>
      )}
    </Wrapper>
  );
};

export default memo(TimeLine);
