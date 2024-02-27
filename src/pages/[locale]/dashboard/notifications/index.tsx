import { useState } from 'react';
import Layout from '../../../../components/layout';
import WithLocale from '../../../../hocs/withLocale';
import UI from '../UI';
import { checkUserAuth } from '../../../../hooks/useCheckAuth';

const Notifications = () => {
  checkUserAuth();
  const [currentAction, setCurrentAction] = useState('notifications');
  const onActionTrigger = (actionType: string) => {
    setCurrentAction(actionType);
  };

  return (
    <Layout>
      <UI currentAction={currentAction} onActionTrigger={onActionTrigger} />
    </Layout>
  );
};

export default WithLocale(Notifications);
