import styled from '@emotion/styled';
import { Text } from '@chakra-ui/react';

export const NameStyled = styled(Text)`
  height: fit-content;
  line-height: 1.5;
  font-size: 0.8rem;
  padding-right: 15px;
  margin-right: 15px;
  border-right: 1px solid ${({ theme }) => theme.colors.general.link};
`;

export const PositionStyled = styled(Text)`
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 1.5;
  height: fit-content;
`;

export const StartTextStyled = styled(Text)`
  margin-left: 10px;
  font-size: 0.6rem;
  font-weight: 500;
`;
