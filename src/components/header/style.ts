import styled from '@emotion/styled';
import { Flex } from '@chakra-ui/react';
import { HEADER_COLUMN_LIMIT } from './constants';
import { screenSizesString } from '../../styles/theme/breakpoints';

export const StyledLinkWrapper = styled(Flex)`
  display: none;

  @media (min-width: 1140px) {
    display: flex;
  }
`;

export const StyledHamburgerWrapper = styled(Flex)`
  display: none;
  height: 100%;
  align-items: center;

  @media (min-width: ${HEADER_COLUMN_LIMIT}) {
    display: flex;
  }

  @media (min-width: 1140px) {
    display: none;
  }
`;

export const StyledAdaptiveFlex = styled(Flex)<{
  minScreenWidth: string;
  styleBefore: string;
  styleAfter: string;
}>`
  ${({ styleBefore }): string => styleBefore}
  @media (min-width: ${({ minScreenWidth }): string => minScreenWidth}) {
    ${({ styleAfter }): string => styleAfter}
  }
`;

export const SVGStyled = styled.svg`
  width: 160px;

  @media (min-width: ${screenSizesString?.lg}) {
    width: 180px;
  }

  @media (min-width: ${screenSizesString?.xl}) {
    width: 200px;
  }

  @media (min-width: ${screenSizesString?.['2xl']}) {
    width: 273px;
  }
`;