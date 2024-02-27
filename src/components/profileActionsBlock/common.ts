export interface ActionItemProps {
  onClick?: (actionType: string, slug: string, route: string) => void;
  actionType: string;
  isActive?: boolean;
  path?: string;
  label?: string;
}

export const actionsDashboardConfiguration: ActionItemProps[] = [
  {
    actionType: 'redirect',
    path: 'profile',
    label: 'myProfile'
  },
  {
    actionType: 'notifications',
    path: 'notifications'
  },
  {
    actionType: 'favoriteOffers',
    path: 'favorite'
  },
  {
    actionType: 'balance',
    path: 'balance'
  },
  {
    actionType: 'becomeAnExpert',
    path: 'settings/business'
  }
];

export const actionsOrdersConfiguration: ActionItemProps[] = [
  {
    actionType: 'myOrders',
    path: 'orders'
  },
  {
    actionType: 'myAssignments',
    path: 'assignments'
  }
];

export const actionsSettingsConfiguration: ActionItemProps[] = [
  {
    actionType: 'account',
    path: 'account'
  },
  {
    actionType: 'businessInformation',
    path: 'business-information'
  },
  {
    actionType: 'billing',
    path: 'billing'
  },
];
