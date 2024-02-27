import React, { memo, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text } from '@chakra-ui/react';
import StepLayout from '../../../createOffer/stepController/stepLayout';
import useTranslation from '../../../../hooks/useTranslation';
import { StepProps } from '../interfaces';
import { TextareaStyles } from './style';
import { IEditOfferInitialState } from '../../interfaces';
import { setEditOfferEditableDataAction } from '../../actions';

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
  const { editOfferData } = useSelector(
    (state: any): IEditOfferInitialState => state.editOffer
  );
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [state, setState] = useState<initialState>({
    values: {
      requirements: editOfferData.requirements
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
      setEditOfferEditableDataAction({
        ...editOfferData,
        requirements: state.values.requirements
      })
    );
    goPrevStep();
  }, [editOfferData, dispatch, state.values.requirements, goPrevStep]);

  const handleClickNext = useCallback(() => {
    if (checkFields()) {
      dispatch(
        setEditOfferEditableDataAction({
          ...editOfferData,
          requirements: state.values.requirements
        })
      );
      goNextStep();
    }
  }, [
    editOfferData,
    dispatch,
    state.values.requirements,
    checkFields,
    goNextStep
  ]);

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
