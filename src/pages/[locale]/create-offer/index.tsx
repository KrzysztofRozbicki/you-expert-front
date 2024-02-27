import Layout from '../../../components/layout';
import withLocale from '../../../hocs/withLocale';
import CreateOffer from '../../../components/createOffer';
import { checkUserAuth } from '../../../hooks/useCheckAuth';

const CreateOfferPage = () => {
  checkUserAuth();
  return (
    <Layout isHideSubMenu containerBackground="#FBFBFD">
      <CreateOffer />
    </Layout>
  );
};

export default withLocale(CreateOfferPage);
