import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Flex, useToast, Link, Button } from '@chakra-ui/react';
import useTranslation from '../../hooks/useTranslation';
import BusinessInformation from './businessInformation';
import Inbox from '../inbox';
import Account from './account';
import Notifications from './notifications';
import OrderList from './orderList';
import FavoriteOffers from './favoriteOffers';
import {
  renderList,
  renderNotificationst,
  renderOrdersList,
  renderAccountContent,
  renderBusinessInformationContent,
  billingUIConfiguration,
  accountUIConfiguration,
  TabContentUIProps
} from './common';
import Billing from '../dashboardTabContent/billing';
import { ButtonController } from '../common/ButtonController';
import { SUPPORT_EMAIL_ADDRESS } from '../../common/constants';
import { resetUserPasswordAction } from '../../redux/actions/user';

const UI: React.FC<TabContentUIProps> = ({
  offers,
  currentAction,
  notifications,
  orders,
  loadMoreNotifications,
  onNotificationClick,
  onNotificationStarClick,
  notificationLoading,
  hideTitle,
  actionsData,
  onFieldChange,
  onButtonClick,
  onOfferClick,
  customTitles,
  activeTitle,
  onTitleClick,
  is_expert,
  handleSaveImages,
  handleDeleteFile,
  handleSelectItem,
  contentWrapperStyle,
  unfollowFilter,
  isShouldShowInvoiceColumn
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [title, setTitle] = useState(currentAction);
  const { t } = useTranslation();
  const { fullProfileData } = useSelector((state: any) => state.user);
  const userError = localStorage.getItem('userError');
  const toast = useToast();

  const emailParams = useMemo((): string => {
    return `subject=${t('dashboard', 'labels', 'requestToDeleteAccount')}: ${
      fullProfileData?.publicName
    }&body=${t('dashboard', 'labels', 'pleaseDeleteMyAccount')}: ${
      fullProfileData?.publicName
    } / ${fullProfileData?.email}`;
  }, [t, fullProfileData]);

  const handleChangePassword = useCallback(() => {
    try {
      if (!isLoading) {
        setIsLoading(true);
        resetUserPasswordAction(fullProfileData?.email)
          .then(() => {
            toast({
              title: t('common', 'changePassword', 'resetPasswordWasRequested'),
              description: t(
                'common',
                'changePassword',
                'resetPasswordWasSent'
              ),
              status: 'success',
              duration: 4000,
              isClosable: true
            });
          })
          .catch(() => {
            toast({
              title: t('common', 'changePassword', 'smthWentWrong'),
              description: t('common', 'changePassword', 'pleaseTryAgainLater'),
              status: 'error',
              duration: 4000,
              isClosable: true
            });
          })
          .finally(() => setIsLoading(false));
      }
    } catch (e) {
      console.error(e);
    }
  }, [fullProfileData, t, toast, isLoading]);

  useEffect(() => {
    if (userError) {
      toast({
        title: userError,
        status: 'error',
        duration: 4000,
        isClosable: true
      });
      setTimeout(() => {
        localStorage.removeItem('userError');
      }, 1000);
    }
  }, [userError]);

  const renderContent = (contentType: string, data: any) => {
    const renderer = {
      favoriteOffers: <FavoriteOffers />,
      myAssignments: (
        <OrderList
          t={t}
          orders={orders}
          loading={notificationLoading}
          is_expert={!!fullProfileData?.isExpert}
          contentType={contentType}
          isShouldShowInvoiceColumn={isShouldShowInvoiceColumn}
        />
      ),
      myOrders: (
        <OrderList
          t={t}
          orders={orders}
          loading={notificationLoading}
          is_expert={!!fullProfileData?.isExpert}
          contentType={contentType}
          isShouldShowInvoiceColumn={isShouldShowInvoiceColumn}
        />
      ),
      account: <Account />,
      billing: <Billing />,
      inbox: <Inbox />,
      notifications: <Notifications />,
      businessInformation: <BusinessInformation />
    };
    return renderer[contentType];
  };

  useEffect(() => {
    if (title !== currentAction) {
      setTitle(currentAction);
    }
  }, [currentAction]);

  const renderTitles = (titles?: string[]) => {
    if (!title) return null;
    if (titles) {
      return (
        <Flex>
          {titles.map((titleItem, index) => {
            const isActive = activeTitle === titleItem;
            return (
              <Flex
                key={titleItem}
                cursor="pointer"
                w="auto"
                maxWidth={{ sm: '100%', lg: '35%', xl: '35%', '2xl': '40%' }}
                justify="center"
                borderRadius="5px 5px 0 0"
                p={{ sm: '20px', xl: '20px 90px' }}
                border="1px solid #DCDCF4"
                borderBottom="none"
                color={isActive ? 'genral.link' : '#C3C3D2'}
                fontSize="1.33rem"
                fontWeight="500"
                onClick={() => onTitleClick(titleItem)}
                whiteSpace="nowrap"
                ml={index > 0 ? '-1px' : '0px'}
              >
                {t('dashboard', 'title', titleItem)}
              </Flex>
            );
          })}
        </Flex>
      );
    }
    return (
      <Flex
        w="auto"
        maxWidth={{ sm: '100%', lg: '35%', xl: '35%', '2xl': '40%' }}
        justify="center"
        borderRadius="5px 5px 0 0"
        p={{ sm: '20px', xl: '20px 90px' }}
        border="1px solid #DCDCF4"
        borderBottom="none"
        color="genral.link"
        fontSize="1.33rem"
        fontWeight="500"
        whiteSpace="nowrap"
      >
        {t('dashboard', 'title', title)}
      </Flex>
    );
  };

  return (
    <Flex w="100%" direction="column">
      {!hideTitle && renderTitles(customTitles)}
      <Flex
        w="100%"
        wrap="wrap"
        bg="general.white"
        borderRadius="5px"
        border="1px solid #DCDCF4"
        justify="space-between"
        style={contentWrapperStyle}
      >
        {renderContent(title, actionsData)}
      </Flex>
      {title === 'account' && (
        <Flex
          w="100%"
          p="5%"
          justifyContent="space-between"
          flexDirection={{ sm: 'column', xl: 'row' }}
        >
          <Button
            w={{
              sm: '100%',
              xl: '30%'
            }}
            bg="general.orange"
            p="19px 32px !important"
            minHeight="72px"
            fontWeight="600"
            onClick={handleChangePassword}
            fontSize="0.8rem"
            color="#fff"
            mb={{ sm: '15px', xl: '0' }}
          >
            {t('settings', 'buttons', 'changePassword')}
          </Button>
          <Link
            w={{
              sm: '100%',
              xl: '30%'
            }}
            display="flex"
            color="#fff"
            cursor="pointer"
            padding="19px 32px"
            minHeight="72px"
            bg="general.orange"
            // background="#D74F3E"
            fontWeight="600"
            borderRadius="36px"
            alignItems="center"
            justifyContent="center"
            fontSize="0.8rem"
            href={`mailto:${SUPPORT_EMAIL_ADDRESS}?${emailParams}`}
            _hover={{
              textDecoration: 'none',
              background: 'rgb(156, 120, 195)'
            }}
          >
            {t('settings', 'buttons', 'deleteAccount')}
          </Link>
        </Flex>
      )}
    </Flex>
  );
};

export default UI;
