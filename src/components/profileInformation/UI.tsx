import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Flex, Image, Text, Divider, Avatar, Spinner } from '@chakra-ui/react';
import StarRatings from 'react-star-ratings';
import { FacebookShareButton } from 'react-share';
import useTranslation from '../../hooks/useTranslation';
import { ButtonController } from '../common/ButtonController';
import { socialLinkStyle, buttonStyle } from './common';
import { ProfileDetailsUIProps } from '../../common/interfaceTypes';
import DividerController from '../common/DividerController';

export const UI: React.FC<ProfileDetailsUIProps> = (props) => {
  const {
    id,
    onContactClick,
    onQuoteClick,
    publicName,
    profesion,
    avatarUrl,
    rating,
    reviewCount,
    description,
    isExpert,
    isContactMeLoading,
    isMyProfile
  } = props;

  const {
    push,
    query: { locale }
  } = useRouter();
  const { t } = useTranslation();

  const handleClickEditProfile = useCallback(() => {
    push(`/${locale}/dashboard/settings/account`);
  }, [push, locale]);

  const shareLink = useMemo((): string => {
    if (
      typeof window !== 'undefined' &&
      window?.location &&
      window?.location?.href
    ) {
      return window.location.href;
    }

    return '';
  }, []);

  const renderRow = (data: string | string[], trnslation: string) => {
    return (
      <Flex direction="column">
        <Flex m={{ xl: '22px 0 16px 0' }} justify="space-between">
          <Text fontWeight="400">
            {t('profile', 'descriptionFields', trnslation)}
          </Text>
          <Text fontWeight="600">
            {typeof data === 'string'
              ? data
              : data.map((item, idx) => {
                  if (idx + 1 !== data.length) {
                    return `${item}, `;
                  }

                  return item;
                })}
          </Text>
        </Flex>
        <Divider />
      </Flex>
    );
  };

  return (
    <Flex direction="column">
      <Flex align="center">
        <Avatar
          size="2xl"
          borderRadius="100%"
          src={avatarUrl}
          name={publicName}
        />
        <Flex direction="column" ml="50px">
          <Flex direction="column">
            {publicName && (
              <Text fontSize="1.1rem" mb="10px">
                {publicName}
              </Text>
            )}
            {profesion && (
              <Text fontSize="1.1rem" mb="20px" fontWeight="600">
                {profesion}
              </Text>
            )}
          </Flex>
          {!!reviewCount && (
            <Flex direction="column">
              {rating && isExpert ? (
                <StarRatings
                  rating={Number(rating)}
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
              ) : null}
              <Text
                mt="20px"
                fontSize="0.6rem"
                color="#4E4B66"
                fontWeight="600"
              >
                <b>{rating}</b> ({reviewCount})
              </Text>
            </Flex>
          )}
        </Flex>
      </Flex>
      <Flex p={{ sm: '70px 0', xl: '90px 0' }}>
        {description ? <Text fontSize="0.8rem">{description}</Text> : null}
      </Flex>

      {/* actions block */}
      <Flex justify="space-between">
        <Flex>
          {isMyProfile ? (
            <ButtonController
              customM={{ sm: '0 24px 0 0', xl: '0 34px 0 0' }}
              onClick={handleClickEditProfile}
              customStyle={buttonStyle}
              variant="yellow"
            >
              <Image
                w="15px"
                mr="10px"
                cursor="pointer"
                src={'/images/common/pen.png'}
              />
              {t('profile', 'buttons', 'editProfile')}
            </ButtonController>
          ) : (
            <ButtonController
              customM={{ sm: '0 24px 0 0', xl: '0 34px 0 0' }}
              onClick={() => onContactClick(id)}
              customStyle={buttonStyle}
              variant="orange"
            >
              {isContactMeLoading ? (
                <Spinner />
              ) : (
                t('profile', 'buttons', 'contact')
              )}
            </ButtonController>
          )}
          {/* <ButtonController
            customM={{ lg: '0 24px 0 0', xl: '0 34px 0 0' }}
            onClick={onQuoteClick}
            customStyle={buttonStyle}
            variant="yellow"
          >
            {t('profile', 'buttons', 'quote')}
          </ButtonController> */}
        </Flex>
        <Flex>
          <FacebookShareButton style={socialLinkStyle} url={shareLink}>
            <Image src="/images/common/Facebook.svg" />
          </FacebookShareButton>
        </Flex>
      </Flex>

      <DividerController
        background="#DCDCF4"
        customM={{ sm: '64px 0 43px 0', xl: '74px 0 53px' }}
      />
    </Flex>
  );
};
