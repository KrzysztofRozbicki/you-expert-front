import { Flex, Box, Input, Image, Button } from '@chakra-ui/react';
import { renderHintList } from './common';

const SearchController = (props) => {
  const {
    value,
    placeholderLabel,
    buttonLabel,
    onChange,
    onClick,
    leftIcon,
    hints,
    onSelect,
    closeHints,
    boxProps,
    inputProps,
    searchIconProps
  } = props;

  const searchIconSlyle = leftIcon
    ? {
        left: '42px'
      }
    : {
        right: '42px'
      };

  return (
    <Flex w="100%" align="center" zIndex={2}>
      <Box mr="23.5px" w="100%" position="relative" {...boxProps}>
        <Input
          pl="92px"
          mr="23.5px"
          w="100%"
          h="74px"
          bg="general.white"
          borderRadius="62px"
          value={value}
          onBlur={() => setTimeout(() => closeHints(), 500)}
          onFocus={() => {
            if (value) {
              onChange(value, true);
            }
          }}
          fontSize="0.8rem"
          placeholder={placeholderLabel}
          _placeholder={{ color: 'rgba(20, 20, 43, 0.3)' }}
          onChange={(event) => onChange(event)}
          onKeyUp={(event) => {
            if (event.code === 'Enter') {
              onClick(event);
            }
          }}
          {...inputProps}
        />
        <Image
          cursor="pointer"
          style={searchIconSlyle}
          position="absolute"
          top="50%"
          transform="translateY(-50%)"
          src="/images/sections/search/Search.svg"
          zIndex="1"
          onClick={(event) => onClick(event)}
          {...searchIconProps}
        />
        <Flex w="100%" position="relative">
          {renderHintList(hints, onSelect)}
        </Flex>
      </Box>
      {!!buttonLabel && (
        <Button
          display={{ sm: 'none', md: 'block' }}
          h="72px"
          w="147px"
          bg="general.sand"
          borderRadius="48px"
          fontSize="0.8rem"
          color="general.dark"
          onClick={(event) => onClick(event)}
        >
          {buttonLabel}
        </Button>
      )}
    </Flex>
  );
};

export default SearchController;
