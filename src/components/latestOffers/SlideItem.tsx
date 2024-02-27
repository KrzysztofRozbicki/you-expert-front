import React, { useCallback, useMemo, memo } from 'react';
import { useRouter } from 'next/router';
import { Flex, Box, Image, Avatar, Text } from '@chakra-ui/react';
import StarRatings from 'react-star-ratings';
import styles from './SliderItem.module.scss';

const SlideItem: React.FC<any> = (props) => {
  const { offer, isWhiteBg } = props;
  const {
    push,
    query: { locale }
  } = useRouter();

  const offerTitle = useMemo((): string => {
    return offer?.title?.length > 60
      ? `${offer?.title?.slice(0, 60)}...`
      : offer?.title;
  }, [offer]);

  const handleOfferClick = useCallback(() => {
    if (
      offer?.serviceCategory?.slug &&
      offer?.serviceSubcategory?.slug &&
      offer?.service?.slug
    ) {
      push(
        `/${locale}/categories/${offer?.serviceCategory?.slug}/${offer?.serviceSubcategory?.slug}/services/${offer?.service?.slug}/offers/${offer?.id}`
      );
    } else if (
      offer?.serviceCategory?.slug &&
      offer?.serviceSubcategory?.slug
    ) {
      push(
        `/${locale}/categories/${offer?.serviceCategory?.slug}/${offer?.serviceSubcategory?.slug}/offers/${offer?.id}`
      );
    } else if (offer?.serviceCategory?.slug && offer?.service?.slug) {
      push(
        `/${locale}/categories/${offer?.serviceCategory?.slug}/services/${offer?.service?.slug}/offers/${offer?.id}`
      );
    } else if (offer?.serviceCategory?.slug) {
      push(
        `/${locale}/categories/${offer?.serviceCategory?.slug}/offers/${offer?.id}`
      );
    }
  }, [offer, push, locale]);

  const handleExpertClick = useCallback(() => {
    push(`/${locale}/profile/${offer?.expert?.id}/`);
  }, [push, locale, offer]);

  return (
    <Flex w="300px" minWidth="300px" direction="column" mr="30px">
      <Flex
        className={styles.image_wrapper}
        cursor="pointer"
        onClick={handleOfferClick}
        w="100%"
        height="400px"
        borderRadius="5px"
        overflow="hidden"
        backgroundImage={`url(${
          offer?.representationImage
            ? offer?.representationImage
            : '/images/sections/categoriesPreviewSlider/slideImage.svg'
        })`}
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
      />
      <Box p={{ sm: '20px 5px', xl: '41px' }} h="220px">
        <Flex direction="column">
          <Flex mb="18px" cursor="pointer" onClick={handleExpertClick}>
            <Avatar
              mr="25px"
              src={offer?.expert?.avatarUrl}
              name={offer?.expert?.publicName}
            />
            <Box>
              <Text
                fontSize="0.8rem"
                fontWeight="400"
                color={isWhiteBg ? 'general.link' : 'general.white'}
              >
                {offer?.expert?.publicName}
              </Text>
              <Text
                fontSize="0.8rem"
                fontWeight="600"
                color={isWhiteBg ? 'general.link' : 'general.white'}
              >
                {offer?.expert?.title}
              </Text>
            </Box>
          </Flex>
          {!!offer?.expert?.reviewCount && (
            <Flex align="center" mb="10px">
              <StarRatings
                rating={Number(offer?.expert?.rating)}
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
                w={{ sm: '35%' }}
                pt="5px"
                fontSize="0.6rem"
                ml="10px"
                color={isWhiteBg ? 'general.link' : 'general.white'}
                fontWeight="600"
              >
                <b>
                  {offer?.expert?.rating?.includes('.00')
                    ? offer?.expert?.rating?.slice(0, -3)
                    : offer?.expert?.rating}
                </b>{' '}
                ({offer?.expert?.reviewCount})
              </Text>
            </Flex>
          )}
          <Text
            height="42px"
            fontSize="0.8rem"
            fontWeight="400"
            color="general.white"
            cursor="pointer"
            onClick={handleOfferClick}
          >
            {offerTitle}
          </Text>
        </Flex>
      </Box>
      <Box w="100%" h="2px" bg="#3D3D50" mb="20px">
        <Box w="25%" h="2px" bg="#7A72DF" />
      </Box>
      <Text
        pl="41px"
        fontSize="1.1rem"
        fontWeight="400"
        color={isWhiteBg ? '#7A72DF' : 'general.white'}
      >
        {offer?.serviceCategory?.name}
      </Text>
    </Flex>
  );
};

export default memo(SlideItem);
