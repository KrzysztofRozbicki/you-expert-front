import { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Flex, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { OffersState } from '../../../../../common/interfaceTypes';
import {
  getAllOffersAction,
  resetOffersAction
} from '../../../../../redux/actions/offers';
import { MAX_OFFER_SECTION } from '../../../../../common/constants';
import Layout from '../../../../../components/layout';
import Breadcrumbs from '../../../../../components/common/breadcrumbs';
import { useCategoriesBreadcrumbs } from '../../../../../hooks/useCategoriesBreadcrumbs';
import WithLocale from '../../../../../hocs/withLocale';
import { Filters } from '../../../../../components/filters';
import { OffersList } from '../../../../../components/offersList';
import CreateAccountPreview from '../../../../../components/createAccountPreview';
import { SelectedWorks } from '../../../../../components/selectedWorks';
import useTranslation from '../../../../../hooks/useTranslation';
import ServicesList from '../../../../../components/servicesList';

const Offers = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const breadcrumbs = useCategoriesBreadcrumbs();
  const [services, setServices] = useState<any[]>([]);
  const { categoryList } = useSelector((state: any) => state.categories);
  const { offers, loading } = useSelector((state: OffersState) => state.offers);

  const onServiceClick = useCallback(
    (serviceItem: any): void => {
      if (serviceItem?.slug) {
        const {
          push,
          query: { locale, category }
        } = router;

        push(
          `/${locale}/categories/${category}/services/${serviceItem?.slug}/offers`
        );
      }
    },
    [router]
  );

  useEffect(() => {
    if (!categoryList?.length) {
      return;
    }

    const { category, subcategory, service, locale } = router.query;
    const selectedCategory = categoryList?.find(
      (item) => item?.slug === category
    );

    if (!selectedCategory) {
      router?.push(`/${locale}/home`);
      return;
    }

    if (!!selectedCategory?.subcategories?.length) {
      router?.push(`/${locale}/categories/${selectedCategory?.slug}`);
      return;
    }

    if (!!selectedCategory?.services?.length) {
      setServices(selectedCategory?.services);
    } else {
      setServices([]);
    }

    dispatch(getAllOffersAction({ category, subcategory, service }));

    return () => {
      dispatch(resetOffersAction());
    };
  }, [router, categoryList]);

  return (
    <>
      <Breadcrumbs
        renderItems={breadcrumbs}
        wrapperStyle={{ marginBottom: '0px' }}
        wrapperProps={{ mt: { sm: '15px', lg: '38px' } }}
      />
      <ServicesList servicesList={services} onServiceClick={onServiceClick} />
      <Filters wrapperProps={{ p: '34px 0 28px 0' }} />
      <OffersList offers={offers?.slice(0, MAX_OFFER_SECTION)} />
      <CreateAccountPreview />
      {offers.length > MAX_OFFER_SECTION && (
        <OffersList offers={offers?.slice(MAX_OFFER_SECTION)} />
      )}
      <SelectedWorks title={t('offers', 'selectedWorks', 'title')} />
    </>
  );
};

const OfferPage = () => {
  return (
    <Layout>
      <Offers />
    </Layout>
  );
};

export default WithLocale(OfferPage);
