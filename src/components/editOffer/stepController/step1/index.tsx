import React, { memo, useMemo, useCallback, useState } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import StepLayout from '../../../createOffer/stepController/stepLayout';
import useTranslation from '../../../../hooks/useTranslation';
import { StepProps } from '../interfaces';
import { TextStyled, InputStyled } from './style';
import SelectController from '../../../common/SelectController';
import selectStyles from './selectStyles';
import { initialStateType } from './interfaces';
import { IEditOfferInitialState } from '../../interfaces';
import { setEditOfferEditableDataAction } from '../../actions';
import RequiredMark from '../../../common/RequiredMark';

const initialErrors = {
  serviceTitle: false,
  category: false,
  subcategory: false,
  service: false
};

const Step1: React.FC<StepProps> = (props) => {
  const { goNextStep, goPrevStep } = props;
  const { editOfferData } = useSelector(
    (state: any): IEditOfferInitialState => state.editOffer
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [state, setState] = useState<initialStateType>({
    values: {
      serviceTitle: editOfferData.serviceTitle,
      category: editOfferData.category,
      subcategory: editOfferData.subcategory,
      service: editOfferData.service
    },
    errors: initialErrors
  });

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
    [setState]
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
      dispatch(
        setEditOfferEditableDataAction({
          ...editOfferData,
          serviceTitle: state.values.serviceTitle
        })
      );
      goNextStep();
    }
  }, [state.values, checkFields, goNextStep, dispatch]);

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
        <InputStyled
          type="text"
          value={state.values.serviceTitle}
          maxLength={200}
          onChange={handleServiceTitleChange}
          isError={state.errors.serviceTitle}
        />
      </Box>
      <Flex
        mb="20px"
        justifyContent="space-between"
        flexDirection={{ sm: 'column', md: 'row' }}
      >
        <Box width={{ sm: '100%', md: '45%' }} mb={{ sm: '20px', md: '0' }}>
          <TextStyled>
            {t('createOffer', 'step1', 'category')}: <RequiredMark />
          </TextStyled>
          <SelectController
            customStyle={selectStyles(state.errors.category)}
            options={[]}
            onChange={handleSelectCategoryChange}
            value={state.values.category}
            isDisabled
          />
        </Box>
        <Box width={{ sm: '100%', md: '45%' }}>
          <TextStyled>
            {t('createOffer', 'step1', 'subCategory')}: <RequiredMark />
          </TextStyled>
          <SelectController
            customStyle={selectStyles(state.errors.subcategory)}
            options={[]}
            onChange={handleSelectSubcategoryChange}
            value={state.values.subcategory}
            isDisabled
          />
        </Box>
      </Flex>
      <Flex mb="20px" justifyContent="space-between">
        <Box width={{ sm: '100%', md: '45%' }}>
          <TextStyled>
            {t('createOffer', 'step1', 'service')}: <RequiredMark />
          </TextStyled>
          <SelectController
            customStyle={selectStyles(state.errors.service)}
            options={[]}
            onChange={handleSelectServiceChange}
            value={state.values.service}
            isDisabled
          />
        </Box>
      </Flex>
      {/* <Box>
        <TextStyled>{t('createOffer', 'step1', 'searchTags')}</TextStyled>
        <InputStyled type="text" />
      </Box> */}
    </StepLayout>
  );
};

export default memo(Step1);
