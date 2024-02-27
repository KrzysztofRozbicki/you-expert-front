import Layout from '../../../../components/layout';
import withLocale from '../../../../hocs/withLocale';
import OrderDetails from '../../../../components/orderDetails';
import { checkUserAuth } from '../../../../hooks/useCheckAuth';

const OrderDetailsPage = () => {
  checkUserAuth();
  return (
    <Layout containerBackground="#FBFBFD" isDashboard>
      <OrderDetails />
    </Layout>
  );
};

export default withLocale(OrderDetailsPage);
