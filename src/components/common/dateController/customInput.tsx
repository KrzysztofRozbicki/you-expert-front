import React, { memo, useCallback } from 'react';
import { Flex, Input } from '@chakra-ui/react';

interface CustomInputProps {
  value?: string;
  onClick?: () => void;
  onResetButtonClick: () => void;
}

const CustomInput: React.FC<CustomInputProps> = (props) => {
  const { value, onClick, onResetButtonClick } = props;

  const handleIconClick = useCallback(() => {
    if (value) {
      onResetButtonClick();
      return;
    }
    onClick();
  }, [value, onResetButtonClick, onClick]);

  return (
    <Flex
      w="100%"
      borderRadius="28px"
      height="53px"
      border="1px solid"
      borderColor={value ? '#EC8581' : '#DCDCF4'}
      alignItems="center"
      padding="0 10px 0 20px"
      cursor="pointer"
    >
      <Input
        value={value}
        border="none"
        type="text"
        readOnly={true}
        flex={1}
        p="0"
        cursor="pointer"
        color="#020055"
        onClick={onClick}
      />
      <Flex
        w="36px"
        h="36px"
        background={value ? '#EC8581' : '#DCDCF4'}
        alignItems="center"
        justifyContent="center"
        transform="rotate(90deg)"
        borderRadius="50%"
        onClick={handleIconClick}
      >
        {value ? (
          <svg viewBox="0 0 24 24" width="12" height="12px">
            <path
              fill="#fff"
              d="M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z"
            />
          </svg>
        ) : (
          <svg
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 1.33325L6.64212 5.97537L2 10.6175"
              stroke="#020055"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </Flex>
    </Flex>
  );
};

export default memo(CustomInput);
