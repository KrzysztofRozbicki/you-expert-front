import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@chakra-ui/react';
import UI from './UI';
import { editUserAction } from '../../redux/actions/user';
import {
  getFollowingOffersAction,
  addCurrentOfferToStore
} from '../../redux/actions/offers';
import {
  AppState,
  UserState,
  OffersState
} from '../../common/interfaceTypes';
import useTranslation from '../../hooks/useTranslation';
import { TabContentProps } from './common';
import { toBase64, getFileNameFromUrl } from '../../utils';

const DashboardTabContent: React.FC<TabContentProps> = ({
  currentAction,
  hideTitle,
  customTitles,
  onTabClick,
  orders,
  is_expert,
  contentWrapperStyle,
  isShouldShowInvoiceColumn
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const toast = useToast();
  const router = useRouter();
  const { profileData, fullProfileData } = useSelector(
    (state: UserState) => state.user
  );
  const profileIsExpert =
    profileData && profileData.is_expert ? profileData.is_expert : false;
  const { currentLocale } = useSelector((state: AppState) => state.app);
  const { expertOffers } = useSelector((state: OffersState) => state.offers);

  const [formattedOffers, setFormattedOffers] = useState(expertOffers);

  const unfollowFilter = (id: string) => {
    const updatedOffers = formattedOffers.filter((i) => i.id !== id);
    setFormattedOffers(updatedOffers);
  };

  useEffect(() => {
    if (expertOffers && expertOffers.length) {
      setFormattedOffers(expertOffers);
    }
  }, [expertOffers]);

  const ordersLoading = useSelector((state: any) => state.orders.loading);

  const [actionsData, setData] = useState({
    account: {
      ...profileData,
      ...fullProfileData,
      avatar: profileData?.avatar_url
        ? {
            id: new Date().getTime(),
            file: fullProfileData?.avatarUrl,
            filename: getFileNameFromUrl(fullProfileData?.avatarUrl)
          }
        : null
    },
    businessInformation: {
      ...profileData,
      termsAndServices: false
    },
    orders: {}
  });
  const [activeTitle, setActiveTitle] = useState('current');

  const onFieldChange = (newData: string, fieldType: string, field: string) => {
    setData((prevState) => ({
      ...prevState,
      [fieldType]: { ...prevState[fieldType], [field]: newData }
    }));
  };

  const handleSaveImages = useCallback(
    async (file: File): Promise<void> => {
      if (!file) {
        return;
      }

      const fileBase64 = await toBase64(file).catch((e) => Error(e));
      if (fileBase64 instanceof Error) {
        return;
      }

      setData((prevState) => ({
        ...prevState,
        account: {
          ...prevState.account,
          avatar: {
            id: new Date().getTime(),
            filename: file.name,
            file: fileBase64
          }
        }
      }));
    },
    [setData]
  );

  const handleDeleteFile = useCallback((): void => {
    setData((prev) => ({
      ...prev,
      account: { ...prev.account, avatar: null }
    }));
  }, [actionsData, setData]);

  const saveProfileData = async (
    user_id: number | string,
    fieldType: string
  ) => {
    try {
      const data = JSON.parse(JSON.stringify(actionsData[fieldType]));
      if (fieldType === 'account' && data?.avatar_url === data?.avatar?.file) {
        delete data.avatar;
      }
      const { title, description, firstName, lastName, avatar } = data;

      let formattedEditData: any = { firstName, lastName };
      if (avatar) {
        formattedEditData = { ...formattedEditData, avatar };
      }
      if (is_expert) {
        if (title) {
          formattedEditData = { ...formattedEditData, title };
        }
        if (description) {
          formattedEditData = { ...formattedEditData, description };
        }
      }

      await dispatch(editUserAction(user_id, formattedEditData));
      toast({
        title: t('common', 'account', 'editToastTitle'),
        description: t('common', 'account', 'editToastDescription'),
        status: 'success',
        duration: 4000,
        isClosable: true
      });
    } catch {
      toast({
        title: t('dashboard', 'toasts', 'cantSaveData'),
        description: t('dashboard', 'toasts', 'smthWentWrong'),
        status: 'error',
        duration: 4000,
        isClosable: true
      });
    }
  };

  const saveAccountDetails = (user_id: number | string, fieldType: string) => {
    try {
      if (fieldType === 'businessInformation') {
        if (actionsData.businessInformation.termsAndServices) {
          saveProfileData(user_id, fieldType);
          return;
        } else {
          return toast({
            description: t('common', 'account', 'termsAndServiceDescription'),
            status: 'info',
            duration: 4000,
            isClosable: true
          });
        }
        return;
      } else {
        saveProfileData(user_id, fieldType);
      }
    } catch {
      toast({
        title: t('dashboard', 'toasts', 'cantSaveData'),
        description: t('dashboard', 'toasts', 'smthWentWrong'),
        status: 'error',
        duration: 4000,
        isClosable: true
      });
    }
  };

  useEffect(() => {
    dispatch(getFollowingOffersAction());
  }, []);

  const handleSelectItem = () => {
    setData((prevState) => ({
      ...prevState,
      businessInformation: {
        ...prevState.businessInformation,
        termsAndServices: !actionsData.businessInformation.termsAndServices
      }
    }));
  };

  const onOfferClick = (offer) => {
    let routerString;
    const { service, serviceCategory, serviceSubcategory } = offer;
    const category =
      serviceCategory && serviceCategory.slug ? serviceCategory.slug : null;
    const subcategory =
      serviceSubcategory && serviceSubcategory.slug
        ? serviceSubcategory.slug
        : null;
    const { locale } = router.query;
    dispatch(addCurrentOfferToStore(offer));

    if (category && subcategory && service && service.slug) {
      routerString = `/${locale}/categories/${category}/${subcategory}/services/${service.slug}/offers/${offer.id}`;
    } else if (category && subcategory && !service) {
      routerString = `/${locale}/categories/${category}/${subcategory}/offers/${offer.id}`;
    } else if (category && service && service.slug && !subcategory) {
      routerString = `/${locale}/categories/${category}/services/${service.slug}/offers/${offer.id}`;
    } else if (category && !subcategory && !service) {
      routerString = `/${locale}/categories/${category}/offers/${offer.id}`;
    }

    if (routerString) {
      router.push(routerString);
    }
  };

  const onTitleClick = (titleLabel: string) => {
    setActiveTitle(titleLabel);
    onTabClick(titleLabel);
  };

  return (
    <UI
      onOfferClick={onOfferClick}
      currentAction={currentAction}
      offers={formattedOffers}
      hideTitle={hideTitle}
      actionsData={actionsData}
      onFieldChange={onFieldChange}
      onButtonClick={saveAccountDetails}
      customTitles={customTitles}
      activeTitle={activeTitle}
      onTitleClick={onTitleClick}
      orders={orders}
      is_expert={profileIsExpert}
      handleSaveImages={handleSaveImages}
      handleDeleteFile={handleDeleteFile}
      handleSelectItem={handleSelectItem}
      contentWrapperStyle={contentWrapperStyle}
      unfollowFilter={unfollowFilter}
      isShouldShowInvoiceColumn={isShouldShowInvoiceColumn}
    />
  );
};

export default DashboardTabContent;
