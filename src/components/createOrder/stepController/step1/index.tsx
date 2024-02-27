import React, { memo } from 'react';
import { Flex } from '@chakra-ui/react';
import useTranslation from '../../../../hooks/useTranslation';
import OfferItem from './offerItem';
import ExpertInfo from '../../../expertInfo';
import Description from '../description';
import Summary from '../summary';
import { StepProps } from '../interfaces';

const Step1: React.FC<StepProps> = (props) => {
  const { goNextStep, offerData, packageName, orderData } = props;
  const { t } = useTranslation();

  return (
    <Flex w="100%" direction={{ sm: 'column', lg: 'row' }}>
      <Flex flex={1} mr={{ lg: '30px' }} direction="column">
        <ExpertInfo expert={offerData?.expert} />
        <OfferItem
          offerData={offerData}
          packageName={packageName}
          orderData={orderData}
        />
        <Description
          title={t('createOrder', 'step1', 'offerDescription')}
          text={offerData?.description}
        />
        <Description
          title={t('createOrder', 'step1', 'serviceRequirements')}
          text={offerData?.requirements}
        />
      </Flex>
      <Flex w={{ sm: '100%', lg: '40%', xl: '30%' }}>
        <Summary
          onCheckoutClick={goNextStep}
          isShouldShowPaymentMethod
          offerData={offerData}
          packageName={packageName}
          orderData={orderData}
          checkoutButtonText={t('createOrder', 'summary', 'continue')}
        />
      </Flex>
    </Flex>
  );
};

export default memo(Step1);
