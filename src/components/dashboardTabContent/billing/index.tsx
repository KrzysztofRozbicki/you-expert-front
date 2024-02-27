import React, { memo, useState, useCallback } from 'react';
import {
  Flex,
  Heading,
  Input,
  Text,
  Textarea,
  useToast,
  Spinner,
  Box
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { ButtonController } from '../../common/ButtonController';
import useTranslation from '../../../hooks/useTranslation';
import { getUserDataById, editUser } from '../../../api/account';
import { UserState } from '../../../common/interfaceTypes';
import { IState } from './interfaces';
import { inputConfig } from './constants';
import {
  editUserAccountAsyncAction,
  setFullProfileDataAction
} from '../../../redux/actions/user';
import RequiredMark from '../../common/RequiredMark';

const Billing: React.FC = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { fullProfileData } = useSelector((state: UserState) => state.user);
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [state, setState] = useState<IState>({
    values: {
      bankName: fullProfileData?.transferBankName,
      address: fullProfileData?.transferAccountAddress,
      accountNumber: fullProfileData?.transferAccountNumber,
      swift: fullProfileData?.transferSwiftNumber
    },
    errors: {
      bankName: false,
      address: false,
      accountNumber: false,
      swift: false
    }
  });

  const onTextFieldChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      fieldName: string
    ): void => {
      const {
        target: { value }
      } = e;

      setState((prev) => ({
        ...prev,
        values: {
          ...prev.values,
          [fieldName]: value
        },
        errors: {
          ...prev.errors,
          [fieldName]: false
        }
      }));
    },
    []
  );

  const isValidValues = useCallback(() => {
    const errors = { ...state.errors };
    const keys = Object.keys(state.values);

    for (let i = 0; i < keys?.length; i++) {
      const key = keys[i];
      if (!state.values[key]) {
        errors[key] = true;
      }
    }

    setState((prev) => ({
      ...prev,
      errors
    }));

    return !Object.values(errors).some((item) => item);
  }, [state]);

  const onSubmit = useCallback(() => {
    if (!isValidValues()) {
      return;
    }

    const updatedData = {
      transferBankName: state?.values?.bankName,
      transferAccountAddress: state?.values?.address,
      transferAccountNumber: state?.values?.accountNumber,
      transferSwiftNumber: state?.values?.swift
    };

    setIsLoading(true);
    editUserAccountAsyncAction(fullProfileData?.id, updatedData)
      .then((data: any) => {
        dispatch(setFullProfileDataAction(data));
        toast({
          title: t('common', 'account', 'editToastTitle'),
          description: t('common', 'account', 'editToastDescription'),
          status: 'success',
          duration: 4000,
          isClosable: true
        });
      })
      .catch(() => {
        toast({
          title: t('dashboard', 'toasts', 'cantSaveData'),
          description: t('dashboard', 'toasts', 'smthWentWrong'),
          status: 'error',
          duration: 4000,
          isClosable: true
        });
      })
      .finally(() => setIsLoading(false));
  }, [state, dispatch, isValidValues]);

  return (
    <Flex w="100%" direction="column" p="5%">
      <Heading fontSize="1.6rem" fontWeight="500" mb="30px">
        {t('dashboard', 'title', 'bankDetails')}
      </Heading>
      <Flex w="100%" direction="column">
        {inputConfig.map((item, index) => {
          if (item?.inputType === 'input') {
            return (
              <Flex
                w="100%"
                flexDirection={{ sm: 'column', md: 'row' }}
                key={index}
                alignItems={{ md: 'center' }}
                mb="40px"
              >
                <Text
                  w="300px"
                  mb={{ sm: '10px', md: '0' }}
                  ml={{ sm: '20px', md: '0' }}
                  fontSize="0.8rem"
                >
                  {t('dashboard', 'labels', item?.name)}{' '}
                  {item?.isRequired && <RequiredMark />}
                </Text>
                <Box flex={1}>
                  <Input
                    minHeight="56px"
                    value={state?.values[item?.name]}
                    onChange={(e) => onTextFieldChange(e, item?.name)}
                    borderRadius="55px"
                    fontSize="0.8rem"
                    borderColor={
                      state?.errors[item?.name] ? 'general.red' : 'inherit'
                    }
                  />
                  {state?.errors[item?.name] && (
                    <Text fontSize="0.6rem" color="general.red">
                      {t('dashboard', 'labels', item?.name)}{' '}
                      {t('settings', 'errors', 'isRequired')}
                    </Text>
                  )}
                </Box>
              </Flex>
            );
          }

          if (item?.inputType === 'textarea') {
            return (
              <Flex
                w="100%"
                flexDirection={{ sm: 'column', md: 'row' }}
                alignItems={{ md: 'center' }}
                key={index}
                mb="30px"
              >
                <Text
                  w="300px"
                  mb={{ sm: '10px', md: '0' }}
                  ml={{ sm: '20px', md: '0' }}
                  fontSize="0.8rem"
                >
                  {t('dashboard', 'labels', item?.name)}{' '}
                  {item?.isRequired && <RequiredMark />}
                </Text>
                <Box flex={1}>
                  <Textarea
                    value={state?.values[item?.name]}
                    onChange={(e) => onTextFieldChange(e, item?.name)}
                    minHeight="150px"
                    p="20px"
                    fontSize="0.8rem"
                    placeholder={t(
                      'dashboard',
                      'labels',
                      'bankAddressPlaceholder'
                    )}
                    w="100%"
                    borderRadius="15px"
                    borderColor={
                      state?.errors[item?.name] ? 'general.red' : 'inherit'
                    }
                  />
                  {state?.errors[item?.name] && (
                    <Text fontSize="0.6rem" color="general.red">
                      {t('dashboard', 'labels', item?.name)}{' '}
                      {t('settings', 'errors', 'isRequired')}
                    </Text>
                  )}
                </Box>
              </Flex>
            );
          }
        })}
        <ButtonController
          onClick={onSubmit}
          w={{
            sm: '100%',
            md: '70%',
            lg: '60%',
            xl: '30% !important',
            '2xl': '30%'
          }}
          customM={{ xl: '0 0 0 auto' }}
          variant="yellow"
          isDisabled={isLoading}
          customStyle={{ fontSize: '0.8rem' }}
        >
          {isLoading ? <Spinner /> : t('common', 'labels', 'save')}
        </ButtonController>
      </Flex>
    </Flex>
  );
};

export default memo(Billing);
