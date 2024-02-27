import { memo, useCallback, useEffect, useMemo } from 'react';
import { Box, Flex, Image, Text, Avatar } from '@chakra-ui/react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Hamburger from './hamburger';
import NavBar from './navBar';
import SearchController from '../common/SearchController';
import LinkController from '../common/LinkController';
// import LocaleSwitcher from '../common/LocaleSwitcher';
import { searchCategories } from '../../api/offers';
import useTranslation from '../../hooks/useTranslation';
import {
  DataObject,
  AppState,
  UserState,
  CategoriesState,
  CategoryItem
} from '../../common/interfaceTypes';
import { renderHintList } from '../searchSection/common';
import SelectController from '../common/SelectController';
import { ModalController } from '../common/modal';
import { Authentication } from '../authentication';
import { CreateAccount } from '../createAccount';
import ResetPassword from '../resetPassword';
import { ForgotPassword } from '../forgotPassword';
import { ButtonController } from '../common/ButtonController';
import { isHasCharacters } from '../../utils/index';
import { logoutAction } from '../../redux/actions/user';
import { triggerAuthModal } from '../../redux/actions/app';
import { HEADER_COLUMN_LIMIT } from './constants';
import Links from './links';
import Logo from './Logo';
import {
  StyledLinkWrapper,
  StyledHamburgerWrapper,
  StyledAdaptiveFlex
} from './style';

export interface linkItem {
  label: string;
  path: string;
  type?: string;
  imagePath?: string;
  withDashboard?: boolean;
  markProps?: { [key: string]: any };
}

interface formItem {
  type: string;
  name: string;
  placeholder?: string;
}

const hintsStyle = {
  width: '100%',
  top: '45%'
};

const getGeneralLinks = (
  isExpert: boolean,
  isAuth: boolean,
  isNeedToRedirectToOrders?: boolean
): linkItem[] => {
  const links: any = [
    {
      label: 'dashboard',
      path: '/dashboard',
      type: 'link',
      markProps: {
        field: 'unreadNotificationCount'
      }
    },
    {
      label: 'becomeAnExpert',
      path: '/dashboard/settings/business-information',
      type: isAuth ? 'link' : '',
      withDashboard: true
    },
    {
      label: 'inbox',
      path: '/dashboard/inbox',
      type: 'link',
      withDashboard: true,
      markProps: {
        field: 'unreadDialogMessages'
      }
    },
    {
      label: 'orders',
      path:
        isExpert && !isNeedToRedirectToOrders
          ? '/dashboard/assignments'
          : '/dashboard/orders',
      type: 'link',
      withDashboard: true,
      markProps: {
        field: 'unreadOrderMessages'
      }
    }
  ];

  if (isExpert) {
    links.splice(1, 1, {
      label: 'createOffer',
      path: '/create-offer',
      type: 'link'
    });
  }

  if (!isAuth) {
    return links.filter(
      (link) =>
        link.label !== 'dashboard' &&
        link.label !== 'inbox' &&
        link.label !== 'orders'
    );
  }

  return links;
};

const authorizationLinks: linkItem[] = [
  {
    label: 'login',
    path: '/login',
    imagePath: '/images/header/Profile.svg',
    type: 'button'
  },
  {
    label: 'signUp',
    path: '/sign_up',
    imagePath: '/images/header/Like.svg',
    type: 'button'
  }
];

const inputConfiguration: formItem[] = [
  {
    type: 'search',
    name: 'searchNavigationInput'
  }
];
interface routerObject {
  [key: string]: any;
}

const renderLinksList = (
  linksList: linkItem[],
  routerData: routerObject,
  translate: Function,
  linkStyle?: DataObject,
  sublinksData?: CategoryItem[],
  onCategorySelect?: Function,
  authAction?: Function,
  onBecomeExpertClick?: Function
) => {
  const currentLocale = routerData.query.locale;

  const onClick = (label: string) => {
    if (label === 'becomeAnExpert' && onBecomeExpertClick) {
      onBecomeExpertClick();
    }
  };

  return linksList.map((link, linkIndex) => {
    const { label, path, imagePath, type, withDashboard } = link;
    const key = `${path}-${linkIndex + 1}`;

    if (type === 'select') {
      const formattedOptions = sublinksData.map((item) => {
        return { ...item, value: item.id, label: item.name };
      });
      return (
        <Flex w={{ xl: '150px' }}>
          <SelectController
            // value={{ label, value: label }}
            onChange={onCategorySelect}
            options={formattedOptions}
            placeholder={label}
            asLink={true}
          />
        </Flex>
      );
    }

    if (type === 'button') {
      return (
        <ButtonController
          cp={{ lg: '5px 20px !important' }}
          key={`link-button-${linkIndex + 1}`}
          customStyle={{ minHeight: '30px', fontSize: '0.8rem' }}
          onClick={() => authAction(label)}
        >
          {imagePath.includes('Profile.svg') && (
            <svg
              style={{ marginRight: '17px' }}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5253 14.3487C14.1995 13.6937 12.1695 12.9167 10 12.9167C7.83052 12.9167 5.80049 13.6937 4.47467 14.3487C3.45001 14.8548 2.83962 15.8876 2.70497 17.0225L2.5 18.7501H17.5L17.295 17.0225C17.1604 15.8876 16.55 14.8548 15.5253 14.3487Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 9.16675C12.0711 9.16675 13.75 7.48782 13.75 5.41675C13.75 3.34568 12.0711 1.66675 10 1.66675C7.92893 1.66675 6.25 3.34568 6.25 5.41675C6.25 7.48782 7.92893 9.16675 10 9.16675Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          {imagePath.includes('Like.svg') && (
            <svg
              style={{ marginRight: '17px' }}
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 12.7084C1 11.0516 2.36468 9.70841 4.02154 9.70841V9.70841C4.82379 9.70841 5.5579 9.22903 5.8717 8.4907L8.42832 2.4751C8.60442 2.06076 9.01105 1.79175 9.46126 1.79175V1.79175C10.8045 1.79175 11.847 2.96359 11.6907 4.29772L11.4384 6.4505C11.334 7.34201 12.0306 8.12508 12.9282 8.12508H15.2311C17.2243 8.12508 18.6633 10.0328 18.1157 11.9492L16.6633 17.0326C16.2954 18.3205 15.1182 19.2084 13.7788 19.2084H4C2.34315 19.2084 1 17.8653 1 16.2084V12.7084Z"
                stroke="#FCFCFC"
                strokeWidth="2"
              />
              <path
                d="M4.95825 8.91675V19.2084"
                stroke="#FCFCFC"
                strokeWidth="2"
              />
            </svg>
          )}
          {translate('header', 'links', label)}
        </ButtonController>
      );
    }

    if (type === 'link') {
      return (
        <LinkController
          key={key}
          customStyle={linkStyle || {}}
          keyValue={key}
          href={
            !withDashboard ? `/[locale]${path}` : `/[locale]/dashboard${path}`
          }
          as={
            !withDashboard
              ? `/${currentLocale}${path}/`
              : `/${currentLocale}/dashboard${path}/`
          }
        >
          {imagePath && (
            <Image
              style={{ marginRight: '17px' }}
              src={imagePath}
              alt={imagePath.split('.', 1)[0]}
            />
          )}
          {translate('header', 'links', label)}
        </LinkController>
      );
    }

    return (
      <Text
        style={linkStyle || {}}
        cursor="pointer"
        fontSize="18px"
        _hover={{ textDecoration: 'underline' }}
        onClick={() => onClick(label)}
      >
        {imagePath && (
          <Image
            style={{ marginRight: '17px' }}
            src={imagePath}
            alt={imagePath.split('.', 1)[0]}
          />
        )}
        {translate('header', 'links', label)}
      </Text>
    );
  });
};

const renderProfileData = (profileData, logoutCallback, userRedirect) => {
  if (profileData) {
    const { email, avatarUrl, id, firstName } = profileData;

    return (
      <>
        <Flex
          cursor="pointer"
          onClick={() => userRedirect(id)}
          direction="column"
          align="center"
        >
          <Avatar src={avatarUrl} name={firstName || email} />
          {(firstName || email) && (
            <Text color="general.white">{firstName || email}</Text>
          )}
        </Flex>
        <Flex ml="30px" cursor="pointer" onClick={logoutCallback}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width="40px"
            height="80px"
            x="0"
            y="0"
            viewBox="0 0 511.989 511.989"
            style={{ fill: '#fff' }}
          >
            <path d="M110.933,221.782c-4.71,0-8.533,3.823-8.533,8.533v51.2c0,4.71,3.823,8.533,8.533,8.533s8.533-3.823,8.533-8.533v-51.2     C119.467,225.605,115.644,221.782,110.933,221.782z" />
            <path d="M111.855,2.304L31.172,34.586C8.448,43,0,54.418,0,76.715v358.477c0,22.298,8.448,33.715,30.959,42.061l81.058,32.427     c4.011,1.519,8.038,2.287,11.981,2.287c17.152,0,29.602-14.336,29.602-34.091V34.049C153.6,9.78,134.246-6.126,111.855,2.304z      M136.533,477.876c0,10.18-5.035,17.024-12.535,17.024c-1.869,0-3.883-0.401-5.803-1.118L37.103,461.33     c-16.102-5.965-20.036-11.102-20.036-26.138V76.715c0-15.036,3.934-20.164,20.241-26.206l80.725-32.29     c2.082-0.785,4.087-1.186,5.956-1.186c7.501,0,12.544,6.835,12.544,17.016V477.876z" />
            <path d="M178.133,51.115h120.533c14.114,0,25.6,11.486,25.6,25.6v128c0,4.71,3.814,8.533,8.533,8.533     c4.719,0,8.533-3.823,8.533-8.533v-128c0-23.526-19.14-42.667-42.667-42.667H178.133c-4.71,0-8.533,3.823-8.533,8.533     S173.423,51.115,178.133,51.115z" />
            <path d="M332.8,298.582c-4.719,0-8.533,3.823-8.533,8.533v128c0,14.114-11.486,25.6-25.6,25.6H179.2     c-4.71,0-8.533,3.823-8.533,8.533s3.823,8.533,8.533,8.533h119.467c23.526,0,42.667-19.14,42.667-42.667v-128     C341.333,302.405,337.519,298.582,332.8,298.582z" />
            <path d="M511.343,252.655c-0.435-1.05-1.058-1.988-1.852-2.782l-85.325-85.333c-3.337-3.336-8.73-3.336-12.066,0     c-3.337,3.337-3.337,8.73,0,12.066l70.767,70.775H196.267c-4.71,0-8.533,3.823-8.533,8.533c0,4.71,3.823,8.533,8.533,8.533     h286.601L412.1,335.215c-3.337,3.337-3.337,8.73,0,12.066c1.664,1.664,3.849,2.5,6.033,2.5c2.185,0,4.369-0.836,6.033-2.5     l85.325-85.325c0.794-0.794,1.417-1.732,1.852-2.782C512.205,257.093,512.205,254.738,511.343,252.655z" />
          </svg>
        </Flex>
      </>
    );
  }
  return <Text>Here will be profile data!</Text>;
};

const linksStyle = {
  display: 'flex',
  alignItems: 'center',
  margin: '0 27.5px',
  color: '#fff'
};

const Header = (props) => {
  const { authState } = props;
  const outModalIsOpen =
    typeof window !== 'undefined' ? localStorage.getItem('authModal') : null;
  const router = useRouter();

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    currentLocale,
    authModal,
    authRenderer,
    unreadDialogMessages,
    unreadOrderMessages,
    newOrderCount,
    unreadNotificationCount,
    unreadAssignmentsMessagesCount
  } = useSelector((state: any) => state.app);
  const { isAuthenticated, profileData, fullProfileData } = useSelector(
    (state: UserState) => state.user
  );
  const { categoryList } = useSelector(
    (state: CategoriesState) => state.categories
  );

  const [triggeredButton, setTriggeredButton] = useState(
    authRenderer || authState || ''
  );
  const [searchValue, setValue] = useState('');
  const [hints, setHints] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState('');
  const [timeout, setTimeoutVal] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(!!authState || false);
  const [isValidSearchValue, setIsValid] = useState(true);
  const [isOpenNavBar, setIsOpenNavBar] = useState<boolean>(false);

  useEffect(() => {
    if (authRenderer) {
      setTriggeredButton(authRenderer);
    }
  }, [authRenderer]);

  useEffect(() => {
    if (authModal) {
      setIsOpen(authModal);
    }
  }, [authModal]);

  useEffect(() => {
    if (outModalIsOpen && !isAuthenticated) {
      setTriggeredButton('login');
      setIsOpen(true);
      setTimeout(() => localStorage.removeItem('authModal'), 1000);
    }
  }, [outModalIsOpen]);

  const getSearchOffers = async (data: string) => {
    try {
      const response = await searchCategories(data);
      const hasCharacters = isHasCharacters(data);
      if (!response.data.count && hasCharacters) {
        setIsValid(false);
      }
      if (response && response.data.count) {
        setHints(response.data.results.slice(0, 6));
      } else {
        setHints([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getHints = async (value: string) => {
    getSearchOffers(value);
  };

  const onSearchChange = (
    event: React.FormEvent<HTMLInputElement> | string,
    isFocus?: boolean
  ) => {
    const newValue =
      typeof event === 'string' ? event : event.currentTarget.value;

    const hasCharacters = isHasCharacters(newValue);

    if (!hasCharacters) {
      setIsValid(true);
    }

    if (timeout) clearTimeout(timeout);

    setValue(newValue);
    if (!isFocus) {
      setSelectedOffer('');
    }

    if (newValue) {
      let delay: ReturnType<typeof setTimeout>;
      delay = setTimeout(() => {
        getHints(newValue);
      }, 1000);

      setTimeoutVal(delay);
    } else {
      setHints([]);
    }
  };

  const onProfileClick = (id: number | string) => {
    if (fullProfileData?.isExpert) {
      router.push(
        '/[locale]/profile/[uuid]/',
        `/${router.query.locale}/profile/${id}/`
      );
      return;
    }

    router.push(
      `/${router?.query?.locale}/dashboard/settings/business-information`
    );
  };

  const onSelect = (value, url) => {
    if (url && url.includes('/')) {
      const [slug1, slug2, slug3] = url.split('/');
      if (slug1 && slug2 && slug3) {
        router.push(
          '/[locale]/categories/[category]/[subcategory]/services/[service]/offers/',
          `/${currentLocale}/categories/${slug1}/${slug2}/services/${slug3}/offers/`
        );
      } else if (slug1 && slug2) {
        router.push(
          '/[locale]/categories/[category]/services/[service]/offers/',
          `/${currentLocale}/categories/${slug1}/services/${slug2}/offers/`
        );
      }

      setValue('');
      setHints([]);
    }
  };

  const onSearchClick = () => {
    if (searchValue) {
      router.push({
        pathname: `/${currentLocale}/search`,
        query: { name: searchValue }
      });
    }
  };

  const onCategorySelect = (categoryData: CategoryItem) => {
    router.push(
      '/[locale]/categories/[category]/',
      `/${currentLocale}/categories/${categoryData.slug}/`
    );
  };

  const renderFormContent = (
    formConfiguration: formItem[],
    translate: Function
  ) => {
    return formConfiguration.map((formItem, formIndex) => {
      const { type, name, placeholder } = formItem;
      const key = `${name}-${formIndex + 1}`;

      if (type === 'search') {
        return (
          <StyledAdaptiveFlex
            position="relative"
            minW="230px"
            flex={1}
            minScreenWidth={HEADER_COLUMN_LIMIT}
            styleBefore="margin: 0 0 20px 0; max-width: 100%;"
            styleAfter="margin: 0 30px; max-width: 330px;"
          >
            <SearchController
              onChange={onSearchChange}
              hints={hints}
              value={searchValue}
              selectedOffer={selectedOffer}
              onSelect={onSelect}
              onSearch={onSearchClick}
              closeHintsList={() => setHints([])}
              key={key}
              placeholder={placeholder}
              name={name}
              placeholderLabel={translate('header', 'search', 'label')}
              isValid={isValidSearchValue}
            />
            {renderHintList(hints, onSelect, hintsStyle)}
          </StyledAdaptiveFlex>
        );
      }
      return <Input />;
    });
  };

  const toggleModal = (isOpen: boolean) => {
    if (isOpen) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
      dispatch(triggerAuthModal(false, ''));
    }
  };

  const onAuthClick = (name: string) => {
    setTriggeredButton(name);
    setIsOpen(true);
  };

  const renderModalContent = () => {
    if (triggeredButton === 'login') {
      return (
        <Authentication
          setTriggeredButton={setTriggeredButton}
          setModal={toggleModal}
        />
      );
    }

    if (triggeredButton === 'forgotPassword') {
      return (
        <ForgotPassword
          setTriggeredButton={setTriggeredButton}
          setModal={toggleModal}
          triggeredButton={triggeredButton}
        />
      );
    }

    if (triggeredButton === 'resetPassword') {
      return <ResetPassword setTriggeredButton={setTriggeredButton} />;
    }

    return (
      <CreateAccount
        setTriggeredButton={setTriggeredButton}
        setModal={toggleModal}
      />
    );
  };

  const handleLogoutClick = useCallback((): void => {
    dispatch(logoutAction());
    router.push('/[locale]/home/', `/${router.query.locale}/home/`);
  }, [dispatch]);

  const handleBecomeAnExpertClick = useCallback(() => {
    if (!isAuthenticated) {
      dispatch(triggerAuthModal(true, 'login'));
    }
  }, [isAuthenticated, dispatch]);

  const unreadNotifications = useMemo((): number => {
    return (
      unreadDialogMessages +
      unreadOrderMessages +
      newOrderCount +
      unreadNotificationCount +
      unreadAssignmentsMessagesCount
    );
  }, [
    unreadDialogMessages,
    unreadOrderMessages,
    newOrderCount,
    unreadNotificationCount,
    unreadAssignmentsMessagesCount
  ]);

  return (
    <>
      <NavBar
        isOpen={isOpenNavBar}
        handleClose={() => setIsOpenNavBar(false)}
        links={getGeneralLinks(
          profileData?.is_expert,
          isAuthenticated,
          !!unreadOrderMessages
        )}
        isAuth={isAuthenticated}
        authLinks={authorizationLinks}
        authAction={onAuthClick}
        profileData={fullProfileData}
        logoutCallback={handleLogoutClick}
        sublinksData={categoryList}
        onCategorySelect={onCategorySelect}
        onBecomeExpertClick={handleBecomeAnExpertClick}
      />
      <Flex
        w="100%"
        justifyContent="center"
        position="relative"
        boxShadow="0px 1px 10px rgba(20, 20, 42, 0.05)"
        zIndex={888}
        fontSize="0.8rem"
      >
        <Flex
          position="absolute"
          top="0"
          bottom="0"
          left="0"
          w="50%"
          bg="general.white"
        />
        <StyledAdaptiveFlex
          position="absolute"
          top="0"
          bottom="0"
          left="50%"
          w="50%"
          bg="general.primary"
          minScreenWidth={HEADER_COLUMN_LIMIT}
          styleBefore="background: #fff;"
          styleAfter="background: #7A72DF;"
        />
        <Flex
          minHeight="95px"
          align="center"
          className="max-width-container max-width-container-paddings"
          zIndex={1}
        >
          <StyledAdaptiveFlex
            bg="general.white"
            h="100%"
            flex={1}
            minScreenWidth={HEADER_COLUMN_LIMIT}
            styleBefore="flex-direction: column;"
            styleAfter="flex-direction: row; align-items: center;"
          >
            <Flex m={{ sm: '20px 0', md: '0' }} justifyContent="space-between">
              <LinkController
                href="/[locale]/home"
                as={`/${currentLocale}/home`}
              >
                <Logo />
              </LinkController>
              <StyledAdaptiveFlex
                w={!!unreadNotifications ? '90px' : '60px'}
                minScreenWidth={HEADER_COLUMN_LIMIT}
                styleBefore="display: flex; align-items: center;"
                styleAfter="display: none;"
              >
                {!!unreadNotifications && (
                  <Flex
                    color="#fff"
                    mr="10px"
                    width="19px"
                    height="19px"
                    background="#EC8581"
                    alignItems="center"
                    fontSize="0.6rem"
                    borderRadius="12px"
                    justifyContent="center"
                    fontWeight="600"
                    lineHeight="22px"
                    letterSpacing="0.25px"
                  >
                    {unreadNotifications}
                  </Flex>
                )}
                <Hamburger
                  onClick={() => setIsOpenNavBar(true)}
                  wrapperProps={{
                    w: !!unreadNotifications ? 'fit-content' : '100%'
                  }}
                />
              </StyledAdaptiveFlex>
            </Flex>

            {renderFormContent(inputConfiguration, t)}

            <StyledLinkWrapper>
              <Links
                linksList={getGeneralLinks(
                  profileData?.is_expert,
                  isAuthenticated,
                  !!unreadOrderMessages
                )}
                routerData={router}
                translate={t}
                linkStyle={{
                  display: 'flex',
                  alignItems: 'center',
                  marginRight: '30px',
                  fontWeight: '500',
                  fontSize: '0.8rem'
                }}
                sublinksData={categoryList}
                onCategorySelect={onCategorySelect}
                onBecomeExpertClick={handleBecomeAnExpertClick}
              />
            </StyledLinkWrapper>
          </StyledAdaptiveFlex>

          <Flex
            align="center"
            mr="0"
            justify="flex-start"
            h="100%"
            pl={{ lg: '31.5px', '2xl': '71.5px' }}
            bg="general.primary"
          >
            <Flex display={{ sm: 'none', lg: 'flex' }}>
              {!isAuthenticated
                ? renderLinksList(
                    authorizationLinks,
                    router,
                    t,
                    linksStyle,
                    [],
                    null,
                    onAuthClick
                  )
                : renderProfileData(
                    fullProfileData,
                    handleLogoutClick,
                    onProfileClick
                  )}
            </Flex>
            <StyledHamburgerWrapper
              w={!!unreadNotifications ? '90px' : '60px'}
              pl={{ sm: '20px', xl: '0' }}
            >
              {!!unreadNotifications && (
                <Flex
                  color="#fff"
                  mr="10px"
                  width="19px"
                  height="19px"
                  background="#EC8581"
                  alignItems="center"
                  fontSize="0.6rem"
                  borderRadius="12px"
                  justifyContent="center"
                  fontWeight="600"
                  lineHeight="22px"
                  letterSpacing="0.25px"
                >
                  {unreadNotifications}
                </Flex>
              )}
              <Hamburger
                color="#fff"
                onClick={() => setIsOpenNavBar(true)}
                wrapperProps={{
                  w: !!unreadNotifications ? 'fit-content' : '100%'
                }}
              />
            </StyledHamburgerWrapper>
          </Flex>

          <ModalController
            isOpen={modalIsOpen}
            onOpen={() => toggleModal(true)}
            onClose={() => toggleModal(false)}
          >
            {renderModalContent()}
          </ModalController>
        </Flex>
      </Flex>
    </>
  );
};

export default memo(Header);
