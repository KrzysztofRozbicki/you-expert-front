import Layout from '../../../components/layout';
import { SearchSection } from '../../../components/searchSection';
import WithLocale from '../../../hocs/withLocale';
import PopularCategories from '../../../components/popularCategories';
import { OfferExpertsSection } from '../../../components/offerExpertsSection';
import CategoriesSection from '../../../components/categoriesSection';
import { CategoriesPreviewSlider } from '../../../components/categoriesPreviewSlider';

const Home = () => {
  return (
    <Layout>
      <SearchSection />
      <PopularCategories />
      <OfferExpertsSection />
      <CategoriesPreviewSlider />
    </Layout>
  );
};

export default WithLocale(Home);
