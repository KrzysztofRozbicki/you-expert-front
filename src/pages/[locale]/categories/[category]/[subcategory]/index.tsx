import { Heading } from '@chakra-ui/react';
import Layout from '../../../../../components/layout';
import WithLocale from '../../../../../hocs/withLocale';

const SubCategory = () => {
  return (
    <Layout>
      <Heading>Category</Heading>
    </Layout>
  );
};

export default WithLocale(SubCategory);
