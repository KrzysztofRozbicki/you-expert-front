import React, { memo, useMemo, useCallback } from 'react';
import StarRatings from 'react-star-ratings';
import { useDispatch } from 'react-redux';
import SelectController from '../../../../common/SelectController';
import useTranslation from '../../../../../hooks/useTranslation';
import selectStyle from './selectStyles';
import { IOfferData, IOrderData } from '../../../interfaces';
import { setCreateOrderOrderDataAction } from '../../../actions';
import {
  WrapperStyled,
  ImageStyled,
  InfoWrapperStyled,
  TitleStyled,
  StarWrapperStyled,
  StartTextStyled,
  PriceWrapperStyled,
  QuantityWrapperStyled,
  QuantityTextStyled,
  PriceStyled,
  VariantStyled
} from './style';

interface OfferItemProps {
  offerData: IOfferData;
  orderData: IOrderData;
  packageName: string;
}

const OfferItem: React.FC<OfferItemProps> = (props) => {
  const { offerData, packageName, orderData } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const options = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({ value: i + 1, label: i + 1 })),
    []
  );

  const selectedValue = useMemo(
    () => options.find((item) => item.value === orderData?.quantity),
    [options, orderData]
  );

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

  const handleChangeQuantity = useCallback(
    (value: number): void => {
      dispatch(
        setCreateOrderOrderDataAction({ ...orderData, quantity: value })
      );
    },
    [dispatch, orderData]
  );

  return (
    <WrapperStyled
      direction={{ sm: 'column', md: 'row', lg: 'column', xl: 'row' }}
    >
      <ImageStyled
        src={
          offerData?.representationImage
            ? offerData?.representationImage
            : '/images/sections/createOrder/order-image.png'
        }
        width={{ sm: '100%', xl: '398px' }}
        height='199px'
        objectFit='cover'
        mr={{ sm: '0', md: '58px' }}
        mb={{ sm: '30px', xl: '0' }}
      />
      <InfoWrapperStyled>
        <TitleStyled>{offerData?.title}</TitleStyled>
        <StarWrapperStyled>
          {/* <StarRatings
            rating={4}
            starDimension="22px"
            starRatedColor="#F7D39B"
            starEmptyColor="#D9DBE9"
            starSpacing="2px"
            numberOfStars={5}
            name="rating"
            svgIconViewBox="0 0 20 21"
            widgetSpacings="2px"
            widgetDimension="2px"
            svgIconPath="M9.30788 0.657971C9.56452 0.0432001 10.4355 0.0431999 10.6921 0.657971L12.8937 5.93186C12.9963 6.17755 13.2214 6.35045 13.4852 6.38616L19.2876 7.17148C19.9378 7.25948 20.1695 8.08097 19.6612 8.49579L15.1809 12.1518C14.9594 12.3326 14.86 12.6235 14.9244 12.902L16.3568 19.0919C16.5119 19.762 15.7583 20.27 15.1953 19.8748L10.4309 16.5309C10.1723 16.3494 9.82771 16.3494 9.56914 16.5309L4.8047 19.8749C4.24167 20.27 3.48807 19.7621 3.64315 19.0919L5.07545 12.902C5.1399 12.6235 5.04042 12.3326 4.81895 12.1518L0.338802 8.49578C-0.169523 8.08096 0.0622221 7.25948 0.712396 7.17149L6.51479 6.38616C6.77862 6.35045 7.00375 6.17755 7.10631 5.93186L9.30788 0.657971Z"
          />
          <StartTextStyled>
            4 {t('createOrder', 'offerItem', 'stars')} 1,256
          </StartTextStyled> */}
          {renderPackageName && (
            <VariantStyled>{renderPackageName}</VariantStyled>
          )}
        </StarWrapperStyled>
        <PriceWrapperStyled>
          <QuantityWrapperStyled>
            <QuantityTextStyled>
              {t('createOrder', 'offerItem', 'quantity')}
            </QuantityTextStyled>
            <SelectController
              customStyle={selectStyle}
              onChange={(option) => handleChangeQuantity(option?.value)}
              options={options}
              value={selectedValue}
              isSearchable={false}
            />
          </QuantityWrapperStyled>
          {renderPrice && <PriceStyled>{renderPrice}</PriceStyled>}
        </PriceWrapperStyled>
      </InfoWrapperStyled>
    </WrapperStyled>
  );
};

export default memo(OfferItem);
