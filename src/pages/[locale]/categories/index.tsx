import { Flex } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import Layout from '../../../components/layout';
import WithLocale from '../../../hocs/withLocale';
import { ServiceCategories } from '../../../components/serviceCategories';
import { SelectedWorks } from '../../../components/selectedWorks';
import { CategoriesSidebar } from '../../../components/categoriesSidebar';
import useTranslation from '../../../hooks/useTranslation';

const Categories = () => {
  const { t } = useTranslation();
  const selectedWorksTitle = t('offers', 'selectedWorks', 'title');

  return (
    <Layout>
      <Flex w="90%" align="flex-start" pt="99px" m="0 auto">
        <CategoriesSidebar />
        <ServiceCategories width="75%" />
      </Flex>
      <SelectedWorks title={selectedWorksTitle} />
    </Layout>
  );
};

export default WithLocale(Categories);
