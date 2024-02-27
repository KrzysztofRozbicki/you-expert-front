import React, { memo, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Flex, Text, Image } from '@chakra-ui/react';
import useTranslation from '../../../hooks/useTranslation';
import SelectController from '../../common/SelectController';
import { ButtonController } from '../../common/ButtonController';
import LinkController from '../../common/LinkController';
import { linkItem } from '../index';
import { CategoryItem } from '../../../common/interfaceTypes';
import Dropdown from './categoriesDropdown';
import TooltipController from '../../common/TooltipController';

interface LinksProps {
  linksList: linkItem[];
  routerData: {
    [key: string]: any;
  };
  translate: Function;
  linkStyle?: {
    [key: string]: any;
  };
  sublinksData?: CategoryItem[];
  onCategorySelect?: Function;
  authAction?: Function;
  onBecomeExpertClick?: Function;
}

const Links: React.FC<LinksProps> = (props) => {
  const {
    routerData,
    linksList,
    translate,
    linkStyle,
    sublinksData,
    onCategorySelect,
    authAction,
    onBecomeExpertClick
  } = props;

  const { t } = useTranslation();
  const currentLocale = routerData.query.locale;
  const { categoryList } = useSelector((state: any) => state.categories);
  const {
    unreadDialogMessages,
    unreadOrderMessages,
    newOrderCount,
    unreadNotificationCount,
    unreadAssignmentsMessagesCount
  } = useSelector((state: any) => state.app);

  const onClick = useCallback(
    (label: string) => {
      if (label === 'becomeAnExpert' && onBecomeExpertClick) {
        onBecomeExpertClick();
      }
    },
    [onBecomeExpertClick]
  );

  const onOptionClick = useCallback((slug: string) => {
    const {
      push,
      query: { locale }
    } = routerData;
    push(`/${locale}/categories/${slug}`);
  }, []);

  const selectedCategory = useMemo((): string => {
    return routerData?.query?.category;
  }, [routerData]);

  return linksList.length ? (
    <>
      {linksList.map((link, linkIndex) => {
        const { label, path, imagePath, type, withDashboard, markProps } = link;
        const key = `${path}-${linkIndex + 1}`;

        if (type === 'select') {
          const formattedOptions = sublinksData.map((item) => {
            return { ...item, value: item.id, label: item.name };
          });
          return (
            <Flex w={{ xl: '150px' }}>
              <SelectController
                // value={{ label, value: label }}
                onChange={onCategorySelect}
                options={formattedOptions}
                placeholder={label}
                asLink={true}
              />
            </Flex>
          );
        }

        if (type === 'button') {
          return (
            <ButtonController
              cp={{ lg: '5px 16px !important' }}
              key={`link-button-${linkIndex + 1}`}
              customStyle={{ minHeight: '30px' }}
              onClick={() => authAction(label)}
            >
              {imagePath && (
                <Image style={{ marginRight: '17px' }} src={imagePath} />
              )}
              {translate('header', 'links', label)}
            </ButtonController>
          );
        }

        if (type === 'link') {
          return (
            <LinkController
              key={key}
              customStyle={{ ...linkStyle, position: 'relative' }}
              keyValue={key}
              href={
                label === 'dashboard' && !!unreadNotificationCount
                  ? `/[locale]${path}/notifications?id=${new Date().getTime()}`
                  : `/[locale]${path}?id=${new Date().getTime()}`
              }
              as={
                label === 'dashboard' && !!unreadNotificationCount
                  ? `/${currentLocale}${path}/notifications?id=${new Date().getTime()}`
                  : `/${currentLocale}${path}?id=${new Date().getTime()}`
              }
              shallow={false}
            >
              {imagePath && (
                <Image
                  style={{ marginRight: '17px' }}
                  src={imagePath}
                  alt={imagePath.split('.', 1)[0]}
                />
              )}
              {translate('header', 'links', label)}
              {markProps?.field === 'unreadNotificationCount' &&
                !!unreadNotificationCount && (
                  <TooltipController
                    text={t('header', 'links', 'youHaveNewNotifications')}
                    placement="bottom"
                  >
                    <Flex
                      position="absolute"
                      right="-20px"
                      top="-20px"
                      height="19px"
                      width="19px"
                      background="#EC8581"
                      borderRadius="12px"
                      alignItems="center"
                      justifyContent="center"
                      fontSize="0.6rem"
                      color="#fff"
                      fontWeight="600"
                      lineHeight="22px"
                      letterSpacing="0.25px"
                    >
                      {unreadNotificationCount}
                    </Flex>
                  </TooltipController>
                )}
              {markProps?.field === 'unreadDialogMessages' &&
                !!unreadDialogMessages && (
                  <Flex
                    position="absolute"
                    right="-20px"
                    top="-20px"
                    height="19px"
                    width="19px"
                    background="#020055"
                    borderRadius="12px"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="0.6rem"
                    color="#fff"
                    fontWeight="600"
                    lineHeight="22px"
                    letterSpacing="0.25px"
                  >
                    {unreadDialogMessages}
                  </Flex>
                )}
              {markProps?.field === 'unreadOrderMessages' &&
                !!(
                  unreadOrderMessages +
                  unreadAssignmentsMessagesCount +
                  newOrderCount
                ) && (
                  <Flex
                    position="absolute"
                    right="-20px"
                    top="-20px"
                    height="19px"
                    width="19px"
                    background={newOrderCount > 0 ? '#EC8581' : '#020055'}
                    borderRadius="12px"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="0.6rem"
                    color="#fff"
                    fontWeight="600"
                    lineHeight="22px"
                    letterSpacing="0.25px"
                  >
                    {unreadOrderMessages +
                      unreadAssignmentsMessagesCount +
                      newOrderCount}
                  </Flex>
                )}
            </LinkController>
          );
        }

        if (type === 'categories-dropdown') {
          return (
            <Dropdown
              title={translate('header', 'links', label)}
              wrapperStyle={linkStyle}
              optionsData={categoryList}
              selectedOption={selectedCategory}
              onOptionClick={(slug: string) => onOptionClick(slug)}
            />
          );
        }

        return (
          <Text
            style={linkStyle || {}}
            cursor="pointer"
            fontSize="18px"
            _hover={{ textDecoration: 'underline' }}
            onClick={() => onClick(label)}
          >
            {imagePath && (
              <Image
                style={{ marginRight: '17px' }}
                src={imagePath}
                alt={imagePath.split('.', 1)[0]}
              />
            )}
            {translate('header', 'links', label)}
          </Text>
        );
      })}
    </>
  ) : (
    <></>
  );
};

export default memo(Links);
