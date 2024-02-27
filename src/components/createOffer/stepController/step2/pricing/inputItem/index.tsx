import React, { memo } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import useTranslation from '../../../../../../hooks/useTranslation';
import { WrapperStyled, IconWrapper, InputStyled } from './style';

interface InputItemProps {
  value: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled: boolean;
  inputProps?: any;
  isError?: boolean;
  errorText?: string;
  errorTextProps?: any;
}

const InputItem: React.FC<InputItemProps> = (props) => {
  const {
    value,
    onChange,
    type,
    isDisabled,
    inputProps,
    isError,
    errorText,
    errorTextProps
  } = props;

  const { t } = useTranslation();

  return (
    <WrapperStyled flexDirection="column">
      <Flex w="100%" alignItems="center">
        <InputStyled
          type={type}
          value={value}
          onChange={onChange}
          placeholder={`${t('createOffer', 'step2', 'edit')}...`}
          disabled={isDisabled}
          opacity={1}
          {...inputProps}
        />
        <IconWrapper>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.2537 1.00805C13.1756 1.00805 13.078 1.04707 13.0195 1.12512L1.11707 13.0276C1.03902 13.1056 1 13.2032 1 13.3007V16.6178C1 16.8324 1.17561 17.0081 1.39024 17.0081H4.70732C4.80488 17.0081 4.90244 16.969 4.98049 16.891L16.8829 4.98853C17.039 4.83244 17.039 4.59829 16.8829 4.44219L13.5659 1.12512C13.4878 1.02756 13.3707 0.98854 13.2537 1.00805ZM13.2927 1.94464L16.0634 4.71537L14.0732 6.6861L11.3024 3.91536L13.2927 1.94464ZM10.7561 4.48122L13.5268 7.25196L4.55122 16.2276H1.78049V13.4568L10.7561 4.48122Z"
              fill="#020055"
              stroke="#020055"
              strokeWidth="0.5"
            />
          </svg>
        </IconWrapper>
      </Flex>
      {isError && !!errorText && (
        <Text fontSize="0.6rem" color="general.red" {...errorTextProps}>
          {errorText}
        </Text>
      )}
    </WrapperStyled>
  );
};

export default memo(InputItem);
