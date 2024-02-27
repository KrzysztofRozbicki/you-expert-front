import React, { memo, useMemo } from 'react';
import useTranslation from '../../../hooks/useTranslation';
import IncludedItem from './includedItem';
import { orderDetailsDataType } from '../interfaces';
import { WrapperStyled, TitleStyled, ItemsWrapperStyled } from './style';

interface IncludedProps {
  data: orderDetailsDataType;
}

const Included: React.FC<IncludedProps> = (props) => {
  const { data } = props;
  const { t } = useTranslation();

  const renderItems = useMemo((): { name: string; value: any }[] => {
    if (typeof data?.offerData?.parameter_answers === 'object') {
      const keys = Object.keys(data?.offerData?.parameter_answers);
      const values = Object.values(data?.offerData?.parameter_answers);

      return keys.map((item, index) => {
        let value = values[index];
        if (value === false) {
          value = t('orderDetails', 'included', 'no');
        } else if (value === true) {
          value = t('orderDetails', 'included', 'yes');
        }

        return { name: item, value };
      });
    }

    return [];
  }, [data, t]);

  return renderItems.length ? (
    <WrapperStyled>
      <TitleStyled>{t('orderDetails', 'included', 'included')}</TitleStyled>
      <ItemsWrapperStyled>
        {renderItems.map((item, index) => (
          <IncludedItem key={index} name={item?.name} value={item?.value} />
        ))}
      </ItemsWrapperStyled>
    </WrapperStyled>
  ) : (
    <></>
  );
};

export default memo(Included);
