import React, { memo, useMemo } from 'react';
import { Text, Flex, Image, Spinner } from '@chakra-ui/react';
import useTranslation from '../../../../hooks/useTranslation';
import { ButtonController } from '../../../common/ButtonController';
import { IOfferData, IOrderData } from '../../interfaces';
import { getNumber } from '../../../../utils';
import {
  WrapperStyled,
  SummaryBlockStyled,
  TitleWrapperStyled,
  IconWrapperStyled,
  ServiceWrapperStyled,
  ServiceItemStyled
} from './style';

interface SummaryProps {
  isShouldShowOffer?: boolean;
  isShouldShowBackButton?: boolean;
  isShouldShowPaymentMethod?: boolean;
  onCheckoutClick: () => void;
  checkoutButtonText: string;
  onBackButtonClick?: () => void;
  offerData: IOfferData;
  orderData: IOrderData;
  packageName?: string;
  isLoading?: boolean;
}

const Summary: React.FC<SummaryProps> = (props) => {
  const {
    isShouldShowOffer,
    isShouldShowPaymentMethod,
    isShouldShowBackButton,
    checkoutButtonText,
    onCheckoutClick,
    onBackButtonClick,
    offerData,
    orderData,
    packageName,
    isLoading
  } = props;
  const { t } = useTranslation();

  const renderTotal = useMemo((): string => {
    let price = 0;
    if (packageName === 'basic') {
      price = getNumber(offerData?.priceBasic);
    } else if (packageName === 'standard') {
      price = getNumber(offerData?.priceStandard);
    } else if (packageName === 'premium') {
      price = getNumber(offerData?.pricePremium);
    }

    const resultPrice = (price * orderData?.quantity).toFixed(2);
    if (offerData?.currencySign) {
      return `${resultPrice} ${offerData?.currencySign}`;
    }

    return `${resultPrice} PLN`;
  }, [offerData, orderData, packageName]);

  const renderPrice = useMemo((): string => {
    let price = '';

    if (packageName === 'basic') {
      price = `${offerData?.priceBasic}`;
    } else if (packageName === 'standard') {
      price = `${offerData?.priceStandard}`;
    } else if (packageName === 'premium') {
      price = `${offerData?.pricePremium}`;
    }

    if (offerData?.currencySign) {
      price += ` ${offerData?.currencySign}`;
    } else {
      price += ` PLN`;
    }

    return price;
  }, [offerData, packageName]);

  const renderDelivery = useMemo((): string => {
    if (packageName === 'basic') {
      return `${offerData?.deliveryDateInDaysBasic}`;
    } else if (packageName === 'standard') {
      return `${offerData?.deliveryDateInDaysStandard}`;
    } else if (packageName === 'premium') {
      return `${offerData?.deliveryDateInDaysPremium}`;
    }

    return '';
  }, [offerData, packageName]);

  const renderPackageName = useMemo((): string => {
    if (packageName === 'basic') {
      return 'Basic';
    } else if (packageName === 'standard') {
      return 'Standard';
    } else if (packageName === 'premium') {
      return 'Premium';
    }

    return '';
  }, [packageName]);

  return (
    <WrapperStyled>
      <SummaryBlockStyled>
        <TitleWrapperStyled>
          <Text fontSize="0.8rem" fontWeight="600">
            {t('createOrder', 'summary', 'summary')}
          </Text>
          <IconWrapperStyled>
            <svg
              width="20"
              height="24"
              viewBox="0 0 20 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 2.016C0 0.888 0.888355 0 1.9928 0H18.0072C19.1116 0 20 0.888 20 2.016V22.008C20 23.112 19.1116 24.024 18.0072 24.024H1.9928C0.888355 24 0 23.112 0 21.984V2.016ZM1.9928 21.984H18.0072V1.992H1.9928V21.984ZM4.0096 7.008C4.0096 6.456 4.46579 6 4.994 6H13.0132C13.5654 6 13.9976 6.432 13.9976 7.008C13.9976 7.56 13.5414 8.016 13.0132 8.016H4.994C4.44178 7.992 4.0096 7.56 4.0096 7.008ZM4.0096 10.992C4.0096 10.44 4.46579 9.984 4.994 9.984H13.0132C13.5654 9.984 13.9976 10.416 13.9976 10.992C13.9976 11.544 13.5414 12 13.0132 12H4.994C4.44178 12 4.0096 11.568 4.0096 10.992ZM4.0096 15C4.0096 14.448 4.46579 13.992 5.01801 13.992H9.0036C9.55582 13.992 10.012 14.424 10.012 15C10.012 15.552 9.55582 16.008 9.0036 16.008H5.01801C4.44178 16.008 4.0096 15.552 4.0096 15Z"
                fill="#020055"
              />
            </svg>
          </IconWrapperStyled>
        </TitleWrapperStyled>
        <ServiceWrapperStyled>
          {isShouldShowOffer && (
            <>
              <Image
                src={
                  offerData?.representationImage
                    ? offerData?.representationImage
                    : '/images/sections/createOrder/order-image.png'
                }
                mb="30px"
              />
              <Text
                fontSize="1.1rem"
                fontWeight="500"
                mb="30px"
                lineHeight="128.5%"
              >
                {offerData?.title}
              </Text>
              <Flex mb="30px" alignItems="center">
                <IconWrapperStyled
                  customStyle={`
                    width: 59px; 
                    height: 59px; 
                    border-color: rgba(32, 14, 36, 0.2);
                    margin-right: 26px;
                  `}
                >
                  <svg
                    width="21"
                    height="16"
                    viewBox="0 0 21 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 7.31372L7.65685 12.9706L18.9706 1.65687"
                      stroke="#7A72DF"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </IconWrapperStyled>
                {renderPackageName && (
                  <Text fontSize="0.8rem">{renderPackageName}</Text>
                )}
              </Flex>
            </>
          )}
          <ServiceItemStyled>
            <Text fontSize="0.8rem">
              {t('createOrder', 'summary', 'service')}
            </Text>
            <Text fontSize="0.8rem" whiteSpace="nowrap">
              {renderPrice}
            </Text>
          </ServiceItemStyled>
          <ServiceItemStyled isLast>
            <Text fontSize="0.8rem">
              {t('createOrder', 'summary', 'quantity')}
            </Text>
            <Text fontSize="0.8rem" whiteSpace="nowrap">
              {orderData?.quantity}
            </Text>
          </ServiceItemStyled>
        </ServiceWrapperStyled>
        <ServiceWrapperStyled>
          <ServiceItemStyled>
            <Text fontSize="1.1rem" fontWeight="600">
              {t('createOrder', 'summary', 'total')}
            </Text>
            <Text fontSize="1.1rem" fontWeight="600" whiteSpace="nowrap">
              {renderTotal}
            </Text>
          </ServiceItemStyled>
          {renderDelivery && (
            <ServiceItemStyled isLast>
              <Text fontSize="1.1rem">
                {t('createOrder', 'summary', 'delivery')}
              </Text>
              <Text fontSize="1.1rem">
                {renderDelivery} {t('createOrder', 'summary', 'days')}
              </Text>
            </ServiceItemStyled>
          )}
        </ServiceWrapperStyled>
        <ServiceWrapperStyled customStyle="border: none;">
          <Flex
            w="100%"
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            {isShouldShowBackButton && (
              <ButtonController
                variant="grey"
                onClick={onBackButtonClick}
                customStyle={{
                  marginBottom: '10px',
                  width: '100%',
                  fontSize: '0.8rem'
                }}
              >
                {isLoading ? <Spinner /> : t('createOrder', 'summary', 'back')}
              </ButtonController>
            )}
            <ButtonController
              variant="pink"
              onClick={onCheckoutClick}
              customStyle={{ width: '100%', fontSize: '0.8rem' }}
            >
              {isLoading ? <Spinner /> : checkoutButtonText}
            </ButtonController>
          </Flex>
        </ServiceWrapperStyled>
      </SummaryBlockStyled>
      {isShouldShowPaymentMethod && (
        <Flex p="0.8rem 58px" justifyContent="center" alignItems="center">
          {/* <Image
            src="/images/sections/createOrder/paypal.png"
            w="80px"
            h="45px"
          />
          <Image
            src="/images/sections/createOrder/visa.png"
            w="58px"
            h="24px"
          />
          <Image
            src="/images/sections/createOrder/mastercard.png"
            w="110px"
            h="29px"
          /> */}
          <Image
            src="/images/sections/createOrder/paynow.png"
            w="189px"
            h="60px"
          />
        </Flex>
      )}
    </WrapperStyled>
  );
};

export default memo(Summary);
