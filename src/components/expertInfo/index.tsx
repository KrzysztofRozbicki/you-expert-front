import React, { memo, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import StarRatings from 'react-star-ratings';
import { Flex, Avatar } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useTranslation from '../../hooks/useTranslation';
import { IOfferData } from '../createOrder/interfaces';
import { getNumber } from '../../utils';
import { screenSizesNumber } from '../../styles/theme/breakpoints';
import { initialStateType } from '../../redux/interfaces/app';
import { NameStyled, PositionStyled, StartTextStyled } from './style';

interface ExpertInfoProps {
  expert: {
    avatarUrl: string;
    id: number;
    publicName: string;
    rating: string;
    reviewCount: number;
    title: string;
  };
}

const ExpertInfo: React.FC<ExpertInfoProps> = (props) => {
  const { expert } = props;
  const { windowWidth } = useSelector(
    (state: any): initialStateType => state.app
  );
  const { t } = useTranslation();
  const {
    push,
    query: { locale }
  } = useRouter();

  const handleUserClick = useCallback(() => {
    push(`/${locale}/profile/${expert?.id}`);
  }, [push, locale]);

  const isShouldShowAllStars = useMemo((): boolean => {
    return windowWidth >= screenSizesNumber.lg;
  }, [windowWidth]);

  return (
    <Flex
      w="100%"
      mb="30px"
      justifyContent="space-between"
      alignItems="center"
      overflow="hidden"
    >
      <Flex
        alignItems="center"
        cursor="pointer"
        onClick={handleUserClick}
        whiteSpace="nowrap"
        mr={{ md: '20px' }}
      >
        <Avatar src={expert?.avatarUrl} mr="20px" />
        <NameStyled textOverflow="ellipsis" overflow="hidden">
          {expert?.publicName}
        </NameStyled>
        <PositionStyled textOverflow="ellipsis" overflow="hidden">
          {expert?.title}
        </PositionStyled>
      </Flex>
      {!!expert?.reviewCount && (
        <Flex alignItems="baseline" whiteSpace="nowrap">
          <StarRatings
            rating={getNumber(expert?.rating)}
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
          <StartTextStyled>
            <b>
              {expert?.rating?.includes('.00')
                ? expert?.rating?.slice(0, -3)
                : expert?.rating}
            </b>{' '}
            ({expert?.reviewCount})
          </StartTextStyled>
        </Flex>
      )}
    </Flex>
  );
};

export default memo(ExpertInfo);
