import styled from '@emotion/styled';
import { Flex } from '@chakra-ui/react';

export const StepWrapperStyled = styled(Flex)`
  background: #fff;
  flex-direction: column;
  border: 1px solid
    ${({ theme }): string | undefined => theme?.colors?.general?.greyDisabled};
  border-radius: 5px;
`;

export const StepBodyStyled = styled(Flex)`
  flex-direction: column;
`;
