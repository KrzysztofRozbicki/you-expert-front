import React, { memo, useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Flex, Spinner, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useTranslation from '../../hooks/useTranslation';
import {
  resetEditOfferAction,
  getInitialDataAction,
  setEditOfferInitialDataAction
} from './actions';
import TimeLine from './timeLine';
import Steps from './stepController';

const EditOffer: React.FC = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { t } = useTranslation();
  const {
    query: { offerId }
  } = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const goNextStep = useCallback((): void => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep]);

  const goPrevStep = useCallback((): void => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const getInitialData = useCallback(() => {
    setIsLoading(true);
    getInitialDataAction(offerId as string)
      .then((data) => {
        dispatch(setEditOfferInitialDataAction(data));
        setIsLoading(false);
      })
      .catch(() => {
        toast({
          title: t('createOffer', 'general', 'cantGetData'),
          description: t('createOffer', 'general', 'smthWentWrong'),
          status: 'error',
          duration: 4000,
          isClosable: true
        });
      });
  }, [dispatch, toast, t]);

  useEffect(() => {
    try {
      window.scrollTo(0, 0);
    } catch (e) {
      console.error(e);
    }
  }, [currentStep]);

  useEffect(() => {
    getInitialData();

    return () => {
      dispatch(resetEditOfferAction());
    };
  }, []);

  return (
    <Flex align="center" direction="column" bg="#FBFBFD" pt="75px" pb="75px">
      <Flex w="100%" maxWidth="1100px" direction="column">
        <TimeLine currentStep={currentStep} />
        {isLoading ? (
          <Flex alignItems="center" justifyContent="center">
            <Spinner />
          </Flex>
        ) : (
          <Steps
            currentStep={currentStep}
            goNextStep={goNextStep}
            goPrevStep={goPrevStep}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default memo(EditOffer);
