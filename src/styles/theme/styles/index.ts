const styles = {
  global: {
    html: {
      width: '100%',
      overflowX: 'hidden'
    },
    body: {
      maxWidth: '100%',
      overflowX: 'hidden',
      bg: 'general.white',
      fontFamily: 'Poppins, system-ui'
    },

    a: {
      color: 'general.link',
      fontSize: '18px',
      fontFamily: 'Poppins, system-ui',
      _hover: {
        textDecoration: 'underline'
      }
    },

    button: {
      outline: 'none',
      fontFamily: 'Poppins, system-ui'
    }
  }
};

export default styles;
