import styled from '@emotion/styled';
import { Text, Flex } from '@chakra-ui/react';

export const TextStyled = styled(Text)`
  font-size: 0.8rem;
  margin-left: 23px;
  margin-bottom: 10px;
`;

export const FlexStyled = styled(Flex)`
  border: 1px solid
    ${({ theme }): string | undefined => theme?.colors?.general?.inputBorder};
  min-height: 56px;
  border-radius: 55px;
  align-items: center;
  justify-content: space-between;
  padding: 0 7px;
`;

export const FilesWrapperStyled = styled(Flex)`
  flex: 1;
  overflow: hidden;
  padding: 10px 20px;
  flex-wrap: wrap;
`;

export const IconWrapperStyled = styled(Flex)`
  width: 41px;
  height: 41px;
  background: ${({ theme }): string | undefined =>
    theme?.colors?.general?.iconBackground};
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
`;

export const FileItemWrapperStyled = styled(Flex)`
  height: 30px;
  max-width: 100%;
  padding-left: 10px;
  align-items: center;
  background: ${({ theme }): string | undefined =>
    theme?.colors?.general?.iconBackground};
  border-radius: 10px;
  margin-right: 5px;
  margin-bottom: 5px;
  justify-content: space-between;
  overflow: hidden;
`;

export const FileItemTitleStyled = styled(Text)`
  flex: 1;
  overflow: hidden;
  font-size: 0.6rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 10px;
  line-height: 1;
`;

export const FileItemIconStyled = styled(Flex)`
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
