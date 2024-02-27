import { Flex, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { StepItemProps, StepLineProps } from './interfaces';
import { screenSizesString } from '../../../styles/theme/breakpoints';

export const Wrapper = styled(Flex)`
  width: 100%;
  overflow: hidden;
  margin-bottom: 50px;
  position: relative;
  justify-content: space-between;
`;

export const StepItem = styled(Flex)<{ isFirst?: boolean; isLast?: boolean }>`
  z-index: 2;
  flex-direction: column;
  align-items: center;
  position: relative;

  &::after {
    position: absolute;
    content: '';
    display: ${({ isFirst, isLast }): string =>
      isFirst || isLast ? 'block' : 'none'};
    top: 0;
    bottom: 0;
    left: ${({ isFirst }): string => (isFirst ? '0' : '50%')};
    right: ${({ isLast }): string => (isLast ? '0' : '50%')};
    background: #fbfbfd;
    z-index: 1;
  }
`;

export const StepItemTitle = styled(Text)<StepItemProps>`
  color: ${({ isActive, theme }): string | undefined =>
    isActive
      ? theme?.colors?.general?.link
      : theme?.colors?.general?.greyDisabled};
  font-weight: 500;
  margin-bottom: 10px;
  z-index: 2;
  height: 65px;

  @media (min-width: 375px) {
    height: fit-content;
  }
`;

export const StepItemCircle = styled(Flex)<StepItemProps>`
  background: ${({ isActive, theme }): string | undefined =>
    isActive
      ? theme?.colors?.general?.link
      : theme?.colors?.general?.greyDisabled};
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 500;
  z-index: 2;
`;

export const StepLine = styled(Flex)<StepLineProps>`
  position: absolute;
  left: 0;
  right: 0;
  height: 4px;
  overflow: hidden;
  background: ${({ theme }): string | undefined =>
    theme?.colors?.general?.greyDisabled};

  &&:after {
    content: '';
    display: block;
    width: ${({ lineWidth }): string => `${lineWidth}%`};
    height: 100%;
    transition: width 0.2s ease-in-out 0s;
    background: ${({ theme }): string | undefined =>
      theme?.colors?.general?.link};
  }
`;
