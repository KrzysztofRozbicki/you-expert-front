import React, { useEffect, memo, useMemo, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Flex } from '@chakra-ui/react';
import Header from '../header';
import Footer from '../footer';
import SubMenu from '../subMenu';
import { useCheckAuth } from '../../hooks/useCheckAuth';
import { LayoutProps } from './interfaces';
import {
  setCurrentLocale,
  setWindowWidthAction,
  getUnreadMessagesState
} from '../../redux/actions/app';
import { getInitialLocale } from '../../translations/getInitialLocale';
import { getCategoriesTreeAction } from '../../redux/actions/caregories';
import ModalController from '../common/modalController';

const getHead = (title, description, keywords) => {
  if (
    typeof window !== 'undefined' &&
    window.location.hostname !== 'localhost'
  ) {
    return (
      <Head>
        <title>{title || 'You expert'}</title>
        {description && <meta name="description" content={description} />}
        {keywords && <meta name="keywords" content={keywords} />}
      </Head>
    );
  }

  return null;
};

const Layout: React.FC<LayoutProps> = (props) => {
  const {
    pageTitle,
    pageDescription,
    keywords,
    children,
    isHideSubMenu,
    containerBackground = '#fff',
    authState,
    isDashboard
  } = props;
  const timerRef = useRef<any>(null);
  const { pathname } = useRouter();
  const dispatch = useDispatch();
  const { categoryList } = useSelector((state: any) => state.categories);
  const isAuthenticated = useSelector(
    (state: any): boolean | null => state.user.isAuthenticated
  );

  useCheckAuth();

  const isShouldAddMaxWidthClassName = useMemo((): boolean => {
    const exceptions = ['home', 'inbox', 'reset-password'];
    return !exceptions.some((exc) => pathname?.includes(exc));
  }, [pathname]);

  const handleResize = useCallback(() => {
    if (window && window?.screen && window?.screen?.width) {
      dispatch(setWindowWidthAction(window?.screen?.width));
    }
  }, [dispatch]);

  const getUnreadMessages = useCallback(() => {
    dispatch(getUnreadMessagesState());
    timerRef.current = setTimeout(getUnreadMessages, 60000);
  }, [timerRef?.current, dispatch]);

  useEffect(() => {
    const locale = getInitialLocale();
    dispatch(setCurrentLocale(locale));

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!categoryList?.length) {
      dispatch(getCategoriesTreeAction());
    }
  }, [categoryList]);

  useEffect(() => {
    if (isAuthenticated) {
      getUnreadMessages();
    }

    return () => {
      try {
        if (timerRef?.current) {
          clearTimeout(timerRef.current);
        }
      } catch (e) {
        console.error(e);
      }
    };
  }, [isAuthenticated]);

  return (
    <React.Fragment>
      {getHead(pageTitle, pageDescription, keywords)}
      <Flex direction="column" bg={containerBackground}>
        <Header authState={authState} />
        {!isHideSubMenu && <SubMenu isDashboard={isDashboard} />}
        {isAuthenticated !== null && (
          <Flex w="100%" alignItems="center" flexDirection="column">
            {isShouldAddMaxWidthClassName ? (
              <div className="max-width-container max-width-container-paddings">
                {children}
              </div>
            ) : (
              children
            )}
          </Flex>
        )}
        <Footer />
      </Flex>
      <ModalController />
    </React.Fragment>
  );
};

export default memo(Layout);
