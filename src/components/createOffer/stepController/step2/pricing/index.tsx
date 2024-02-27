import React, { memo, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import useTranslation from '../../../../../hooks/useTranslation';
import { paramsByServiceType } from '../../../interfaces';
import { pricingStateType } from '../interfaces';
import { isValidInputNumber } from '../../../utils';
import { initialStateType } from '../../../../../redux/interfaces/app';
import { screenSizesNumber } from '../../../../../styles/theme/breakpoints';
import PricingDesktop from './pricing.desktop';
import PricingMobile from './pricing.mobile';

interface pricingProps {
  state: pricingStateType;
  setState: (prev?: any) => void;
}

const Pricing: React.FC<pricingProps> = (props) => {
  const { state, setState } = props;

  const { t } = useTranslation();
  const paramsByService = useSelector(
    (state: any): paramsByServiceType => state.createOffer.paramsByService
  );
  const { windowWidth } = useSelector(
    (state: any): initialStateType => state.app
  );

  const isMobile = useMemo(
    (): boolean => windowWidth < screenSizesNumber?.lg,
    [windowWidth]
  );

  const handleCheckboxChange = useCallback(
    (pricingPackage: string, value: boolean) => {
      if (pricingPackage === 'basic') {
        return;
      }

      if (pricingPackage === 'premium' && !state.values.pricing.standard.isOn) {
        return;
      }

      const newState = {
        ...state,
        values: {
          ...state.values,
          pricing: {
            ...state.values.pricing,
            [pricingPackage]: {
              ...state.values.pricing[pricingPackage],
              isOn: value
            }
          }
        },
        errors: {
          ...state.errors,
          pricing: {
            ...state.errors.pricing,
            [pricingPackage]: {
              ...state.errors.pricing[pricingPackage],
              deliveryTime: false,
              price: false,
              params: state.errors.pricing[pricingPackage].params.map(
                () => false
              )
            }
          }
        }
      };

      if (pricingPackage === 'standard' && !value) {
        newState.values.pricing.premium.isOn = false;
        newState.errors.pricing.premium = {
          ...state.errors.pricing.premium,
          deliveryTime: false,
          price: false,
          params: state.errors.pricing.premium.params.map(() => false)
        };
      }

      setState(newState);
    },
    [state, setState]
  );

  const handleChangePrice = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, pricingPackage: string) => {
      const {
        target: { value }
      } = e;

      if (isValidInputNumber(value)) {
        setState(
          (prev: pricingStateType): pricingStateType => ({
            ...prev,
            values: {
              ...prev.values,
              pricing: {
                ...prev.values.pricing,
                [pricingPackage]: {
                  ...prev.values.pricing[pricingPackage],
                  price: value
                }
              }
            },
            errors: {
              ...prev.errors,
              pricing: {
                ...prev.errors.pricing,
                [pricingPackage]: {
                  ...prev.errors.pricing[pricingPackage],
                  price: false
                }
              }
            }
          })
        );
      }
    },
    [setState]
  );

  const handleСhangeDate = useCallback(
    (value: string, pricingPackage: string) => {
      if (isValidInputNumber(value)) {
        setState(
          (prev: pricingStateType): pricingStateType => ({
            ...prev,
            values: {
              ...prev.values,
              pricing: {
                ...prev.values.pricing,
                [pricingPackage]: {
                  ...prev.values.pricing[pricingPackage],
                  deliveryTime: value
                }
              }
            },
            errors: {
              ...prev.errors,
              pricing: {
                ...prev.errors.pricing,
                [pricingPackage]: {
                  ...prev.errors.pricing[pricingPackage],
                  deliveryTime: false
                }
              }
            }
          })
        );
      }
    },
    [setState]
  );

  const handleParamsItemChange = useCallback(
    (value: any, pricingPackage: string, index: number) => {
      const paramsValues = state.values.pricing[pricingPackage].params.map(
        (item, i) => (i === index ? { ...item, value } : { ...item })
      );

      const paramsErrors = state.errors.pricing[pricingPackage].params.map(
        (item, i) => (i === index ? false : item)
      );

      setState(
        (prev: pricingStateType): pricingStateType => ({
          ...prev,
          values: {
            ...prev.values,
            pricing: {
              ...prev.values.pricing,
              [pricingPackage]: {
                ...prev.values.pricing[pricingPackage],
                params: paramsValues
              }
            }
          },
          errors: {
            ...prev.errors,
            pricing: {
              ...prev.errors.pricing,
              [pricingPackage]: {
                ...prev.errors.pricing[pricingPackage],
                params: paramsErrors
              }
            }
          }
        })
      );
    },
    [state.values, state.errors, setState]
  );

  const getValueForParamsItem = useCallback(
    (pricingPackage: string, index: number) =>
      state.values.pricing[pricingPackage].params[index].value,
    [state.values]
  );

  const getDisabledPackageForParamsItem = useCallback(
    (pricingPackage: string): boolean =>
      !state.values.pricing[pricingPackage].isOn,
    [state.values]
  );

  const getErrorForParamsItem = useCallback(
    (pricingPackage: string, index: number): boolean =>
      state.errors.pricing[pricingPackage].params[index],
    [state.errors]
  );

  return isMobile ? (
    <PricingMobile
      t={t}
      state={state}
      paramsByService={paramsByService}
      handleСhangeDate={handleСhangeDate}
      handleChangePrice={handleChangePrice}
      handleCheckboxChange={handleCheckboxChange}
      getValueForParamsItem={getValueForParamsItem}
      handleParamsItemChange={handleParamsItemChange}
      getErrorForParamsItem={getErrorForParamsItem}
      getDisabledPackageForParamsItem={getDisabledPackageForParamsItem}
    />
  ) : (
    <PricingDesktop
      t={t}
      state={state}
      paramsByService={paramsByService}
      handleСhangeDate={handleСhangeDate}
      handleChangePrice={handleChangePrice}
      handleCheckboxChange={handleCheckboxChange}
      getValueForParamsItem={getValueForParamsItem}
      handleParamsItemChange={handleParamsItemChange}
      getErrorForParamsItem={getErrorForParamsItem}
      getDisabledPackageForParamsItem={getDisabledPackageForParamsItem}
    />
  );
};

export default memo(Pricing);
