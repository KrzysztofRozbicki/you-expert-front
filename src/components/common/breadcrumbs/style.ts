import styled from '@emotion/styled';
import { Flex, Text } from '@chakra-ui/react';

export const WrapperStyled = styled(Flex)`
  width: 100%;
  flex-wrap: wrap;
  align-items: center;
  line-height: 2;
  margin-bottom: 30px;

  a {
    font-size: 18px;
    font-weight: 500;
    color: ${({ theme }): string | undefined => theme?.colors?.general?.orange};
    margin-right: 23px;
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }
`;

export const TextStyled = styled(Text)`
  font-size: 0.8rem;
  font-weight: 500;
  color: ${({ theme }): string | undefined => theme?.colors?.general?.link};
  margin-right: 23px;
`;
