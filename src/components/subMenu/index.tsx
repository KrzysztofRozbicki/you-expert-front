import { useEffect, memo, useState, useRef, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Flex } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import useTranslation from '../../hooks/useTranslation';
import { DataObject } from '../../common/interfaceTypes';
import { CategoryState, CategoryItem } from '../../common/interfaceTypes';
import NavigationDropdown from '../common/NavigationDropdown';
import { getCategoriesTreeAction } from '../../redux/actions/caregories';
import LinkController from '../common/LinkController';
import { dashboardConfiguration } from './common';

interface routerObject {
  [key: string]: any;
}

const renderContent = (
  linkItems: CategoryItem[],
  linkStyle: DataObject,
  routerData: routerObject,
  translate: Function,
  isDashboard: boolean
) => {
  if (!linkItems || !linkItems.length) return null;

  const currentLocale = routerData.query.locale;

  const getIsActive = (slug: string): boolean => {
    if (
      slug === 'dashboard' &&
      (routerData.asPath.includes('dashboard') ||
        routerData.asPath.includes('profile')) &&
      !linkItems
        .slice(1)
        .some((item) => routerData.asPath.includes(item?.slug)) &&
      !routerData.asPath.includes('assignments')
    ) {
      return true;
    }

    if (
      slug !== 'dashboard' &&
      routerData.asPath.includes('dashboard') &&
      routerData.asPath.includes(slug)
    ) {
      return true;
    }

    if (
      slug === 'orders' &&
      (routerData.asPath.includes('order-details') ||
        routerData.asPath.includes('assignments'))
    ) {
      return true;
    }

    return false;
  };

  return linkItems.map((link) => {
    if (isDashboard) {
      const { id, slug } = link;
      const isActive = getIsActive(slug);
      const redirectLink =
        slug !== 'dashboard'
          ? `/${currentLocale}/dashboard/${slug}/`
          : `/${currentLocale}/${slug}/`;

      return (
        <LinkController
          customStyle={{
            fontWeight: isActive ? '700' : '400',
            margin: '20px 3% 20px 0',
            padding: '6px'
          }}
          key={id}
          href={
            slug !== 'dashboard'
              ? `/[locale]/dashboard/${slug}/`
              : `/[locale]/${slug}/`
          }
          as={redirectLink}
        >
          {translate('header', 'dashboard', slug)}
        </LinkController>
      );
    }

    return <NavigationDropdown locale={currentLocale} {...link} />;
  });
};
const linksStyle = { clolr: '#020055', margin: '0 10px', textAlign: 'center' };

interface SubMenuArrowsState {
  isShouldShowRightArrow: boolean;
  isShouldShowLeftArrow: boolean;
}

const SubMenu = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const contentBlockRef = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation();
  const { categoryList } = useSelector(
    (state: CategoryState) => state.categories
  );
  const [isDashboard, setIsDashboard] = useState<boolean>(false);
  const [arrowState, setArrowState] = useState<SubMenuArrowsState>({
    isShouldShowLeftArrow: false,
    isShouldShowRightArrow: false
  });

  const chechMenuType = () => {
    if (
      router.route.includes('dashboard') ||
      router.route.includes('profile') ||
      props?.isDashboard
    ) {
      setIsDashboard(true);
    }
  };

  const handleScroll = useCallback(() => {
    if (wrapperRef?.current && contentBlockRef?.current) {
      const newArrowState: SubMenuArrowsState = {
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

      setArrowState(newArrowState);
    }
  }, [wrapperRef?.current, contentBlockRef?.current]);

  const handleClickRightArrow = useCallback(() => {
    if (contentBlockRef?.current) {
      contentBlockRef.current.scrollLeft =
        contentBlockRef?.current?.scrollLeft +
        contentBlockRef?.current?.clientWidth;
    }
  }, [contentBlockRef?.current]);

  const handleClickLeftArrow = useCallback(() => {
    if (contentBlockRef?.current) {
      contentBlockRef.current.scrollLeft =
        contentBlockRef?.current?.scrollLeft -
        contentBlockRef?.current?.clientWidth;
    }
  }, [contentBlockRef?.current]);

  useEffect(() => {
    chechMenuType();
  }, []);

  useEffect(() => {
    if (contentBlockRef?.current) {
      handleScroll();
      contentBlockRef?.current?.addEventListener('scroll', handleScroll);
    }
    return () => {
      contentBlockRef?.current?.removeEventListener('scroll', handleScroll);
    };
  }, [contentBlockRef?.current, wrapperRef?.current]);

  if (!categoryList || !categoryList.length) return null;

  return (
    <Flex
      align="center"
      justifyContent="center"
      bg="general.grayViolet"
      fontSize="0.8rem"
    >
      <Flex
        w="100%"
        className="max-width-container max-width-container-paddings"
        ref={wrapperRef}
        position="relative"
      >
        {arrowState.isShouldShowLeftArrow && (
          <Flex
            w="90px"
            position="absolute"
            left="0"
            top="0"
            bottom="0"
            alignItems="center"
            background="linear-gradient(-270deg, #F0F0FA 43.16%, hsla(0,0%,100%,0))"
            zIndex={1}
            onClick={handleClickLeftArrow}
            cursor="pointer"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
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
        {arrowState.isShouldShowRightArrow && (
          <Flex
            w="90px"
            position="absolute"
            right="0"
            top="0"
            bottom="0"
            alignItems="center"
            justifyContent="flex-end"
            background="linear-gradient(270deg, #F0F0FA 43.16%, hsla(0,0%,100%,0))"
            zIndex={1}
            onClick={handleClickRightArrow}
            cursor="pointer"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
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
        <Flex
          w="100%"
          justify={isDashboard ? 'start' : 'space-between'}
          overflowX="auto"
          className="hide-scrollbar"
          ref={contentBlockRef}
          style={{ scrollBehavior: 'smooth' }}
        >
          {renderContent(
            isDashboard ? dashboardConfiguration : categoryList,
            linksStyle,
            router,
            t,
            isDashboard
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default memo(SubMenu);
