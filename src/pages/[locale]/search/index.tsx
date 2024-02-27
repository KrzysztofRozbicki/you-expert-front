import React from 'react';
import WithLocale from '../../../hocs/withLocale';
import Layout from '../../../components/layout';
import SearchPageComponent from '../../../components/searchPageComponent';

const SearchPage: React.FC = () => {
  return (
    <Layout>
      <SearchPageComponent />
    </Layout>
  );
};

export default WithLocale(SearchPage);
