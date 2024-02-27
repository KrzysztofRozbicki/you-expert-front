import styled from '@emotion/styled';
import { Flex } from '@chakra-ui/react';

interface RowStyledProps {
  customStyle?: string;
}

interface RowItemStyledProps {
  isHeader?: boolean;
  custonStyle?: string;
  isDisabled?: boolean;
  isError?: boolean;
}

export const TableWrapperStyled = styled(Flex)<{ customStyle?: string }>`
  border: 1px solid
    ${({ theme }): string | undefined => theme?.colors?.general?.tableBorder};
  border-radius: 5px;
  flex-direction: column;
  font-size: 0.8rem;
  font-weight: 500;
  ${({ customStyle }): string => customStyle}
`;

export const RowStyled = styled(Flex)<RowStyledProps>`
  border-bottom: 1px solid
    ${({ theme }): string | undefined => theme?.colors?.general?.tableBorder};
  ${({ customStyle }): string => (customStyle ? customStyle : '')};
`;

export const RowItemStyled = styled(Flex)<RowItemStyledProps>`
  padding: 10px 26px 10px 52px;
  align-items: center;
  width: calc(33.33% + 3px);
  border-right: 1px solid
    ${({ theme }): string | undefined => theme?.colors?.general?.tableBorder};
  box-sizing: border-box;
  min-height: 66px;
  ${({ isHeader, isDisabled, theme }): string =>
    isHeader
      ? `
            min-height: 97px;
            background: ${theme?.colors?.general?.tableHeaderBackground};
            font-size: 1.1rem;
        `
      : isDisabled
      ? `
          
          background: ${theme?.colors?.general?.tableHeaderBackground};
          cursor: not-allowed;
          > * {
            opacity: 0.4;
          }
          `
      : ``};
  ${({ customStyle }): string => (customStyle ? customStyle : '')};
  ${({ isError, theme }): string =>
    isError ? `border: 1px solid ${theme?.colors?.general?.red};` : ``};
`;

export const SpanStyled = styled.span`
  width: 0;
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex: 1;
  overflow: hidden;
`;
