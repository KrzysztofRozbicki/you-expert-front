import React, { memo } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import Edge from '../common/Edge';
import { FindExpertSection } from '../findExpertSection';
import useTranslation from '../../hooks/useTranslation';
import LatestOffers from '../latestOffers';
import { getFormattedHeading } from '../../common/strings';

const edgeStyle = {
  bottom: '0',
  left: '0'
};

const UI: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Flex
      position="relative"
      bg="general.dark"
      pt="206px"
      pb={{ sm: '600px', lg: '350px' }}
      w="100%"
      justifyContent="center"
    >
      <Flex
        w="100%"
        direction="column"
        className="max-width-container max-width-container-paddings"
      >
        <Flex mb="60px" w="100%" direction="column" align="center">
          {getFormattedHeading(
            t('home', 'categoriesPreviewSlider', 'title'),
            9,
            false,
            {
              margin: '0 auto',
              color: '#fff',
              textAlign: 'center',
              fontSize: '2.13rem !important'
            },
            { fontWeight: '600', color: '#7A72DF' }
          )}
          <Box
            w="100%"
            maxW="561px"
            h="4px"
            bg="general.orange"
            m="43px auto 0"
          />
        </Flex>

        <LatestOffers />

        <FindExpertSection />

        <Edge
          customStyle={edgeStyle}
          src="/images/sections/categoriesPreviewSlider/categoriesPreviewSliderEdge.svg"
        />
      </Flex>
    </Flex>
  );
};

export default memo(UI);
