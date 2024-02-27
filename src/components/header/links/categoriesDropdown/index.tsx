import React, { memo, useState, useRef, useEffect, useCallback } from 'react';
import { Flex, Text } from '@chakra-ui/react';

interface DropdownProps {
  title: string;
  wrapperStyle: any;
  optionsData: {
    name: string;
    slug: string;
    [key: string]: any;
  }[];
  selectedOption: string;
  onOptionClick: (slug: string) => void;
}

const Dropdown: React.FC<DropdownProps> = (props) => {
  const { title, optionsData, onOptionClick, selectedOption, wrapperStyle } =
    props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleOutsideClick = useCallback(
    (e) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(e?.target)) {
        setIsOpen(false);
      }
    },
    [dropdownRef]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleOutsideClick, { once: true });
    }
  }, [isOpen]);

  return (
    <Flex
      alignItems="center"
      cursor="pointer"
      onClick={() => setIsOpen(!isOpen)}
      position="relative"
      style={wrapperStyle}
    >
      <Text fontSize="18px" mr="5px" fontWeight="500">
        {title}
      </Text>
      <Flex
        transform={isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}
        transition="all 0.2s ease-in-out 0s"
      >
        <svg
          width="13"
          height="8"
          viewBox="0 0 13 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.67871 1.6543L6.32083 6.29641L10.9629 1.6543"
            stroke="#EC8581"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Flex>
      <Flex
        top="100%"
        left="0"
        position="absolute"
        flexDirection="column"
        background="#fff"
        borderRadius="5px"
        height={isOpen ? '300px' : '0px'}
        overflow="auto"
        transition="all 0.2s ease-in-out 0s"
        className="hide-scrollbar"
        ref={dropdownRef}
        zIndex={999}
      >
        {optionsData.map((item, index) => (
          <Flex key={index} p="10px 30px">
            <Text
              fontSize="18px"
              fontWeight="500"
              color={
                item?.slug === selectedOption
                  ? 'general.link'
                  : 'general.primary'
              }
              _hover={{ color: 'general.link' }}
              whiteSpace="nowrap"
              onClick={() => onOptionClick(item?.slug)}
            >
              {item?.name}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default memo(Dropdown);
