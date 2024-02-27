import styled from '@emotion/styled';
import { Flex, Image, Text } from '@chakra-ui/react';

export const WrapperStyled = styled(Flex)`
  width: 100%;
  height: fit-content;
  margin-bottom: 30px;
  padding-bottom: 48px;
  border-bottom: 4px solid ${({ theme }) => theme.colors.general.greyDisabled};
`;

export const ImageStyled = styled(Image)`
  border-radius: 5px;
  overflow: hidden;
`;

export const InfoWrapperStyled = styled(Flex)`
  flex: 1;
  flex-direction: column;
`;

export const TitleStyled = styled(Text)`
  font-weight: 500;
  font-size: 1.4rem;
  margin-bottom: 27px;
  line-height: 128%;
`;

export const StarWrapperStyled = styled(Flex)`
  align-items: center;
  margin-bottom: 27px;
`;

export const StartTextStyled = styled(Text)`
  margin-left: 10px;
  font-size: 0.6rem;
  font-weight: 500;
`;

export const PriceWrapperStyled = styled(Flex)`
  justify-content: space-between;
`;

export const QuantityWrapperStyled = styled(Flex)`
  align-items: center;
  margin-right: 10px;
`;

export const QuantityTextStyled = styled(Text)`
  font-size: 0.8rem;
  font-weight: 400;
  margin-right: 16px;
`;

export const PriceStyled = styled(Text)`
  font-size: 1.4rem;
  font-weight: 500;
  white-space: nowrap;
`;

export const VariantStyled = styled(Text)`
  height: fit-content;
  font-size: 1.4rem;
  font-weight: 500;
  color: ${({ theme }): string | undefined => theme?.colors?.general?.orange};
`;
