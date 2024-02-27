import styled from '@emotion/styled';
import { Flex } from '@chakra-ui/react';

export const WrapperStyled = styled(Flex)`
  width: 100%;

  .MuiDropzoneArea-root {
    height: 400px;
    padding: 20px;
    display: flex;
    background: ${({ theme }): string | undefined =>
      theme?.colors?.general?.grayViolet};
    align-items: center;
    justify-content: center;
  }

  .MuiTypography-h5 {
    color: ${({ theme }): string | undefined => theme?.colors?.general?.link};
    font-size: 18px !important;
  }
`;

export const DropAreaStyled = styled(Flex)`
  width: 30%;
  margin-right: 30px;
`;

export const FilesAreaStyled = styled(Flex)`
  flex: 1;
  flex-wrap: wrap;
`;
