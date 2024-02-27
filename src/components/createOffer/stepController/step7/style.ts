import styled from '@emotion/styled';
import { Flex, Heading } from '@chakra-ui/react';

interface IconWrapperStyledProps {
  borderColor: string;
}

export const LeftContainerStyled = styled(Flex)`
  box-sizing: border-box;
`;

export const RightContainerStyled = styled(Flex)`
  box-sizing: border-box;
  flex-direction: column;
`;

export const RightAboveBlockStyled = styled(Flex)`
  flex-direction: column;
  margin-bottom: 30px;
`;

export const HeadingStyled = styled(Heading)`
  font-size: 1.1rem !important;
  margin-bottom: 30px;
  font-weight: 500;
`;

export const IconWrapperStyled = styled(Flex)<IconWrapperStyledProps>`
  height: 61px;
  width: 61px;
  align-items: center;
  justify-content: center;
  margin-right: 30px;
  border-radius: 50%;
  border: 1px solid ${({ borderColor }): string => borderColor};
  cursor: pointer;
  user-select: none;
`;
