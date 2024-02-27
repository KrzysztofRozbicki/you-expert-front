import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import UI from './UI';
import { AppState } from '../../common/interfaceTypes';
import {
  actionsDashboardConfiguration,
  actionsSettingsConfiguration,
  actionsOrdersConfiguration
} from './common';

const ProfileActionsBlock: React.FC<{
  currentAction: string;
  onActionTrigger?: any;
  initialConfig?: any[];
}> = ({ currentAction, onActionTrigger, initialConfig }) => {
  const router = useRouter();
  const { profileData } = useSelector((state: any) => state.user);
  const is_expert =
    profileData && profileData.is_expert ? profileData.is_expert : null;
  const { currentLocale } = useSelector((state: AppState) => state.app);

  const getFormattedConfiguration = (route: string) => {
    if (initialConfig) {
      return initialConfig;
    }

    const settingsSlugs = [
      'settings',
      'billing',
      'account',
      'businessInformation',
    ];
    const [empty, locale, slug1, slug2] = route.split('/');
    if (slug1 === 'dashboard' && settingsSlugs.includes(slug2)) {
      return actionsSettingsConfiguration;
    } else if (
      (slug1 === 'dashboard' && slug2 === 'orders') ||
      (slug1 === 'dashboard' && slug2 === 'assignments')
    ) {
      return is_expert
        ? actionsOrdersConfiguration
        : [actionsOrdersConfiguration[0]];
    }

    return actionsDashboardConfiguration;
  };

  let formattedConfiguration = getFormattedConfiguration(router.asPath);
  formattedConfiguration = is_expert
    ? formattedConfiguration.filter((i) => i.actionType !== 'becomeAnExpert')
    : formattedConfiguration;

  const onClick = (redirectSlug: string, slug: string, route: string) => {
    const [empty, locale, slug1, slug2] = route.split('/');
    if (redirectSlug === 'becomeAnExpert') {
      router.push(
        '/[locale]/dashboard/settings/business-information/',
        `/${locale}/dashboard/settings/business-information/`
      );
    } else {
      if (slug1 === 'dashboard' && slug2 === 'settings') {
        router.push(
          `/[locale]/dashboard/settings/${slug}/`,
          `/${locale}/dashboard/settings/${slug}/`
        );
        return true;
      }
      router.push(
        `/[locale]/dashboard/${slug}/`,
        `/${locale}/dashboard/${slug}/`
      );
    }
  };

  return (
    <UI
      currentAction={currentAction}
      configuration={formattedConfiguration}
      onClick={onClick}
      user_id={profileData ? profileData.user_id : ''}
      is_expert={is_expert}
    />
  );
};

export default ProfileActionsBlock;
