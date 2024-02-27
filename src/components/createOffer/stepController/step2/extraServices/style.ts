import styled from '@emotion/styled';
import { Flex, Text } from '@chakra-ui/react';

interface ExtraServiceItemStyledProps {
  isActive?: boolean;
}

export const WrapperStyled = styled(Flex)`
  flex-direction: column;
`;

export const ExtraServiceItemStyled = styled(Flex)<ExtraServiceItemStyledProps>`
  width: 100%;
  height: 106px;
  border: 1px solid
    ${({ theme }): string | undefined => theme?.colors?.general?.tableBorder};
  box-sizing: border-box;
  border-radius: 5px;
  margin-bottom: 21px;
  padding: 35px 40px;

  ${({ isActive, theme }): string =>
    isActive
      ? `
            background: ${theme?.colors?.general?.tableHeaderBackground};
            border: 3px solid ${theme?.colors?.general?.primary};
        `
      : ''};
`;

export const ExtraServiceTextStyled = styled(Text)`
  font-size: 24px;
  font-weight: 500;
`;
