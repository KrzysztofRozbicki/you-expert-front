import { useState } from 'react';
import Layout from '../../../../../components/layout';
import WithLocale from '../../../../../hocs/withLocale';
import UI from '../UI';
import { checkUserAuth } from '../../../../../hooks/useCheckAuth';

const Business = () => {
  checkUserAuth();
  const [currentAction, setCurrentAction] = useState('account');
  const onActionTrigger = (actionType: string) => {
    setCurrentAction(actionType);
  };
  return (
    <Layout>
      {/* <UI currentAction={currentAction} onActionTrigger={onActionTrigger} /> */}
      Business
    </Layout>
  );
};

export default WithLocale(Business);
