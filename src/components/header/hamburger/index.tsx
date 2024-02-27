import React, { memo } from 'react';
import { Flex } from '@chakra-ui/react';

interface HamburgerProps {
  onClick: () => void;
  color?: string;
  wrapperProps?: any;
}

const Hamburger: React.FC<HamburgerProps> = (props) => {
  const { onClick, color = '#020055', wrapperProps } = props;
  return (
    <Flex
      h="100%"
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
      onClick={onClick}
      {...wrapperProps}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="30px"
        width="30px"
        viewBox="0 -53 384 384"
        style={{ fill: color }}
      >
        <path d="m368 154.667969h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
        <path d="m368 32h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
        <path d="m368 277.332031h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
      </svg>
    </Flex>
  );
};

export default memo(Hamburger);
