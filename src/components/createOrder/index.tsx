import React, { memo, useState, useCallback, useEffect } from 'react';
import { Flex, useToast, Spinner } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import useTranslation from '../../hooks/useTranslation';
import TimeLine from './timeLine';
import StepController from './stepController';
import {
  getOfferData,
  setCreateOrderOfferDataAction,
  createOrderResetStoreAction
} from './actions';
import { ICreateOrderInitialState } from './interfaces';

const CreateOrder: React.FC = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    query: { offerId, packageName }
  } = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { offerData, orderData } = useSelector(
    (state: any): ICreateOrderInitialState => state.createOrder
  );

  const goNextStep = useCallback((): void => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep]);

  const goPrevStep = useCallback((): void => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  useEffect(() => {
    try {
      window.scrollTo(0, 0);
    } catch (e) {
      console.error(e);
    }
  }, [currentStep]);

  useEffect(() => {
    setIsLoading(true);
    getOfferData(offerId as string)
      .then((data) =>
        dispatch(
          setCreateOrderOfferDataAction({
            ...data,
            variant: packageName as string
          })
        )
      )
      .then(() => setIsLoading(false))
      .catch(() => {
        toast({
          title: t('createOrder', 'toast', 'cantGetData'),
          description: t('createOrder', 'toast', 'smthWentWrong'),
          status: 'error',
          duration: 4000,
          isClosable: true
        });
      });

    return () => {
      dispatch(createOrderResetStoreAction());
    };
  }, []);

  return (
    <Flex align="center" direction="column" bg="#FBFBFD" pt="62px" pb="62px">
      <Flex
        w="100%"
        pl={{ sm: '2%', lg: '3%', xl: '4%', '2xl': '5%' }}
        pr={{ sm: '2%', lg: '3%', xl: '4%', '2xl': '5%' }}
        direction="column"
        alignItems="center"
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <TimeLine currentStep={currentStep} />
            <StepController
              currentStep={currentStep}
              goNextStep={goNextStep}
              goPrevStep={goPrevStep}
              offerData={offerData}
              orderData={orderData}
              packageName={packageName as string}
            />
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default memo(CreateOrder);
