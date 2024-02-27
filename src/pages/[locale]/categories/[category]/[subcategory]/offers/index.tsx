import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Flex, Spinner } from '@chakra-ui/react';
import { OffersState } from '../../../../../../common/interfaceTypes';
import { getAllOffersAction, resetOffersAction } from '../../../../../../redux/actions/offers';
import { MAX_OFFER_SECTION } from '../../../../../../common/constants';
import Layout from '../../../../../../components/layout';
import WithLocale from '../../../../../../hocs/withLocale';
import { Filters } from '../../../../../../components/filters';
import { OffersList } from '../../../../../../components/offersList';
import CreateAccountPreview from '../../../../../../components/createAccountPreview';
import { SelectedWorks } from '../../../../../../components/selectedWorks';
import useTranslation from '../../../../../../hooks/useTranslation';
import ServicesList from '../../../../../../components/servicesList';
import Breadcrumbs from '../../../../../../components/common/breadcrumbs';
import { useCategoriesBreadcrumbs } from '../../../../../../hooks/useCategoriesBreadcrumbs';

const Offers = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const [services, setServices] = useState<any[]>([]);
  const { categoryList } = useSelector((state: any) => state.categories);
  const { offers, loading } = useSelector((state: OffersState) => state.offers);
  const breadcrumbs = useCategoriesBreadcrumbs();

  const onServiceClick = useCallback(
    (serviceItem: any): void => {
      if (serviceItem?.slug) {
        const {
          push,
          query: { locale, category, subcategory }
        } = router;

        push(
          `/${locale}/categories/${category}/${subcategory}/services/${serviceItem?.slug}/offers`
        );
      }
    },
    [router]
  );

  useEffect(() => {
    const { category, subcategory, service, locale } = router.query;
    const selectedCategory = categoryList?.find(
      (item) => item?.slug === category
    );

    if (!selectedCategory) {
      router?.push(`/${locale}/home`);
      return;
    }

    const selectedSubcategory = selectedCategory?.subcategories?.find(
      (item) => item?.slug === subcategory
    );

    if (!selectedSubcategory) {
      router?.push(`/${locale}/home`);
      return;
    }

    if (!!selectedSubcategory?.services?.length) {
      setServices(selectedSubcategory?.services);
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
      <OffersList offers={offers.slice(0, MAX_OFFER_SECTION)} />
      <CreateAccountPreview />
      {offers.length > MAX_OFFER_SECTION && (
        <OffersList offers={offers.slice(MAX_OFFER_SECTION)} />
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
