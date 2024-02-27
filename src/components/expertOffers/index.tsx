import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { Flex } from '@chakra-ui/react';
import OfferItem from '../offerItem';
import { ButtonController } from '../common/ButtonController';
import useTranslation from '../../hooks/useTranslation';
import {
  activateOfferAction,
  deactivateOfferAction
} from '../../redux/actions/offers';
import { addCurrentOfferToStore } from '../../redux/actions/offers';

const ExpertOffers = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { profileData } = props;

  if (!profileData) return null;
  const { user_id } = profileData;

  const showLike = props.currentUserId !== props.logginedUserId;
  const isCurrentUserAccount = props.currentUserId === props.logginedUserId;

  const { t } = useTranslation();

  const [offersLimit, setLimit] = useState({ currentCount: 0, count: 10 });
  const { currentCount, count } = offersLimit;
  const { offers } = props.profileData;

  const onCheck = (id: number, isActive: boolean) => {
    if (isActive) {
      dispatch(activateOfferAction(id));
    } else {
      dispatch(deactivateOfferAction(id));
    }
  };

  const onOfferClick = (offer: any) => {
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
    router.push(routerString);
  };

  const renderOffers = (offers: any) => {
    return offers.map((item, itemIndex) => {
      return (
        <OfferItem
          previewMode={true}
          w={{ sm: '100%', md: '50%', lg: '33%', xl: '50%' }}
          offerData={{ ...item }}
          key={`${item.name}-${itemIndex + 1}`}
          {...item}
          hideTitle={true}
          showLike={showLike}
          isCurrentUserAccount={isCurrentUserAccount}
          onCheck={onCheck}
          onClick={onOfferClick}
          infoWrapperStyle={{ height: '80px' }}
          desktopWrapperProps={{ maxWidth: '320px' }}
        />
      );
    });
  };

  const renderShowMoreButton = (offersLength: number) => {
    if (offersLength <= count) return null;
    return (
      <ButtonController
        customStyle={{ marginRight: 'auto' }}
        variant="darkPurpul"
      >
        {t('common', 'showMore', 'offers')}
      </ButtonController>
    );
  };
  return (
    <Flex direction="column" w="100%" m={{ md: '0 auto' }}>
      {offers && offers.length ? (
        <Flex
          wrap="wrap"
          justifyContent={{ sm: 'center', md: 'space-between' }}
        >
          {renderOffers(offers)}
        </Flex>
      ) : (
        <Flex fontSize="22px">{t('common', 'labels', 'noOffers')}</Flex>
      )}
      {offers && offers.length
        ? renderShowMoreButton(offers.length)
        : t('common', 'labels', 'noData')}
    </Flex>
  );
};

export default ExpertOffers;
