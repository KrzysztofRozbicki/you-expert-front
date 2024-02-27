import styled from '@emotion/styled';
import { Flex, Heading, Text, Textarea } from '@chakra-ui/react';

export const WrapperStyled = styled(Flex)`
  padding: 20px;
  flex-direction: column;
`;

export const TitleStyled = styled(Heading)`
  font-size: 1.1rem !important;
  margin-bottom: 20px;
`;

export const TextStyled = styled(Text)`
  font-size: 0.8rem;
  margin-bottom: 20px;
`;

export const TextareaStyles = styled(Textarea)<{ isError?: boolean }>`
  height: 195px;
  padding: 20px;
  border: 1px solid
    ${({ theme, isError }): string | undefined =>
      isError
        ? theme?.colors?.general?.red
        : theme?.colors?.general?.inputBorder} !important;
  border-radius: 15px;
  resize: none;
  font-size: 0.8rem;
`;
