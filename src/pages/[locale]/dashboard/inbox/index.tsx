import { useState } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import DashboardTabContent from '../../../../components/dashboardTabContent';
import Layout from '../../../../components/layout';
import WithLocale from '../../../../hocs/withLocale';
import { checkUserAuth } from '../../../../hooks/useCheckAuth';

const InboxPage = () => {
  checkUserAuth();

  return (
    <Layout containerBackground="#FBFBFD">
      <Flex
        direction={{
          sm: 'column',
          md: 'column',
          lg: 'row',
          xl: 'row',
          '2xl': 'row'
        }}
        m={{ sm: '0', md: '50px auto 137px auto' }}
        p={{ sm: '0', md: '0 20px' }}
        className="max-width-container"
      >
        <Flex w="100%">
          <DashboardTabContent
            hideTitle={true}
            currentAction={'inbox'}
            contentWrapperStyle={{ border: 'none' }}
          />
        </Flex>
      </Flex>
    </Layout>
  );
};

export default WithLocale(InboxPage);
