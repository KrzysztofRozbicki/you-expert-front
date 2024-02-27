import React, { memo } from 'react';
import { WrapperStyled, IconWrapperStyled, TextStyled } from './style';

interface IncludedItemProps {
  name: string;
  value: any;
}

const IncludedItem: React.FC<IncludedItemProps> = (props) => {
  const { name, value } = props;
  return (
    <WrapperStyled>
      <TextStyled>
        {name} - {value}
      </TextStyled>
    </WrapperStyled>
  );
};

export default memo(IncludedItem);
