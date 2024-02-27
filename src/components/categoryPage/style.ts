import styled from '@emotion/styled';
import { Flex, Text } from '@chakra-ui/react';

export const SubcategoryWrapperStyled = styled(Flex)``;

export const SubcategoryTitleStyled = styled(Text)`
  ${SubcategoryWrapperStyled}:hover & {
    color: #fff;
    background: ${({ theme }): string => theme?.colors?.general?.primary};
  }
`;

export const SubcategoryAboveImageStyled = styled(Flex)`
  ${SubcategoryWrapperStyled}:hover & {
    background: linear-gradient(
      0deg,
      rgba(122, 114, 223, 0.5),
      rgba(122, 114, 223, 0.5)
    );
    display: flex;
  }
`;
