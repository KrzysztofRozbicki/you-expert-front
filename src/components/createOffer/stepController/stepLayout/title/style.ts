import styled from '@emotion/styled';
import { Flex, Heading } from '@chakra-ui/react';

export const TitleWrapperStyles = styled(Flex)`
  align-items: center;
  border-bottom: 1px solid
    ${({ theme }): string | undefined => theme?.colors?.general?.greyDisabled};
  justify-content: space-between;
`;

export const TitleTextStyled = styled(Heading)`
  font-weight: 500;
`;
