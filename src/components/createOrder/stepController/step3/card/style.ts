import styled from '@emotion/styled';
import { Flex, Text, Input } from '@chakra-ui/react';

export const CardDetailsWrapperStyled = styled(Flex)`
  padding: 53px 35px;
  flex-direction: column;
`;

export const TextStyled = styled(Text)<{ customStyle?: string }>`
  font-size: 18px;
  margin-left: 23px;
  margin-bottom: 10px;
  ${({ customStyle }): string => (customStyle ? customStyle : '')};
`;

export const InputStyled = styled(Input)<{ isError?: boolean }>`
  height: 56px;
  border: 1px solid
    ${({ theme, isError }): string | undefined =>
      isError
        ? theme?.colors?.general?.red
        : theme?.colors?.general?.inputBorder} !important;
  border-radius: 55px;
  }
`;
