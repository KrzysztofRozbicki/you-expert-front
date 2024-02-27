import styled from '@emotion/styled';
import { Flex, Heading, Textarea } from '@chakra-ui/react';

export const WrapperStyled = styled(Flex)`
  background: #fff;
  flex-direction: column;
  border: 1px solid
    ${({ theme }): string | undefined => theme?.colors?.general?.greyDisabled};
  border-radius: 5px;
  margin-bottom: 30px;
`;

export const BodyStyled = styled(Flex)`
  flex-direction: column;
`;

export const TitleWrapperStyled = styled(Flex)`
  border-bottom: 1px solid
    ${({ theme }): string | undefined => theme?.colors?.general?.greyDisabled};
  justify-content: space-between;
`;

export const TitleTextStyled = styled(Heading)`
  font-size: 1.6rem !important;
  font-weight: 500;
`;

export const TextareaStyled = styled(Textarea)<{ isError?: boolean }>`
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
