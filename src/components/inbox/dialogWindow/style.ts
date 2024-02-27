import styled from '@emotion/styled';
import { Flex, Textarea } from '@chakra-ui/react';

export const MessageWrapperStyled = styled(Flex)`
  flex: 1;
  width: 100%;
  overflow-y: auto;
  flex-direction: column;
`;

export const TextareaStyled = styled(Textarea)<{ isError?: boolean }>`
  height: 100%;
  padding: 20px;
  border: 1px solid
    ${({ theme, isError }): string | undefined =>
      isError
        ? theme?.colors?.general?.red
        : theme?.colors?.general?.inputBorder} !important;
  resize: none;
  background: #fff;
`;
