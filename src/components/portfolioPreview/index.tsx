import { Flex, Image } from '@chakra-ui/react';
import { ButtonController } from '../common/ButtonController';
import useTranslation from '../../hooks/useTranslation';

interface PortfolioItem {
  imageUrl: string;
}

const protfolioItems: PortfolioItem[] = [
  {
    imageUrl: '/images/sections/categoriesPreviewSlider/slideImage.svg'
  },
  {
    imageUrl: '/images/sections/categoriesPreviewSlider/slideImage.svg'
  },
  {
    imageUrl: '/images/sections/categoriesPreviewSlider/slideImage.svg'
  }
];

const PortfolioPreview = ({ itemWidth }) => {
  const { t } = useTranslation();

  const onPreviewClick = () => {
    return null;
  };

  const renderItems = (items: PortfolioItem[]) => {
    return items.map((item, index) => {
      const { imageUrl } = item;

      return <Image w={itemWidth || '30%'} src={imageUrl} />;
    });
  };

  return (
    <Flex direction="column">
      <Flex justify="space-between">{renderItems(protfolioItems)}</Flex>
      <ButtonController
        onClick={onPreviewClick}
        customM={{
          md: '30px auto 0 0',
          lg: '35px auto 0 0',
          xl: '45px auto 0 0'
        }}
        variant="darkPurpul"
      >
        {t('profile', 'buttons', 'viewPortfolio')}
      </ButtonController>
    </Flex>
  );
};

export default PortfolioPreview;
