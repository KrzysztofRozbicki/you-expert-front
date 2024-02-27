import styled from '@emotion/styled';
import { Textarea } from '@chakra-ui/react';

export const TextareaStyles = styled(Textarea)<{ isError: boolean }>`
  height: 295px;
  padding: 30px;
  border: 1px solid
    ${({ theme, isError }): string | undefined =>
      isError
        ? theme?.colors?.general?.red
        : theme?.colors?.general?.inputBorder} !important;
  border-radius: 15px;
  resize: none;
  font-size: 0.8rem;
`;
