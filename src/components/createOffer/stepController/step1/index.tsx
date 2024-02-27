import React, { memo, useMemo, useCallback, useState } from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import StepLayout from '../stepLayout';
import useTranslation from '../../../../hooks/useTranslation';
import { StepProps } from '../interfaces';
import { TextStyled, InputStyled } from './style';
// import SelectController from '../../../common/SelectController';
import selectStyles from './selectStyles';
import { initialStateType } from './interfaces';
import { offerType, createOfferInitialState } from '../../interfaces';
import {
  setCreateOfferStateAction,
  getServicesByCategory
} from '../../actions';
import RequiredMark from '../../../common/RequiredMark';
import { CategoryState } from '../../../../common/interfaceTypes';

const initialErrors = {
  serviceTitle: false,
  category: false,
  subcategory: false,
  service: false
};

const Step1: React.FC<StepProps> = (props) => {
  const { goNextStep, goPrevStep } = props;
  const { categoryList } = useSelector(
    (state: CategoryState) => state.categories
  );
  const { categories, subcategories, offer } = useSelector(
    (state: any): createOfferInitialState => state.createOffer
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [state, setState] = useState<initialStateType>({
    values: {
      serviceTitle: offer.serviceTitle,
      category: offer.category,
      subcategory: offer.subcategory,
      service: offer.service
    },
    errors: initialErrors
  });

  const categoryOptions = useMemo(
    () =>
      categoryList?.map((category) => ({
        id: category?.id,
        value: category?.name,
        label: category?.name,
        slug: category?.slug,
        subcategories: category?.subcategories
      })),
    [categoryList]
  );

  const subcategoryOptions = useMemo(() => {
    if (!state?.values?.category?.subcategories?.length) return [];

    return state.values.category?.subcategories?.map((subcategory) => ({
      id: subcategory?.id,
      value: subcategory?.name,
      label: subcategory?.name,
      slug: subcategory?.slug
    }));
  }, [state.values.category]);

  const serviceOptions = useMemo(() => {
    if (!state?.values?.category?.label) return [];

    if (!state?.values?.category?.subcategories?.length) {
      return categories
        ?.find((category) => category.id === state?.values?.category?.id)
        ?.services?.map((service) => ({
          id: service?.id,
          value: service?.name,
          label: service?.name,
          slug: service?.slug
        }));
    }

    return subcategories
      ?.find((subcategory) => subcategory?.id === state.values.subcategory?.id)
      ?.services?.map((service) => ({
        id: service?.id,
        value: service?.name,
        label: service?.name,
        slug: service?.slug
      }));
  }, [
    categories,
    subcategories,
    state.values.category?.label,
    state.values.subcategory?.label
  ]);

  const handleSelectCategoryChange = useCallback(
    (option: {
      id: number;
      value: string;
      label: string;
      slug: string;
    }): void => {
      setState(
        (prev: initialStateType): initialStateType => ({
          ...prev,
          values: {
            ...prev.values,
            category: option,
            subcategory: {
              label: '',
              value: '',
              slug: ''
            },
            service: {
              label: '',
              value: '',
              slug: ''
            }
          },
          errors: {
            ...prev.errors,
            category: false,
            subcategory: false,
            service: false
          }
        })
      );
    },
    [setState]
  );

  const handleSelectSubcategoryChange = useCallback(
    (option: {
      id: number;
      value: string;
      label: string;
      slug: string;
    }): void => {
      if (option.label === state?.values?.subcategory?.label) {
        setState(
          (prev: initialStateType): initialStateType => ({
            ...prev,
            values: {
              ...prev.values,
              subcategory: {
                label: '',
                value: '',
                slug: ''
              },
              service: {
                label: '',
                value: '',
                slug: ''
              }
            },
            errors: {
              ...prev.errors,
              subcategory: false,
              service: false
            }
          })
        );
        return;
      }

      setState(
        (prev: initialStateType): initialStateType => ({
          ...prev,
          values: {
            ...prev.values,
            subcategory: option,
            service: {
              label: '',
              value: '',
              slug: ''
            }
          },
          errors: {
            ...prev.errors,
            subcategory: false,
            service: false
          }
        })
      );
    },
    [state, setState]
  );

  const handleSelectServiceChange = useCallback(
    (option: {
      id: number;
      value: string;
      label: string;
      slug: string;
    }): void => {
      setState(
        (prev: initialStateType): initialStateType => ({
          ...prev,
          values: {
            ...prev.values,
            service: option
          },
          errors: {
            ...prev.errors,
            service: false
          }
        })
      );
    },
    [setState]
  );

  const handleServiceTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value }
      } = e;
      setState(
        (prev: initialStateType): initialStateType => ({
          ...prev,
          values: {
            ...prev.values,
            serviceTitle: value
          },
          errors: {
            ...prev.errors,
            serviceTitle: false
          }
        })
      );
    },
    [setState]
  );

  const checkFields = useCallback((): boolean => {
    const innerErrors = { ...initialErrors };
    const { values } = state;
    if (!values.serviceTitle.trim().length) {
      innerErrors.serviceTitle = true;
    }

    if (!values.category.value.length) {
      innerErrors.category = true;
    }

    if (
      values?.category?.subcategories?.length &&
      !values?.subcategory?.value?.length
    ) {
      innerErrors.subcategory = true;
    }

    if (!values.service.value.length) {
      innerErrors.service = true;
    }

    setState(
      (prev: initialStateType): initialStateType => ({
        ...prev,
        errors: innerErrors
      })
    );
    return !Object.values(innerErrors).some((i) => i);
  }, [state.values, setState]);

  const handleClickSaveFirstStep = useCallback(() => {
    if (checkFields()) {
      const isShouldGetParamsByService =
        offer.service.label !== state.values.service.label;
      dispatch(setCreateOfferStateAction({ ...offer, ...state.values }));
      if (isShouldGetParamsByService) {
        dispatch(getServicesByCategory(state.values.service.id));
      }
      goNextStep();
    }
  }, [state.values, checkFields, goNextStep, offer, dispatch]);

  return (
    <StepLayout
      title={t('createOffer', 'step1', 'overview')}
      handleClickSave={handleClickSaveFirstStep}
      handleClickCancel={goPrevStep}
      isHideBackButton
    >
      <Box mb="20px">
        <TextStyled>
          {t('createOffer', 'step1', 'offerTitle')}: <RequiredMark />
        </TextStyled>
        <Box>
          <InputStyled
            type="text"
            value={state.values.serviceTitle}
            maxLength={200}
            onChange={handleServiceTitleChange}
            isError={state.errors.serviceTitle}
          />
          {state.errors.serviceTitle && (
            <Text fontSize="0.6rem" color="general.red">
              {t('createOffer', 'step1', 'offerTitle')}{' '}
              {t('settings', 'errors', 'isRequired')}
            </Text>
          )}
        </Box>
      </Box>
      <Flex
        flexWrap="wrap"
        justifyContent="space-between"
        flexDirection={{ sm: 'column', md: 'row' }}
      >
        <Box width={{ sm: '100%', md: '45%' }} mb="20px">
          <TextStyled>
            {t('createOffer', 'step1', 'category')}: <RequiredMark />
          </TextStyled>
          <Box>
            <Select
              styles={selectStyles(state.errors.category)}
              options={categoryOptions}
              onChange={handleSelectCategoryChange}
              value={state.values.category}
              isSearchable={false}
            />
            {state.errors.category && (
              <Text fontSize="0.6rem" color="general.red">
                {t('createOffer', 'step1', 'category')}{' '}
                {t('settings', 'errors', 'isRequired')}
              </Text>
            )}
          </Box>
        </Box>
        {!!subcategoryOptions?.length && (
          <Box width={{ sm: '100%', md: '45%' }} mb="20px">
            <TextStyled>
              {t('createOffer', 'step1', 'subCategory')}: <RequiredMark />
            </TextStyled>
            <Box>
              <Select
                styles={selectStyles(state.errors.subcategory)}
                options={subcategoryOptions}
                onChange={handleSelectSubcategoryChange}
                value={state.values.subcategory}
                isSearchable={false}
              />
              {state.errors.subcategory && (
                <Text fontSize="0.6rem" color="general.red">
                  {t('createOffer', 'step1', 'subCategory')}{' '}
                  {t('settings', 'errors', 'isRequired')}
                </Text>
              )}
            </Box>
          </Box>
        )}
        {!!serviceOptions?.length && (
          <Box width={{ sm: '100%', md: '45%' }} mb="20px">
            <TextStyled>
              {t('createOffer', 'step1', 'service')}: <RequiredMark />
            </TextStyled>
            <Box>
              <Select
                styles={selectStyles(state.errors.service)}
                options={serviceOptions}
                onChange={handleSelectServiceChange}
                value={state.values.service}
                isSearchable={false}
              />
              {state.errors.service && (
                <Text fontSize="0.6rem" color="general.red">
                  {t('createOffer', 'step1', 'service')}{' '}
                  {t('settings', 'errors', 'isRequired')}
                </Text>
              )}
            </Box>
          </Box>
        )}
      </Flex>
    </StepLayout>
  );
};

export default memo(Step1);
