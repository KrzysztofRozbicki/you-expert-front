import { extendTheme } from '@chakra-ui/react';
import components from './components';
import colors from './colors';
import styles from './styles';
import fonts from './fonts';
import { breakpoints } from './breakpoints';

const theme = extendTheme({ colors, styles, fonts, breakpoints, components });

export default theme;
