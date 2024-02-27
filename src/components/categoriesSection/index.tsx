import { memo } from 'react';
import { Flex, Box, Text, Image, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { getAltFromImage, getFormattedHeading } from '../../common/strings';
import useTranslation from '../../hooks/useTranslation';
import LinkController from '../common/LinkController';
import { AppState } from '../../common/interfaceTypes';
interface categoryItem {
  title: string;
  imageSrc: string;
  progress: number;
  slug: string;
}

const categoriesItems: categoryItem[] = [
  {
    title: 'Projektowanie graficzne',
    imageSrc: '/images/sections/categoriesSection/1.svg',
    progress: 20,
    slug: 'graphic-design'
  },
  {
    title: 'Programowanie',
    imageSrc: '/images/sections/categoriesSection/2.svg',
    progress: 80,
    slug: 'programming'
  },
  {
    title: 'Tłumaczenia i treści',
    imageSrc: '/images/sections/categoriesSection/3.svg',
    progress: 20,
    slug: 'translations-and-content'
  },
  {
    title: 'Kompozycja muzyczna',
    imageSrc: '/images/sections/categoriesSection/4.png',
    progress: 20,
    slug: 'musical-composition'
  },
  {
    title: 'Digital marketing',
    imageSrc: '/images/sections/categoriesSection/5.svg',
    progress: 20,
    slug: 'digital-marketing'
  },
  {
    title: 'Strategia biznesowa',
    imageSrc: '/images/sections/categoriesSection/6.svg',
    progress: 20,
    slug: 'business-strategy'
  }
];

const CategoriesSection = (props) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { currentLocale } = useSelector((state: AppState) => state.app);

  const renderCategoriesView = (items: categoryItem[]) => {
    return items.map((item, itemIndex) => {
      const { title, imageSrc, progress, slug } = item;
      const alt = getAltFromImage(imageSrc);

      return (
        <Box
          w={{ sm: '44%', lg: '27%' }}
          minHeight="180px"
          mb="123px"
          key={`category-item-${itemIndex + 3}`}
        >
          <LinkController
            href="/[locale]/categories/[category]/"
            as={`/${currentLocale}/categories/${slug}/`}
          >
            <Image
              w="auto"
              h="100px"
              m="0 auto 43px"
              src={imageSrc}
              alt={alt}
            />
            <Box w="100%" h="2px" mb="34px" bg="rgba(255, 255, 255, 0.2)">
              <Box w={`${progress}%`} h="2px" bg="#EC8581" />
            </Box>
            <Text fontSize="0.8rem" fontWeight="400" color="general.white">
              {title}
            </Text>
          </LinkController>
        </Box>
      );
    });
  };

  const onButtonClick = () => {
    router.push('/[locale]/categories', `/${currentLocale}/categories`);
  };

  return (
    <Flex w="100%" pt="144px" bg="general.dark" justifyContent="center">
      <Flex
        direction="column"
        className="max-width-container max-width-container-paddings"
      >
        <Flex m="0 0 160px 0" w="100%" direction="column" align="center">
          {getFormattedHeading(
            t('home', 'categoriesSection', 'title'),
            9,
            false,
            {
              margin: '0 auto',
              maxWidth: '650px',
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

        <Flex justify="space-between" align="flex-start" wrap="wrap">
          {renderCategoriesView(categoriesItems)}
        </Flex>
        <Button
          w="300px"
          m="0 auto 50px"
          h="72px"
          bg="general.sand"
          borderRadius="48px"
          fontSize="0.75rem"
          color="general.dark"
          onClick={() => onButtonClick()}
        >
          {t('home', 'categoriesSection', 'button')}
        </Button>
      </Flex>
    </Flex>
  );
};

export default CategoriesSection;
