import React, { memo, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Flex, Avatar, Image, Box, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import StarRatings from 'react-star-ratings';
import { offerType } from '../../../interfaces';
import useTranslation from '../../../../../hooks/useTranslation';
import { getNumber } from '../../../utils';
import { getOfferPriceWithCommission } from '../../../../../utils';

const OfferItem: React.FC<{ offer: offerType; link: string }> = (props) => {
  const { offer, link } = props;
  const { push } = useRouter();
  const { t } = useTranslation();
  const profileData = useSelector((state: any) => state.user.profileData);

  const handleOfferClick = useCallback(() => {
    push(link);
  }, [push, link]);

  const totalPrice = useMemo((): string => {
    try {
      return getOfferPriceWithCommission(+offer.pricing.basic.price, +offer.commission);
    } catch {
      return '';
    }
  }, [offer]);

  return (
    <Flex
      direction="column"
      flex={1}
      cursor={link ? 'pointer' : 'not-allowed'}
      onClick={handleOfferClick}
    >
      <Flex
        h="150px"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
        style={{
          border: '1px solid #DCDCF4',
          borderRadius: '5px'
        }}
      >
        <Image
          src={
            offer.images[0]?.file
              ? offer.images[0]?.file
              : '/images/sections/offer_image.png'
          }
          width="100%"
          height="100%"
          objectFit="cover"
        />
      </Flex>
      <Flex
        style={{
          borderRadius: '0 0 5px 5px',
          border: '1px solid #DCDCF4',
          borderTop: 'none'
        }}
        direction="column"
      >
        <Flex p="30px 40px 0" mb="18px">
          <Avatar src={profileData?.avatar_url} mr="25px" />
          <Box>
            <Text fontSize="0.8rem" fontWeight="400" color="#020055">
              {profileData?.first_name}
            </Text>
            <Text fontSize="0.8rem" fontWeight="600" color="#020055">
              {profileData?.title}
            </Text>
          </Box>
        </Flex>
        {!!profileData?.review_count && (
          <Flex p="0 40px 40px" align="center">
            <StarRatings
              rating={getNumber(profileData?.rating)}
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
            <Text
              pt="5px"
              fontSize="0.6rem"
              ml="10px"
              color="#4E4B66"
              fontWeight="600"
            >
              {`${
                profileData?.rating?.includes('.00')
                  ? profileData?.rating?.slice(0, -3)
                  : profileData?.rating
              } (${getNumber(profileData?.review_count)})`}
            </Text>
          </Flex>
        )}
        <Text fontWeight="400" p="0 40px 24px 40px" fontSize="0.8rem">
          {offer.serviceTitle}
        </Text>
        <Flex
          justify="space-between"
          p="24px 40px"
          borderTop="1px solid #DCDCF4"
        >
          <Text
            cursor="pointer"
            color="#020055"
            fontWeight="500"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            fontSize="0.8rem"
          >
            {`${t(
              'offers',
              'offersList',
              'rateDesctiption'
            )} ${totalPrice} PLN`}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default memo(OfferItem);
