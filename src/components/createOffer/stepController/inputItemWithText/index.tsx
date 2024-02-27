import React, { memo } from 'react';
import { Text, Flex } from '@chakra-ui/react';
import { WrapperStyled, TextStyled, InputStyled } from './style';

interface InputWithTextItemProps {
  value: string;
  onChange: (args?: any) => void;
  isDisabled: boolean;
  text: string;
  inputProps?: any;
  textProps?: any;
  isError?: boolean;
  errorText?: string;
  errorTextProps?: any;
}

const InputWithTextItem: React.FC<InputWithTextItemProps> = (props) => {
  const {
    value,
    onChange,
    isDisabled,
    text,
    inputProps,
    textProps,
    isError,
    errorText,
    errorTextProps
  } = props;

  return (
    <WrapperStyled flexDirection="column" w="100%">
      <Flex w="100%" alignItems="center" justifyContent="space-between">
        <InputStyled
          type="text"
          value={value}
          onChange={onChange}
          disabled={isDisabled}
          opacity={1}
          {...inputProps}
        />
        <TextStyled {...textProps}>{text}</TextStyled>
      </Flex>
      {isError && !!errorText && (
        <Text fontSize="0.6rem" color="general.red" {...errorTextProps}>
          {errorText}
        </Text>
      )}
    </WrapperStyled>
  );
};

export default memo(InputWithTextItem);
