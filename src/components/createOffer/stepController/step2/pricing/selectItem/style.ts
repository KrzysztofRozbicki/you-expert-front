import styled from '@emotion/styled';
import { Flex, Text } from '@chakra-ui/react';
import { screenSizesString } from '../../../../../../styles/theme/breakpoints';

interface MenuListItemStyledProps {
  isActive?: boolean;
}

interface IconWrapperProps {
  isOpen?: boolean;
  isDisabled?: boolean;
}

export const WrapperStyled = styled(Flex)`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const IconWrapper = styled(Flex)<IconWrapperProps>`
  width: 33px;
  height: 33px;
  align-items: center;
  justify-content: center;
  cursor: ${({ isDisabled }): string =>
    isDisabled ? 'not-allowed' : 'pointer'};
  border-radius: 50%;
  background: ${({ theme }): string | undefined =>
    theme?.colors?.general?.iconBackground};
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.2s ease-in-out 0s;

  @media (min-width: ${screenSizesString?.md}) {
    width: 41px;
    height: 41px;
  }
`;

export const TextStyled = styled(Text)`
  flex: 1;
  font-weight: 500;
  margin-right: 10px;
  line-height: 115%;
`;

export const MenuListStyled = styled(Flex)`
  max-height: 240px;
  overflow: auto;
  top: calc(100% + 1px);
  position: absolute;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 1;
  flex-direction: column;
  border: 1px solid
    ${({ theme }): string | undefined => theme?.colors?.general?.tableBorder};
  border-top: none;
`;

export const MenuListItemStyled = styled(Flex)<MenuListItemStyledProps>`
  padding: 19.5px 51px;
  border-bottom: 1px solid
    ${({ theme }): string | undefined => theme?.colors?.general?.tableBorder};
  cursor: pointer;
  ${({ isActive, theme }): string =>
    isActive ? `background: ${theme?.colors?.general?.tableBorder}` : ''};
`;
