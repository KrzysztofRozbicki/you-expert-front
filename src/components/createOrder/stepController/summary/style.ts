import styled from '@emotion/styled';
import { Flex } from '@chakra-ui/react';

export const WrapperStyled = styled(Flex)`
  width: 100%;
  flex-direction: column;
`;

export const SummaryBlockStyled = styled(Flex)`
  background: #fff;
  border: 1px solid ${({ theme }) => theme.colors.general.greyDisabled};
  border-radius: 5px;
  overflow: hidden;
  flex-direction: column;
`;

export const TitleWrapperStyled = styled(Flex)`
  width: 100%;
  padding: 18px 58px;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.general.greyDisabled};
  justify-content: space-between;
`;

export const IconWrapperStyled = styled(Flex)<{ customStyle?: string }>`
  width: 52px;
  height: 52px;
  border: 2px solid #020055;
  border-radius: 50%;
  align-items: center;
  justify-content: center;

  ${({ customStyle }): string => (customStyle ? customStyle : '')};
`;

export const ServiceWrapperStyled = styled(Flex)<{ customStyle?: string }>`
  width: 100%;
  padding: 18px 58px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.general.greyDisabled};
  flex-direction: column;
  ${({ customStyle }): string => (customStyle ? customStyle : '')};
`;

export const ServiceItemStyled = styled(Flex)<{ isLast?: boolean }>`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ isLast }): string => (isLast ? '0px' : '30px')};
`;
