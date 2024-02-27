import { memo } from 'react';
import { Flex, Heading, Box } from '@chakra-ui/react';
import LatestOffers from '../latestOffers';

const UI = (props) => {
  const { title } = props;

  return (
    <Flex
      pt={{ sm: '0px', lg: '40px', xl: '83px' }}
      direction="column"
      w="100%"
      m="0 auto"
      pb="105px"
      position="relative"
    >
      {title && (
        <Flex
          align="flex-end"
          justify="space-between"
          mb={{ sm: '60px', xl: '121px' }}
        >
          <Heading
            as="h3"
            fontWeight="500"
            fontSize="1.6rem"
            mr={{ sm: '65px', xl: '85px' }}
          >
            {title}
          </Heading>
          <Box bg="general.primary" h="4px" w={{ sm: '60%', xl: '70%' }} />
        </Flex>
      )}

      <LatestOffers isWhiteBg={true} />
    </Flex>
  );
};

export default memo(UI);
