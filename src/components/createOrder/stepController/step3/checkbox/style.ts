import styled from '@emotion/styled';
import { Checkbox, Flex } from '@chakra-ui/react';

export const WrapperStyled = styled(Flex)`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const CheckboxStyled = styled(Checkbox)<{ isDisabled?: boolean }>`
  label {
    cursor: ${({ isDisabled }): string =>
      isDisabled ? 'not-allowed' : 'pointer'};
  }

  span {
    width: 37px;
    height: 37px;
    border-radius: 5px;
  }

  span[data-checked] {
    background: transparent;
    border-color: transparent;
  }
`;
