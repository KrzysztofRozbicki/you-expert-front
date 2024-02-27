import {
  Flex,
  Heading,
  Button,
  Divider,
  Input,
  FormControl,
  Text,
  Checkbox,
  Image
} from '@chakra-ui/react';
import { validateEmail, validatePassword } from '../../common/strings';
import { ErrorMessage } from '../common/ErrorMessage';
export interface FormValues {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  password1?: string;
}

export interface UserData {
  fields: FormValues;
  errors: FormValues;
}

export interface FormItem {
  name: string;
  placeholder?: string;
}

export interface FormField {
  [key: string]: string;
}

export interface UserForm {
  fields: FormField;
  errors: FormField;
}

export const joinLinkStyle = {
  display: 'flex',
  justifyContent: 'center',
  fontSize: '14px',
  fontWeight: '400'
};

export const inputStyle = {
  height: '56px',
  paddingLeft: '63px',
  borderRadius: '55px',
  fontSize: '0.8rem'
};

export const placeholderInputStyle = {
  fontSize: '0.8rem',
  lineHeight: '27px',
  color: '#B5B5D1',
  fontWeight: '400'
};

export const socialButtonStyle = {
  display: 'flex',
  justifyContent: 'flex-start',
  fontSize: '18px',
  lineHeight: '27px',
  alignItems: 'center',
  height: '72px',
  color: '#fff',
  paddingLeft: '40px'
};

export const errorMessageStyle = {
  paddingLeft: '65px'
};

export const emailConfiguration: FormItem[] = [
  {
    name: 'email'
  }
];

export const passwordConfiguration: FormItem[] = [
  {
    name: 'password'
  }
];

export const confirmPasswordConfiguration: FormItem[] = [
  {
    name: 'password',
    placeholder: 'confirm'
  }
];

export const emailPasswordConfiguration: FormItem[] = [
  ...emailConfiguration,
  ...passwordConfiguration
];

export const nameConfiguration: FormItem[] = [
  {
    name: 'firstName'
  },
  {
    name: 'lastName'
  }
];

export const emailPasswordConfigurationForSignUp: FormItem[] = [
  ...nameConfiguration,
  ...emailConfiguration,
  ...passwordConfiguration
];

export const validateUserDataForSignUp = (
  userData: UserData,
  excludeFields?: string | string[]
) => {
  const validationResult = { ...userData };
  const { firstName, lastName, email, password } = userData.fields;
  const isValidEmail = validateEmail(email);
  const isValidPassword = validatePassword(password);
  let isValidFirstName = !firstName ? false : true;
  let isValidLastName = !lastName ? false : true;
  if (!firstName || !firstName.length) {
    validationResult.errors.firstName = 'empty';
  }

  if (!lastName || !lastName.length) {
    validationResult.errors.lastName = 'empty';
  }

  if (!isValidEmail.status) {
    validationResult.errors.email = isValidEmail.message;
  }
  if (!isValidPassword.status) {
    validationResult.errors.password = isValidPassword.message;
  }

  if (excludeFields && excludeFields.includes('password')) {
    validationResult.errors.password = '';
    isValidPassword.status = true;
  }

  if (excludeFields && excludeFields.includes('email')) {
    validationResult.errors.email = '';
    isValidEmail.status = true;
  }

  if (excludeFields && excludeFields.includes('firstName')) {
    validationResult.errors.firstName = '';
    isValidFirstName = true;
  }

  if (excludeFields && excludeFields.includes('lastName')) {
    validationResult.errors.lastName = '';
    isValidLastName = true;
  }

  if (
    !isValidEmail.status ||
    !isValidPassword.status ||
    validationResult.errors.firstName ||
    validationResult.errors.lastName ||
    !isValidFirstName ||
    !isValidLastName
  ) {
    return { isValid: false, updatedData: validationResult };
  }

  return { isValid: true, updatedData: validationResult };
};

export const validateUserData = (
  userData: UserData,
  excludeFields?: string | string[]
) => {
  const validationResult = { ...userData };
  const { email, password } = userData.fields;
  const isValidEmail = validateEmail(email);
  const isValidPassword = validatePassword(password);

  if (!isValidEmail.status) {
    validationResult.errors.email = isValidEmail.message;
  }
  if (!isValidPassword.status) {
    validationResult.errors.password = isValidPassword.message;
  }

  if (excludeFields && excludeFields.includes('password')) {
    validationResult.errors.password = '';
    isValidPassword.status = true;
  }

  if (excludeFields && excludeFields.includes('email')) {
    validationResult.errors.email = '';
    isValidEmail.status = true;
  }

  if (!isValidEmail.status || !isValidPassword.status) {
    return { isValid: false, updatedData: validationResult };
  }

  return { isValid: true, updatedData: validationResult };
};

export const validateResetPassword = (data: UserData) => {
  const validationResult = { ...data };
  const { password, password1 } = data.fields;
  const isValidPassword = validatePassword(password);
  const isValidPassword1 = validatePassword(password1);

  if (!isValidPassword.status) {
    validationResult.errors.password = isValidPassword.message;
  }
  if (!isValidPassword1.status) {
    validationResult.errors.password1 = isValidPassword1.message;
  }

  if (isValidPassword.status && isValidPassword1.status) {
    if (password !== password1) {
      validationResult.errors.password = 'notEqual';
      validationResult.errors.password1 = 'notEqual';
      return { isValid: false, updatedData: validationResult };
    }
  }
  if (!isValidPassword.status || !isValidPassword1.status) {
    return { isValid: false, updatedData: validationResult };
  }
  return { isValid: true, updatedData: validationResult };
};

export const renderInputFields = (
  config: FormItem[],
  onFieldChange: Function,
  values: FormField,
  errorsFields: FormField,
  translation: Function,
  isMultiPassword?: boolean
) => {
  return config.map((item, idx) => {
    const { name, placeholder } = item;
    const currentValue = values.fields[name];

    if (isMultiPassword) {
      const formattedId = idx === 0 ? name : `${name}${idx}`;
      const hasError = !errorsFields ? false : errorsFields[formattedId];
      const validationStyle = hasError ? { border: '1px solid #D30C00' } : {};
      return (
        <Flex mb="15px" direction="column">
          <Flex position="relative" mb="20px">
            <Input
              value={values.fields[formattedId]}
              onChange={(e) => onFieldChange(e)}
              type={name}
              placeholder={
                placeholder
                  ? translation('auth', 'input', placeholder)
                  : translation('auth', 'input', name)
              }
              style={{ ...inputStyle, ...validationStyle }}
              _placeholder={placeholderInputStyle}
              id={formattedId}
            />
            {hasError && (
              <Image
                position="absolute"
                right="30px"
                top="50%"
                transform="translateY(-50%)"
                src="/images/common/Wrong.svg"
              />
            )}
          </Flex>
          {hasError && (
            <ErrorMessage tA="left" customStyle={errorMessageStyle}>
              {translation('auth', 'validation', errorsFields[formattedId])}
            </ErrorMessage>
          )}
        </Flex>
      );
    }

    const hasError = errorsFields[name];
    const validationStyle = hasError ? { border: '1px solid #D30C00' } : {};

    return (
      <Flex mb="15px" direction="column">
        <Flex position="relative" mb="20px">
          <Input
            value={currentValue || ''}
            onChange={(e) => onFieldChange(e)}
            type={name}
            placeholder={
              placeholder
                ? translation('auth', 'input', placeholder)
                : translation('auth', 'input', name)
            }
            style={{ ...inputStyle, ...validationStyle }}
            _placeholder={placeholderInputStyle}
            id={name}
          />
          {hasError && (
            <Image
              position="absolute"
              right="30px"
              top="50%"
              transform="translateY(-50%)"
              src="/images/common/Wrong.svg"
            />
          )}
        </Flex>
        {hasError && (
          <ErrorMessage customStyle={errorMessageStyle}>
            {translation('auth', 'validation', errorsFields[name])}
          </ErrorMessage>
        )}
      </Flex>
    );
  });
};
