import React, { useState, useEffect } from 'react';

import Layout from '../../../../components/layout';
import WithLocale from '../../../../hocs/withLocale';
import UI from './UI';
import { checkUserAuth } from '../../../../hooks/useCheckAuth';

const Balance = () => {
  checkUserAuth();

  return (
    <Layout>
      <UI />
    </Layout>
  );
};

export default WithLocale(Balance);
