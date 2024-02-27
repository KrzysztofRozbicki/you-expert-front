import WithLocale from '../../../../../hocs/withLocale';
import Layout from '../../../../../components/layout';
import { SearchSection } from '../../../../../components/searchSection';
import PopularCategories from '../../../../../components/popularCategories';
import { CategoriesPreviewSlider } from '../../../../../components/categoriesPreviewSlider';
import { OfferExpertsSection } from '../../../../../components/offerExpertsSection';

const UserToken = () => {
  return (
    <Layout authState="resetPassword">
      <SearchSection />
      <PopularCategories />
      <OfferExpertsSection />
      <CategoriesPreviewSlider />
    </Layout>
  );
};

export default WithLocale(UserToken);
