import styled from '@emotion/styled';
import { Flex } from '@chakra-ui/react';

export const WrapperStyled = styled(Flex)<{ isMe?: boolean }>`
  width: 100%;
  justify-content: ${({ isMe }): string => (isMe ? 'flex-end' : 'flex-start')};
  margin-bottom: 20px;
`;

export const MessageWrapperStyled = styled(Flex)<{ isMe?: boolean }>`
  border-radius: 5px;
  flex-direction: column;
  background: ${({ theme, isMe }): string | undefined =>
    isMe
      ? theme?.colors?.general?.lightGrey
      : theme?.colors?.general?.grayViolet};
`;
