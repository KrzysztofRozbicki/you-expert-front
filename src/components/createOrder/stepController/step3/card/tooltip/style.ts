import styled from '@emotion/styled';
import { Flex } from '@chakra-ui/react';

export const WrapperStyled = styled(Flex)<{ customStyle?: string }>`
  width: 16px;
  height: 16px;
  align-items: center;
  background: ${({ theme }): string => theme?.colors?.general?.iconBackground};
  border-radius: 50%;
  justify-content: center;
  margin-left: 10px;

  ${({ customStyle }): string => (customStyle ? customStyle : '')};
`;
