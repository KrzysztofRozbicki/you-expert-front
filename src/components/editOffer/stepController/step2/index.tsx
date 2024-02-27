import React, { memo, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StepLayout from '../../../createOffer/stepController/stepLayout';
import useTranslation from '../../../../hooks/useTranslation';
import Pricing from './pricing';
import ExtraServices from './extraServices';
import { StepProps } from '../interfaces';
import { pricingStateType } from './interfaces';
import { IEditOfferInitialState } from '../../interfaces';
import { setEditOfferEditableDataAction } from '../../actions';

const Step2: React.FC<StepProps> = (props) => {
  const { goNextStep, goPrevStep } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { editOfferData } = useSelector(
    (state: any): IEditOfferInitialState => state.editOffer
  );
  const [state, setState] = useState<pricingStateType>({
    values: {
      pricing: editOfferData.pricing
    },
    errors: {
      pricing: {
        basic: {
          deliveryTime: false,
          price: false,
          params: editOfferData.pricing.basic.params.map(() => false)
        },
        standard: {
          deliveryTime: false,
          price: false,
          params: editOfferData.pricing.standard.params.map(() => false)
        },
        premium: {
          deliveryTime: false,
          price: false,
          params: editOfferData.pricing.premium.params.map(() => false)
        }
      }
    }
  });

  const checkFields = useCallback(() => {
    let isError = false;
    const currentErrors = JSON.parse(JSON.stringify(state.errors));
    const packages = ['basic', 'standard', 'premium'];
    const isOnAtLeastOnePackage = packages.some(
      (packageName) => state.values.pricing[packageName].isOn
    );

    if (!isOnAtLeastOnePackage) {
      return false;
    }

    for (let i = 0; i < packages.length; i++) {
      const packageName = packages[i];
      if (state.values.pricing[packageName].isOn) {
        if (
          state.values.pricing[packageName].deliveryTime === '0' ||
          !state.values.pricing[packageName].deliveryTime.length
        ) {
          isError = true;
          currentErrors.pricing[packageName].deliveryTime = true;
        }

        if (
          state.values.pricing[packageName].price === '0' ||
          !state.values.pricing[packageName].price.length
        ) {
          isError = true;
          currentErrors.pricing[packageName].price = true;
        }

        currentErrors.pricing[packageName].params = currentErrors.pricing[
          packageName
        ].params.map((item, index) => {
          if (
            state.values.pricing[packageName].params[index].isOptional ||
            state.values.pricing[packageName].params[index].type === 'BOOL'
          ) {
            return false;
          }

          if (
            !state.values.pricing[packageName].params[index].value ||
            !`${state.values.pricing[packageName].params[index].value}`.length
          ) {
            isError = true;
            return true;
          }
        });
      }
    }

    setState((prev) => ({
      ...prev,
      errors: { ...prev.errors, ...currentErrors }
    }));
    return !isError;
  }, [state.values, state.errors]);

  const handleClickBack = useCallback(() => {
    dispatch(
      setEditOfferEditableDataAction({
        ...editOfferData,
        pricing: {
          ...editOfferData.pricing,
          ...state.values.pricing
        }
      })
    );
    goPrevStep();
  }, [state.values.pricing, dispatch, editOfferData.pricing, goPrevStep]);

  const handleClickNext = useCallback(() => {
    if (checkFields()) {
      dispatch(
        setEditOfferEditableDataAction({
          ...editOfferData,
          pricing: { ...editOfferData.pricing, ...state?.values?.pricing }
        })
      );
      goNextStep();
    }
  }, [
    state.values.pricing,
    dispatch,
    editOfferData.pricing,
    checkFields,
    goNextStep
  ]);

  return (
    <>
      <StepLayout
        title={t('createOffer', 'step2', 'pricing')}
        handleClickSave={handleClickNext}
        handleClickCancel={handleClickBack}
        bodyProps={{ p: { sm: '30px', md: '57px 40px 42px 40px' } }}
      >
        <Pricing state={state} setState={setState} />
      </StepLayout>
      {/* <StepLayout
        title={t('createOffer', 'step2', 'extraServices')}
        handleClickSave={goNextStep}
        handleClickCancel={goPrevStep}
        bodyStyle={{ padding: '41px'}}
      >
        <ExtraServices />
      </StepLayout> */}
    </>
  );
};

export default memo(Step2);
