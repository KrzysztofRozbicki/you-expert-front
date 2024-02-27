import styled from '@emotion/styled';
import { Flex, Text, Input } from '@chakra-ui/react';

export const WrapperStyled = styled(Flex)`
  width: 100%;
`;

export const InputStyled = styled(Input)`
  flex: 1;
  font-size: 0.8rem;
  font-weight: 500;
  border: none;
  margin-right: 10px;
  padding: 0;
  color: ${({ theme }): string | undefined => theme?.colors?.general?.link};
`;

export const TextStyled = styled(Text)`
  font-size: 0.8rem;
  font-weight: 500;
`;
