import React, { memo, useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Flex, Image, Button, Spinner } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { UserState } from '../../common/interfaceTypes';
import useTranslation from '../../hooks/useTranslation';
import { setLastOfferData, triggerAuthModal } from '../../redux/actions/app';
import { getOffers } from './actions';
import { getFormattedHeading } from '../../common/strings';
import SlideItem from './SlideItem';

interface IState {
  page: number;
  isLoading: boolean;
  sliderItems: any[];
}

interface LatestOffersProps {
  isWhiteBg?: boolean;
}

const LatestOffers: React.FC<LatestOffersProps> = (props) => {
  const { isWhiteBg } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    push,
    query: { locale }
  } = useRouter();
  const timeoutValue = useRef<any>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const contentBlockRef = useRef<HTMLDivElement | null>(null);
  const [arrowState, setArrowState] = useState<{
    isShouldShowLeftArrow: boolean;
    isShouldShowRightArrow: boolean;
  }>({
    isShouldShowLeftArrow: false,
    isShouldShowRightArrow: false
  });
  const [state, setState] = useState<IState>({
    page: 0,
    isLoading: true,
    sliderItems: []
  });

  const { isAuthenticated, fullProfileData } = useSelector(
    (state: UserState) => state.user
  );

  const handleGetOffers = useCallback(() => {
    if (timeoutValue?.current) {
      clearTimeout(timeoutValue?.current);
    }

    if (state.page === 0 || !state.isLoading) {
      setState((prev) => ({ ...prev, isLoading: true }));

      timeoutValue.current = setTimeout(() => {
        getOffers(state?.page + 1)
          .then((data: any[]) => {
            if (!!data.length) {
              if (state?.page === 0) {
                dispatch(setLastOfferData(data[0]));
              }

              setState((prev) => ({
                ...prev,
                isLoading: false,
                page: prev.page + 1,
                sliderItems: prev.sliderItems.concat(data)
              }));
            }
          })
          .catch((e) => console.error(e))
          .finally(() => {
            setState((prev) => ({ ...prev, isLoading: false }));
          });
      }, 1000);
    }
  }, [state, dispatch, timeoutValue?.current]);

  const handleScroll = useCallback(() => {
    if (wrapperRef?.current && contentBlockRef?.current) {
      const newArrowState = {
        isShouldShowLeftArrow: false,
        isShouldShowRightArrow: false
      };

      if (contentBlockRef?.current?.scrollLeft > 0) {
        newArrowState.isShouldShowLeftArrow = true;
      }

      if (
        contentBlockRef?.current?.scrollWidth >
          wrapperRef?.current?.clientWidth &&
        contentBlockRef?.current?.scrollLeft +
          contentBlockRef?.current?.offsetWidth <
          contentBlockRef?.current?.scrollWidth
      ) {
        newArrowState.isShouldShowRightArrow = true;
      }

      if (
        contentBlockRef?.current?.scrollLeft +
          contentBlockRef?.current?.offsetWidth ===
          contentBlockRef?.current?.scrollWidth &&
        !state?.isLoading
      ) {
        handleGetOffers();
      }

      setArrowState(newArrowState);
    }
  }, [handleGetOffers, wrapperRef?.current, contentBlockRef?.current, state]);

  const handleClickRightArrow = useCallback(() => {
    if (contentBlockRef?.current) {
      contentBlockRef.current.scrollLeft =
        contentBlockRef?.current?.scrollLeft +
        contentBlockRef?.current?.clientWidth;
    }
  }, [contentBlockRef?.current, state]);

  const handleClickLeftArrow = useCallback(() => {
    if (contentBlockRef?.current) {
      contentBlockRef.current.scrollLeft =
        contentBlockRef?.current?.scrollLeft -
        contentBlockRef?.current?.clientWidth;
    }
  }, [contentBlockRef?.current, state]);

  const handleBecomeAnExpertClick = useCallback(() => {
    if (!isAuthenticated) {
      dispatch(triggerAuthModal(true, 'login'));
      return;
    }

    push(`/${locale}/dashboard/settings/business-information`);
  }, [isAuthenticated, dispatch, push, locale]);

  const handleCreateOfferClick = useCallback(() => {
    push(`/${locale}/create-offer`);
  }, [push, locale]);

  useEffect(() => {
    if (contentBlockRef?.current && !state?.isLoading) {
      contentBlockRef?.current?.addEventListener('scroll', handleScroll);
    }

    return () => {
      contentBlockRef?.current?.removeEventListener('scroll', handleScroll);
    };
  }, [contentBlockRef?.current, state?.isLoading]);

  useEffect(() => {
    handleGetOffers();
  }, []);

  useEffect(() => {
    if (contentBlockRef?.current && state.page > 0) {
      handleScroll();
      contentBlockRef?.current?.addEventListener('scroll', handleScroll);
    }

    return () => {
      contentBlockRef?.current?.removeEventListener('scroll', handleScroll);
    };
  }, [contentBlockRef?.current, wrapperRef?.current, state.page]);

  return (
    <Flex w="100%" ref={wrapperRef} mb="60px" position="relative">
      {arrowState.isShouldShowLeftArrow && (
        <Flex
          w="90px"
          top="0"
          position="absolute"
          left="-20px"
          bottom="0"
          alignItems="center"
          background={`linear-gradient(-270deg, ${
            isWhiteBg ? '#FFF' : '#14142A'
          } 43.16%, hsla(0,0%,100%,0))`}
          zIndex={2}
          onClick={handleClickLeftArrow}
          cursor="pointer"
        >
          <svg
            stroke={isWhiteBg ? 'currentColor' : '#7A72DF'}
            fill={isWhiteBg ? 'currentColor' : '#7A72DF'}
            strokeWidth="0"
            viewBox="0 0 16 16"
            height="30px"
            width="30px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M11.354 1.646a.5.5 0 010 .708L5.707 8l5.647 5.646a.5.5 0 01-.708.708l-6-6a.5.5 0 010-.708l6-6a.5.5 0 01.708 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Flex>
      )}
      <Flex
        w="100%"
        ref={contentBlockRef}
        overflowX="auto"
        overflowY="hidden"
        className="hide-scrollbar"
        zIndex={1}
        style={{ scrollBehavior: 'smooth' }}
      >
        {state?.sliderItems?.length ? (
          <>
            {state.sliderItems.map((offer, index) => (
              <>
                {(index === 3 || (index - 3) % 12 === 0) && (
                  <>
                    {fullProfileData?.isExpert ? (
                      <Flex
                        width="300px"
                        minWidth="300px"
                        height="400px"
                        mr="30px"
                        cursor="pointer"
                        background="#ec8581"
                        borderRadius="7px"
                        flexDirection="column"
                        padding="30px"
                        onClick={handleCreateOfferClick}
                      >
                        <Image
                          w="101px"
                          h="115px"
                          mb="29px"
                          src="/images/sections/categoriesPreviewSlider/hover_image.svg"
                        />
                        {getFormattedHeading(
                          t('header', 'links', 'createOffer'),
                          2,
                          false,
                          {
                            marginBottom: '30px',
                            fontSize: '1.6rem',
                            lineHeight: 1.2,
                            textAlign: 'left',
                            color: '#fff'
                          },
                          { fontWeight: '600', color: '#fff' }
                        )}
                      </Flex>
                    ) : (
                      <Flex
                        width="300px"
                        minWidth="300px"
                        height="400px"
                        mr="30px"
                        cursor="pointer"
                        background="#ec8581"
                        borderRadius="7px"
                        flexDirection="column"
                        padding="30px"
                        onClick={handleBecomeAnExpertClick}
                      >
                        <Image
                          w="101px"
                          h="115px"
                          mb="29px"
                          src="/images/sections/categoriesPreviewSlider/hover_image.svg"
                        />
                        {getFormattedHeading(
                          t(
                            'home',
                            'categoriesPreviewSlider',
                            'becomeAnExpert'
                          ),
                          2,
                          false,
                          {
                            marginBottom: '30px',
                            fontSize: '1.6rem',
                            lineHeight: 1.2,
                            textAlign: 'left',
                            color: '#fff'
                          },
                          { fontWeight: '600', color: '#fff' }
                        )}
                        {!isAuthenticated && (
                          <Button
                            h="50px"
                            w="120px"
                            bg="general.sand"
                            borderRadius="48px"
                            fontSize="0.75rem"
                            lineHeight="34px"
                            color="general.dark"
                            p="19px 32px"
                          >
                            {t('home', 'categoriesPreviewSlider', 'signUp')}
                          </Button>
                        )}
                      </Flex>
                    )}
                  </>
                )}
                <SlideItem key={index} offer={offer} isWhiteBg={isWhiteBg} />
                {index + 1 === state?.sliderItems?.length && state?.isLoading && (
                  <Flex
                    w="300px"
                    mr="30px"
                    height="400px"
                    minWidth="300px"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Spinner color="#ec8581" />
                  </Flex>
                )}
              </>
            ))}
          </>
        ) : (
          <Flex w="100%" justifyContent="center">
            <Spinner color="#ec8581" />
          </Flex>
        )}
      </Flex>
      {arrowState.isShouldShowRightArrow && (
        <Flex
          w="90px"
          position="absolute"
          top="0"
          right="-20px"
          bottom="0"
          alignItems="center"
          justifyContent="flex-end"
          background={`linear-gradient(270deg, ${
            isWhiteBg ? '#FFF' : '#14142A'
          } 43.16%, hsla(0,0%,100%,0))`}
          zIndex={2}
          onClick={handleClickRightArrow}
          cursor="pointer"
        >
          <svg
            stroke={isWhiteBg ? 'currentColor' : '#7A72DF'}
            fill={isWhiteBg ? 'currentColor' : '#7A72DF'}
            strokeWidth="0"
            viewBox="0 0 16 16"
            height="30px"
            width="30px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.646 1.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L10.293 8 4.646 2.354a.5.5 0 010-.708z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Flex>
      )}
    </Flex>
  );
};

export default memo(LatestOffers);
