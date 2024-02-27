import styled from '@emotion/styled';
import { Input, Flex, Heading } from '@chakra-ui/react';

export const WrapperStyled = styled(Flex)`
  padding: 20px;
  flex-direction: column;
`;

export const TitleStyled = styled(Heading)`
  font-size: 1.1rem !important;
  margin-bottom: 20px;
`;

export const InputStyled = styled(Input)<{ isError?: boolean }>`
  font-size: 0.8rem;
  border: 1px solid
    ${({ theme, isError }): string | undefined =>
      isError
        ? theme?.colors?.general?.red
        : theme?.colors?.general?.inputBorder} !important;
`;

export const ButtonWrapperStyled = styled(Flex)`
  justify-content: flex-end;
`;
