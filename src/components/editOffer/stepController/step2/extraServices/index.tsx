import React, { memo, useState, useMemo, useCallback } from 'react';
import useTranslation from '../../../../../hooks/useTranslation';
import Checkbox from '../../../../createOffer/stepController/step2/checkbox';
import {
  WrapperStyled,
  ExtraServiceItemStyled,
  ExtraServiceTextStyled
} from './style';

const ExtraServices: React.FC = () => {
  const { t } = useTranslation();
  const extraServiceItems = useMemo(
    () => [
      `3 ${t('createOffer', 'step2', 'versionsOfLogo')}`,
      `5 ${t('createOffer', 'step2', 'versionsOfLogo')}`
    ],
    []
  );
  const [selected, setSelected] = useState<string>('');

  const handleSelectItem = useCallback(
    (newSelected: string): void => {
      if (newSelected === selected) {
        setSelected('');
      } else {
        setSelected(newSelected);
      }
    },
    [selected, setSelected]
  );

  return (
    <WrapperStyled>
      {extraServiceItems.map((item, index) => {
        const isActive = selected === item;
        return (
          <ExtraServiceItemStyled key={index} isActive={isActive}>
            <Checkbox
              wrapperStyle={{ marginRight: '44px', width: 'auto' }}
              onChange={() => handleSelectItem(item)}
              isChecked={isActive}
            />
            <ExtraServiceTextStyled>{item}</ExtraServiceTextStyled>
          </ExtraServiceItemStyled>
        );
      })}
    </WrapperStyled>
  );
};

export default memo(ExtraServices);
