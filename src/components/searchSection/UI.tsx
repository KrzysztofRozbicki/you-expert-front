import { memo, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Flex, Box, Text, Button, Image, Avatar } from '@chakra-ui/react';
import useTranslation from '../../hooks/useTranslation';
import Edge from '../common/Edge';
import SearchController from './SearchController';
import CookiesBanner from '../common/CookiesBanner';
import TagsController from '../common/TagsController';
import { getFormattedHeading } from '../../common/strings';
import { TagItem } from '../common/Interfaces/index';

const tagsData: TagItem[] = [
  {
    id: 1,
    name: 'Branding',
    slug: 'digital-marketing'
  },
  {
    id: 2,
    name: 'Developer',
    slug: 'programming-tech'
  },
  {
    id: 3,
    name: 'Web and Mobile Design',
    slug: 'graphics-design'
  }
];

const UI = (props) => {
  const {
    searchValue,
    onSearchChange,
    hints,
    onSelect,
    onClick,
    closeHints,
    expertData
  } = props;
  const { t } = useTranslation();
  const {
    push,
    query: { locale }
  } = useRouter();

  const handleRedirectToUserProfile = useCallback(() => {
    if (!!expertData?.id) {
      push(`/${locale}/profile/${expertData?.id}`);
    }
  }, [expertData, push, locale]);

  return (
    <Flex
      justify="center"
      bg="general.dark"
      w="100%"
      position="relative"
      fontSize="0.8rem"
    >
      <Flex
        direction={{ sm: 'column', lg: 'row' }}
        pt={{ sm: '75px', xl: '100px', '2xl': '144px' }}
        pb={{ sm: '75px', xl: '100px', '2xl': '278px' }}
        justify="center"
        className="max-width-container max-width-container-paddings"
      >
        {/* Decoration */}
        <Edge
          customStyle={{ top: '0', right: '0' }}
          src="/images/sections/search/Top_right_edge.svg"
        />
        {/* Decoration */}

        {/* Left block */}
        <Flex
          w={{ sm: '100%', lg: '60%' }}
          align="start"
          pr={{ sm: '0  ', xl: '75px', '2xl': '174px' }}
          mb={{ sm: '40px' }}
          direction="column"
          zIndex={2}
        >
          {getFormattedHeading(
            t('home', 'search', 'title'),
            3,
            true,
            { marginBottom: '49px', color: '#fff', textAlign: 'left' },
            { fontWeight: '600', borderBottom: '7px solid #F7D39B' }
          )}
          <Text
            w={{ sm: '100%', md: '444px' }}
            mb="56px"
            color="general.white"
            fontSize="1.07rem"
            lineHeight="36px"
          >
            {t('home', 'search', 'description')}
          </Text>
          <Flex w={{ sm: '100%', lg: '80%' }} mb="43px">
            <SearchController
              leftIcon={true}
              value={searchValue}
              onChange={onSearchChange}
              placeholderLabel={t('home', 'search', 'inputPlaceholder')}
              buttonLabel={t('home', 'search', 'buttonLabel')}
              hints={hints}
              onSelect={onSelect}
              onClick={onClick}
              closeHints={closeHints}
            />
          </Flex>
          <Flex pl="25px">
            <TagsController
              tagsData={tagsData}
              label={t('home', 'search', 'tag')}
              hasImage={true}
            />
          </Flex>
        </Flex>
        {/* Left block */}

        {/* Right block */}
        <Box
          display={{ sm: 'none', lg: 'block' }}
          w={{ sm: '409px', '2xl': '549px' }}
          h={{ sm: '409px', '2xl': '549px' }}
          border="2PX solid #7B72DF"
          p="25px"
          m={{ sm: '0 auto', xl: '0 auto' }}
          borderRadius="100%"
          position="relative"
        >
          <Flex w="100%" h="100%">
            <Edge
              w={{ sm: '199px', '2xl': '290px' }}
              h={{ sm: '199px', '2xl': '290px' }}
              top={{ sm: '-7px', '2xl': '-10px' }}
              right={{ sm: '-7px', '2xl': '-10px' }}
              src="/images/sections/search/Ellipse.svg"
            />
            <Image
              w={{ sm: '405px', '2xl': '490px' }}
              h={{ sm: '405px', '2xl': '490px' }}
              zIndex="2"
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              src="/images/sections/search/Search_master.png"
            />
          </Flex>
          <Button
            w="84px"
            h="84px"
            zIndex="3"
            position="absolute"
            top={{ sm: '40%', '2xl': '50%' }}
            right="-30px"
            borderRadius="100%"
            bg="general.white"
            onClick={handleRedirectToUserProfile}
          >
            <Image
              w="24px"
              h="24px"
              src="/images/sections/search/Forward_arrow.svg"
            />
          </Button>
          {!!expertData && (
            <Flex
              position="absolute"
              display={{ sm: 'none', xl: 'none', '2xl': 'block' }}
              bottom="-20%"
              left="50%"
              zIndex="4"
              align="flex-start"
            >
              <Avatar
                mr="20px"
                src={expertData?.avatarUrl}
                name={expertData?.publicName}
              />
              <Box>
                <Text fontSize="0.8rem" fontWeight="400">
                  {expertData?.publicName}
                </Text>
                <Text fontSize="0.8rem" fontWeight="600" mb="5px">
                  {expertData?.title}
                </Text>
                <Text
                  fontSize="0.8rem"
                  fontWeight="400"
                  textDecoration="underline"
                  cursor='pointer'
                  color="general.white"
                  onClick={handleRedirectToUserProfile}
                >
                  {t('home', 'search', 'viewProfile')}
                </Text>
              </Box>
            </Flex>
          )}
        </Box>
        {/* Right block */}
        <CookiesBanner
          customStyle={{
            position: 'absolute',
            bottom: '-1px',
            left: '0',
            backgroundColor: 'transparent',
            zIndex: '4'
          }}
          designStyle={{
            clipPath: 'polygon(0 0, 95% 0, 100% 100%, 0% 100%)',
            backgroundColor: '#fff'
          }}
        />
        {/* Decorations */}
        <Box
          display={{ sm: 'none', xl: 'none', '2xl': 'block' }}
          position={{
            sm: 'static',
            md: 'static',
            lg: 'static',
            xl: 'static',
            '2xl': 'absolute'
          }}
          bg="general.orange"
          bottom="0"
          right="0"
          h="513px"
          w="50%"
          style={{ clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 0% 100%)' }}
        />
        <Edge
          customStyle={{ bottom: '0', left: '0', zIndex: '1' }}
          src="/images/sections/search/Bottom_left_edge.svg"
        />
        {/* Decorations */}
      </Flex>
    </Flex>
  );
};

export default memo(UI);
