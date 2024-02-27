import React, { memo, useState, useCallback } from 'react';
import {
  Flex,
  Textarea,
  Text,
  Input,
  useToast,
  Spinner,
  Box
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import useTranslation from '../../../hooks/useTranslation';
import FileInput from '../fileInput';
import { ButtonController } from '../../common/ButtonController';
import RequiredMark from '../../common/RequiredMark';
import { accountUIConfiguration } from './constants';
import { IState } from './interfaces';
import { getFileNameFromUrl, toBase64 } from '../../../utils';
import {
  editUserAccountAsyncAction,
  setFullProfileDataAction
} from '../../../redux/actions/user';

const Account: React.FC = () => {
  const toast = useToast();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { fullProfileData } = useSelector((state: any) => state.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [state, setState] = useState<IState>({
    values: {
      avatar: fullProfileData?.avatarUrl
        ? {
            id: new Date().getTime(),
            file: fullProfileData?.avatarUrl,
            filename: getFileNameFromUrl(fullProfileData?.avatarUrl)
          }
        : null,
      title: fullProfileData?.title,
      firstName: fullProfileData?.firstName,
      lastName: fullProfileData?.lastName,
      email: fullProfileData?.email,
      description: fullProfileData?.description
    },
    errors: {
      avatar: false,
      title: false,
      firstName: false,
      lastName: false,
      email: false,
      description: false
    }
  });

  const handleSaveImages = useCallback(
    async (file: File): Promise<void> => {
      if (!file) {
        return;
      }

      const fileBase64 = await toBase64(file).catch((e) => Error(e));
      if (fileBase64 instanceof Error) {
        return;
      }

      setState((prevState) => ({
        ...prevState,
        values: {
          ...prevState.values,
          avatar: {
            id: new Date().getTime(),
            filename: file.name,
            file: fileBase64
          }
        }
      }));
    },
    [setState]
  );

  const handleDeleteFile = useCallback(
    (id: number): void => {
      setState((prev) => ({
        ...prev,
        values: { ...prev.values, avatar: null }
      }));
    },
    [setState]
  );

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
    [setState]
  );

  const isValidValues = useCallback(() => {
    const errors = { ...state.errors };
    if (!state?.values?.firstName) {
      errors.firstName = true;
    }
    if (!state?.values?.lastName) {
      errors.lastName = true;
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

    const updatedData: any = {
      firstName: state?.values?.firstName,
      lastName: state?.values?.lastName
    };

    if (
      state?.values?.avatar &&
      state?.values?.avatar?.file !== fullProfileData?.avatarUrl
    ) {
      updatedData.avatar = state.values.avatar;
    }

    if (fullProfileData?.isExpert) {
      updatedData.title = state?.values?.title;
      updatedData.description = state?.values?.description;
    }

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
      {accountUIConfiguration.map((item, itemIdx) => {
        const { inputType, name, isDisabled, isRequired } = item;
        if (inputType === 'image') {
          return (
            <Flex w="100%" direction="column" key={itemIdx}>
              <FileInput
                file={state?.values?.avatar?.file}
                title={t('common', 'labels', 'uploadAvatar')}
                onSaveFiles={handleSaveImages}
                handleDeleteFile={(id: number) => handleDeleteFile(id)}
                imgAlt={`${fullProfileData?.firstName} ${fullProfileData?.lastName}`}
              />
            </Flex>
          );
        } else if (inputType === 'description') {
          if (fullProfileData?.isExpert) {
            return (
              <Flex
                justify="space-between"
                align={{ md: 'center' }}
                mb="35px"
                flexDirection={{ sm: 'column', md: 'row' }}
              >
                <Text
                  mr={{ md: '5%' }}
                  fontSize="0.8rem"
                  w="100px"
                  mb={{ sm: '10px', md: '8px' }}
                  ml={{ sm: '20px', md: '0' }}
                >
                  {t('settings', 'labels', name)}
                </Text>
                <Textarea
                  flex={{ md: 1 }}
                  maxWidth={{ md: '420px' }}
                  h={{ sm: '200px', md: '150px' }}
                  fontSize="0.8rem"
                  disabled={isDisabled}
                  value={state?.values[name]}
                  onChange={(e) => onTextFieldChange(e, name)}
                  borderColor={state?.errors[name] ? 'general.red' : 'inherit'}
                />
              </Flex>
            );
          }
          return <></>;
        } else if (inputType === 'text') {
          if (name === 'title' && !fullProfileData?.isExpert) {
            return <></>;
          }

          return (
            <Flex
              justify="space-between"
              align={{ md: 'center' }}
              mb="35px"
              flexDirection={{ sm: 'column', md: 'row' }}
            >
              <Text
                mr={{ md: '5%' }}
                fontSize="0.8rem"
                w="100px"
                mb={{ sm: '10px', md: '8px' }}
                ml={{ sm: '20px', md: '0' }}
              >
                {t('settings', 'labels', name)} {isRequired && <RequiredMark />}
              </Text>
              <Box flex={1} maxWidth={{ md: '420px' }}>
                <Input
                  borderRadius="55px"
                  fontSize="0.8rem"
                  minHeight="57px"
                  value={state?.values[name]}
                  disabled={isDisabled}
                  onChange={(e) => onTextFieldChange(e, name)}
                  borderColor={state?.errors[name] ? 'general.red' : 'inherit'}
                />
                {state?.errors[name] && (
                  <Text fontSize="0.6rem" color="general.red">
                    {t('settings', 'errors', name)}
                  </Text>
                )}
              </Box>
            </Flex>
          );
        }

        return <></>;
      })}
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
        onClick={onSubmit}
      >
        {isLoading ? <Spinner /> : t('common', 'labels', 'save')}
      </ButtonController>
    </Flex>
  );
};

export default memo(Account);
