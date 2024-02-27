import { Text } from '@chakra-ui/react';

export const ErrorMessage = (props) => {
  const { children, customStyle, tA } = props;

  return (
    <Text
      style={customStyle}
      fontSize="0.6rem"
      textAlign={tA || 'center'}
      mb="15px"
      color="general.darkRed"
    >
      {children}
    </Text>
  );
};
