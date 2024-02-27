import React, { memo } from 'react';
import StarRatings from 'react-star-ratings';
import {
  Flex,
  Button,
  Image,
  Text,
  Avatar,
  Box,
  Checkbox
} from '@chakra-ui/react';

const OfferItemMobile = (props) => {
  const {
    t,
    isCurrentUserAccount,
    onEditClick,
    onClick,
    offerData,
    previewMode,
    representationImage,
    title,
    getFormattedTitle,
    onExpertClick,
    expert,
    publicName,
    rating,
    isShouldShowAllStars,
    reviewCount,
    hideTitle,
    showLike,
    priceBasic,
    currencySign,
    onLikeClick,
    isLiked,
    onCheckBoxCheck,
    isChecked,
    offerTitle
  } = props;

  return (
    <>
      <Flex>
        <Flex
          position="relative"
          height="150px"
          alignItems="center"
          justifyContent="center"
          overflow="hidden"
          w="60%"
          border="1px solid #DCDCF4"
          borderRadius="5px"
        >
          {isCurrentUserAccount && (
            <Button
              onClick={() => onEditClick()}
              variant="yellow"
              color="#000"
              w="auto"
              h="35px !important"
              p="10px"
              position="absolute"
              top="10px"
              right="10px"
              _hover={{ color: '#000' }}
              fontSize="0.8rem"
            >
              <Image
                w="15px"
                mr="10px"
                cursor="pointer"
                src={'/images/common/pen.png'}
              />
              {t('common', 'labels', 'edit')}
            </Button>
          )}
          {!isCurrentUserAccount && (!previewMode || showLike) && (
            <Image
              top="10px"
              right="10px"
              position="absolute"
              onClick={onLikeClick}
              cursor="pointer"
              src={
                isLiked
                  ? '/images/sections/offers/Like_red.svg'
                  : '/images/sections/offers/like.svg'
              }
            />
          )}
          <Image
            cursor="pointer"
            onClick={() => onClick(offerData)}
            src={
              representationImage
                ? representationImage
                : '/images/sections/offer_image.png'
            }
            width="100%"
            height="100%"
            objectFit="cover"
          />
        </Flex>
        <Flex direction="column" flex={1}>
          {previewMode && (
            <Text
              cursor="pointer"
              onClick={() => onClick(offerData)}
              overflow="hidden"
              mb="24px"
              fontWeight="400"
              fontSize="0.8rem"
              ml="20px"
            >
              {getFormattedTitle(offerTitle)}
            </Text>
          )}
          {!previewMode && offerTitle && !hideTitle && (
            <Text
              cursor="pointer"
              onClick={() => onClick(offerData)}
              overflow="hidden"
              mb="24px"
              fontWeight="400"
              fontSize="0.8rem"
              ml="20px"
            >
              {getFormattedTitle(offerTitle)}
            </Text>
          )}
          {!previewMode && !!reviewCount && (
            <Flex
              ml="20px"
              align="center"
              justify={{ lg: 'start' }}
              display={{ sm: 'flex', md: 'none' }}
            >
              <StarRatings
                rating={Number(rating) || 4}
                starDimension="22px"
                starRatedColor="#F7D39B"
                starEmptyColor="#D9DBE9"
                starSpacing="2px"
                numberOfStars={isShouldShowAllStars ? 5 : 1}
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
                <b>{rating?.includes('.00') ? rating?.slice(0, -3) : rating}</b>{' '}
                ({reviewCount})
              </Text>
            </Flex>
          )}
        </Flex>
      </Flex>
      <Flex
        width="100%"
        justifyContent="space-between"
        alignItems="center"
        p="20px 0"
        borderBottom="1px solid #DCDCF4"
      >
        {(!previewMode || showLike) && (
          <>
            <Flex
              w="fit-content"
              maxW="50%"
              mr="20px"
              cursor="pointer"
              onClick={() => onExpertClick(offerData)}
              alignItems="center"
              overflow="hidden"
            >
              <Avatar
                src={expert && expert.avatarUrl ? expert.avatarUrl : ''}
                alt="Expert profile image"
                mr="15px"
                size="sm"
              />
              <Box>
                <Text fontSize="0.8rem" fontWeight="400" color="#020055">
                  {publicName}
                </Text>
                <Text
                  fontSize="0.8rem"
                  fontWeight="600"
                  color="#020055"
                  lineHeight={1.1}
                >
                  {title}
                </Text>
              </Box>
            </Flex>
            <Text
              w="fit-content"
              maxW="50%"
              cursor="pointer"
              onClick={() => onClick(offerData)}
              color="#020055"
              fontSize="0.8rem"
              fontWeight="500"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
            >
              {`${t('offers', 'offersList', 'rateDesctiption')} ${priceBasic} ${
                currencySign ? currencySign : 'PLN'
              }`}
            </Text>
          </>
        )}
        {previewMode && !showLike && (
          <Flex w="100%" align="center" justify="space-between">
            <Flex alignItems="center" mr="10px">
              <Checkbox
                size="lg"
                onChange={() => onCheckBoxCheck()}
                colorScheme="transparent"
                iconColor="#7A72DF"
                isChecked={isChecked}
              />
              <Text
                fontSize="0.6rem"
                fontWeight="500"
                corlor="general.primary"
                lineHeight={1}
                ml="5px"
              >
                {t('common', 'labels', 'isActive')}
              </Text>
            </Flex>
            <Text
              cursor="pointer"
              onClick={() => onClick(offerData)}
              color="#020055"
              textAlign="right"
              fontSize="0.6rem"
              fontWeight="500"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
            >
              {`${t('offers', 'offersList', 'rateDesctiption')} ${priceBasic} ${
                currencySign ? currencySign : ''
              }`}
            </Text>
          </Flex>
        )}
      </Flex>
    </>
  );
};

export default memo(OfferItemMobile);
