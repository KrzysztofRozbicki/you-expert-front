import React, { memo } from 'react';
import CustomIcon from './customIcon';
import { WrapperStyled, CheckboxStyled } from './style';

interface CheckboxProps {
  wrapperStyle?: {};
  onChange?: () => void;
  isChecked?: boolean;
  isDisabled?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = (props) => {
  const { wrapperStyle, onChange, isChecked, isDisabled } = props;
  return (
    <WrapperStyled style={wrapperStyle}>
      <CheckboxStyled
        icon={<CustomIcon isChecked={isChecked} />}
        onChange={!isDisabled ? onChange : null}
        isChecked={isChecked}
        isDisabled={isDisabled}
      />
    </WrapperStyled>
  );
};

export default memo(Checkbox);
