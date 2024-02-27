import { createBreakpoints } from '@chakra-ui/theme-tools';

export const screenSizesNumber = {
  sm: 320,
  md: 768,
  lg: 960,
  xl: 1300,
  '2xl': 1636
};

export const screenSizesString = {
  sm: `${screenSizesNumber.sm}px`,
  md: `${screenSizesNumber.md}px`,
  lg: `${screenSizesNumber.lg}px`,
  xl: `${screenSizesNumber.xl}px`,
  '2xl': `${screenSizesNumber['2xl']}px`
};

export const breakpoints = createBreakpoints({ ...screenSizesString });
