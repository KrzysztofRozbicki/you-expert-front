import React, { memo, useMemo, useState, useCallback } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import MenuList from './menuList';
import { WrapperStyled, IconWrapper, TextStyled } from './style';

export interface option {
  value: string | number;
  label: string;
}

interface SelectItemProps {
  selected: any;
  options: option[];
  onChange: (option?: option) => void;
  isDisabled: boolean;
  wrapperProps?: any;
  textWrapperProps?: any;
  isError?: boolean;
  errorText?: string;
  errorTextProps?: any;
}

const SelectItem: React.FC<SelectItemProps> = (props) => {
  const {
    selected,
    options,
    onChange,
    isDisabled,
    wrapperProps,
    textWrapperProps,
    isError,
    errorText,
    errorTextProps
  } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const selectedValue = useMemo(() => {
    const findItem = options.find((item) => item.value === selected);
    if (findItem) {
      return findItem;
    }
    return { value: '', label: '' };
  }, [selected, options]);

  const handleToggleMenu = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDisabled) {
        e.preventDefault();
        e.stopPropagation();

        setIsOpen(!isOpen);
      }
    },
    [isOpen, setIsOpen, isDisabled]
  );

  return (
    <WrapperStyled
      p="10px 26px 10px 52px"
      flexDirection="column"
      {...wrapperProps}
    >
      <Flex w="100%" alignItems="center">
        <Flex
          mr="10px"
          flex={1}
          height={{ sm: '33px', md: '41px' }}
          alignItems="center"
          fontSize="0.8rem"
          {...textWrapperProps}
        >
          <TextStyled>{selectedValue?.label}</TextStyled>
        </Flex>
        <IconWrapper
          onClick={handleToggleMenu}
          isOpen={isOpen}
          isDisabled={isDisabled}
        >
          <svg
            width="15"
            height="8"
            viewBox="0 0 15 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.0416 1.30713L7.49996 6.62481L1.95829 1.30713"
              stroke="#020055"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </IconWrapper>
      </Flex>
      {isError && !!errorText && (
        <Text fontSize="0.6rem" color="general.red" {...errorTextProps}>
          {errorText}
        </Text>
      )}
      {isOpen && (
        <MenuList
          selectedValue={selectedValue}
          options={options}
          onChange={onChange}
          onClose={() => setIsOpen(false)}
        />
      )}
    </WrapperStyled>
  );
};

export default memo(SelectItem);
