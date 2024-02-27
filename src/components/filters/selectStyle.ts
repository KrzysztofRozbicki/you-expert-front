export default {
  container: (styles) => {
    return { ...styles, width: '100%', fontSize: '0.8rem' };
  },
  valueContainer: (styles) => ({
    ...styles,
    padding: '0'
  }),
  control: (styles, info) => {
    const { hasValue } = info;
    return {
      ...styles,
      position: 'relative',
      zIndex: '1',
      width: '100%',
      // height: '54px',
      cursor: 'pointer',
      backgroundColor: '#fff',
      border: `1px solid ${hasValue ? '#EC8581' : '#DCDCF4'}`,
      color: '#020055',
      borderRadius: '57px',
      padding: '10px 15px 10px 25px',
      boxShadow: 'none',
      '&:hover': {
        border: `1px solid ${hasValue ? '#EC8581' : '#DCDCF4'}`
      }
    };
  },
  placeholder: (styles, info) => {
    const { hasValue } = info;
    return {
      ...styles,
      width: '100%',
      color: hasValue ? '#EC8581' : '#020055',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      margin: '0'
    };
  },
  indicatorSeparator: () => ({ display: 'none' }),
  indicatorsContainer: (styles, info) => {
    const { hasValue } = info;
    return {
      ...styles,
      display: 'flex',
      justifyContent: 'center',
      width: '31px',
      height: '31px',
      backgroundColor: hasValue ? '#EC8581' : '#DCDCF4',
      borderRadius: '100%'
    };
  },
  dropdownIndicator: (styles, info) => {
    const { hasValue } = info;
    return {
      ...styles,
      color: hasValue ? '#fff' : '#020055'
    };
  },
  menu: (styles) => ({
    ...styles,
    top: '50%',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    zIndex: '2',
    borderRadius: '9px',
    marginTop: '0'
  }),
  menuList: (styles) => ({
    ...styles,
    paddingTop: '40px',
    maxHeight: '500px',
    paddingBottom: '0',
    backgroundColor: 'transparent',
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
