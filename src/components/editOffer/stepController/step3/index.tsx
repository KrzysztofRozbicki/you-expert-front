import React, { memo, useCallback, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useToast } from '@chakra-ui/react';
import useTranslation from '../../../../hooks/useTranslation';
import StepLayout from '../../../createOffer/stepController/stepLayout';
import { StepProps } from '../interfaces';
import { IEditOfferInitialState } from '../../interfaces';
import { isValidInputNumber } from '../../utils';
import { setEditOfferEditableDataAction } from '../../actions';
import {
  OFFER_VAT,
  MIN_OFFER_COMMISSION,
  MAX_OFFER_COMMISSION
} from '../../../../common/constants';
import { initialStateType } from '../../../../redux/interfaces/app';
import { screenSizesNumber } from '../../../../styles/theme/breakpoints';
import Step3Desktop from './step3.desktop';
import Step3Mobile from './step3.mobile';
import { getOfferPriceWithCommission } from '../../../../utils';

export interface initialState {
  values: {
    commission: string;
  };
  errors: {
    commission: boolean;
  };
}

const Step3: React.FC<StepProps> = (props) => {
  const { goNextStep, goPrevStep } = props;
  const { t } = useTranslation();
  const { editOfferData } = useSelector(
    (state: any): IEditOfferInitialState => state.editOffer
  );
  const dispatch = useDispatch();
  const toast = useToast();
  const [state, setState] = useState<initialState>({
    values: {
      commission: editOfferData.commission
    },
    errors: {
      commission: false
    }
  });

  const { windowWidth } = useSelector(
    (state: any): initialStateType => state.app
  );

  const isMobile = useMemo(
    (): boolean => windowWidth < screenSizesNumber?.lg,
    [windowWidth]
  );

  const getTotalPrice = useCallback(
    (packageName: 'basic' | 'standard' | 'premium'): string => {
      try {
        return getOfferPriceWithCommission(
          +editOfferData?.pricing[packageName].price,
          +state.values.commission
        );
      } catch {
        return '';
      }
    },
    [editOfferData, state]
  );

  const handleChangeCommission = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value }
      } = e;

      if (value === '' || isValidInputNumber(value)) {
        setState(
          (prev: initialState): initialState => ({
            ...prev,
            values: {
              ...prev.values,
              commission: value
            },
            errors: {
              ...prev.errors,
              commission: false
            }
          })
        );
      }
    },
    [state]
  );

  const isValidFields = useCallback((): boolean => {
    let isError = false;
    const errors = JSON.parse(JSON.stringify(state.errors));
    if (
      +state.values.commission < MIN_OFFER_COMMISSION ||
      +state.values.commission > MAX_OFFER_COMMISSION
    ) {
      toast({
        title: t('createOffer', 'general', 'invalidCommissionValue'),
        description: `${t(
          'createOffer',
          'general',
          'commissionMustBeBetween'
        )} ${MIN_OFFER_COMMISSION}-${MAX_OFFER_COMMISSION}%`,
        status: 'error',
        duration: 6000,
        isClosable: true
      });

      errors.commission = true;
      isError = true;
    }

    setState((prev) => ({ ...prev, errors: { ...prev.errors, ...errors } }));
    return !isError;
  }, [state, editOfferData, toast, t]);

  const handleClickNext = useCallback(() => {
    if (isValidFields()) {
      dispatch(
        setEditOfferEditableDataAction({
          ...editOfferData,
          ...state.values
        })
      );

      goNextStep();
    }
  }, [state, editOfferData, isValidFields, goNextStep]);

  const handleClickBack = useCallback(() => {
    dispatch(
      setEditOfferEditableDataAction({
        ...editOfferData,
        ...state.values
      })
    );

    goPrevStep();
  }, [state, editOfferData, goPrevStep]);

  const taxRate = useMemo((): string => {
    const result = ((OFFER_VAT - 1) * 100).toFixed(2);
    return result.includes('.00') ? result.slice(0, -3) : result;
  }, []);

  return (
    <StepLayout
      title={t('createOffer', 'general', 'commission')}
      handleClickSave={handleClickNext}
      handleClickCancel={handleClickBack}
      bodyProps={{ p: { sm: '30px', md: '57px 40px 42px 40px' } }}
    >
      {isMobile ? (
        <Step3Mobile
          t={t}
          state={state}
          offer={editOfferData}
          taxRate={taxRate}
          getTotalPrice={getTotalPrice}
          handleChangeCommission={handleChangeCommission}
        />
      ) : (
        <Step3Desktop
          t={t}
          state={state}
          offer={editOfferData}
          taxRate={taxRate}
          getTotalPrice={getTotalPrice}
          handleChangeCommission={handleChangeCommission}
        />
      )}
    </StepLayout>
  );
};

export default memo(Step3);
