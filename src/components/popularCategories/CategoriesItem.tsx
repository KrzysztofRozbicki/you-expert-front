import { memo } from 'react';
import { Flex, Image, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import LinkController from '../common/LinkController';
import { AppState } from '../../common/interfaceTypes';

import styles from './CategoriesItem.module.scss';

const CategoriesItem = (props) => {
  const { label, imagePath, imageAlt, width, slug } = props;
  const { currentLocale } = useSelector((state: AppState) => state.app);

  return (
    <Flex
      className={styles.wrapper}
      _hover={{ cursor: 'pointer', position: 'relative' }}
      // minWidth={width}
      margin="0 auto"
      position="relative"
      minWidth='318.4px'
      minHeight='203.2px'
    >
      <LinkController
        href="/[locale]/categories/[category]"
        as={`/${currentLocale}/categories/${slug}`}
      >
        <Image src={imagePath} alt={imageAlt} />
        <Text
          w="100%"
          textAlign="center"
          fontSize="1.33rem"
          color="#fff"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        >
          {label}
        </Text>
        <Image
          className={styles.additional_image}
          src="/images/sections/popularCategories/Catrgori_icon.svg"
          alt={imageAlt}
        />
      </LinkController>
    </Flex>
  );
};

export default memo(CategoriesItem);
