import Layout from '../../../../components/layout';
import withLocale from '../../../../hocs/withLocale';
import { checkUserAuth } from '../../../../hooks/useCheckAuth';

const BecomeAnExpertPage = () => {
  checkUserAuth();
  return (
    <Layout isHideSubMenu containerBackground="#FBFBFD">
      Become an expert page (in development...)
    </Layout>
  );
};

export default withLocale(BecomeAnExpertPage);
