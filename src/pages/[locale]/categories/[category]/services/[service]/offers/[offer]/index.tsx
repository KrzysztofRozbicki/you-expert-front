import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Flex } from '@chakra-ui/react';
import Layout from '../../../../../../../../components/layout';
import WithLocale from '../../../../../../../../hocs/withLocale';
import { OfferInformationAndOpportunities } from '../../../../../../../../components/offerInformationAndOpportunities';
import { OfferDescription } from '../../../../../../../../components/offerDescription';
import { AboutCreator } from '../../../../../../../../components/aboutCreator';
import { Opinions } from '../../../../../../../../components/opinions';
import { PopularTags } from '../../../../../../../../components/popularTags';
import { SelectedWorks } from '../../../../../../../../components/selectedWorks';
import Breadcrumbs from '../../../../../../../../components/common/breadcrumbs';
import { useOfferBreadcrumbs } from '../../../../../../../../hooks/useOfferBreadcrumbs';
import {
  getOfferByIdAsyncAction,
  getPublickUserDataByIdAsyncAction,
  setCurrentOffer,
  setPublicProfileDataAction
} from '../../../../../../../../redux/actions/offers';
import { PUBLIC_URL } from '../../../../../../../../common/constants';
import { apiHost } from '../../../../../../../../api/common';

const OfferCategory = ({ offer }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const breadcrumbs = useOfferBreadcrumbs();

  useEffect(() => {
    getOfferByIdAsyncAction(router?.query?.offer as string)
      .then((data: any) => {
        dispatch(setCurrentOffer(data));
        return getPublickUserDataByIdAsyncAction(data?.expert?.id);
      })
      .then((data: any) => dispatch(setPublicProfileDataAction(data)))
      .catch(() => router?.push(`/${router?.query?.locale}/home`));

    return () => {
      dispatch(setCurrentOffer(null));
    };
  }, []);

  return (
    <>
      <Head>
        <title>{offer?.title}</title>
        <meta name="description" content={offer?.description} />

        <meta property="og:title" content={offer?.title} />
        <meta property="og:description" content={offer?.description} />
        <meta
          property="og:image"
          content={
            offer?.representationImage
              ? offer?.representationImage
              : `${PUBLIC_URL}images/sections/offer_image.png`
          }
        />
      </Head>
      <Layout>
        <Flex borderBottom="4px solid #DCDCF4" direction="column" pb="126px">
          <Breadcrumbs
            renderItems={breadcrumbs}
            wrapperStyle={{ marginBottom: '0' }}
            wrapperProps={{ mt: { sm: '15px', lg: '38px' } }}
          />
          <OfferInformationAndOpportunities />
          <OfferDescription />
          <AboutCreator />
          <Opinions />
          <PopularTags />
        </Flex>
        <SelectedWorks />
      </Layout>
    </>
  );
};

OfferCategory.getInitialProps = async (ctx) => {
  const { offer } = ctx.query;

  // Fetch data from external API
  const res = await fetch(`${apiHost}/offers/${offer}/`, { method: 'GET' });
  const data = await res.json();

  // Pass data to the page via props
  return { offer: data };
};

export default WithLocale(OfferCategory);
