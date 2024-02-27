import styled from '@emotion/styled';
import { Flex, Text } from '@chakra-ui/react';

export const WrapperStyled = styled(Flex)`
  width: 100%;
  height: fit-content;
  padding-bottom: 48px;
  border-bottom: 4px solid ${({ theme }) => theme.colors.general.greyDisabled};
  margin-bottom: 30px;
  flex-direction: column;
`;

export const TitleStyled = styled(Text)`
  font-size: 1.6rem;
  font-weight: 500;
  margin-bottom: 30px;
`;

export const TextStyled = styled(Text)`
  font-size: 0.8rem;
`;
