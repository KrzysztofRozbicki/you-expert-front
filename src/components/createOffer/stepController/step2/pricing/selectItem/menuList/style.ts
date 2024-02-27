import styled from '@emotion/styled';
import { Flex } from '@chakra-ui/react';

interface MenuListItemStyledProps {
  isActive?: boolean;
}

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
  border-bottom: 1px solid
    ${({ theme }): string | undefined => theme?.colors?.general?.tableBorder};
  cursor: pointer;
  ${({ isActive, theme }): string =>
    isActive ? `background: ${theme?.colors?.general?.tableBorder}` : ''};
`;
