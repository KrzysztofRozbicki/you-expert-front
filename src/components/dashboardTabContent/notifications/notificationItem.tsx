import React, { memo, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Flex, Text, Image } from '@chakra-ui/react';
import { INotificationItem } from './interfaces';

interface NotificationItemProps {
  notification: INotificationItem;
  onStarClick: (id: number, isSaved: boolean) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = (props) => {
  const { push } = useRouter();
  const { notification, onStarClick } = props;
  const { isSaved, createdAt, title, id, actionUrl, isRead } = notification;

  const formattedDate = useMemo(
    (): string =>
      createdAt && createdAt.split('T') && createdAt.split('T')[0]
        ? createdAt.split('T')[0]
        : '',
    [createdAt]
  );

  const handleNotificationClick = useCallback(() => {
    if (actionUrl) {
      push(actionUrl);
    }
  }, [actionUrl]);

  return (
    <Flex
      position="relative"
      direction={{ sm: 'column', md: 'row', lg: 'row', xl: 'row' }}
      alignItems={{ sm: 'start', md: 'center', lg: 'center', xl: 'center' }}
      w="100%"
      border="1px solid #DCDCF4"
      borderRadius="5px"
      justify="space-between"
      p={{ sm: '38px 14px 32px 81px', xl: '38px 30px' }}
      mb="23px"
      align="center"
      cursor={actionUrl ? 'pointer' : 'default'}
      onClick={handleNotificationClick}
    >
      <Flex>
        {title && (
          <Text
            cursor="pointer"
            fontSize="1.1rem"
            fontWeight={isRead ? '500' : '700'}
            lineHeight="31px"
            mb={{ sm: '20px', md: '0', lg: '0', xl: '0' }}
          >
            {title}
          </Text>
        )}
      </Flex>
      {createdAt && (
        <Text
          fontSize="0.8rem"
          fontWeight={isRead ? '500' : '700'}
          lineHeight="23px"
        >
          {formattedDate}
        </Text>
      )}
    </Flex>
  );
};

export default memo(NotificationItem);
