import React, { useRef, useCallback, useMemo } from 'react';
import {
  Flex,
  Heading,
  Button,
  Divider,
  FormControl,
  Text,
  Checkbox,
  Image,
  Input
} from '@chakra-ui/react';
import { ButtonController } from '../common/ButtonController';
import { joinLinkStyle } from './common';
import useTranslation from '../../hooks/useTranslation';
import { GoogleAuth } from './GoogleAuth';
import { FacebookAuth } from './FacebookAuth';

export const UI = (props) => {
  const {
    formValues,
    onChange,
    onLogin,
    setTriggeredButton,
    responseError,
    onCheck,
    onAuthSuccess,
    setModal
  } = props;

  const { t } = useTranslation();
  const passwordInputRef = useRef<HTMLInputElement | null>(null);

  const errorMessage = useMemo((): string => {
    if (!responseError) {
      return '';
    }

    if (
      responseError === 'No active account found with the given credentials'
    ) {
      return t('auth', 'errors', 'noActiveAccount');
    }

    return responseError;
  }, [responseError, t]);

  const handleEmailKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && passwordInputRef && passwordInputRef?.current) {
        passwordInputRef.current.focus();
      }
    },
    [passwordInputRef]
  );

  const handlePasswordKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onLogin();
      }
    },
    [onLogin]
  );

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
          {t('auth', 'fields', 'title')}
        </Heading>
        <Flex direction="column">
          <Flex direction="column">
            <FacebookAuth
              label={t('auth', 'button', 'facebook')}
              setModal={setModal}
            />
            <GoogleAuth
              label={t('auth', 'button', 'google')}
              setModal={setModal}
            />
          </Flex>
          <Divider m="38px 0" h="4px" w="100%" dg="#DCDCF4" />

          <FormControl id="email">
            {errorMessage && (
              <Text
                mb="10px"
                color="general.red"
                fontSize="0.6rem"
                textAlign="center"
              >
                {errorMessage}
              </Text>
            )}

            <Flex mb="15px" direction="column">
              <Flex position="relative">
                <Input
                  id="email"
                  type="text"
                  value={formValues?.fields?.email}
                  onKeyDown={handleEmailKeyDown}
                  onChange={onChange}
                  placeholder={t('auth', 'input', 'email')}
                  height="56px"
                  paddingLeft="63px"
                  borderRadius="55px"
                  fontSize="0.8rem"
                  borderColor={
                    !!formValues?.errors?.email ? 'general.red' : 'inherit'
                  }
                />
                {!!formValues?.errors?.email && (
                  <Image
                    position="absolute"
                    right="30px"
                    top="50%"
                    transform="translateY(-50%)"
                    src="/images/common/Wrong.svg"
                  />
                )}
              </Flex>
              {!!formValues?.errors?.email && (
                <Text
                  p="0 27.5px"
                  mt="5px"
                  fontSize="0.6rem"
                  color="general.red"
                >
                  {t('auth', 'validation', 'invalid')}
                </Text>
              )}
            </Flex>

            <Flex mb="15px" direction="column">
              <Flex position="relative">
                <Input
                  ref={passwordInputRef}
                  id="password"
                  type="password"
                  value={formValues?.fields?.password}
                  onChange={onChange}
                  onKeyDown={handlePasswordKeyDown}
                  placeholder={t('auth', 'input', 'password')}
                  height="56px"
                  paddingLeft="63px"
                  borderRadius="55px"
                  fontSize="0.8rem"
                  borderColor={
                    !!formValues?.errors?.password ? 'general.red' : 'inherit'
                  }
                />
                {!!formValues?.errors?.password && (
                  <Image
                    position="absolute"
                    right="30px"
                    top="50%"
                    transform="translateY(-50%)"
                    src="/images/common/Wrong.svg"
                  />
                )}
              </Flex>
              <Text
                p="0 27.5px"
                mt="5px"
                fontSize="0.6rem"
                color={
                  !!formValues?.errors?.password ? 'general.red' : 'inherit'
                }
              >
                {t('auth', 'input', 'underPasswordMessage')}
              </Text>
            </Flex>

            <Flex justify="space-between" mb="26px">
              <Checkbox
                onChange={(e) => onCheck(e.target.checked)}
                colorScheme="transparent"
                iconColor="#7A72DF"
              >
                <Text fontSize="0.6rem" corlor="general.primary">
                  {/* Remember Me */}
                  {t('auth', 'fields', 'remember')}
                </Text>
              </Checkbox>
              <ButtonController
                onClick={() => setTriggeredButton('forgotPassword')}
                asLink={true}
                customStyle={{
                  ...joinLinkStyle,
                  height: 'auto',
                  textDecoration: 'none',
                  marginLeft: '5px',
                  fontSize: '0.6rem'
                }}
              >
                {t('auth', 'fields', 'forgotPassword')}
              </ButtonController>
            </Flex>

            <Button
              fontWeight="600"
              height="57px"
              p="12px 32px !important"
              bg="general.sand"
              display="flex"
              m="0 auto"
              onClick={onLogin}
              fontSize="0.8rem"
            >
              {t('auth', 'button', 'continue')}
            </Button>
          </FormControl>
        </Flex>
      </Flex>
      <Flex w="100%" bg="general.liteSand" p="32px 0">
        <Flex
          display="flex"
          align="center"
          w="60%"
          justifyContent="center"
          m="0 auto"
          lineHeight="22px"
          fontSize="0.6rem"
        >
          {t('auth', 'fields', 'createAccountLabel')}
          <ButtonController
            onClick={() => setTriggeredButton('signUp')}
            asLink={true}
            customStyle={{
              ...joinLinkStyle,
              height: 'auto',
              fontWeight: '700',
              textDecoration: 'underline',
              marginLeft: '5px',
              fontSize: '0.6rem'
            }}
          >
            {t('auth', 'fields', 'createAccountLink')}
          </ButtonController>
        </Flex>
      </Flex>
    </Flex>
  );
};
