import { memo } from 'react';
import { Flex, Button, Image } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import LinkController from '../common/LinkController';
import { CategoryItem, AppState } from '../../common/interfaceTypes';

import styles from './index.module.scss';

const sidebarLinkStyle = {
  width: '100%',
  display: 'block',
  borderBottom: '1px solid #DCDCF4',
  fontSize: '18px',
  lineHeight: '54px',
  color: '#020055',
  fontWeight: '500',
  paddingLeft: '47px'
};

const UI = (props) => {
  const { allSubcategories, currentSubcategories, onButtonClick } = props;
  const isAllSubcategories =
    allSubcategories.length === currentSubcategories.length &&
    currentSubcategories.length;
  const { currentLocale } = useSelector((state: AppState) => state.app);

  const renderSubcategories = (subcategories: CategoryItem[]) => {
    return subcategories.map((subItem) => {
      const { id, name, slug } = subItem;
      return (
        <LinkController
          customStyle={sidebarLinkStyle}
          href="/[locale]/categories/[category]/"
          as={`/${currentLocale}/categories/${slug}/`}
          key={slug + id}
        >
          {name}
        </LinkController>
      );
    });
  };

  return (
    <Flex
      position="relative"
      wrap="wrap"
      bg="general.white"
      border="1px solid #DCDCF4"
      borderRadius="5px"
      w={props.width || '30%'}
      mr="30px"
      pb="50px"
    >
      {renderSubcategories(currentSubcategories)}
      <Button
        w="41px"
        h="41px"
        position="absolute"
        left="50%"
        transform="translate(-50%, 0)"
        bottom="-2%"
        bg="general.orange"
        onClick={() => onButtonClick()}
      >
        <Image
          src="/images/common/arrow_bottom.svg"
          className={isAllSubcategories ? styles.arrow_top : ''}
        />
      </Button>
    </Flex>
  );
};

export default memo(UI);
