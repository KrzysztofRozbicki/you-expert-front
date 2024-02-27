import { Flex, Avatar, Box } from '@chakra-ui/react';

export const AvatarController = (props) => {
  const { src, isActive, customStyle } = props;
  return (
    <Flex style={customStyle} position="relative">
      <Avatar src={src || ''} />
      {isActive && (
        <Box
          w="8px"
          h="8px"
          borderRadius="100%"
          bg="#00CC67"
          position="absolute"
          bottom="5px"
          right="5px"
          border="2px solid #fff"
        />
      )}
    </Flex>
  );
};
