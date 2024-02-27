export const Button = {
  baseStyle: {
    fontFamaly: 'Poppins, system-ui',
    fontSize: '17px',
    fontWeight: '400',
    outline: 'none !important',
    padding: '19px 32px !important',
    borderRadius: '48px',
    color: 'heneral.lavender',
    _focus: {
      outline: 'none !important'
    },
    _hover: {
      backgroundColor: '#7A72DF !important',
      color: '#fff'
    }
  },
  sizes: {
    xl: {
      h: '56px',
      fontSize: 'lg',
      px: '32px'
    }
  },
  variants: {
    'with-shadow': {
      bg: 'primary',
      boxShadow: '0 0 2px 2px #efdfde'
    },
    yellow: {
      backgroundColor: 'general.sand',
      color: 'general.lavender'
    }
  }
};
