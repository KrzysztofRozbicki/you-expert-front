import { memo, useMemo } from 'react';
import { Flex, Box, Heading, Text, Button, Image } from '@chakra-ui/react';
import SearchController from '../searchSection/SearchController';
import useTranslation from '../../hooks/useTranslation';
import { getFormattedHeading } from '../../common/strings';

const UI = (props) => {
  const {
    wrapperStyle,
    onSearchChange,
    hints,
    onSelect,
    onClick,
    searchValue,
    wrapperClassName,
    closeHints,
    isMobile,
    ...wrapperProps
  } = props;

  const { t } = useTranslation();

  const separatedSentence = useMemo((): string[] => {
    return t('home', 'findExpertSection', 'title').split(' ');
  }, [t]);

  return (
    <Flex
      style={wrapperStyle}
      className="max-width-container"
      direction={{ sm: 'column', lg: 'row' }}
      borderRadius="5px"
      position="absolute"
      left="50%"
      transform="translate(-50%)"
      width="80%"
      minHeight="513px"
      backgroundColor="#EC8581"
      zIndex="10"
      bottom={{ sm: '-200px', md: '-250px' }}
      {...wrapperProps}
    >
      <Flex
        w="100%"
        h={{ sm: '183px', lg: '153px' }}
        bg="#7A72DF"
        left="0"
        bottom="0"
        position="absolute"
        zIndex={{ sm: 1, lg: 0 }}
        borderBottomLeftRadius="5px"
        borderBottomRightRadius="5px"
      />
      <Flex
        w={{ sm: '100%', lg: '50%' }}
        h={{ sm: '30%', lg: '100%' }}
        bg="#F7D39B"
        bottom={{ sm: '183px', lg: '0' }}
        right="0"
        zIndex={{ sm: 0, lg: 1 }}
        position="absolute"
        borderTopRightRadius={{ lg: '5px' }}
        borderBottomRightRadius={{ lg: '5px' }}
        clipPath={{
          sm: 'polygon(28% 35%, 100% 0, 100% 100%, 0% 100%)',
          lg: 'polygon(33% 0, 100% 0, 100% 100%, 0% 100%)'
        }}
      />
      <Flex
        w={{ sm: '100%', lg: '50%' }}
        direction="column"
        p={{
          sm: '60px 30px',
          lg: '92px 21px 44px 92px',
          xl: '92px 21px 44px 143px'
        }}
      >
        <Heading
          textAlign={{ sm: 'left', lg: 'center' }}
          as="h2"
          mb="38px"
          fontSize="2.13rem !important"
          fontWeight="400"
          lineHeight={{ sm: '48px', xl: '58px' }}
        >
          {separatedSentence.map((word, wordIndex) => {
            if (wordIndex + 1 === 3) {
              return (
                <span
                  style={{
                    fontWeight: 600,
                    borderBottom: '7px solid #F7D39B'
                  }}
                >{`${word} `}</span>
              );
            }
            return `${word} `;
          })}
        </Heading>
        <Text
          fontSize="0.8rem"
          fontWeight="400"
          mb={{ sm: '38px', lg: '160px' }}
        >
          {t('home', 'findExpertSection', 'description')}
        </Text>

        {isMobile && (
          <Flex w="100%" mb="38px" boxSizing="border-box" overflow="hidden">
            <Image
              zIndex={2}
              width="100%"
              objectFit="cover"
              src="/images/sections/findExpertSection/People.svg"
            />
          </Flex>
        )}

        <SearchController
          value={searchValue}
          placeholderLabel={t('home', 'findExpertSection', 'inputPlaceholder')}
          onChange={onSearchChange}
          onSelect={onSelect}
          hints={hints}
          onClick={onClick}
          closeHints={closeHints}
          boxProps={{ mr: { sm: '0', lg: '23.5px' } }}
          inputProps={{ pl: { sm: '20px', lg: '92px' } }}
          searchIconProps={{ right: { sm: '20px !important', lg: '42px' } }}
        />
      </Flex>

      {!isMobile && (
        <Flex
          w={{ sm: '100%', lg: '50%' }}
          p={{ sm: '0 30px 30px', lg: '70px 21px 25px 21px' }}
          boxSizing="border-box"
          overflow="hidden"
        >
          <Image
            zIndex={2}
            width="100%"
            objectFit="cover"
            src="/images/sections/findExpertSection/People.svg"
          />
        </Flex>
      )}
    </Flex>
  );
};

export default memo(UI);
