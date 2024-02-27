import React, { memo, useState, useEffect, useCallback } from 'react';
import { Flex, useToast, Spinner } from '@chakra-ui/react';
import useTranslation from '../../../hooks/useTranslation';
import { ButtonController } from '../../common/ButtonController';
import NotificationItem from './notificationItem';
import { INotificationItem } from './interfaces';
import { NOTIFICATION_PER_PAGE } from './constants';
import {
  getNotificationsAction,
  saveUnsaveNotificationAction
} from './actions';

const Notifications: React.FC = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<INotificationItem[]>([]);

  const handleGetNotifications = useCallback(() => {
    const perPage = notifications?.length
      ? notifications?.length
      : NOTIFICATION_PER_PAGE;

    setIsLoading(true);
    getNotificationsAction(1, perPage)
      .then((data) => setNotifications(data))
      .catch(() => {
        toast({
          title: t('createOrder', 'toast', 'cantGetData'),
          description: t('createOrder', 'toast', 'smthWentWrong'),
          status: 'error',
          duration: 4000,
          isClosable: true
        });
      })
      .finally(() => setIsLoading(false));
  }, [notifications, toast, t]);

  const onNotificationStarClick = useCallback(
    (id: number, isSaved: boolean) => {
      setIsLoading(true);
      saveUnsaveNotificationAction(id, isSaved)
        .then(() => handleGetNotifications())
        .catch(() => {
          toast({
            title: t('createOrder', 'toast', 'cantGetData'),
            description: t('createOrder', 'toast', 'smthWentWrong'),
            status: 'error',
            duration: 4000,
            isClosable: true
          });
        });
    },
    [handleGetNotifications, toast, t]
  );

  const handleGetMoreNotifications = useCallback(() => {
    const perPage = notifications?.length
      ? notifications?.length + 4
      : NOTIFICATION_PER_PAGE;

    setIsLoadingMore(true);
    getNotificationsAction(1, perPage)
      .then((data) => setNotifications(data))
      .catch(() => {
        toast({
          title: t('createOrder', 'toast', 'cantGetData'),
          description: t('createOrder', 'toast', 'smthWentWrong'),
          status: 'error',
          duration: 4000,
          isClosable: true
        });
      })
      .finally(() => setIsLoadingMore(false));
  }, [notifications, toast, t]);

  useEffect(() => {
    handleGetNotifications();
  }, []);

  return isLoading ? (
    <Flex
      w="100%"
      p={{ sm: '5%', lg: '80px', xl: '55px 32px' }}
      justifyContent="center"
    >
      <Spinner />
    </Flex>
  ) : (
    <Flex
      w="100%"
      p={{ sm: '5%', lg: '80px', xl: '55px 32px' }}
      direction="column"
    >
      <Flex direction="column">
        {notifications?.map((notification, index) => (
          <NotificationItem
            key={index}
            notification={notification}
            onStarClick={onNotificationStarClick}
          />
        ))}
      </Flex>
      <ButtonController
        w={{ sm: '90%', lg: '30%', xl: '30%' }}
        customStyle={{ margin: '30px auto 0 auto', fontSize: '0.8rem' }}
        onClick={handleGetMoreNotifications}
        variant="darkPurpul"
      >
        {isLoadingMore ? (
          <Spinner />
        ) : (
          t('dashboard', 'notifications', 'loadMore')
        )}
      </ButtonController>
    </Flex>
  );
};

export default memo(Notifications);
