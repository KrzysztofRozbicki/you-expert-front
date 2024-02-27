import React, { memo } from 'react';
import CustomIcon from './customIcon';
import { WrapperStyled, CheckboxStyled } from './style';

interface CheckboxProps {
  wrapperStyle?: {};
  onChange?: (e?: React.ChangeEvent<HTMLInputElement>) => void;
  isChecked?: boolean;
  isDisabled?: boolean;
  checkboxStyle?: string;
}

const Checkbox: React.FC<CheckboxProps> = (props) => {
  const { wrapperStyle, onChange, isChecked, isDisabled, checkboxStyle } =
    props;

  return (
    <WrapperStyled style={wrapperStyle}>
      <CheckboxStyled
        icon={<CustomIcon isChecked={isChecked} />}
        onChange={!isDisabled ? onChange : null}
        isChecked={isChecked}
        isDisabled={isDisabled}
        customStyle={checkboxStyle}
      />
    </WrapperStyled>
  );
};

export default memo(Checkbox);
