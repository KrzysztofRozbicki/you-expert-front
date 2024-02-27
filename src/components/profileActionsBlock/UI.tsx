import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import ActionItem from './ActionItem';
import LinkController from '../common/LinkController';
import useTranslation from '../../hooks/useTranslation';

const UI = ({ currentAction, onClick, configuration, user_id, is_expert }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const renderProfileActions = (actionsConfig, current) => {
    if (!actionsConfig || !actionsConfig.length) return null;
    return actionsConfig.map((action, actionIdx) => {
      const { actionType, path, label } = action;
      const isActive = current === actionType;
      if (actionType === 'redirect' && !is_expert) return null;

      if (actionType === 'redirect' && is_expert) {
        return (
          <LinkController
            href="/[locale]/profile/[uuid]"
            as={`/${router.query.locale}/profile/${user_id}/`}
            customStyle={{
              fontSize: '1.33rem',
              fontWeight: '500',
              textDecoration: 'none',
              borderBottom: '4px solid #DCDCF4'
            }}
          >
            {t('dashboard', 'title', label)}
          </LinkController>
        );
      }
      return (
        <ActionItem
          isActive={isActive}
          actionType={actionType}
          path={path}
          onClick={onClick}
          key={`${actionType}-${actionIdx + 1}`}
        />
      );
    });
  };

  return (
    <Flex direction="column" mb={{ sm: '84px', md: '50px' }}>
      {renderProfileActions(configuration, currentAction)}
    </Flex>
  );
};

export default UI;
