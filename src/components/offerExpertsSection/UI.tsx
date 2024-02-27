import { memo } from 'react';
import { Flex, Box, Heading, Image, Text } from '@chakra-ui/react';
import useTranslation from '../../hooks/useTranslation';
import Edge from '../common/Edge';
import VideoController from '../common/VideoController';
import { getAltFromImage, getFormattedHeading } from '../../common/strings';

const edgeStyle = {
  right: '0',
  bottom: '0'
};

const videoStyle = {
  position: 'absolute',
  bottom: '-90px',
  left: '50%',
  zIndex: '100',
  transform: 'translateX(-50%)'
};

interface privilegeItem {
  imageUrl: string;
  title: string;
  description: string;
}

const privilegesList: privilegeItem[] = [
  {
    imageUrl: '/images/sections/offerExperts/Check.svg',
    title: 'Przejrzysty proces',
    description:
      'Rozpisany każdy etap procesu tworzenia zamówienia, tak żebyś wiedział czego się spodziewać'
  },
  {
    imageUrl: '/images/sections/offerExperts/Check.svg',
    title: 'Przejrzysty proces',
    description:
      'Rozpisany każdy etap procesu tworzenia zamówienia, tak żebyś wiedział czego się spodziewać'
  },
  {
    imageUrl: '/images/sections/offerExperts/Check.svg',
    title: 'Przejrzysty proces',
    description:
      'Rozpisany każdy etap procesu tworzenia zamówienia, tak żebyś wiedział czego się spodziewać'
  },
  {
    imageUrl: '/images/sections/offerExperts/Check.svg',
    title: 'Przejrzysty proces',
    description:
      'Rozpisany każdy etap procesu tworzenia zamówienia, tak żebyś wiedział czego się spodziewać'
  }
];

const UI = () => {
  const { t } = useTranslation();

  const renderListPrivileges = (items: privilegeItem[]) => {
    return items.map((item, itemIndex) => {
      const { imageUrl, title, description } = item;
      const alt = getAltFromImage(imageUrl);

      return (
        <Flex
          w={{ sm: '100%', md: '45%' }}
          mr="5%"
          mb="91px"
          key={`${title}-${itemIndex + 1}`}
        >
          <Flex
            align="center"
            justify="center"
            w="59px"
            h="59px"
            border="2px solid rgba(32, 14, 36, 0.2)"
            borderRadius="100%"
            mr="25px"
          >
            <Image w="16px" h="16px" src={imageUrl} alt={alt} />
          </Flex>
          <Box flex={1}>
            <Heading as="h4" fontSize="1.33rem" fontWeight="600" mb="15px">
              {title}
            </Heading>
            <Text fontSize="0.8rem" fontWeight="400">
              {description}
            </Text>
          </Box>
        </Flex>
      );
    });
  };

  return (
    <Flex w="100%" position="relative" justifyContent="center">
      <Flex
        pt={{ lg: '75px', xl: '104px' }}
        pb={{ sm: '30px', md: '250px', lg: '350px', xl: "455px" }}
        direction="column"
        className="max-width-container max-width-container-paddings"
      >
        <Flex m="0 0 111px 0" w="100%" direction="column" align="center">
          {getFormattedHeading(
            t('home', 'offerExperts', 'title'),
            7,
            false,
            {
              marginBottom: '49px',
              maxWidth: '778px',
              textAlign: 'center',
              fontSize: '2.13rem !important'
            },
            { fontWeight: '600', color: '#7A72DF' }
          )}
          <Box w="100%" maxW="561px" h="4px" bg="general.orange" />
        </Flex>
        {/* <Flex
          w={{ sm: '80%', lg: '60%' }}
          m="0 auto 0 15%"
          wrap="wrap"
          zIndex={1}
        >
          {renderListPrivileges(privilegesList)}
        </Flex> */}
        <VideoController
          customStyle={videoStyle}
          url="https://youtu.be/jtO5QWy3cn4"
          controls={true}
          isNeedToBeAdaptive={true}
          wrapperProps={{
            zIndex: '100',
            left: '50%',
            bottom: '-90px',
            position: 'absolute',
            transform: 'translateX(-50%)'
          }}
        />
        <Edge
          h={{ lg: '80%', xl: '90%' }}
          display={{ sm: 'none', lg: 'block' }}
          customStyle={edgeStyle}
          src="/images/sections/offerExperts/Offer_experts_edge.svg"
        />
      </Flex>
    </Flex>
  );
};

export default memo(UI);
