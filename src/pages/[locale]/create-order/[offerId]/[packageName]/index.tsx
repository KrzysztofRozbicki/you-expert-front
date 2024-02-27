import Layout from '../../../../../components/layout';
import withLocale from '../../../../../hocs/withLocale';
import CreateOrder from '../../../../../components/createOrder';
import { checkUserAuth } from '../../../../../hooks/useCheckAuth';

const Createoffer = () => {
  checkUserAuth();
  return (
    <Layout isHideSubMenu containerBackground="#FBFBFD">
      <CreateOrder />
    </Layout>
  );
};

export default withLocale(Createoffer);
