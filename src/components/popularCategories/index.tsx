import React, { useRef, memo, useCallback, useState, useEffect } from 'react';
import { Flex, Heading, Box, Image, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useTranslation from '../../hooks/useTranslation';
import categories from './categories.json';
import {
  ContentBlockStyled,
  ServiceWrapperStyled,
  IconWrapperStyled
} from './style';
import { AWS_PUBLIC_BUCKET_URL } from '../../common/constants';

const PopularCategories: React.FC = () => {
  const { t } = useTranslation();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const contentBlockRef = useRef<HTMLDivElement | null>(null);
  const [arrowState, setArrowState] = useState<{
    isShouldShowLeftArrow: boolean;
    isShouldShowRightArrow: boolean;
  }>({
    isShouldShowLeftArrow: false,
    isShouldShowRightArrow: false
  });

  const {
    push,
    query: { locale }
  } = useRouter();

  const handleScroll = useCallback(() => {
    if (wrapperRef?.current && contentBlockRef?.current) {
      const newArrowState = {
        isShouldShowLeftArrow: false,
        isShouldShowRightArrow: false
      };

      if (contentBlockRef?.current?.scrollLeft > 0) {
        newArrowState.isShouldShowLeftArrow = true;
      }

      if (
        contentBlockRef?.current?.scrollWidth >
          wrapperRef?.current?.clientWidth &&
        contentBlockRef?.current?.scrollLeft +
          contentBlockRef?.current?.offsetWidth <
          contentBlockRef?.current?.scrollWidth
      ) {
        newArrowState.isShouldShowRightArrow = true;
      }

      setArrowState(newArrowState);
    }
  }, [wrapperRef?.current, contentBlockRef?.current]);

  const handleCategoryClick = useCallback(
    (slug: string) => {
      push(`/${locale}/${slug}`);
    },
    [push, locale]
  );

  const handleClickRightArrow = useCallback(() => {
    if (contentBlockRef?.current) {
      contentBlockRef.current.scrollLeft =
        contentBlockRef?.current?.scrollLeft +
        contentBlockRef?.current?.clientWidth;
    }
  }, [contentBlockRef?.current]);

  const handleClickLeftArrow = useCallback(() => {
    if (contentBlockRef?.current) {
      contentBlockRef.current.scrollLeft =
        contentBlockRef?.current?.scrollLeft -
        contentBlockRef?.current?.clientWidth;
    }
  }, [contentBlockRef?.current]);

  useEffect(() => {
    if (contentBlockRef?.current) {
      handleScroll();
      contentBlockRef?.current?.addEventListener('scroll', handleScroll);
    }
    return () => {
      contentBlockRef?.current?.removeEventListener('scroll', handleScroll);
    };
  }, [contentBlockRef?.current, wrapperRef?.current]);

  return (
    <Flex
      position="relative"
      direction="column"
      pt={{ sm: '65px', xl: '82px' }}
      pb={{ sm: '65px', xl: '82px' }}
      className="max-width-container max-width-container-paddings"
    >
      <Flex w="100%" align="flex-end" position="relative">
        <Heading
          w={{ sm: '30%', md: 'fit-content' }}
          mr="20px"
          fontSize={{ sm: '0.8rem', xl: '1.6rem !important' }}
          fontWeight="500"
        >
          {t('home', 'popularCategories', 'title')}
        </Heading>
        <Box flex={1} h="4px" bg="general.primary" />
        <Flex
          ml="20px"
          alignItems="flex-end"
          position={{ sm: 'absolute', lg: 'static' }}
          top="-15px"
          right="0"
        >
          <Image
            w={{ sm: '28px', lg: '40px' }}
            h={{ sm: '28px', lg: '40px' }}
            mr="10px"
            src="/images/sections/popularCategories/Prev_button.svg"
            onClick={handleClickLeftArrow}
          />
          <Image
            w={{ sm: '28px', lg: '40px' }}
            h={{ sm: '28px', lg: '40px' }}
            src="/images/sections/popularCategories/Next_button.svg"
            onClick={handleClickRightArrow}
          />
        </Flex>
      </Flex>
      <Flex w="100%" position="relative" ref={wrapperRef}>
        <ContentBlockStyled
          w="100%"
          overflowX="auto"
          className="hide-scrollbar"
          mt="42px"
          ref={contentBlockRef}
        >
          {arrowState.isShouldShowLeftArrow && (
            <Flex
              w={{ sm: '60px', lg: '90px' }}
              position="absolute"
              left="-20px"
              top="0"
              bottom="0"
              alignItems="center"
              background="linear-gradient(-270deg, #FFF 43.16%, hsla(0,0%,100%,0))"
              zIndex={2}
              cursor="pointer"
            />
          )}
          {arrowState.isShouldShowRightArrow && (
            <Flex
              w={{ sm: '60px', lg: '90px' }}
              position="absolute"
              right="-20px"
              top="0"
              bottom="0"
              alignItems="center"
              justifyContent="flex-end"
              background="linear-gradient(270deg, #FFF 43.16%, hsla(0,0%,100%,0))"
              zIndex={2}
              cursor="pointer"
            />
          )}
          {categories.map((item, index) => (
            <Flex
              key={index}
              width={{ sm: '210px', lg: '318.4px' }}
              minWidth={{ sm: '210px', lg: '318.4px' }}
              h={{ sm: '134px', lg: '203.2px' }}
              borderRadius="10px"
              overflow="hidden"
              cursor="pointer"
              marginRight="20px"
              position="relative"
              onClick={() => handleCategoryClick(item?.url)}
            >
              <ServiceWrapperStyled
                w="100%"
                height="100%"
                p="30px"
                overflow="hidden"
                alignItems="center"
                justifyContent="center"
                zIndex={1}
                position="relative"
              >
                <Text
                  fontSize="0.9rem"
                  color="#fff"
                  overflow="hidden"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                >
                  {item?.label}
                </Text>
                <IconWrapperStyled
                  position="absolute"
                  top="calc(50% + 25px)"
                  left="50%"
                  transform="translate(-50%)"
                  w="28px"
                  height="28px"
                  background="#fff"
                  borderRadius="50%"
                  alignItems="center"
                  justifyContent="center"
                >
                  <svg
                    width="8"
                    height="12"
                    viewBox="0 0 8 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 1.33325L6.64212 5.97537L2 10.6175"
                      stroke="#EC8581"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </IconWrapperStyled>
              </ServiceWrapperStyled>
              <Flex position="absolute" top="0" left="0" right="0" bottom="0">
                {item?.imagePath && (
                  <Image
                    src={`${AWS_PUBLIC_BUCKET_URL}${item?.imagePath}`}
                    w="100%"
                    height="100%"
                    objectFit="cover"
                  />
                )}
              </Flex>
            </Flex>
          ))}
        </ContentBlockStyled>
      </Flex>
    </Flex>
  );
};

export default memo(PopularCategories);
