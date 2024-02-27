import { Flex, Heading, Box } from '@chakra-ui/react';

import { TitleWithLineProps } from '../../common/interfaceTypes';

export const TitleWithLine: React.FC<TitleWithLineProps> = ({
  title,
  lineStyles,
  wrapperP,
  fsz,
  titleWidth,
  wrapperStyles,
  headerStyles
}) => {
  return (
    <Flex
      p={wrapperP || ''}
      w="100%"
      align="flex-end"
      style={{ ...wrapperStyles }}
    >
      <Heading
        w={titleWidth || 'fit-content'}
        fontSize={fsz || { sm: '1.6rem', xl: '1.6rem !important' }}
        fontWeight="500"
        style={{ ...headerStyles }}
      >
        {title}
      </Heading>
      <Box
        flex={1}
        style={{ ...lineStyles }}
        h="4px"
        bg="general.primary"
        m="0 auto 0 59px"
      />
    </Flex>
  );
};
