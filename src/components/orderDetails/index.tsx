import React, { memo, useEffect, useMemo, useCallback } from 'react';
import { Flex, Spinner, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import useTranslation from '../../hooks/useTranslation';
import { orderDetailsInitStateType, orderDetailsDataType } from './interfaces';
import OfferItem from './offerItem';
import Summary from './summary';
import ExpertInfo from '../expertInfo';
import Included from './included';
import Breadcrumbs from '../common/breadcrumbs';
import Description from './description';
import Requirements from './requirements';
import OrderChat from '../orderChat';
import {
  getOrderDetailsById,
  setOrderDetailsData,
  setOrderDetailsLoading,
  resetOrderDetailsStoreAction
} from './actions';

const OrderDetails: React.FC = () => {
  const toast = useToast();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    query: { orderId, locale, askInvoice, focusChat }
  } = router;

  const {
    isLoading,
    data
  }: { isLoading: boolean; data: orderDetailsDataType } = useSelector(
    (state: any): orderDetailsInitStateType => state.orderDetails
  );
  const { profileData, fullProfileData } = useSelector(
    (state: any): any => state.user
  );

  const breadcrumbs = useMemo(() => {
    const array = [];
    if (data?.offerData?.serviceCategory) {
      array.push({
        title: data?.offerData?.serviceCategory?.name,
        link: `/${locale}/categories/${data?.offerData?.serviceCategory?.slug}/offers`
      });
    }

    if (data?.offerData?.serviceSubcategory) {
      array.push({
        title: data?.offerData?.serviceSubcategory?.name,
        link: `/${locale}/categories/${data?.offerData?.serviceCategory.slug}/${data?.offerData?.serviceSubcategory?.slug}/offers`
      });
    }

    if (data?.offerData?.service) {
      array.push({
        title: data?.offerData?.service?.name,
        link: `/${locale}/categories/${data?.offerData?.serviceCategory.slug}/services/${data?.offerData?.service?.slug}/offers`
      });
    }

    array.push({
      title: data?.offerData?.title,
      link: ''
    });

    return array;
  }, [data, locale]);

  const getData = useCallback(() => {
    dispatch(setOrderDetailsLoading(true));
    getOrderDetailsById(orderId as string)
      .then((data: orderDetailsDataType) => {
        dispatch(setOrderDetailsData(data));
        dispatch(setOrderDetailsLoading(false));
      })
      .catch(() => {
        toast({
          title: t('orderDetails', 'toast', 'cantGetData'),
          description: t('orderDetails', 'toast', 'smthWentWrong'),
          status: 'error',
          duration: 4000,
          isClosable: true
        });
      });
  }, [orderId, dispatch, t]);

  useEffect(() => {
    getData();

    return () => {
      dispatch(resetOrderDetailsStoreAction());
    };
  }, []);

  const isExpert = useMemo(
    () => profileData?.user_id === data?.expertData?.id,
    [data, profileData]
  );

  const isClient = useMemo(
    () => profileData?.user_id === data?.clientData?.id,
    [data, profileData]
  );

  const dialogWith = useMemo((): number | undefined => {
    if (isClient) {
      return data?.expertData?.id;
    }
    if (isExpert) {
      return data?.clientData?.id;
    }
    return undefined;
  }, [data, isClient, isExpert]);

  const isUserBilling = useMemo((): string => {
    return (
      fullProfileData?.companyName &&
      fullProfileData?.nipNumber &&
      fullProfileData?.zipCode
    );
  }, [isExpert, fullProfileData]);

  const invoiceMessage = useMemo((): string => {
    if (
      fullProfileData?.id === data?.clientData?.id &&
      askInvoice === 'true' &&
      isUserBilling
    ) {
      return `
      ${t('common', 'labels', 'invoiceForTheOrder')} ${orderId}, 
      ${t('common', 'labels', 'billingDetails')}: \n 
      ${fullProfileData?.companyName} \n 
      NIP: ${fullProfileData?.nipNumber} \n 
      ${fullProfileData?.street} \n 
      ${fullProfileData?.zipCode} ${fullProfileData?.city}`;
    }

    return '';
  }, [isExpert, askInvoice, t, orderId, fullProfileData, isUserBilling]);

  const warningInvoiceMessage = useMemo((): string => {
    if (
      fullProfileData?.id === data?.clientData?.id &&
      askInvoice === 'true' &&
      !isUserBilling
    ) {
      return t('common', 'labels', 'updateBillingDetails');
    }

    return '';
  }, [isExpert, askInvoice, t, isUserBilling]);

  return (
    <Flex align="center" direction="column" bg="#FBFBFD" pb="62px">
      {isLoading ? (
        <Spinner />
      ) : (
        <Flex
          w="100%"
          pl={{ sm: '2%', lg: '3%', xl: '4%', '2xl': '5%' }}
          pr={{ sm: '2%', lg: '3%', xl: '4%', '2xl': '5%' }}
          direction="column"
        >
          <Breadcrumbs
            renderItems={breadcrumbs}
            wrapperProps={{ mt: { sm: '15px', lg: '38px' } }}
          />
          <Flex w="100%" flexDirection={{ sm: 'column', lg: 'row' }}>
            <Flex flex={1} mr={{ sm: '0', lg: '30px' }} flexDirection="column">
              <ExpertInfo expert={data?.expertData} />
              <OfferItem data={data} />
              <Description
                title={t('orderDetails', 'description', 'title')}
                text={data?.offerData?.description}
              />
              <Requirements data={data} />
              <Included data={data} />
              {!!dialogWith && (
                <OrderChat
                  orderId={data?.id?.toString()}
                  dialogWith={dialogWith?.toString()}
                  askInvoice={askInvoice === 'true'}
                  focusChat={focusChat === 'true'}
                  initialMessage={invoiceMessage}
                  warningMessage={warningInvoiceMessage}
                />
              )}
            </Flex>
            <Flex w={{ sm: '100%', lg: '40%', xl: '30%' }} mt={{ sm: '30px', lg: '0' }}>
              <Summary
                isClient={isClient}
                isExpert={isExpert}
                data={data}
                getData={getData}
              />
            </Flex>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default memo(OrderDetails);
