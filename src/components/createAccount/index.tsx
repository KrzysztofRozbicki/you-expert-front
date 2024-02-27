import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useToast } from '@chakra-ui/react';
import UI from './UI';
import { createUserAccountAsyncAction } from '../../redux/actions/user';
import { validateEmail, validatePassword } from '../../common/strings';
import useTranslation from '../../hooks/useTranslation';
import { triggerAuthModal } from '../../redux/actions/app';

export const CreateAccount = ({ setTriggeredButton, setModal }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const toast = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [state, setState] = useState<{
    values: {
      firstName?: string;
      lastName?: string;
      email?: string;
      password?: string;
      isTermsAndConditions?: boolean;
    };
    errors: {
      firstName?: boolean;
      lastName?: boolean;
      email?: boolean;
      password?: boolean;
    };
  }>({
    values: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      isTermsAndConditions: false
    },
    errors: { firstName: false, lastName: false, email: false, password: false }
  });

  const onTermsAndCondiitionsChange = useCallback(() => {
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        isTermsAndConditions: !prev.values.isTermsAndConditions
      }
    }));
  }, [state]);

  const onFieldChange = useCallback(
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
    if (currentStep === 1) {
      if (!validateEmail(state?.values?.email)?.status) {
        errors.email = true;
      }
      if (!validatePassword(state?.values?.password)?.status) {
        errors.password = true;
      }
    } else if (currentStep === 2) {
      if (!state?.values?.firstName) {
        errors.firstName = true;
      }
      if (!state?.values?.lastName) {
        errors.lastName = true;
      }
    }

    setState((prev) => ({ ...prev, errors }));
    return !Object.values(errors).some((item) => item);
  }, [state]);

  const onSubmit = useCallback(() => {
    if (isValidValues()) {
      if (currentStep === 1) {
        setCurrentStep(2);
        return;
      }

      if (!state.values.isTermsAndConditions) {
        toast({
          title: t('settings', 'toast', 'error'),
          description: t('auth', 'labels', 'acceptTermsAndConditions'),
          status: 'error',
          duration: 4000,
          isClosable: true
        });
        return;
      }

      setIsLoading(true);
      createUserAccountAsyncAction(state?.values)
        .then(() => {
          toast({
            title: t('auth', 'labels', 'accountWasCreated'),
            description: t('auth', 'labels', 'successfullRegistered'),
            status: 'success',
            duration: 4000,
            isClosable: true
          });
          dispatch(triggerAuthModal(true, 'login'));
        })
        .catch(() => {
          toast({
            title: t('auth', 'labels', 'accountWasAlreadyExist'),
            description: t('auth', 'labels', 'somethingWentWrong'),
            status: 'error',
            duration: 4000,
            isClosable: true
          });
          setCurrentStep(1);
        })
        .finally(() => setIsLoading(false));
    }
  }, [state, dispatch]);

  return (
    <UI
      state={state}
      onFieldChange={onFieldChange}
      setTriggeredButton={setTriggeredButton}
      onClick={onSubmit}
      currentStep={currentStep}
      isLoading={isLoading}
      onTermsAndCondiitionsChange={onTermsAndCondiitionsChange}
    />
  );
};
