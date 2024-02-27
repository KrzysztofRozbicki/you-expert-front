import styled from '@emotion/styled';
import { Flex } from '@chakra-ui/react';

export const WrapperStyled = styled(Flex)`
  width: 100%;
  justify-content: center;

  .MuiDropzoneArea-root {
    height: 100%;
    min-height: 400px;
    padding: 20px;
    display: flex;
    background: ${({ theme }): string | undefined =>
      theme?.colors?.general?.grayViolet};
    align-items: center;
    justify-content: center;
  }

  .MuiTypography-h5 {
    color: ${({ theme }): string | undefined => theme?.colors?.general?.link};
    font-size: 0.8rem !important;
  }
`;

export const FilesAreaStyled = styled(Flex)`
  flex: 1;
  flex-wrap: wrap;
`;
