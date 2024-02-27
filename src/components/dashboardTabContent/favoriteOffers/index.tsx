import React, { memo, useCallback, useState, useEffect } from 'react';
import { Flex, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { getOffersAction } from './actions';
import OfferItem from '../../offerItem';

const FavoriteOffers: React.FC = () => {
  const { push, query } = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [offers, setOffers] = useState<any[]>([]);

  const handleGetOffers = useCallback(() => {
    setIsLoading(true);
    getOffersAction()
      .then((data) => setOffers(data))
      .catch((e) => console.error(e))
      .finally(() => setIsLoading(false));
  }, []);

  const handleUnfollow = useCallback(
    (id: number) => {
      const newOffers = offers.filter((item) => item?.id !== id);
      setOffers([...newOffers]);
    },
    [offers]
  );

  const onOfferClick = useCallback(
    (offer) => {
      let routerString;
      const { service, serviceCategory, serviceSubcategory } = offer;
      const category =
        serviceCategory && serviceCategory.slug ? serviceCategory.slug : null;
      const subcategory =
        serviceSubcategory && serviceSubcategory.slug
          ? serviceSubcategory.slug
          : null;
      const { locale } = query;

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
        push(routerString);
      }
    },
    [push, query]
  );

  useEffect(() => {
    handleGetOffers();
  }, []);

  return (
    <Flex
      key={offers?.length}
      wrap="wrap"
      justify={{ sm: 'center', md: 'space-between' }}
      w="100%"
      p={{ sm: '20px', lg: '60px' }}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {offers.map((item, itemIndex) => (
            <OfferItem
              desktopWrapperProps={{ maxWidth: '320px' }}
              infoWrapperStyle={{ height: '224px' }}
              w={{ sm: '100%', lg: '50%', xl: '50%' }}
              onClick={onOfferClick}
              offerData={{ ...item }}
              key={itemIndex}
              {...item}
              unfollowFilter={handleUnfollow}
              showLike={true}
            />
          ))}
        </>
      )}
    </Flex>
  );
};

export default memo(FavoriteOffers);
