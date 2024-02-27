import React, { memo, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Flex } from '@chakra-ui/react';
import useTranslation from '../../../../hooks/useTranslation';
import Summary from '../summary';
import Description from './description';
import OfferRequirements from '../description';
import DropZone from './dropZone';
import { StepProps } from '../interfaces';
import { setCreateOrderOrderDataAction } from '../../actions';

interface IStep2State {
  values: {
    clientRequirements: string;
  };
  errors: {
    clientRequirements: boolean;
  };
}

const Step2: React.FC<StepProps> = (props) => {
  const { goNextStep, offerData, orderData, packageName, goPrevStep } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [state, setState] = useState<IStep2State>({
    values: {
      clientRequirements: orderData?.clientRequirements
    },
    errors: {
      clientRequirements: false
    }
  });

  const handleClientRequirementsChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
      const {
        target: { value }
      } = e;
      setState((prev) => ({
        ...prev,
        values: {
          ...prev.values,
          clientRequirements: value
        },
        errors: {
          ...prev.errors,
          clientRequirements: false
        }
      }));
    },
    []
  );

  const isCorrectValues = useCallback(() => {
    const errors = { clientRequirements: false };
    if (!state.values.clientRequirements.trim()) {
      errors.clientRequirements = true;
    }

    setState((prev) => ({
      ...prev,
      errors: {
        ...prev.errors,
        ...errors
      }
    }));

    return !Object.values(errors).some((item) => item);
  }, [state]);

  const handleClickPrev = useCallback(() => {
    dispatch(setCreateOrderOrderDataAction({ ...orderData, ...state.values }));
    goPrevStep();
  }, [state, goPrevStep]);

  const handleClickNext = useCallback(() => {
    if (isCorrectValues()) {
      dispatch(
        setCreateOrderOrderDataAction({ ...orderData, ...state.values })
      );

      goNextStep();
    }
  }, [state, isCorrectValues, goNextStep]);

  return (
    <Flex w="100%" direction={{ sm: 'column', lg: 'row' }}>
      <Flex flex={1} mr={{ lg: '30px' }} flexDirection="column">
        <Description
          value={state.values.clientRequirements}
          onChange={handleClientRequirementsChange}
          isError={state.errors.clientRequirements}
          errorMessage={t('createOrder', 'step3', 'descriptionError')}
        />
        <OfferRequirements
          title={t('createOrder', 'step1', 'serviceRequirements')}
          text={offerData?.requirements}
        />
      </Flex>
      <Flex w={{ sm: '100%', lg: '40%', xl: '30%' }}>
        <Summary
          onCheckoutClick={handleClickNext}
          isShouldShowOffer
          offerData={offerData}
          orderData={orderData}
          packageName={packageName}
          isShouldShowBackButton
          onBackButtonClick={handleClickPrev}
          checkoutButtonText={t('createOrder', 'summary', 'continueToCheckout')}
        />
      </Flex>
    </Flex>
  );
};

export default memo(Step2);
