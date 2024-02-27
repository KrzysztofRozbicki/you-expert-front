import { memo, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  List,
  ListItem,
  Image
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import LinkController from '../common/LinkController';
import useTranslation from '../../hooks/useTranslation';
import articles from './articles.json';
import styles from './footer.module.scss';
import { triggerAuthModal } from '../../redux/actions/app';

const onScrollTopClick = () => {
  window.scrollTo(0, 0);
};

interface item {
  label?: string;
  imagePath?: string;
}

interface linkItem {
  label?: string;
  path: string;
  href?: string;
  imagePath?: string;
  imageProps?: {
    [key: string]: any;
  };
  isOuterLink?: boolean;
  aLinkProps?: {
    [key: string]: any;
  };
  isNotLink?: boolean;
  onClick?: () => void;
  isKeepWithoutTranslate?: boolean;
  isWithoutLocale?: boolean;
}

interface configurationItem {
  title: string;
  links: linkItem[];
}

interface routerObject {
  [key: string]: any;
}

const bottomItems: item[] = [
  {
    label: 'rights'
  }
  // {
  //   imagePath: "/images/footer/Footer_frame.svg",
  // },
  // {
  //   label: "responsible",
  // },
];

const generalContentConfiguration: configurationItem[] = [
  {
    title: 'usefulLinks',
    links: [
      {
        label: 'termsAndConditions',
        path: '/terms-and-conditions'
      },
      {
        label: 'privacyPolicy',
        path: '/privacy-policy'
      },
      {
        label: 'listOfProhibitedGoodsAndServices',
        isWithoutLocale: true,
        path: '/listatowarowiuslugzabronionych'
      },
      {
        label: 'rulesForUsingTheCatalog',
        isWithoutLocale: true,
        path: '/zasadykatalog'
      },
      {
        label: 'priceList',
        isWithoutLocale: true,
        path: '/cennik'
      },
      {
        label: 'contacts',
        path: '/contacts'
      },
      {
        label: 'becomeAnExpert',
        path: '',
        isNotLink: true
      },
      {
        label: 'logIn',
        path: '',
        isNotLink: true
      },
      {
        label: 'signUp',
        path: '',
        isNotLink: true
      }
    ]
  },
  {
    title: 'support',
    links: [
      {
        label: 'support',
        path: '/support'
      },
      {
        label: 'trustSecurity',
        path: '/trust&security'
      },
      {
        label: 'YouExpertSale',
        path: '/YouExpert_sale'
      },
      {
        label: 'YouExpertBuying',
        path: '/YouExpert_buying'
      }
    ]
  },
  {
    title: 'socialMedia',
    links: [
      {
        path: 'https://www.facebook.com/youexpertPL/',
        imagePath: '/images/footer/Facebook.svg'
      },
      {
        path: 'https://www.instagram.com/youexpertpl/',
        imagePath: '/images/footer/Instagram.svg'
      },
      {
        path: 'https://www.youtube.com/channel/UCiHblmw-ZjpTp2Z6lpvPXyA',
        imagePath: '/images/footer/youtube.svg',
        imageProps: {
          width: '21px',
          height: '21px'
        }
      }
    ]
  }
];

const renderBottomContent = (items: item[], translate: Function) => {
  return items.map((item, itemIndex) => {
    const { label, imagePath } = item;
    const key = `${label || imagePath}-${itemIndex + 1}`;
    if (label) {
      return (
        <Text color="genetal.white" key={key} fontSize="0.6rem">
          {translate('footer', 'bottomItems', label)}
        </Text>
      );
    }
    return <img key={key} src={imagePath} alt={imagePath.split('.', 1)[0]} />;
  });
};

const renderGeneralContent = (
  constentConfiguration,
  routerData: routerObject,
  translate: Function
) => {
  const linkStyle = {
    display: 'block',
    fontSize: '0.6rem',
    color: '#fff',
    maxWidth: '200px'
  };
  const currentLocale = routerData.query.locale;
  return constentConfiguration.map((item, index) => {
    const { title, links } = item;
    const listKey = `footer-list-${index + 1}`;
    const wrapperStyle =
      title === 'socialMedia'
        ? { display: 'flex', alignItems: 'flex-end' }
        : {};
    const formattedMargrin =
      constentConfiguration.length === index + 1
        ? { lg: '4%', xl: '6%' }
        : { lg: '8%', xl: '10%' };

    return (
      <Box w="auto" key={listKey} mb="60px" mr="30px">
        <Heading
          as="h3"
          color="general.white"
          fontWeight="600"
          fontSize="1rem"
          mb="40px"
        >
          {translate('footer', 'titles', title)}
        </Heading>
        <List border="none" spacing={4} {...wrapperStyle}>
          {links.map((link: linkItem, linkIndex: number) => {
            const {
              label,
              path,
              href,
              imagePath,
              imageProps,
              isOuterLink,
              aLinkProps,
              isKeepWithoutTranslate,
              isNotLink,
              onClick,
              isWithoutLocale
            } = link;
            const key = `${path}-${linkIndex + 1}`;
            const renderLabel = isKeepWithoutTranslate
              ? label
              : translate('footer', 'links', label);
            const onClickFunc = onClick ? onClick : () => true;

            if (imagePath) {
              return (
                <Flex
                  key={`${title}-${index + 1}-${path}`}
                  d="inline-flex"
                  w="61px"
                  h="61px"
                  border="1px solid #fff"
                  borderRadius="100%"
                  align="center"
                  justify="center"
                  mr="30px"
                >
                  <a href={path} target="_blank">
                    <img src={imagePath} {...imageProps} />
                  </a>
                </Flex>
              );
            }

            if (isOuterLink) {
              return (
                <ListItem key={path + index + 2} m="0">
                  <a
                    {...{ ...aLinkProps, style: { ...linkStyle } }}
                    href={path}
                  >
                    {renderLabel}
                  </a>
                </ListItem>
              );
            }

            if (isNotLink) {
              return (
                <ListItem key={path + index + 2} m="0">
                  <Text
                    style={linkStyle}
                    cursor="pointer"
                    onClick={onClickFunc}
                    _hover={{ textDecoration: 'underline' }}
                  >
                    {renderLabel}
                  </Text>
                </ListItem>
              );
            }

            return (
              <ListItem key={path + index + 2} m="0">
                <LinkController
                  customStyle={linkStyle || {}}
                  key={key}
                  href={isWithoutLocale ? '/[slug]' : '/[locale]/[slug]'}
                  as={isWithoutLocale ? path : `/${currentLocale}${path}`}
                >
                  {renderLabel}
                </LinkController>
              </ListItem>
            );
          })}
        </List>
      </Box>
    );
  });
};

const Footer = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isAuthenticated, fullProfileData } = useSelector(
    (state: any) => state.user
  );
  const { categoryList } = useSelector((state: any) => state.categories);

  const renderConfig = useMemo(() => {
    const {
      push,
      query: { locale }
    } = router;

    const index = generalContentConfiguration.findIndex(
      (item) => item.title === 'usefulLinks'
    );

    const config = [...generalContentConfiguration];

    if (index !== -1) {
      config[index] = {
        ...generalContentConfiguration[index],
        links: generalContentConfiguration[index].links.map((item) => {
          if (item.label === 'contacts' && locale === 'pl') {
            return {
              ...item,
              path: '/kontakt'
            };
          }

          if (item.label === 'becomeAnExpert' && isAuthenticated) {
            return {
              ...item,
              onClick: () =>
                push(`/${locale}/dashboard/settings/business-information`)
            };
          }

          if (
            (item.label === 'becomeAnExpert' && !isAuthenticated) ||
            item.label === 'logIn'
          ) {
            return {
              ...item,
              onClick: () => dispatch(triggerAuthModal(true, 'login'))
            };
          }

          if (item.label === 'signUp') {
            return {
              ...item,
              onClick: () => dispatch(triggerAuthModal(true, 'signup'))
            };
          }

          return item;
        })
      };

      if (fullProfileData?.isExpert) {
        config[index].links = config[index].links.filter(
          (item) => item?.label !== 'becomeAnExpert'
        );
      }

      if (isAuthenticated) {
        config[index].links = config[index].links.filter(
          (item) => !(item?.label === 'logIn' || item?.label === 'signUp')
        );
      }
    }

    if (categoryList?.length) {
      const categories = {
        title: 'category',
        links: categoryList.map((ct) => ({
          label: ct?.name,
          href: '/[locale]/categories/[slug]',
          path: `/categories/${ct?.slug}`,
          isKeepWithoutTranslate: true
        }))
      };
      return [categories, articles, ...config];
    }

    return [articles, ...config];
  }, [categoryList, isAuthenticated, fullProfileData, router]);

  return (
    <Flex
      position="relative"
      mt="140px"
      bg="general.dark"
      w="100%"
      p={4}
      color="white"
      flexDirection="column"
      alignItems="center"
    >
      <div
        className={styles.edge}
        style={{
          position: 'absolute',
          right: '0',
          backgroundColor: '#14142A',
          clipPath: 'polygon(3% 0, 100% 0, 100% 100%, 0% 100%)'
        }}
      />
      <Button
        position="absolute"
        top="-73px"
        left="50%"
        transform="translateX(-50%)"
        borderRadius="100%"
        bg="general.primary"
        w={{ sm: '90px', md: '90px', lg: '110px', xl: '146px' }}
        h={{ sm: '90px', md: '90px', lg: '110px', xl: '146px' }}
        onClick={() => onScrollTopClick()}
        _active={{
          bg: 'general.primary'
        }}
      >
        <Image src="/images/footer/Arrow_top.svg" />
      </Button>
      <Box
        className="max-width-container max-width-container-paddings"
        m="130px auto 0"
        w="100%"
      >
        <Flex
          key={new Date().getTime()}
          mb="20px"
          flexWrap="wrap"
          justifyContent="space-between"
        >
          {renderGeneralContent(renderConfig, router, t)}
        </Flex>
        <Flex p="25px 0" align="center">
          {renderBottomContent(bottomItems, t)}
        </Flex>
      </Box>
    </Flex>
  );
};

export default memo(Footer);
