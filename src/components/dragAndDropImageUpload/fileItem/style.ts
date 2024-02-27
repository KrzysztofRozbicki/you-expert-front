import styled from '@emotion/styled';
import { Flex, Text } from '@chakra-ui/react';

export const WrapperStyled = styled(Flex)`
  width: 150px;
  height: 150px;
  /* border: 2px solid
    ${({ theme }): string | undefined => theme?.colors?.general?.grayViolet}; */
  position: relative;
  margin-right: 10px;
  /* border-radius: 5px; */
  margin-bottom: 10px;
  flex-direction: column;
  overflow: hidden;
`;

export const IconWrapperStyled = styled(Flex)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const TextStyled = styled(Text)`
  height: 20px;
  padding: 0 20px;
  font-size: 14px;
  overflow: hidden;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const CloseWrapperStyled = styled(Flex)`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  background: ${({ theme }): string | undefined =>
    theme?.colors?.general?.iconBackground};
  align-items: center;
  border-radius: 50%;
  justify-content: center;
  cursor: pointer;
  display: none;

  ${WrapperStyled}:hover & {
    display: flex;
  }
`;
