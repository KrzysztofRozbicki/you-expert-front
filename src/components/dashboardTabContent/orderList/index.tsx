import React, { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Flex, Spinner, Text } from '@chakra-ui/react';
import OrderPreviewItem from '../../orderPreviewItem';
import { initialStateType } from '../../../redux/interfaces/app';
import { screenSizesNumber } from '../../../styles/theme/breakpoints';

interface IOrderListProps {
  t: any;
  orders: any[];
  loading: boolean;
  is_expert?: boolean;
  contentType?: string;
  isShouldShowInvoiceColumn?: boolean;
}

const OrderList: React.FC<IOrderListProps> = (props) => {
  const {
    loading,
    orders,
    t,
    is_expert,
    isShouldShowInvoiceColumn,
    contentType
  } = props;
  const { windowWidth } = useSelector(
    (state: any): initialStateType => state.app
  );

  const isMobile = useMemo(
    (): boolean => windowWidth < screenSizesNumber?.md,
    [windowWidth]
  );

  if (loading) return <Spinner />;
  if (!orders || !orders.length)
    return <Flex p="40px">{t('common', 'labels', 'noData')}</Flex>;

  return (
    <Flex
      p={{ sm: '20px', lg: '30px', xl: '55px 32px' }}
      w="100%"
      direction="column"
    >
      <Flex direction="column">
        {!is_expert && !isMobile && (
          <Flex justifyContent="space-between" mb="13px" p="0 3%">
            <Text
              w="32%"
              fontWeight="500"
              fontSize="0.8rem"
              textTransform="uppercase"
              color="#C3C3D2"
            >
              {t('common', 'labels', 'expert')}
            </Text>
            <Text
              w="16%"
              textAlign="center"
              fontWeight="500"
              fontSize="0.8rem"
              textTransform="uppercase"
              color="#C3C3D2"
            >
              {t('common', 'labels', 'service')}
            </Text>
            <Text
              w="16%"
              textAlign="center"
              fontWeight="500"
              fontSize="0.8rem"
              textTransform="uppercase"
              color="#C3C3D2"
            >
              {t('common', 'labels', 'dates')}
            </Text>
            <Text
              pl="30px"
              w="16%"
              fontWeight="500"
              fontSize="0.8rem"
              textTransform="uppercase"
              color="#C3C3D2"
            >
              {t('common', 'labels', 'status')}
            </Text>
            <Text
              w="16%"
              textAlign="center"
              fontWeight="500"
              fontSize="0.8rem"
              textTransform="uppercase"
              color="#C3C3D2"
            >
              {t('common', 'labels', 'messages')}
            </Text>
            {isShouldShowInvoiceColumn && (
              <Text
                w="16%"
                textAlign="center"
                fontWeight="500"
                fontSize="0.8rem"
                textTransform="uppercase"
                color="#C3C3D2"
              >
                {t('common', 'labels', 'invoice')}
              </Text>
            )}
          </Flex>
        )}
        {is_expert && !isMobile && (
          <Flex justifyContent="space-between" mb="13px" p="0 3%">
            <Text
              w="25%"
              fontWeight="500"
              fontSize="0.8rem"
              textTransform="uppercase"
              color="#C3C3D2"
            >
              {t('common', 'labels', 'service')}
            </Text>
            <Text
              w="33%"
              fontWeight="500"
              fontSize="0.8rem"
              textTransform="uppercase"
              color="#C3C3D2"
              textAlign="center"
            >
              {t('common', 'labels', 'dates')}
            </Text>
            <Text
              w="25%"
              textAlign="center"
              fontWeight="500"
              fontSize="0.8rem"
              textTransform="uppercase"
              color="#C3C3D2"
            >
              {t('common', 'labels', 'status')}
            </Text>
            <Text
              w="17%"
              textAlign="center"
              fontWeight="500"
              fontSize="0.8rem"
              textTransform="uppercase"
              color="#C3C3D2"
            >
              {t('common', 'labels', 'messages')}
            </Text>
            {isShouldShowInvoiceColumn && (
              <Text
                w="15%"
                textAlign="center"
                fontWeight="500"
                fontSize="0.8rem"
                textTransform="uppercase"
                color="#C3C3D2"
              >
                {t('common', 'labels', 'invoice')}
              </Text>
            )}
          </Flex>
        )}
        {orders.map((order, index) => (
          <OrderPreviewItem
            key={index}
            order={order}
            isExpert={is_expert}
            contentType={contentType}
            isShouldShowInvoiceColumn={isShouldShowInvoiceColumn}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default memo(OrderList);
