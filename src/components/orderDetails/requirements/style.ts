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

export const TitleStyled = styled(Text)<{ isActive?: boolean }>`
  font-weight: ${({ isActive }): number => (isActive ? 500 : 400)};
  line-height: 1;
  cursor: pointer;
`;

export const TextStyled = styled(Text)`
  font-size: 0.8rem;
`;

export const SeparatorStyled = styled(Flex)`
  height: 100%;
  width: 1px;
  margin: 0 20px;
  background: ${({ theme }) => theme.colors.general.link};
`;
