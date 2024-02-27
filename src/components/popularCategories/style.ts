import styled from '@emotion/styled';
import { Flex } from '@chakra-ui/react';

export const ServiceWrapperStyled = styled(Flex)`
  background: linear-gradient(
    0deg,
    rgba(20, 20, 42, 0.6),
    rgba(20, 20, 42, 0.6)
  );

  &:hover {
    background: linear-gradient(
      0deg,
      rgba(122, 114, 223, 0.8),
      rgba(122, 114, 223, 0.8)
    );
  }
`;

export const IconWrapperStyled = styled(Flex)`
  display: none;

  ${ServiceWrapperStyled}:hover & {
    display: flex;
  }
`;

export const ContentBlockStyled = styled(Flex)`
  scroll-behavior: smooth;
`;
