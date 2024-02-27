import styled from '@emotion/styled';
import { Text, Input } from '@chakra-ui/react';

export const TextStyled = styled(Text)`
  font-size: 0.8rem;
  margin-left: 23px;
  margin-bottom: 10px;
`;

export const InputStyled = styled(Input)<{ isError: boolean }>`
  font-size: 0.8rem;
  height: 56px;
  border: 1px solid
    ${({ theme, isError }): string | undefined =>
      isError
        ? theme?.colors?.general?.red
        : theme?.colors?.general?.inputBorder} !important;
  border-radius: 55px;
  }
`;
