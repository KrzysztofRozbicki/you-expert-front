import React, { memo, useState, useCallback } from 'react';
import { Box, Text } from '@chakra-ui/react';
import useTranslation from '../../../../../../hooks/useTranslation';
import { ButtonController } from '../../../../../common/ButtonController';
import { isValidUrl } from '../../../../utils';
import {
  WrapperStyled,
  TitleStyled,
  InputStyled,
  ButtonWrapperStyled
} from './style';

interface ModalBodyProps {
  title: string;
  buttonLabel: string;
  handleAddVideo: (videoUrl: string) => void;
}

const ModalBody: React.FC<ModalBodyProps> = (props) => {
  const { title, handleAddVideo, buttonLabel } = props;
  const { t } = useTranslation();
  const [state, setState] = useState<{ value: string; isError: boolean }>({
    value: '',
    isError: false
  });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value }
      } = e;

      setState((prev) => ({ ...prev, value, isError: false }));
    },
    [setState]
  );

  const isValidValue = useCallback(() => {
    let isError = false;
    if (!isValidUrl(state.value)) {
      isError = true;
    }

    setState((prev) => ({ ...prev, isError }));
    return !isError;
  }, [state]);

  const handleAddVideoClick = useCallback(() => {
    if (isValidValue()) {
      handleAddVideo(state.value);
    }
  }, [state]);

  return (
    <WrapperStyled>
      <TitleStyled>{title}</TitleStyled>
      <Box mb="20px">
        <InputStyled
          type="text"
          placeholder="Video url..."
          value={state.value}
          onChange={handleChange}
          isError={state.isError}
        />
        {state?.isError && (
          <Text fontSize="0.6rem" color="general.red">
            {t('createOffer', 'general', 'invalidUrl')}
          </Text>
        )}
      </Box>
      <ButtonWrapperStyled>
        <ButtonController
          variant="pink"
          onClick={handleAddVideoClick}
          customStyle={{ fontSize: '0.8rem', minHeight: '27px' }}
        >
          {buttonLabel}
        </ButtonController>
      </ButtonWrapperStyled>
    </WrapperStyled>
  );
};

export default memo(ModalBody);
