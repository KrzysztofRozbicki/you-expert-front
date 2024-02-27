import React, { memo, useState, useCallback } from 'react';
import {
  Flex,
  Heading,
  Box,
  Input,
  Text,
  Button,
  useToast
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useTranslation from '../../hooks/useTranslation';
import { validatePassword } from '../../common/strings';
import { setNewPasswordAction } from './actions';

const ResetPassword: React.FC<{
  setTriggeredButton: (triggerredButton: string) => void;
}> = ({ setTriggeredButton }) => {
  const { t } = useTranslation();
  const toast = useToast();
  const {
    query: { uid, user_token: token }
  } = useRouter();

  const [state, setState] = useState<{
    isLoading: boolean;
    isPasswordChanged: boolean;
    values: { password: string; confirmPassword: string };
    errors: { isMatchPasswords: boolean; isValidPassword: boolean };
  }>({
    isLoading: false,
    isPasswordChanged: false,
    values: { password: '', confirmPassword: '' },
    errors: { isMatchPasswords: true, isValidPassword: true }
  });

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const {
        target: { name, value }
      } = e;

      setState((prev) => ({
        ...prev,
        values: {
          ...prev.values,
          [name]: value
        },
        errors: {
          isMatchPasswords: true,
          isValidPassword: true
        }
      }));
    },
    [setState]
  );

  const handleSetNewPassword = useCallback(() => {
    if (
      !state?.values?.password ||
      !validatePassword(state?.values?.password)?.status
    ) {
      setState((prev) => ({
        ...prev,
        errors: { ...prev.errors, isValidPassword: false }
      }));
      return;
    }

    if (state?.values?.password !== state?.values?.confirmPassword) {
      setState((prev) => ({
        ...prev,
        errors: { ...prev.errors, isMatchPasswords: false }
      }));
      return;
    }

    if (!state.isLoading) {
      setState((prev) => ({ ...prev, isLoading: true }));
      setNewPasswordAction({
        password: state?.values?.password,
        uid: uid as string,
        token: token as string
      })
        .then(() => {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            isPasswordChanged: true
          }));
        })
        .catch(() => {
          toast({
            title: t('errors', 'resetPassword', 'smthWentWrong'),
            description: t('errors', 'resetPassword', 'tryAgainLater'),
            status: 'error',
            duration: 4000,
            isClosable: true
          });
          
          setState((prev) => ({
            ...prev,
            isLoading: false
          }));
        });
    }
  }, [state, setState, uid, token, toast, t]);

  return (
    <Flex direction="column">
      <Flex direction="column" p="57px 50px 26px 50px">
        <Heading
          as="h2"
          textAlign="center"
          fontWeight="500"
          fontSize="1.6rem"
          mb="35px"
        >
          {t('resetPassword', 'fields', 'title')}
        </Heading>
        <Flex flexDirection="column">
          {state.isPasswordChanged ? (
            <>
              <Text mb="40px" fontSize="0.8rem" textAlign="center">
                {t('resetPassword', 'fields', 'yourPasswordHasBeenChanged')}
              </Text>
              <Box mb="20px">
                <Text
                  w="fit-content"
                  pl="20px"
                  fontSize="0.6rem"
                  cursor="pointer"
                  _hover={{ textDecoration: 'underline' }}
                  onClick={() => setTriggeredButton('login')}
                >
                  {t('createAccount', 'fields', 'notMemberLink')}
                </Text>
              </Box>
              <Button
                fontWeight="600"
                height="57px"
                p="12px 32px !important"
                bg="general.sand"
                display="flex"
                m="0 auto"
                onClick={() => setTriggeredButton('login')}
                fontSize="0.8rem"
              >
                {t('resetPassword', 'fields', 'login')}
              </Button>
            </>
          ) : (
            <>
              <Box mb="20px">
                <Input
                  pl="63px"
                  type="password"
                  name="password"
                  value={state.values.password}
                  height="56px"
                  onChange={handleInputChange}
                  fontSize="0.8rem"
                  placeholder={t('resetPassword', 'fields', 'password')}
                  borderColor={
                    !state?.errors?.isValidPassword ? 'general.red' : 'inherit'
                  }
                  borderRadius="55px"
                />
                <Text
                  p="0 27.5px"
                  mt="5px"
                  fontSize="0.6rem"
                  color={
                    !state?.errors?.isValidPassword ? 'general.red' : 'inherit'
                  }
                >
                  {t('auth', 'input', 'underPasswordMessage')}
                </Text>
              </Box>
              <Box mb="40px">
                <Input
                  pl="63px"
                  type="password"
                  value={state.values.confirmPassword}
                  height="56px"
                  name="confirmPassword"
                  onChange={handleInputChange}
                  fontSize="0.8rem"
                  placeholder={t('resetPassword', 'fields', 'confirmPassword')}
                  borderColor={
                    !state?.errors?.isMatchPasswords ? 'general.red' : 'inherit'
                  }
                  borderRadius="55px"
                />
                {!state?.errors?.isMatchPasswords && (
                  <Text
                    p="0 27.5px"
                    mt="5px"
                    fontSize="0.6rem"
                    color="general.red"
                  >
                    {t('resetPassword', 'fields', 'passwordsDontMatch')}
                  </Text>
                )}
              </Box>
              <Box mb="20px">
                <Text
                  w="fit-content"
                  pl="20px"
                  fontSize="0.6rem"
                  cursor="pointer"
                  _hover={{ textDecoration: 'underline' }}
                  onClick={() => setTriggeredButton('login')}
                >
                  {t('createAccount', 'fields', 'notMemberLink')}
                </Text>
              </Box>
              <Button
                fontWeight="600"
                height="57px"
                p="12px 32px !important"
                bg="general.sand"
                display="flex"
                m="0 auto"
                onClick={handleSetNewPassword}
                fontSize="0.8rem"
              >
                {t('auth', 'button', 'continue')}
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default memo(ResetPassword);
