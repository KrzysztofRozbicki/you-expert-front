import React, { memo, useState, useCallback } from 'react';
import { Flex, useToast } from '@chakra-ui/react';
import useTranslation from '../../../../hooks/useTranslation';
import PaymentMethod from './paymentMethod';
import Card from './card';
import Summary from '../summary';
import { StepProps } from '../interfaces';
import { createOrderAction } from '../../actions';

const Step3: React.FC<StepProps> = (props) => {
  const { goNextStep, offerData, orderData, packageName, goPrevStep } = props;
  const { t } = useTranslation();
  const toast = useToast();
  const [paymentMethod, setPaymentMethod] = useState<'paynow'>('paynow');
  const [isLoading, setIsLoading] = useState(false);

  const handleClickPay = useCallback(() => {
    setIsLoading(true);
    createOrderAction(orderData)
      .then((data) => {
        if (data?.redirectUrl) {
          window?.open(data?.redirectUrl);
        }
      })
      .catch(() => {
        toast({
          title: t('createOrder', 'toast', 'cantGetData'),
          description: t('createOrder', 'toast', 'smthWentWrong'),
          status: 'error',
          duration: 4000,
          isClosable: true
        });
      })
      .finally(() => setIsLoading(false));
  }, [orderData, toast, t]);

  return (
    <Flex w="100%" direction={{ sm: 'column', lg: 'row' }}>
      <Flex flex={1} mr={{ lg: '30px' }} flexDirection="column">
        <PaymentMethod
          isChecked={paymentMethod === 'paynow'}
          onChange={() => setPaymentMethod('paynow')}
          imgSrc="/images/sections/createOrder/paynow.png"
          imageProps={{ w: '189px', h: '60px' }}
        />
        {/* <Card /> */}
      </Flex>
      <Flex w={{ sm: '100%', lg: '40%', xl: '30%' }}>
        <Summary
          isLoading={isLoading}
          onCheckoutClick={handleClickPay}
          isShouldShowOffer
          offerData={offerData}
          orderData={orderData}
          packageName={packageName}
          isShouldShowBackButton
          onBackButtonClick={goPrevStep}
          checkoutButtonText={t('createOrder', 'summary', 'orderAndPay')}
        />
      </Flex>
    </Flex>
  );
};

export default memo(Step3);
