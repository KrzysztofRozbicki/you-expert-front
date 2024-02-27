import { memo } from 'react';
import { Flex } from '@chakra-ui/react';

const SectionWrapper = (props) => {
  const { children, customStyle, p } = props;

  return (
    <Flex
      p={p || ''}
      style={customStyle}
      w='100%'
    >
      {children}
    </Flex>
  );
};

export default memo(SectionWrapper);
