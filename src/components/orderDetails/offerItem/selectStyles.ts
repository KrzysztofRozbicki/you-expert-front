export default {
  container: (styles) => ({
    ...styles,
    width: '150px',
    fontSize: '0.8rem'
  }),
  control: (styles, info) => {
    const { hasValue } = info;
    return {
      ...styles,
      width: '100%',
      height: '56px',
      cursor: 'pointer',
      padding: '7px',
      backgroundColor: '#fff',
      border: '1px solid #DCDCF4',
      color: '#020055',
      borderRadius: '55px',
      boxShadow: 'none',
      zIndex: '2'
    };
  },
  valueContainer: (styles) => {
    return {
      ...styles,
      padding: '0 9px'
    };
  },
  placeholder: (styles, info) => {
    const { hasValue } = info;
    return { color: hasValue ? '#EC8581' : '#020055' };
  },
  indicatorSeparator: () => ({ display: 'none' }),
  indicatorsContainer: (styles, info) => {
    const { hasValue } = info;
    return {
      ...styles,
      display: 'flex',
      justifyContent: 'center',
      width: '41px',
      height: '41px',
      backgroundColor: '#7A72DF',
      borderRadius: '100%'
    };
  },
  dropdownIndicator: (styles, info) => {
    const { hasValue } = info;
    return {
      ...styles,
      color: '#fff'
    };
  },
  menu: (styles) => ({
    ...styles,
    top: '50%',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    zIndex: '1',
    borderRadius: '9px',
    marginTop: '0'
  }),
  menuList: (styles) => ({
    ...styles,
    paddingTop: '40px',
    paddingBottom: '0',
    backgroundColor: 'white',
    border: '1px solid #DCDCF4',
    borderRadius: '0 0 6px 6px',
    borderTop: 'none'
  }),
  option: (styles, info) => {
    const { isSelected } = info;

    return {
      ...styles,
      position: 'relative',
      widht: '90%',
      margin: '0 auto',
      fontWeight: '500',
      backgroundColor: '#fff',
      color: '#020055',
      cursor: 'pointer',
      padding: '15px 20px 15px 41px',
      borderBottom: '1px solid #DCDCF4',
      '&:before': {
        position: 'absolute',
        top: '30%',
        right: '28px',
        content: '" "',
        display: isSelected ? 'block' : 'none',
        transform: 'rotate(45deg)',
        height: '15px',
        width: '10px',
        borderBottom: '3px solid #7A72DF',
        borderRight: '3px solid #7A72DF'
      }
    };
  },
  singleValue: (styles) => ({ ...styles, color: '#020055' })
};
