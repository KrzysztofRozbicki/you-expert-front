import React, { useEffect, useRef, useState, memo } from 'react';
import Select from 'react-select';
import { Flex } from '@chakra-ui/react';
import styles from '../../styles/theme/styles';

const linkStyle = {
  container: (styles) => ({ ...styles, zIndex: '19', width: '100%' }),
  control: (styles) => {
    return {
      ...styles,
      zIndex: '19',
      width: '100%',
      height: '54px',
      cursor: 'pointer',
      backgroundColor: '#fff',
      border: 'none',
      borderRadius: '0',
      borderBottom: `3px solid #EC8581`,
      color: '#020055',
      padding: '0',
      boxShadow: 'none',
      '&:hover': {
        border: 'none',
        borderBottom: '3px solid #EC8581'
      }
    };
  },
  menu: (styles) => ({
    ...styles,
    zIndex: '20',
    width: '316px !important',
    backgroundColor: '#fff',
    boxShadow: 'none',
    borderRadius: '9px',
    padding: '15px 80px 47px 34px',
    marginTop: '0'
  }),
  placeholder: (styles, info) => {
    const { hasValue } = info;
    return { ...styles, fontSize: '18px', fontWeight: '500', color: '#020055' };
  },
  input: () => ({ color: 'transparent', textShadow: '0 0 0 #2196f3' }),
  indicatorSeparator: () => ({ display: 'none' }),
  indicatorsContainer: (styles, info) => {
    return {
      ...styles,
      display: 'flex',
      justifyContent: 'center',
      width: '41px',
      height: '41px',
      backgroundColor: 'transparent',
      borderRadius: '100%',
      color: '#EC8581 !important'
    };
  },
  indicatorContainer: (styles) => ({ ...styles, color: '#EC8581 !important' }),
  dropdownIndicator: (styles, info) => {
    return {
      ...styles,
      color: '#EC8581 !important'
    };
  },
  menuList: (styles) => ({
    ...styles,
    backgroundColor: '#fff',
    padding: '0',

    '::-webkit-scrollbar': {
      display: 'none'
    }
  }),
  option: (styles, info) => {
    const { isSelected } = info;

    return {
      ...styles,
      widht: '90%',
      margin: '0 auto',
      backgroundColor: '#fff',
      color: isSelected ? '#030056' : '#7A72DF',
      fontWeight: '500',
      cursor: 'pointer',
      padding: '15px 20px',
      border: 'none',
      borderRadius: '0'
    };
  },
  singleValue: (styles) => ({
    ...styles,
    fontSize: '18px',
    fontWeight: '500',
    color: '#020055'
  })
};

const SelectController = (props) => {
  const {
    options,
    value,
    isSearchable,
    isDisabled,
    isLoading,
    customStyle,
    onChange,
    placeholder,
    components,
    asLink,
    name,
    onCustomFilterFieldChange,
    noOptionsMessage,
    wrapperStyle,
    clearValue
  } = props;

  let selectRef;
  const ref = useRef<HTMLInputElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState(value ? value : null);
  const [valueData, setValueData] = useState(true);

  const handleOutsideClick = (e) => {
    if (ref && ref.current && !ref.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  const handleChange = (option) => {
    setCurrentValue(option);
    if (option && option.type !== 'inputNumber') {
      setIsOpen(false);
      selectRef.blur();
    }
    if (option && !option.value) {
      setValueData(false);
    } else {
      setValueData(true);
    }
    if (currentValue && option.value === currentValue.value) {
      setCurrentValue(null);
      setIsOpen(false);
    }
    onChange(option);
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, []);

  const handleKeyDown = (event) => {
    const validationCases = ['Comma', 'KeyV', 'Minus'];
    if (event.code === 'Backspace') {
      if (onCustomFilterFieldChange) {
        onCustomFilterFieldChange(event, true);
      }
    }

    if (validationCases.includes(event.code)) {
      event.preventDefault();
    }
  };

  return (
    <div ref={ref} style={{ ...wrapperStyle, position: 'relative' }}>
      {isOpen && (
        <Flex
          top="0"
          left="0"
          right="0"
          bottom="0"
          position="absolute"
          zIndex={9}
          cursor='pointer'
          background="transparent"
          onClick={() => setIsOpen(false)}
        />
      )}
      <Select
        ref={(select) => (selectRef = select)}
        options={options}
        // value={valueData ? value : null}
        onFocus={() => setIsOpen(true)}
        onChange={handleChange}
        components={{ ...components }}
        isSearchable={isSearchable}
        isDisabled={isDisabled}
        isLoading={isLoading}
        placeholder={placeholder}
        styles={asLink ? linkStyle : customStyle || {}}
        menuIsOpen={isOpen}
        name={name}
        value={currentValue}
        openMenuOnClick={false}
        autoFocus={false}
        // noOptionsMessage={noOptionsMessage || 'No options'}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default memo(SelectController);
