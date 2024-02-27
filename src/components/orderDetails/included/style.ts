import styled from '@emotion/styled';
import { Flex, Text } from '@chakra-ui/react';

export const WrapperStyled = styled(Flex)`
  width: 100%;
  height: fit-content;
  border-bottom: 4px solid ${({ theme }) => theme.colors.general.greyDisabled};
  flex-direction: column;
  margin-bottom: 30px;
`;

export const TitleStyled = styled(Text)`
  font-size: 36px;
  font-weight: 500;
  margin-bottom: 30px;
`;

export const ItemsWrapperStyled = styled(Flex)`
  flex-direction: column;
`;
