import React, { memo, useCallback } from 'react';
import { Flex, Image, Text, Avatar } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useTranslation from '../../../hooks/useTranslation';
import LinkController from '../../common/LinkController';
import { ButtonController } from '../../common/ButtonController';
import { linkItem } from '../';
import Links from '../links';
import { CategoryItem } from '../../../common/interfaceTypes';

interface NavBarProps {
  isOpen: boolean;
  handleClose: () => void;
  links: linkItem[];
  isAuth: boolean;
  authLinks: linkItem[];
  authAction: (name: string) => void;
  logoutCallback: () => void;
  profileData: {
    email: string;
    avatarUrl: string;
    firstName: string;
    id: number;
    isExpert: boolean;
  };
  sublinksData?: CategoryItem[];
  onCategorySelect?: Function;
  onBecomeExpertClick?: Function;
}

const linkStyle = {
  display: 'flex',
  alignItems: 'center',
  margin: '0 !important',
  marginBottom: '20px',
  fontWeight: '500',
  width: 'fit-content',
  fontSize: '0.8rem'
};

const NavBar: React.FC<NavBarProps> = (props) => {
  const {
    isOpen,
    handleClose,
    links,
    isAuth,
    authLinks,
    authAction,
    profileData,
    logoutCallback,
    sublinksData,
    onCategorySelect,
    onBecomeExpertClick
  } = props;
  const { t } = useTranslation();
  const router = useRouter();
  const {
    query: { locale },
    push
  } = router;

  const onAuthClick = useCallback(
    (name: string) => {
      authAction(name);
      handleClose();
    },
    [authAction, handleClose]
  );

  const handleProfileClick = useCallback(() => {
    if (profileData?.isExpert) {
      push(`/${locale}/profile/${profileData?.id}/`);
      return;
    }

    push(`/${locale}/dashboard/settings/business-information`);
  }, [profileData, push, locale]);

  return (
    <>
      {isOpen && (
        <Flex
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          background="rgba(0, 0, 0, 0.5)"
          zIndex={9998}
          onClick={handleClose}
        />
      )}
      <Flex
        position="fixed"
        top="0"
        right="0"
        height="100vh"
        w="320px"
        transform={isOpen ? 'translate(0)' : 'translate(100%)'}
        transition="transform 0.3s ease-in-out"
        zIndex={9999}
        background="#fff"
        padding="20px"
        flexDirection="column"
        fontSize="0.8rem"
      >
        <Flex mb="20px" w="100%" h="30px">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="20px"
            height="20px"
            viewBox="0 0 348.333 348.334"
            onClick={handleClose}
            style={{ fill: '#020055' }}
          >
            <path
              d="M336.559,68.611L231.016,174.165l105.543,105.549c15.699,15.705,15.699,41.145,0,56.85
		        c-7.844,7.844-18.128,11.769-28.407,11.769c-10.296,0-20.581-3.919-28.419-11.769L174.167,231.003L68.609,336.563
		        c-7.843,7.844-18.128,11.769-28.416,11.769c-10.285,0-20.563-3.919-28.413-11.769c-15.699-15.698-15.699-41.139,0-56.85
		        l105.54-105.549L11.774,68.611c-15.699-15.699-15.699-41.145,0-56.844c15.696-15.687,41.127-15.687,56.829,0l105.563,105.554
		        L279.721,11.767c15.705-15.687,41.139-15.687,56.832,0C352.258,27.466,352.258,52.912,336.559,68.611z"
            />
          </svg>
        </Flex>
        <Flex
          direction={isAuth ? 'row' : 'column'}
          mb="20px"
          display={{ sm: 'flex', lg: 'none' }}
          w="100%"
        >
          {isAuth ? (
            <>
              <Flex
                cursor='pointer'
                onClick={handleProfileClick}
                direction="column"
                align="center"
                flex={1}
              >
                <Avatar src={profileData?.avatarUrl} />
                {(profileData?.firstName || profileData?.email) && (
                  <Text color="#020055">
                    {profileData?.firstName || profileData?.email}
                  </Text>
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
                  style={{ fill: '#020055' }}
                >
                  <path d="M110.933,221.782c-4.71,0-8.533,3.823-8.533,8.533v51.2c0,4.71,3.823,8.533,8.533,8.533s8.533-3.823,8.533-8.533v-51.2     C119.467,225.605,115.644,221.782,110.933,221.782z" />
                  <path d="M111.855,2.304L31.172,34.586C8.448,43,0,54.418,0,76.715v358.477c0,22.298,8.448,33.715,30.959,42.061l81.058,32.427     c4.011,1.519,8.038,2.287,11.981,2.287c17.152,0,29.602-14.336,29.602-34.091V34.049C153.6,9.78,134.246-6.126,111.855,2.304z      M136.533,477.876c0,10.18-5.035,17.024-12.535,17.024c-1.869,0-3.883-0.401-5.803-1.118L37.103,461.33     c-16.102-5.965-20.036-11.102-20.036-26.138V76.715c0-15.036,3.934-20.164,20.241-26.206l80.725-32.29     c2.082-0.785,4.087-1.186,5.956-1.186c7.501,0,12.544,6.835,12.544,17.016V477.876z" />
                  <path d="M178.133,51.115h120.533c14.114,0,25.6,11.486,25.6,25.6v128c0,4.71,3.814,8.533,8.533,8.533     c4.719,0,8.533-3.823,8.533-8.533v-128c0-23.526-19.14-42.667-42.667-42.667H178.133c-4.71,0-8.533,3.823-8.533,8.533     S173.423,51.115,178.133,51.115z" />
                  <path d="M332.8,298.582c-4.719,0-8.533,3.823-8.533,8.533v128c0,14.114-11.486,25.6-25.6,25.6H179.2     c-4.71,0-8.533,3.823-8.533,8.533s3.823,8.533,8.533,8.533h119.467c23.526,0,42.667-19.14,42.667-42.667v-128     C341.333,302.405,337.519,298.582,332.8,298.582z" />
                  <path d="M511.343,252.655c-0.435-1.05-1.058-1.988-1.852-2.782l-85.325-85.333c-3.337-3.336-8.73-3.336-12.066,0     c-3.337,3.337-3.337,8.73,0,12.066l70.767,70.775H196.267c-4.71,0-8.533,3.823-8.533,8.533c0,4.71,3.823,8.533,8.533,8.533     h286.601L412.1,335.215c-3.337,3.337-3.337,8.73,0,12.066c1.664,1.664,3.849,2.5,6.033,2.5c2.185,0,4.369-0.836,6.033-2.5     l85.325-85.325c0.794-0.794,1.417-1.732,1.852-2.782C512.205,257.093,512.205,254.738,511.343,252.655z" />
                </svg>
              </Flex>
            </>
          ) : (
            <>
              {authLinks?.map((link, index) => (
                <ButtonController
                  key={index}
                  customStyle={{ minHeight: '30px', marginBottom: '20px' }}
                  onClick={() => onAuthClick(link?.label)}
                >
                  {link?.imagePath.includes('Profile.svg') && (
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
                  {link?.imagePath.includes('Like.svg') && (
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
                  {t('header', 'links', link?.label)}
                </ButtonController>
              ))}
            </>
          )}
        </Flex>
        <Flex direction="column" mb="20px">
          <Links
            linksList={links}
            routerData={router}
            translate={t}
            linkStyle={linkStyle}
            sublinksData={sublinksData}
            onCategorySelect={onCategorySelect}
            onBecomeExpertClick={onBecomeExpertClick}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default memo(NavBar);
