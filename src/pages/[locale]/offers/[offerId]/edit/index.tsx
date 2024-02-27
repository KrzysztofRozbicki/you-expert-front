import Layout from '../../../../../components/layout';
import withLocale from '../../../../../hocs/withLocale';
import EditOffer from '../../../../../components/editOffer';

const EditOfferPage = () => {
  return (
    <Layout isHideSubMenu containerBackground="#FBFBFD">
      <EditOffer />
    </Layout>
  );
};

export default withLocale(EditOfferPage);
