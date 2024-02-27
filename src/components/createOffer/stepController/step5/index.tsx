import React, { memo, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text } from '@chakra-ui/react';
import StepLayout from '../stepLayout';
import useTranslation from '../../../../hooks/useTranslation';
import { StepProps } from '../interfaces';
import { TextareaStyles } from './style';
import { offerType } from '../../interfaces';
import { setCreateOfferStateAction } from '../../actions';

interface initialState {
  values: {
    requirements: string;
  };
  errors: {
    requirements: boolean;
  };
}

const Step5: React.FC<StepProps> = (props) => {
  const { goPrevStep, goNextStep } = props;
  const offer = useSelector((state: any): offerType => state.createOffer.offer);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [state, setState] = useState<initialState>({
    values: {
      requirements: offer.requirements
    },
    errors: {
      requirements: false
    }
  });

  const handleRequirementsChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const {
        target: { value }
      } = e;

      setState((prev) => ({
        ...prev,
        values: {
          ...prev.values,
          requirements: value
        },
        errors: {
          ...prev.errors,
          requirements: false
        }
      }));
    },
    [setState]
  );

  const checkFields = useCallback(() => {
    const errors = {
      requirements: false
    };

    if (!state.values.requirements) {
      errors.requirements = true;
    }

    setState((prev) => ({
      ...prev,
      errors: {
        ...prev.errors,
        ...errors
      }
    }));

    return !Object.values(errors).some((i) => i);
  }, [setState, state.errors, state.values]);

  const handleClickBack = useCallback(() => {
    dispatch(
      setCreateOfferStateAction({
        ...offer,
        requirements: state.values.requirements
      })
    );
    goPrevStep();
  }, [dispatch, state.values.requirements, goPrevStep]);

  const handleClickNext = useCallback(() => {
    if (checkFields()) {
      dispatch(
        setCreateOfferStateAction({
          ...offer,
          requirements: state.values.requirements
        })
      );
      goNextStep();
    }
  }, [dispatch, state.values.requirements, checkFields, goNextStep]);

  return (
    <StepLayout
      title={t('createOffer', 'step4', 'requirements')}
      handleClickSave={handleClickNext}
      handleClickCancel={handleClickBack}
      isRequired={true}
    >
      <TextareaStyles
        value={state.values.requirements}
        placeholder={t('createOffer', 'step4', 'writeRequirements')}
        onChange={handleRequirementsChange}
        isError={state.errors.requirements}
      />
      {state.errors.requirements && (
        <Text fontSize="0.6rem" color="general.red">
          {t('createOffer', 'step4', 'requirements')}{' '}
          {t('settings', 'errors', 'isRequired')}
        </Text>
      )}
    </StepLayout>
  );
};

export default memo(Step5);
