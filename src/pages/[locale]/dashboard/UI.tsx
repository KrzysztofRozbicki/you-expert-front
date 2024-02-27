import { Flex, Box } from '@chakra-ui/react';
import UserProfileSection from '../../../components/userProfileSection';
import ProfileActionsBlock from '../../../components/profileActionsBlock';
import DashboardTabContent from '../../../components/dashboardTabContent';
import { TabContentProps } from '../../../components/dashboardTabContent/common';

const UI: React.FC<TabContentProps> = ({
  currentAction,
  onActionTrigger,
  customTitles,
  onTabClick,
  orders,
  is_expert,
  isShouldShowInvoiceColumn,
  profileActionInitialConfig
}) => {
  return (
    <Flex
      w="100%"
      direction={{
        sm: 'column',
        md: 'column',
        lg: 'row',
        xl: 'row',
        '2xl': 'row'
      }}
      m="50px auto 137px auto"
    >
      <Flex
        w={{ sm: '100%', md: '100%', lg: '35%', xl: '35%', '2xl': '35%' }}
        direction={{
          sm: 'column-reverse',
          md: 'column',
          lg: 'column',
          xl: 'column',
          '2xl': 'column'
        }}
      >
        <UserProfileSection />
        <Box p={{ lg: '40px 0 0 0', xl: '65px 0 0 0' }}>
          <ProfileActionsBlock
            initialConfig={profileActionInitialConfig}
            currentAction={currentAction}
            onActionTrigger={onActionTrigger}
          />
        </Box>
      </Flex>
      <Flex
        w={{ sm: '100%', lg: '65%', xl: '65%', '2xl': '65%' }}
        ml={{ sm: '0', lg: '25px', xl: '30px' }}
      >
        <DashboardTabContent
          customTitles={customTitles}
          hideTitle={false}
          currentAction={currentAction}
          onTabClick={onTabClick}
          orders={orders}
          is_expert={is_expert}
          isShouldShowInvoiceColumn={isShouldShowInvoiceColumn}
        />
      </Flex>
    </Flex>
  );
};

export default UI;
