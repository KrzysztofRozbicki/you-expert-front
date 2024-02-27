import styled from '@emotion/styled';
import { Input } from '@chakra-ui/react';

export const InputStyled = styled(Input)`
  width: 100%;
  font-size: 0.8rem;
  font-weight: 500;
  border: none;
  padding: 0;
  color: ${({ theme }): string | undefined => theme?.colors?.general?.link};
`;
