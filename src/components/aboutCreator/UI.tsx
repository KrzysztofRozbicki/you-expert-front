import React, { memo } from 'react';
import { Flex, Heading, Image, Text } from '@chakra-ui/react';
import StarRatings from 'react-star-ratings';
import useTranslation from '../../hooks/useTranslation';
import SectionWrapper from '../common/SectionWrapper';
import { ButtonController } from '../common/ButtonController';
import { IPublicUserData } from '../../redux/interfaces/offers';
import ExpertInfo from '../expertInfo';

interface AboutCreatorProps {
  expertRedirect: (id: number) => void;
  creatorData: IPublicUserData;
}

const UI: React.FC<AboutCreatorProps> = (props) => {
  const { creatorData, expertRedirect } = props;
  const { id, description } = creatorData;

  const { t } = useTranslation();
  return (
    <SectionWrapper>
      <Flex
        align="baseline"
        direction="column"
        w={{ sm: '100%', lg: '65%' }}
        borderBottom="4px solid #DCDCF4"
        pb={{ sm: '50px', lg: '80px' }}
      >
        <Heading
          cursor="pointer"
          onClick={() => expertRedirect(id)}
          fontSize="1.6rem"
          fontWeight="500"
          mb={{ sm: '30px', xl: '50px' }}
        >
          {t('offer', 'about', 'title')}
        </Heading>

        <Flex w="100%">
          <ExpertInfo expert={creatorData} />
        </Flex>
        <Text mb={{ sm: '35px', xl: '47px' }} fontSize="0.8rem">
          {description || ''}
        </Text>
        <Flex>
          <ButtonController
            onClick={() => expertRedirect(id)}
            mh={{ sm: '45px !important', xl: '52px' }}
            key="yellow-about-button"
            variant="yellow"
            customStyle={{ fontSize: '0.8rem' }}
          >
            {t('offer', 'about', 'button')}
          </ButtonController>
        </Flex>
      </Flex>
    </SectionWrapper>
  );
};

export default memo(UI);
