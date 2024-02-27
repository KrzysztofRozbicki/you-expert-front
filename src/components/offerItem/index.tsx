import React, { memo, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import {
  Flex,
  Avatar,
  Image,
  Box,
  Text,
  Checkbox,
  Button
} from '@chakra-ui/react';
import StarRatings from 'react-star-ratings';
import useTranslation from '../../hooks/useTranslation';
import { followOffer, unfollowOffer } from '../../api/offers';
import { UserState } from '../../common/interfaceTypes';
import { triggerAuthModal } from '../../redux/actions/app';
import { initialStateType } from '../../redux/interfaces/app';
import { screenSizesNumber } from '../../styles/theme/breakpoints';
import OfferItemDesktop from './offerItem.desktop';
import OfferItemMobile from './offerItem.mobile';

const borderStyle = {
  border: '1px solid #DCDCF4',
  borderRadius: '5px'
};

interface OfferItemProps {
  [key: string]: any;
  w?: {
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
  };
  infoWrapperStyle?: {
    [key: string]: string;
  };
}

const OfferItem: React.FC<OfferItemProps> = (props) => {
  const {
    id,
    priceBasic,
    expert,
    currencySign,
    onClick,
    offerData,
    w,
    hideTitle,
    previewMode,
    showLike,
    isCurrentUserAccount,
    onCheck,
    isActive,
    isFollowed,
    unfollowFilter,
    infoWrapperStyle,
    desktopWrapperProps
  } = props;
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(isFollowed ? true : false);
  const isAuthenticated = useSelector(
    (state: UserState): boolean | null => state.user.isAuthenticated
  );
  const { windowWidth } = useSelector(
    (state: any): initialStateType => state.app
  );

  const { title, avatarFile, publicName, rating, reviewCount } =
    expert || props;

  const { t } = useTranslation();
  const [isChecked, setIsChecked] = useState(isActive);

  const setLikeStatus = async () => {
    try {
      const result = isLiked ? await unfollowOffer(id) : await followOffer(id);
      if (result) {
        if (isLiked && unfollowFilter) {
          unfollowFilter(id);
        }

        if (!unfollowFilter) {
          setIsLiked(!isLiked);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onLikeClick = () => {
    if (isAuthenticated) {
      setIsLiked(!isLiked);
      setLikeStatus();
    } else {
      dispatch(triggerAuthModal(true, 'login'));
    }
  };

  const onCheckBoxCheck = () => {
    setIsChecked(!isChecked);
    onCheck(id, !isChecked);
  };

  const getFormattedTitle = (text: string) => {
    if (text.length < 40) return text;
    return text.substring(0, 45) + '...';
  };

  const onExpertClick = (offerData: any) => {
    router.push(
      '/[locale]/profile/[uuid]/',
      `/${router.query.locale}/profile/${offerData.expert.id}/`
    );
  };

  const onEditClick = () => {
    router.push(
      '/[locale]/offers/[offerId]/edit/',
      `/${router.query.locale}/offers/${id}/edit/`
    );
  };

  const isShouldShowAllStars = useMemo((): boolean => {
    return (
      (windowWidth >= screenSizesNumber.md &&
        windowWidth <= screenSizesNumber.lg) ||
      windowWidth >= screenSizesNumber.xl
    );
  }, [windowWidth]);

  const isMobile = useMemo((): boolean => {
    return windowWidth < screenSizesNumber?.md;
  }, [windowWidth]);

  return (
    <Flex
      key={id}
      w={{
        sm: w?.sm || '100%',
        md: w?.md || '50%',
        lg: w?.lg || '25%',
        xl: w?.xl || '25%'
      }}
      p="0 10px 43px 10px"
      direction="column"
      {...desktopWrapperProps}
    >
      <OfferItemDesktop
        t={t}
        isCurrentUserAccount={isCurrentUserAccount}
        onEditClick={onEditClick}
        onClick={onClick}
        offerData={offerData}
        previewMode={previewMode}
        representationImage={props?.representationImage}
        title={title}
        getFormattedTitle={getFormattedTitle}
        onExpertClick={onExpertClick}
        expert={expert}
        publicName={publicName}
        rating={rating}
        isShouldShowAllStars={isShouldShowAllStars}
        reviewCount={reviewCount}
        hideTitle={hideTitle}
        showLike={showLike}
        priceBasic={priceBasic}
        currencySign={currencySign}
        onLikeClick={onLikeClick}
        isLiked={isLiked}
        onCheckBoxCheck={onCheckBoxCheck}
        isChecked={isChecked}
        offerTitle={props.title}
        infoWrapperStyle={infoWrapperStyle}
        desktopWrapperProps={desktopWrapperProps}
      />
    </Flex>
  );
};

export default memo(OfferItem);
