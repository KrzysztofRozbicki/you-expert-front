import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getOrdersAction,
  getExpertOrdersSuccess
} from '../../../../redux/actions/orders';
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

const Orders = () => {
  checkUserAuth();
  const [currentAction, setCurrentAction] = useState('myOrders');
  const dispatch = useDispatch();
  const onActionTrigger = (actionType: string) => {
    setCurrentAction(actionType);
  };
  const { expertOrders, userOrders } = useSelector(
    (state: any) => state.orders
  );
  const { profileData, fullProfileData } = useSelector(
    (state: any) => state.user
  );
  const is_expert =
    profileData && profileData.is_expert ? profileData.is_expert : null;

  useEffect(() => {
    dispatch(getOrdersAction(false, true));
  }, []);

  const filterOrders = (ordersList: any[], name: string) => {
    if (!ordersList || !ordersList.length) return [];
    const formattedFields =
      name === 'current' ? availbleStatuses : historicalStatuses;
    return ordersList.filter((item) => formattedFields.includes(item.status));
  };

  const onTabClick = (name: string) => {
    dispatch(getOrdersAction(false, name === 'current'));
    filterOrders(expertOrders, name);
  };

  const formattedOrders =
    currentAction === 'myOrders' ? userOrders : expertOrders;

  return (
    <UI
      currentAction={currentAction}
      customTitles={titles}
      onActionTrigger={onActionTrigger}
      onTabClick={onTabClick}
      orders={formattedOrders}
      is_expert={false}
      isShouldShowInvoiceColumn
      profileActionInitialConfig={
        fullProfileData?.isExpert
          ? actionsOrdersConfiguration
          : [actionsOrdersConfiguration[0]]
      }
    />
  );
};

const OrderPage = () => (
  <Layout>
    <Orders />
  </Layout>
);

export default WithLocale(OrderPage);
