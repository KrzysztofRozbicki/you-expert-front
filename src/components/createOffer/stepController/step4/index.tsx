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
    description: string;
  };
  errors: {
    description: boolean;
  };
}

const Step4: React.FC<StepProps> = (props) => {
  const { goPrevStep, goNextStep } = props;
  const offer = useSelector((state: any): offerType => state.createOffer.offer);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [state, setState] = useState<initialState>({
    values: {
      description: offer.description
    },
    errors: {
      description: false
    }
  });

  const handleDescriptionChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const {
        target: { value }
      } = e;

      setState((prev) => ({
        ...prev,
        values: {
          ...prev.values,
          description: value
        },
        errors: {
          ...prev.errors,
          description: false
        }
      }));
    },
    [setState]
  );

  const checkFields = useCallback(() => {
    const errors = {
      description: false
    };

    if (!state.values.description) {
      errors.description = true;
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
        description: state.values.description
      })
    );
    goPrevStep();
  }, [dispatch, state.values.description, goPrevStep]);

  const handleClickNext = useCallback(() => {
    if (checkFields()) {
      dispatch(
        setCreateOfferStateAction({
          ...offer,
          description: state.values.description
        })
      );
      goNextStep();
    }
  }, [dispatch, state.values.description, checkFields, goNextStep]);

  return (
    <StepLayout
      title={t('createOffer', 'step3', 'description')}
      handleClickSave={handleClickNext}
      handleClickCancel={handleClickBack}
      isRequired={true}
    >
      <TextareaStyles
        value={state.values.description}
        placeholder={t('createOffer', 'step3', 'writeALongDescription')}
        onChange={handleDescriptionChange}
        isError={state.errors.description}
      />
      {state.errors.description && (
        <Text fontSize="0.6rem" color="general.red">
          {t('createOffer', 'step3', 'description')}{' '}
          {t('settings', 'errors', 'isRequired')}
        </Text>
      )}
    </StepLayout>
  );
};

export default memo(Step4);
