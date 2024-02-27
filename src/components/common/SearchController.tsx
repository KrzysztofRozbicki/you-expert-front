import React, { useRef } from 'react';
import { memo } from 'react';
import { Flex, Input } from '@chakra-ui/react';

const SearchController = (props) => {
  const {
    key,
    onChange,
    onSearch,
    value,
    placeholderLabel,
    closeHintsList,
    isValid
  } = props;
  const searchInput = useRef(null);

  return (
    <Flex w="100%" position="relative" key={key} zIndex="21">
      <Input
        ref={searchInput}
        onBlur={() => setTimeout(() => closeHintsList(), 500)}
        onFocus={() => {
          if (value) {
            onChange(value, true);
          }
        }}
        w="100%"
        borderColor={!isValid ? 'red !important' : '#cbd5e0'}
        h="44px"
        borderRadius="28px"
        bg="general.white"
        fontSize="0.6rem"
        pr="45px"
        value={value}
        placeholder={placeholderLabel}
        onChange={(event) => onChange(event)}
        onKeyDown={(event) => {
          if (event.code === 'Enter') {
            onSearch();
          }
        }}
        _placeholder={{ color: 'general.link' }}
      />
      <Flex
        w="29px"
        h="29px"
        p="0"
        display="flex"
        alignItems="center"
        justifyContent="center"
        background="#EC8581"
        cursor="pointer"
        borderRadius="50%"
        position="absolute"
        zIndex="100"
        top="50%"
        right="2%"
        transform="translateY(-50%)"
        onClick={onSearch}
      >
        <svg
          width="11"
          height="11"
          viewBox="0 0 11 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.04175 9.16675C7.31992 9.16675 9.16675 7.31992 9.16675 5.04175C9.16675 2.76357 7.31992 0.916748 5.04175 0.916748C2.76357 0.916748 0.916748 2.76357 0.916748 5.04175C0.916748 7.31992 2.76357 9.16675 5.04175 9.16675Z"
            stroke="#FCFCFC"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.0833 10.0833L8.25 8.25"
            stroke="#FCFCFC"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Flex>
    </Flex>
  );
};

export default memo(SearchController);
