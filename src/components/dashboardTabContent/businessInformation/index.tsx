import React, { memo, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import {
  Flex,
  Heading,
  Text,
  Input,
  Spinner,
  useToast,
  Box
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { inputsConfig, stateErrors, stateValues } from './constants';
import SwitchController from '../../common/SwitchController';
import CheckboxController from '../../common/checkboxController';
import { ButtonController } from '../../../components/common/ButtonController';
import useTranslation from '../../../hooks/useTranslation';
import {
  becomeAnExpertAction,
  updateBusinessInformationAction
} from '../actions';
import {
  refreshTokenAction,
  setFullProfileDataAction
} from '../../../redux/actions/user';
import {
  BusinessInformationState,
  BusinessInformationProps
} from './interfaces';
import RequiredMark from '../../common/RequiredMark';

const BusinessInformation: React.FC<BusinessInformationProps> = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const {
    push,
    query: { locale }
  } = useRouter();
  const dispatch = useDispatch();
  const { fullProfileData, refreshToken } = useSelector(
    (state: any) => state.user
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [state, setState] = useState<BusinessInformationState>({
    values: {
      ...stateValues,
      companyName: fullProfileData?.companyName || '',
      nipNumber: fullProfileData?.nipNumber || '',
      country: fullProfileData?.country || '',
      city: fullProfileData?.city || '',
      street: fullProfileData?.street || '',
      zipCode: fullProfileData?.zipCode || '',
      phoneNumber: fullProfileData?.phoneNumber || '',
      eInvoices: !!fullProfileData?.eInvoices,
      issuingInvoices: !!fullProfileData?.issuingInvoices,
      isCompany: !!fullProfileData?.isCompany
    },
    errors: stateErrors
  });

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, maxLength: number): void => {
      const {
        target: { value, name }
      } = e;

      if (value.length > maxLength) {
        return;
      }

      if (
        name === 'zipCode' &&
        value !== '' &&
        value?.length > state?.values?.zipCode?.length &&
        !/^[0-9-]+$/.test(value)
      ) {
        return;
      }

      if (
        name === 'phoneNumber' &&
        value !== '' &&
        value?.length > state?.values?.phoneNumber?.length &&
        !/^[0-9+-]+$/.test(value)
      ) {
        return;
      }

      setState((prev) => ({
        ...prev,
        values: {
          ...prev.values,
          [name]: value
        },
        errors: {
          ...prev.errors,
          [name]: false
        }
      }));
    },
    [state]
  );

  const handleEInvoicesChange = useCallback(() => {
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        eInvoices: !prev.values.eInvoices
      },
      errors: {
        ...prev.errors,
        eInvoices: false
      }
    }));
  }, [state]);

  const handleIssuingInvoicesChange = useCallback(() => {
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        issuingInvoices: !prev?.values?.issuingInvoices
      },
      errors: {
        ...prev.errors,
        issuingInvoices: false
      }
    }));
  }, [state]);

  const handleChangeTermsAndConditions = useCallback(() => {
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        termsAndConditions: !prev.values.termsAndConditions
      },
      errors: {
        ...prev.errors,
        termsAndConditions: false
      }
    }));
  }, [state]);

  const handleIsCompanyChange = useCallback(() => {
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        isCompany: !prev.values.isCompany
      },
      errors: {
        ...prev.errors,
        isCompany: false
      }
    }));
  }, [state]);

  const isValidValues = useCallback(() => {
    const errors = { ...stateErrors };
    const keys = Object.keys(state.values);
    const values = Object.values(state.values);

    for (let i = 0; i < keys.length; i++) {
      if (
        keys[i] !== 'eInvoices' &&
        keys[i] !== 'issuingInvoices' &&
        keys[i] !== 'termsAndConditions' &&
        keys[i] !== 'isCompany'
      ) {
        if (
          !state?.values?.isCompany &&
          (keys[i] === 'companyName' || keys[i] === 'nipNumber')
        ) {
          continue;
        }

        if (!values[i]) {
          errors[keys[i]] = true;
        }
      }
    }

    setState((prev) => ({ ...prev, errors: { ...prev.errors, ...errors } }));
    return !Object.values(errors).some((item) => item);
  }, [state]);

  const handleSaveChanges = useCallback(() => {
    if (isValidValues()) {
      setIsLoading(true);
      updateBusinessInformationAction(state.values, fullProfileData?.id)
        .then((data) => {
          dispatch(setFullProfileDataAction(data));
          toast({
            title: t('settings', 'toast', 'dataWasSaved'),
            description: t('settings', 'toast', 'dataWasSavedSuccessfully'),
            status: 'success',
            duration: 4000,
            isClosable: true
          });
        })
        .catch(() => {
          toast({
            title: t('settings', 'toast', 'cantSaveData'),
            description: t('settings', 'toast', 'smthWentWrong'),
            status: 'error',
            duration: 4000,
            isClosable: true
          });
        })
        .finally(() => setIsLoading(false));
    }
  }, [isValidValues, state, fullProfileData, t, toast, dispatch]);

  const handleBecomeAnExpert = useCallback(() => {
    if (isValidValues()) {
      if (!state.values.termsAndConditions) {
        toast({
          title: t('settings', 'toast', 'error'),
          description: t('settings', 'toast', 'acceptTermsAndConditions'),
          status: 'error',
          duration: 4000,
          isClosable: true
        });
        return;
      }
      setIsLoading(true);
      becomeAnExpertAction(state.values)
        .then(() => dispatch(refreshTokenAction(refreshToken)))
        .then(() => push(`/${locale}/dashboard/settings/account`))
        .catch(() => {
          toast({
            title: t('settings', 'toast', 'cantSaveData'),
            description: t('settings', 'toast', 'smthWentWrong'),
            status: 'error',
            duration: 4000,
            isClosable: true
          });
        })
        .finally(() => setIsLoading(false));
    }
  }, [
    isValidValues,
    state,
    fullProfileData,
    t,
    toast,
    dispatch,
    refreshToken,
    push,
    locale
  ]);

  return (
    <Flex w="100%" direction="column" p="5%">
      <Heading fontSize="1.6rem" fontWeight="500" mb="30px">
        {t('settings', 'titles', 'businessInformation')}
      </Heading>
      <Flex mb="35px" justify="space-between">
        <Flex direction="column" flex={1} mr="20px">
          <Text mr="5%" fontSize="0.8rem" mb="8px">
            {t('settings', 'labels', 'company')}
          </Text>
          <Text mr="5%" fontSize="0.6rem" mb="8px">
            {t('settings', 'labels', 'companyDesc')}
          </Text>
        </Flex>
        <SwitchController
          handleChange={handleIsCompanyChange}
          checked={!!state?.values?.isCompany}
        />
      </Flex>
      {inputsConfig.map((input, index) => {
        if (
          !state?.values?.isCompany &&
          (input?.name === 'companyName' || input?.name === 'nipNumber')
        ) {
          return <></>;
        }

        return (
          <Flex
            justify="space-between"
            align={{ md: 'center' }}
            mb="35px"
            key={index}
            flexDirection={{ sm: 'column', md: 'row' }}
          >
            <Text
              mr={{ md: '5%' }}
              fontSize="0.8rem"
              w="100px"
              mb={{ sm: '10px', md: '8px' }}
              ml={{ sm: '20px', md: '0' }}
            >
              {t('settings', 'labels', input?.name)}{' '}
              {input?.isRequired && <RequiredMark />}
            </Text>
            <Box flex={1} maxWidth={{ md: '420px' }}>
              <Input
                borderRadius="55px"
                minHeight="57px"
                value={state.values[input?.name]}
                onChange={(e) => handleInputChange(e, input?.maxLength)}
                name={input?.name}
                fontSize="0.8rem"
                maxLength={input?.maxLength}
                borderColor={
                  state.errors[input.name]
                    ? 'general.red'
                    : 'general.inputBorder'
                }
              />
              {state?.errors[input?.name] && (
                <Text fontSize="0.6rem" color="general.red">
                  {t('settings', 'labels', input?.name)}{' '}
                  {t('settings', 'errors', 'isRequired')}
                </Text>
              )}
            </Box>
          </Flex>
        );
      })}
      <Flex mb="51px" justify="space-between">
        <Flex direction="column" flex={1} mr="20px">
          <Text mr="5%" fontSize="0.8rem" mb="8px">
            {t('settings', 'labels', 'eInvoices')}
          </Text>
          <Text mr="5%" fontSize="0.6rem" mb="8px">
            {t('settings', 'additionalInfo', 'eInvoices')}
          </Text>
        </Flex>
        <SwitchController
          handleChange={handleEInvoicesChange}
          checked={state.values.eInvoices}
        />
      </Flex>
      <Flex mb="51px" justify="space-between">
        <Flex direction="column" flex={1} mr="20px">
          <Text mr="5%" fontSize="0.8rem" mb="8px">
            {t('settings', 'labels', 'issuing_invoices')}
          </Text>
        </Flex>
        <SwitchController
          handleChange={handleIssuingInvoicesChange}
          checked={!!state?.values?.issuingInvoices}
        />
      </Flex>
      {!fullProfileData?.isExpert && (
        <Flex mb="51px" justify="space-between">
          <a
            href={`/${locale}/privacy-policy`}
            target="_black"
            style={{ flex: 1 }}
          >
            <Text mr="5%" fontSize="0.6rem" mb="8px" textDecoration="underline">
              {t('settings', 'labels', 'termsAndConditions')}
            </Text>
          </a>
          <CheckboxController
            isChecked={state.values.termsAndConditions}
            onChange={handleChangeTermsAndConditions}
            wrapperStyle={{ width: 'fit-content', marginRight: '60px' }}
          />
        </Flex>
      )}
      {fullProfileData?.isExpert ? (
        <ButtonController
          variant="yellow"
          w={{
            sm: '100%',
            md: '70%',
            lg: '60%',
            xl: '30% !important',
            '2xl': '30%'
          }}
          customM={{ xl: '0 0 0 auto' }}
          onClick={handleSaveChanges}
          customStyle={{ fontSize: '0.8rem' }}
          isDisabled={isLoading}
        >
          {isLoading ? <Spinner /> : t('common', 'labels', 'save')}
        </ButtonController>
      ) : (
        <ButtonController
          variant="yellow"
          w={{
            sm: '100%',
            md: '70%',
            lg: '60%',
            xl: '30% !important',
            '2xl': '30%'
          }}
          customM={{ xl: '0 0 0 auto' }}
          customStyle={{ fontSize: '0.8rem' }}
          onClick={handleBecomeAnExpert}
          isDisabled={isLoading}
        >
          {isLoading ? <Spinner /> : t('settings', 'buttons', 'becomeAnExpert')}
        </ButtonController>
      )}
    </Flex>
  );
};

export default memo(BusinessInformation);
