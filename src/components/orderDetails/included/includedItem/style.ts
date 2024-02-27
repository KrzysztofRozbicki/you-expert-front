import styled from '@emotion/styled';
import { Flex, Text } from '@chakra-ui/react';

export const WrapperStyled = styled(Flex)`
  width: 100%;
  align-items: center;
  margin-bottom: 20px;
`;

export const IconWrapperStyled = styled(Flex)`
  width: 59px;
  height: 59px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  border: 2px solid
    ${({ theme }): string | undefined => theme?.colors?.general?.greyDisabled};
  margin-right: 26px;
`;

export const TextStyled = styled(Text)`
  flex: 1;
  height: fit-content;
  font-size: 18px;
  line-height: 1;
  font-weight: 500;
`;
