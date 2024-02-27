import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { OffersState } from '../../../../../../../common/interfaceTypes';
import {
  getAllOffersAction,
  resetOffersAction
} from '../../../../../../../redux/actions/offers';
import { MAX_OFFER_SECTION } from '../../../../../../../common/constants';
import Layout from '../../../../../../../components/layout';
import WithLocale from '../../../../../../../hocs/withLocale';
import { Filters } from '../../../../../../../components/filters';
import { OffersList } from '../../../../../../../components/offersList';
import CreateAccountPreview from '../../../../../../../components/createAccountPreview';
import { SelectedWorks } from '../../../../../../../components/selectedWorks';
import useTranslation from '../../../../../../../hooks/useTranslation';
import Breadcrumbs from '../../../../../../../components/common/breadcrumbs';
import { useCategoriesBreadcrumbs } from '../../../../../../../hooks/useCategoriesBreadcrumbs';

const Offers = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const breadcrumbs = useCategoriesBreadcrumbs();
  const { offers } = useSelector((state: OffersState) => state.offers);

  useEffect(() => {
    const { category, subcategory, service } = router.query;
    const params = { category, subcategory, service };
    dispatch(getAllOffersAction(params));

    return () => {
      dispatch(resetOffersAction());
    };
  }, [router.asPath]);

  return (
    <>
      <Breadcrumbs
        renderItems={breadcrumbs}
        wrapperStyle={{ marginBottom: '0px' }}
        wrapperProps={{ mt: { sm: '15px', lg: '38px' } }}
      />
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
