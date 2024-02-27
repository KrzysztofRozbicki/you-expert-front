import React, { memo } from 'react';
import { Text } from '@chakra-ui/react';
import useTranslation from '../../../../../hooks/useTranslation';
import RequiredMark from '../../../../common/RequiredMark';
import {
  WrapperStyled,
  BodyStyled,
  TitleTextStyled,
  TitleWrapperStyled,
  TextareaStyled
} from './style';

interface DescriptionProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isError: boolean;
  errorMessage?: string;
}

const Description: React.FC<DescriptionProps> = (props) => {
  const { value, onChange, isError, errorMessage } = props;
  const { t } = useTranslation();

  return (
    <WrapperStyled>
      <TitleWrapperStyled p={{ sm: '40px', xl: '64px 119px 43px 119px' }}>
        <TitleTextStyled>
          {t('createOrder', 'step3', 'description')} <RequiredMark />
        </TitleTextStyled>
      </TitleWrapperStyled>
      <BodyStyled p={{ sm: '40px', xl: '64px 119px' }}>
        <TextareaStyled
          value={value}
          placeholder={t('createOrder', 'step3', 'writeDescription')}
          onChange={onChange}
          isError={isError}
        />
        {isError && errorMessage && (
          <Text fontSize="0.6rem" color="general.red">
            {errorMessage}
          </Text>
        )}
      </BodyStyled>
    </WrapperStyled>
  );
};

export default memo(Description);
