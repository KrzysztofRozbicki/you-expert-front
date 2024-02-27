import React, { memo } from 'react';
import { Flex } from '@chakra-ui/react';
import { ButtonController } from '../../../../common/ButtonController';
import useTranslation from '../../../../../hooks/useTranslation';

export interface ButtonsProps {
  handleClickSave: () => void;
  handleClickCancel: () => void;
  isHideBackButton: boolean;
}

const Buttons: React.FC<ButtonsProps> = (props) => {
  const { handleClickSave, handleClickCancel, isHideBackButton } = props;

  const { t } = useTranslation();

  return (
    <Flex justify="flex-end" mt="45px">
      {!isHideBackButton && (
        <ButtonController
          variant="grey"
          onClick={handleClickCancel}
          customStyle={{
            marginRight: '20px',
            fontSize: '0.8rem',
            minHeight: '57px'
          }}
        >
          {t('createOffer', 'buttons', 'stepBack')}
        </ButtonController>
      )}
      <ButtonController
        variant="pink"
        onClick={handleClickSave}
        customStyle={{ fontSize: '0.8rem', minHeight: '57px' }}
      >
        {t('createOffer', 'buttons', 'continue')}
      </ButtonController>
    </Flex>
  );
};

export default memo(Buttons);
