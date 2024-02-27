import { memo } from 'react';
import { Flex, Heading, Box, Text, Image } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import useTranslation from '../../hooks/useTranslation';
import { CategoryItem } from '../../common/interfaceTypes';
import LinkController from '../common/LinkController';
import { AppState } from '../../common/interfaceTypes';

import styles from './ServiceCategories.module.scss';

const borderStyle = {
  border: '1px solid #DCDCF4',
  borderRadius: '5px'
};

const UI = (props) => {
  const { t } = useTranslation();
  const { categoryList } = props;
  const { currentLocale } = useSelector((state: AppState) => state.app);

  const renderCatrgoriesList = (items: CategoryItem[]) => {
    return items.map((item) => {
      const { id, name, slug } = item;
      return (
        <Flex
          className={styles.category_wrapper}
          w="30%"
          margin="0 0 33px"
          key={`${slug}-${id}`}
        >
          <LinkController
            customStyle={{ width: '100%' }}
            href="/[locale]/categories/category/"
            as={`/${currentLocale}/categories/${slug}`}
          >
            <Box className={styles.gradient_item}>
              <Image
                src="/images/sections/serviceCategories/Item_image.png"
                style={borderStyle}
              />
            </Box>
            <Image
              className={styles.additional_image}
              src="/images/sections/popularCategories/Catrgori_icon.svg"
            />
            <Box
              className={styles.text_wrapper}
              w="100%"
              p="22px 40px 20px 63px"
              style={borderStyle}
            >
              <Text fontSize="24px" lineHeight="72px">
                {name}
              </Text>
            </Box>
          </LinkController>
        </Flex>
      );
    });
  };

  return (
    <Flex direction="column" w={props.width || '90%'} m="0 auto">
      <Flex pr="2%" align="flex-end" justify="space-between" mb="121px">
        <Heading
          as="h3"
          fontWeight="500"
          fontSize={{ xl: '34px', '2xl': '36px' }}
          mr={{ xl: '50px', '2xl': '76px' }}
        >
          {t('categories', 'serviceCategories', 'title')}
        </Heading>
        <Box bg="general.primary" h="4px" w="65%" />
      </Flex>
      <Flex wrap="wrap" justify="space-between">
        {renderCatrgoriesList(categoryList)}
      </Flex>
    </Flex>
  );
};

export default memo(UI);
