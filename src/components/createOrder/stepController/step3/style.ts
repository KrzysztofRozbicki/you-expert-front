import styled from '@emotion/styled';
import { Flex } from '@chakra-ui/react';

export const PaymentWrapperStyled = styled(Flex)`
  width: 100%;
  background: #fff;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.general.greyDisabled};
  border-radius: 5px;
  margin-bottom: 30px;
`;

export const PaymentTitleBlockStyled = styled(Flex)<{ customStyle?: string }>`
  padding: 0 35px;
  height: 100px;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.general.greyDisabled};
  ${({ customStyle }): string => (customStyle ? customStyle : '')};
`;
