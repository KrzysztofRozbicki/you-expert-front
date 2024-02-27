import { useState, useEffect, memo } from 'react';
import { Box, Flex, Text, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useTranslation from '../../hooks/useTranslation';

const CookiesBanner = (props) => {
  const { t } = useTranslation();
  const {
    query: { locale }
  } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { customStyle, designStyle, label } = props;

  useEffect(() => {
    const cookiesValue = localStorage.getItem('cookies');
    if (cookiesValue !== '1') {
      setIsOpen(true);
    }
  }, []);

  const onClick = () => {
    localStorage.setItem('cookies', '1');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <Box style={customStyle} w={{ sm: '90%', lg: '40%' }}>
      <Box position="relative">
        <Box
          style={designStyle}
          padding={{ sm: '40px 80px', lg: '40px 209px 40px 150px' }}
        >
          <Flex position="relative" justify="center">
            <Text fontSize="0.6rem" color="general.link" fontWeight="400">
              {t('home', 'cookies', 'IAcceptCookiesAndThe')}{' '}
              <a
                style={{ fontSize: 'inherit' }}
                href={`/${locale}/terms-and-conditions`}
                target="_blank"
              >
                {t('home', 'cookies', 'regulations')}
              </a>{' '}
              {t('home', 'cookies', 'ofTheTYouExpertPlatform')}
            </Text>
          </Flex>
        </Box>
        <Button
          padding="0 !important"
          position="absolute"
          w="53px"
          h="53px"
          color="#fff"
          fontSize="0.6rem"
          fontWeight="600"
          borderRadius="100%"
          bg="general.primary"
          top="50%"
          right="-12px"
          zIndex="5"
          transform="translateY(-50%)"
          onClick={() => onClick()}
        >
          Ok
        </Button>
      </Box>
    </Box>
  );
};

export default memo(CookiesBanner);
