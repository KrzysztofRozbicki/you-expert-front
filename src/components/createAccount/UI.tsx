import React, { memo, useMemo } from 'react';
import {
  Flex,
  Heading,
  Button,
  Input,
  FormControl,
  Text,
  Spinner
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { joinLinkStyle } from '../authentication/common';
import useTranslation from '../../hooks/useTranslation';
import { ButtonController } from '../common/ButtonController';
import { inputFirstStepConfig, inputSecondStepConfig } from './constants';
import CheckboxController from '../common/checkboxController';

const UI = (props) => {
  const {
    state,
    setTriggeredButton,
    onClick,
    currentStep,
    onFieldChange,
    isLoading,
    onTermsAndCondiitionsChange
  } = props;

  const { t } = useTranslation();
  const {
    query: { locale }
  } = useRouter();

  const inputConfig = useMemo((): { name: string; underMessage?: string }[] => {
    if (currentStep === 1) {
      return inputFirstStepConfig;
    }

    return inputSecondStepConfig;
  }, [currentStep]);

  return (
    <Flex direction="column">
      <Flex direction="column" p='57px 50px 26px 50px'>
        <Heading
          as="h2"
          textAlign="center"
          fontWeight="500"
          fontSize="1.6rem"
          mb="35px"
        >
          {t('createAccount', 'fields', 'title')}
        </Heading>
        <Flex direction="column">
          <FormControl id="create">
            {inputConfig?.map((item, index) => (
              <Flex mb="20px" direction="column" key={index}>
                <Input
                  value={state?.values[item?.name]}
                  onChange={(e) => onFieldChange(e, item?.name)}
                  placeholder={t('auth', 'input', item?.name)}
                  borderColor={
                    state?.errors[item?.name] ? 'general.red' : 'inherit'
                  }
                  type={item?.name === 'password' ? 'password' : 'text'}
                  height="56px"
                  paddingLeft="63px"
                  borderRadius="55px"
                  fontSize="0.8rem"
                />
                {!!item?.underMessage && (
                  <Text
                    p="0 27.5px"
                    mt="5px"
                    fontSize="0.6rem"
                    color={
                      state?.errors[item?.name] ? 'general.red' : 'inherit'
                    }
                  >
                    {t('auth', 'input', item?.underMessage)}
                  </Text>
                )}
              </Flex>
            ))}
            <Flex p="0 27.5px" mb="20px" alignItems="center">
              <CheckboxController
                isChecked={state.values.isTermsAndConditions}
                onChange={onTermsAndCondiitionsChange}
                wrapperStyle={{ width: 'fit-content', marginRight: '10px' }}
                checkboxStyle="span { width: 27px; height: 27px; }"
              />
              <Text fontSize="0.6rem">
                {t('auth', 'labels', 'IAccept')}{' '}
                <a
                  style={{ fontSize: 'inherit' }}
                  href={`/${locale}/terms-and-conditions`}
                  target="_blank"
                >
                  {t('auth', 'labels', 'termsAndConditions')}
                </a>
              </Text>
            </Flex>
            <Button
              fontWeight="600"
              height="57px"
              p="12px 32px !important"
              bg="general.sand"
              display="flex"
              m="0 auto"
              onClick={onClick}
              fontSize="0.8rem"
            >
              {isLoading ? (
                <Spinner />
              ) : currentStep === 1 ? (
                t('auth', 'button', 'continue')
              ) : (
                t('auth', 'button', 'signUp')
              )}
            </Button>
          </FormControl>
          <Text
            fontSize="0.6rem"
            maxWidth="280px"
            color="general.lightGray"
            m="32px auto"
          >
            {t('createAccount', 'fields', 'termsOfService')}
          </Text>
        </Flex>
      </Flex>
      <Flex w="100%" bg="general.liteSand" p={{ xl: '32px 0' }}>
        <Flex
          w="60%"
          display="flex"
          justify="space-between"
          align="center"
          m="0 auto"
          lineHeight="22px"
        >
          <Text textAlign="center" fontSize="0.6rem">
            {t('createAccount', 'fields', 'notMemberLabel')}
          </Text>
          <ButtonController
            onClick={() => setTriggeredButton('login')}
            asLink={true}
            customStyle={{
              ...joinLinkStyle,
              padding: '0 !important',
              height: 'auto',
              fontWeight: '700',
              textDecoration: 'underline',
              marginLeft: '5px',
              fontSize: '0.6rem'
            }}
          >
            {t('createAccount', 'fields', 'notMemberLink')}
          </ButtonController>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default memo(UI);
