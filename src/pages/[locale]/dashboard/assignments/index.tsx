import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersAction } from '../../../../redux/actions/orders';
import Layout from '../../../../components/layout';
import WithLocale from '../../../../hocs/withLocale';
import UI from '../UI';
import { checkUserAuth } from '../../../../hooks/useCheckAuth';
import { actionsOrdersConfiguration } from '../../../../components/profileActionsBlock/common';

const titles: string[] = ['current', 'history'];
const availbleStatuses = ['AWAITING_PAYMENT', 'ACTIVE', 'APPROVAL_REQUESTED'];
const historicalStatuses = [
  'REJECTED_BY_EXPERT',
  'CANCELLED',
  'FAILED',
  'DELIVERED_NOT_PAID',
  'DELIVERED_PAID'
];

const Assignments = () => {
  checkUserAuth();
  const [currentAction, setCurrentAction] = useState('myAssignments');
  const dispatch = useDispatch();
  const onActionTrigger = (actionType: string) => {
    setCurrentAction(actionType);
  };
  const { expertOrders, userOrders } = useSelector(
    (state: any) => state.orders
  );
  const { profileData, fullProfileData } = useSelector((state: any) => state.user);
  const is_expert =
    profileData && profileData.is_expert ? profileData.is_expert : null;

  useEffect(() => {
    dispatch(getOrdersAction(is_expert, true));
  }, [is_expert]);

  const filterOrders = (ordersList: any[], name: string) => {
    if (!ordersList || !ordersList.length) return [];
    const formattedFields =
      name === 'current' ? availbleStatuses : historicalStatuses;
    return ordersList.filter((item) => formattedFields.includes(item.status));
  };

  const onTabClick = (name: string) => {
    dispatch(getOrdersAction(is_expert, name === 'current'));
    filterOrders(expertOrders, name);
  };

  const formattedOrders = is_expert ? expertOrders : userOrders;

  return (
    <UI
      currentAction={currentAction}
      customTitles={titles}
      onActionTrigger={onActionTrigger}
      onTabClick={onTabClick}
      orders={formattedOrders}
      is_expert={true}
      profileActionInitialConfig={
        fullProfileData?.isExpert
          ? actionsOrdersConfiguration
          : [actionsOrdersConfiguration[0]]
      }
    />
  );
};

const AssignmentsPage = () => (
  <Layout>
    <Assignments />
  </Layout>
);

export default WithLocale(AssignmentsPage);
