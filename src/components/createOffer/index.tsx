import React, { memo, useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Flex, Spinner, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useTranslation from '../../hooks/useTranslation';
import {
  resetCreateOfferStoreAction,
  setCreateOfferLoadingAction,
  getCategories,
  setCreateOfferCategoriesAction
} from './actions';
import TimeLine from './timeLine';
import Steps from './stepController';

const CreateOffer: React.FC = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { t } = useTranslation();
  const { asPath } = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const isLoading = useSelector(
    (state: any): boolean => state.createOffer.isLoading
  );

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

  const getPreparingData = useCallback(() => {
    dispatch(setCreateOfferLoadingAction(true));
    getCategories()
      .then((data) => {
        dispatch(setCreateOfferCategoriesAction(data));
        dispatch(setCreateOfferLoadingAction(false));
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
    getPreparingData();

    return () => {
      setCurrentStep(1);
      dispatch(resetCreateOfferStoreAction());
    };
  }, [asPath]);

  return (
    <Flex align="center" direction="column" bg="#FBFBFD" pt="62px" pb="62px">
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

export default memo(CreateOffer);
