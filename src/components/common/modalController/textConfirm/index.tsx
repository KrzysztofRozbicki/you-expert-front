import React, { memo, useCallback } from 'react';
import { Flex } from '@chakra-ui/react';
import { ButtonController } from '../../ButtonController';
import useTranslation from '../../../../hooks/useTranslation';
import { TextConfirmProps } from '../interfaces';
import { WrapperStyled, TitleStyled, TextStyled } from './style';

interface TextConfirmComponentProps extends TextConfirmProps {
  onClose: () => void;
}

const TextConfirm: React.FC<TextConfirmComponentProps> = (props) => {
  const { text, onConfirm, onClose, onCancel } = props;
  const { t } = useTranslation();

  const handleSubmitClick = useCallback(() => {
    if (onConfirm) {
      onConfirm();
    }

    onClose();
  }, [onConfirm, onClose]);

  const handleClose = useCallback(() => {
    if (onCancel) {
      onCancel();
    }

    onClose();
  }, [onCancel, onClose]);

  return (
    <WrapperStyled>
      <TitleStyled>{t('modals', 'textConfirm', 'confirm')}</TitleStyled>
      <TextStyled>{text}</TextStyled>
      <Flex justifyContent="flex-end">
        <ButtonController
          variant="grey"
          onClick={handleClose}
          customStyle={{
            fontSize: '0.8rem',
            minHeight: '27px',
            marginRight: '20px'
          }}
        >
          {t('modals', 'textConfirm', 'no')}
        </ButtonController>
        <ButtonController
          variant="darkPurpul"
          onClick={handleSubmitClick}
          customStyle={{ fontSize: '0.8rem', minHeight: '27px' }}
        >
          {t('modals', 'textConfirm', 'yes')}
        </ButtonController>
      </Flex>
    </WrapperStyled>
  );
};

export default memo(TextConfirm);
