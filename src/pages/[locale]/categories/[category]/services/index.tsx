import { Flex } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import Layout from '../../../../../components/layout';
import WithLocale from '../../../../../hocs/withLocale';
import { CategoriesSidebar } from '../../../../../components/categoriesSidebar';

const Categories = () => {
  return (
    <Layout>
      <Flex w="90%" align="flex-start" pt="99px" m="0 auto">
        <CategoriesSidebar />
      </Flex>
    </Layout>
  );
};

export default WithLocale(Categories);
