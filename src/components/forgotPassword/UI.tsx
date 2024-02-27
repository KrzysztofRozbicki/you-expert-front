import { useState, useEffect } from 'react';
import {
  Flex,
  Heading,
  Button,
  FormControl,
  Text,
  Spinner
} from '@chakra-ui/react';
import {
  joinLinkStyle,
  renderInputFields,
  emailConfiguration,
  passwordConfiguration,
  confirmPasswordConfiguration
} from '../authentication/common';
import useTranslation from '../../hooks/useTranslation';
import { ButtonController } from '../common/ButtonController';
import { ErrorMessage } from '../common/ErrorMessage';

export const UI = (props) => {
  const { t } = useTranslation();
  const {
    formValues,
    onChange,
    setTriggeredButton,
    onClick,
    currentStep,
    emailConfirmationMessage,
    userError,
    triggeredButton,
    isResetPasswordSending
  } = props;
  const { errors } = formValues;
  const [errorsFields, setErrors] = useState(errors || null);
  const fieldsConfig =
    triggeredButton === 'resetPassword'
      ? [...passwordConfiguration, ...confirmPasswordConfiguration].map(
          (i, idx) => {
            if (idx === 0) {
              return {
                ...i,
                placeholder: 'newPassword'
              };
            }
            return i;
          }
        )
      : emailConfiguration;

  useEffect(() => {
    setErrors(errors);
  }, [errors]);

  return (
    <Flex direction="column">
      <Flex direction="column" p={{ xl: '57px 50px 26px 50px' }}>
        <Heading
          as="h2"
          textAlign="center"
          fontWeight="500"
          fontSize="1.6rem"
          mb="35px"
        >
          {t('forgotPassword', 'fields', 'title')}
        </Heading>
        {userError && <ErrorMessage tA="left">{userError}</ErrorMessage>}
        <Flex direction="column">
          <FormControl id="create">
            {renderInputFields(
              fieldsConfig,
              onChange,
              formValues,
              errorsFields,
              t,
              true
            )}
            <Text
              fontSize="0.6rem"
              maxWidth="280px"
              color="general.lightGray"
              m="32px auto"
            >
              {t(triggeredButton, 'fields', 'description')}
            </Text>
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
              {isResetPasswordSending ? (
                <Spinner />
              ) : (
                t('forgotPassword', 'button', 'continue')
              )}
            </Button>
          </FormControl>
        </Flex>
      </Flex>
      <Flex w="100%" bg="general.liteSand" p={{ xl: '32px 0' }}>
        <Flex
          w="60%"
          display="flex"
          justifyContent="center"
          align="center"
          m="0 auto"
          lineHeight="22px"
          fontSize="0.6rem"
          alignItems="center"
        >
          {t('forgotPassword', 'fields', 'tryLoginAgain')}
          <ButtonController
            onClick={() => setTriggeredButton('login')}
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
            {t('createAccount', 'fields', 'notMemberLink')}
          </ButtonController>
        </Flex>
      </Flex>
    </Flex>
  );
};
