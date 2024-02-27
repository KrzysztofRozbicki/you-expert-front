import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { OffersState } from '../../../../../../../common/interfaceTypes';
import { getAllOffersAction } from '../../../../../../../redux/actions/offers';
import { MAX_OFFER_SECTION } from '../../../../../../../common/constants';
import Layout from '../../../../../../../components/layout';
import WithLocale from '../../../../../../../hocs/withLocale';
import { Filters } from '../../../../../../../components/filters';
import { OffersList } from '../../../../../../../components/offersList';
import CreateAccountPreview from '../../../../../../../components/createAccountPreview';
import { SelectedWorks } from '../../../../../../../components/selectedWorks';
import useTranslation from '../../../../../../../hooks/useTranslation';

const Service = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const { offers } = useSelector((state: OffersState) => state.offers);

  useEffect(() => {
    const { category, subcategory } = router.query;
    const params = { category, subcategory };
    dispatch(getAllOffersAction(params));
  }, [router.asPath]);

  return (
    <>
      <Filters />
      <OffersList offers={offers.slice(0, MAX_OFFER_SECTION)} />
      <CreateAccountPreview />
      {offers.length > MAX_OFFER_SECTION && (
        <OffersList offers={offers.slice(MAX_OFFER_SECTION)} />
      )}
      <SelectedWorks title={t('offers', 'selectedWorks', 'title')} />
    </>
  );
};

const ServicePage = () => {
  return (
    <Layout>
      <Service />
    </Layout>
  );
};

export default WithLocale(ServicePage);
