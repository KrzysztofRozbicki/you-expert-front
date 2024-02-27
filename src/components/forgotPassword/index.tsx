import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@chakra-ui/react';
import useTranslation from '../../hooks/useTranslation';
import { UI } from './UI';
import { UserState } from '../../common/interfaceTypes';
import {
  validateUserData,
  validateResetPassword
} from '../authentication/common';
import {
  resetUserPasswordAction,
  passwordResetSuccess,
  setUserPasswordAction
} from '../../redux/actions/user';

export const ForgotPassword = ({
  setTriggeredButton,
  setModal,
  triggeredButton
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useToast();
  const userError = useSelector((state: UserState) => state.user.error);
  const { authData } = useSelector((state: any) => state.app);
  const [formattedUserError, setError] = useState(userError || '');
  const [isResetPasswordSending, setIsResetPasswordSending] =
    useState<boolean>(false);
  const emailConfirmationMessage = useSelector(
    (state: UserState) => state.user.message
  );
  const [formValues, setValues] = useState({
    fields: authData ? authData : { email: '', password: '' },
    errors: { email: '', password: '' }
  });

  const onFieldChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value, id } = event.currentTarget;
    if (
      formattedUserError &&
      id === 'email' &&
      value !== formValues.fields.email
    ) {
      setError('');
    }
    setValues((prevState) => ({
      ...prevState,
      fields: { ...prevState.fields, [id]: value },
      errors: { ...prevState.errors, [id]: '' }
    }));
  };

  const onButtonClick = () => {
    const { isValid, updatedData } = validateUserData(formValues, ['password']);

    if (isValid) {
      setIsResetPasswordSending(true);
      resetUserPasswordAction(updatedData.fields.email)
        .then(() => {
          toast({
            title: t('common', 'changePassword', 'resetPasswordWasRequested'),
            description: t('common', 'changePassword', 'resetPasswordWasSent'),
            status: 'success',
            duration: 4000,
            isClosable: true
          });
          setModal();
        })
        .catch(() => {
          toast({
            title: t('common', 'changePassword', 'smthWentWrong'),
            description: t('common', 'changePassword', 'pleaseTryAgainLater'),
            status: 'error',
            duration: 4000,
            isClosable: true
          });
        })
        .finally(() => setIsResetPasswordSending(false));
    } else {
      setValues((prevState: any) => ({ ...prevState, ...updatedData }));
    }
  };

  return (
    <UI
      formValues={formValues}
      onChange={onFieldChange}
      setTriggeredButton={setTriggeredButton}
      triggeredButton={triggeredButton}
      onClick={onButtonClick}
      emailConfirmationMessage={emailConfirmationMessage}
      userError={formattedUserError}
      isResetPasswordSending={isResetPasswordSending}
    />
  );
};
