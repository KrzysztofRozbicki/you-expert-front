import { memo } from 'react';
import { Flex, Image } from '@chakra-ui/react';

interface logoItem {
  path: string;
  alt: string;
}

const logoList: logoItem[] = [
  {
    path: '/images/sections/logos/PayPal_logo.png',
    alt: 'PayPal logo'
  },
  {
    path: '/images/sections/logos/Reddit_logo.png',
    alt: 'Reddit logo'
  },
  {
    path: '/images/sections/logos/Xerox_logo.png',
    alt: 'Xerox logo'
  },
  {
    path: '/images/sections/logos/Canon_logo.png',
    alt: 'Canon logo'
  },
  {
    path: '/images/sections/logos/IBM_logo.png',
    alt: 'IBM logo'
  },
  {
    path: '/images/sections/logos/Airbnb_logo.png',
    alt: 'Airbnb logo'
  },
  {
    path: '/images/sections/logos/Amazon_logo.png',
    alt: 'Amazon logo'
  }
];

const LogosSection = () => {
  const renderLogoList = (list: logoItem[]) => {
    return list.map((logo, logoIndex) => {
      const { path, alt } = logo;

      return <Image key={`${alt}-${logoIndex + 1}`} src={path} alt={alt} />;
    });
  };

  return (
    <Flex w="75%" m="auto" p="38px 0" justify="space-between" align="center">
      {renderLogoList(logoList)}
    </Flex>
  );
};

export default memo(LogosSection);
