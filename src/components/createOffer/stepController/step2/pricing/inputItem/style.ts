import styled from '@emotion/styled';
import { Flex, Input } from '@chakra-ui/react';
import { screenSizesString } from '../../../../../../styles/theme/breakpoints';

export const WrapperStyled = styled(Flex)`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const IconWrapper = styled(Flex)`
  width: 33px;
  height: 33px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${({ theme }): string | undefined =>
    theme?.colors?.general?.iconBackground};

  @media (min-width: ${screenSizesString?.md}) {
    width: 41px;
    height: 41px;
  }
`;

export const InputStyled = styled(Input)`
  flex: 1;
  font-size: 0.8rem;
  font-weight: 500;
  border: none;
  margin-right: 10px;
  padding: 0;
  color: ${({ theme }): string | undefined => theme?.colors?.general?.link};
`;
