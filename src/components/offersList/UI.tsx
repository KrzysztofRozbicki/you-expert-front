import { memo } from 'react';
import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import OfferItem from '../offerItem';
import { addCurrentOfferToStore } from '../../redux/actions/offers';

export interface Offer {
  id: number;
  name: string;
  profession: string;
  generalImage: string;
  ratingCount: string;
  rate: string;
  title: string;
  service?: {
    slug: string;
  };
  serviceCategory?: {
    slug: string;
  };
  serviceSubcategory?: {
    slug: string;
  };
}

const UI = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { offers } = props;

  const onOfferClick = (offer: Offer) => {
    let routerString, categorySlug, subcategorySlug, serviceSlug;
    const { locale, category, subcategory, service } = router.query;

    if (category || subcategory) {
      categorySlug = category;
      subcategorySlug = subcategory;
      serviceSlug = service
    } else {
      categorySlug = offer?.serviceCategory?.slug;
      subcategorySlug = offer?.serviceSubcategory?.slug;
      serviceSlug = offer?.service?.slug;
    }

    dispatch(addCurrentOfferToStore(offer));

    if (categorySlug && subcategorySlug && serviceSlug) {
      routerString = `/${locale}/categories/${categorySlug}/${subcategorySlug}/services/${serviceSlug}/offers/${offer.id}`;
    } else if (categorySlug && subcategorySlug && !serviceSlug) {
      routerString = `/${locale}/categories/${categorySlug}/${subcategorySlug}/offers/${offer.id}`;
    } else if (categorySlug && serviceSlug && !subcategorySlug) {
      routerString = `/${locale}/categories/${categorySlug}/services/${serviceSlug}/offers/${offer.id}`;
    } else if (categorySlug && !subcategorySlug && !serviceSlug) {
      routerString = `/${locale}/categories/${categorySlug}/offers/${offer.id}`;
    }

    if (routerString) {
      router.push(routerString);
    }
  };

  const renderList = (items: Offer[]) => {
    return items.map((item, itemIndex) => {
      return (
        <OfferItem
          infoWrapperStyle={{ height: '224px' }}
          onClick={onOfferClick}
          offerData={{ ...item }}
          key={`${item.name}-${itemIndex + 1}`}
          {...item}
        />
      );
    });
  };

  return (
    <Flex justifyContent="center" w="100%">
      <Flex w="100%" justify="flex-start" wrap="wrap">
        {renderList(offers)}
      </Flex>
    </Flex>
  );
};

export default memo(UI);
