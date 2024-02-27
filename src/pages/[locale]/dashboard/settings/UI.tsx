import { Flex, Box } from '@chakra-ui/react';
import UserProfileSection from '../../../../components/userProfileSection';
import ProfileActionsBlock from '../../../../components/profileActionsBlock';
import DashboardTabContent from '../../../../components/dashboardTabContent';

const UI = ({ currentAction, onActionTrigger }) => {
  return (
    <Flex
      w="100%"
      direction={{ sm: 'column', lg: 'row' }}
      m="50px auto 137px auto"
    >
      <Flex
        w={{ sm: '100%', lg: '35%' }}
        direction={{ sm: 'column-reverse', md: 'column' }}
      >
        <UserProfileSection />
        <Box>
          <ProfileActionsBlock
            currentAction={currentAction}
            onActionTrigger={onActionTrigger}
          />
        </Box>
      </Flex>
      <Flex flex={1} ml={{ lg: '50px' }}>
        <DashboardTabContent hideTitle={true} currentAction={currentAction} />
      </Flex>
    </Flex>
  );
};

export default UI;
