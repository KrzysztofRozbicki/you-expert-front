import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Flex, Spinner, Text, Image, Heading, Box } from '@chakra-ui/react';
import Layout from '../../../../components/layout';
import Breadcrumbs from '../../../../components/common/breadcrumbs';
import useTranslation from '../../../../hooks/useTranslation';
import { useCategoriesBreadcrumbs } from '../../../../hooks/useCategoriesBreadcrumbs';
import WithLocale from '../../../../hocs/withLocale';
import {
  SubcategoryAboveImageStyled,
  SubcategoryTitleStyled,
  SubcategoryWrapperStyled
} from '../../../../components/categoryPage/style';

const Category: React.FC = () => {
  const { t } = useTranslation();
  const { categoryList } = useSelector((state: any) => state.categories);
  const [currentCategory, setCurrentCategory] = useState<any>(null);
  const breadcrumbs = useCategoriesBreadcrumbs();
  const {
    push,
    query: { locale, category }
  } = useRouter();

  useEffect(() => {
    if (!categoryList?.length) {
      return;
    }
    const selectedCategory = categoryList?.find(
      (item) => item?.slug === category
    );
    if (!selectedCategory) {
      push(`/${locale}/home`);
      return;
    }
    if (!selectedCategory?.subcategories?.length) {
      push(`/${locale}/categories/${selectedCategory?.slug}/offers`);
      return;
    }
    setCurrentCategory(selectedCategory);
  }, [categoryList, category, locale]);

  return (
    <Layout containerBackground="#fbfbfd">
      <Flex align="center" direction="column" bg="#FBFBFD">
        {!currentCategory ? (
          <Spinner />
        ) : (
          <>
            <Breadcrumbs
              renderItems={breadcrumbs}
              wrapperStyle={{ marginBottom: '34px' }}
              wrapperProps={{ mt: { sm: '15px', lg: '38px' } }}
            />
            <Flex
              w="100%"
              align="flex-end"
              marginBottom="51px"
              paddingLeft={{ sm: '0', md: 'calc(25% + 30px)' }}
            >
              <Heading
                width="fit-content"
                whiteSpace="nowrap"
                marginRight="92px"
                fontSize={{ sm: '1.6rem', xl: '1.6rem !important' }}
                fontWeight="500"
              >
                {currentCategory?.name}
              </Heading>
              <Box h="4px" bg="general.primary" m="0" flex={1} />
            </Flex>
            <Flex w="100%" flexDirection={{ sm: 'column', lg: 'row' }}>
              <Flex
                w={{ sm: '100%', lg: '25%' }}
                height="fit-content"
                background="#fff"
                borderRadius="5px"
                border="1px solid #DCDCF4"
                flexDirection="column"
                marginRight={{ sm: '0', lg: '30px' }}
                marginBottom={{ sm: '30px', lg: '0' }}
              >
                {currentCategory?.subcategories?.map((item, index) => (
                  <Flex
                    key={index}
                    p="15px 47px"
                    position="relative"
                    cursor="pointer"
                    borderBottom={
                      index + 1 === currentCategory?.subcategories?.length
                        ? 'none'
                        : '1px solid #DCDCF4'
                    }
                    onClick={() =>
                      push(
                        `/${locale}/categories/${currentCategory?.slug}/${item?.slug}/offers`
                      )
                    }
                  >
                    <Text
                      w="100%"
                      whiteSpace="nowrap"
                      overflow="hidden"
                      textOverflow="ellipsis"
                      fontSize="0.8rem"
                      fontWeight="500"
                    >
                      {item?.name}
                    </Text>
                  </Flex>
                ))}
              </Flex>
              <Flex flex={1} flexWrap="wrap">
                {currentCategory?.subcategories?.map((item, index) => (
                  <SubcategoryWrapperStyled
                    overflow="hidden"
                    key={index}
                    w={{ sm: '100%', md: 'calc(33% - 20px)' }}
                    height='388px'
                    borderRadius="5px"
                    border="1px solid #DCDCF4"
                    flexDirection="column"
                    mr={{
                      sm: '0',
                      md: (index + 1) % 3 === 0 ? '0' : '30px'
                    }}
                    mb="30px"
                    background="#fff"
                    cursor="pointer"
                    onClick={() =>
                      push(
                        `/${locale}/categories/${currentCategory?.slug}/${item?.slug}/offers`
                      )
                    }
                  >
                    <Flex flex={1} position="relative" overflow="hidden">
                      {item?.cardBackgroundUrl && (
                        <Image
                          src={item?.cardBackgroundUrl}
                          width="100%"
                          height="100%"
                          objectFit="cover"
                        />
                      )}
                      <SubcategoryAboveImageStyled
                        top="0"
                        left="0"
                        right="0"
                        bottom="0"
                        display="none"
                        overflow="hidden"
                        position="absolute"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Flex
                          w="45px"
                          h="45px"
                          borderRadius="50%"
                          background="#fff"
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
                        </Flex>
                      </SubcategoryAboveImageStyled>
                    </Flex>
                    <SubcategoryTitleStyled
                      w="100%"
                      fontSize="1rem"
                      fontWeight="500"
                      p="30px 64px"
                      borderTop="1px solid #DCDCF4"
                      whiteSpace="nowrap"
                      overflow="hidden"
                      textOverflow="ellipsis"
                    >
                      {item?.name}
                    </SubcategoryTitleStyled>
                  </SubcategoryWrapperStyled>
                ))}
              </Flex>
            </Flex>
          </>
        )}
      </Flex>
    </Layout>
  );
};

export default WithLocale(Category);
