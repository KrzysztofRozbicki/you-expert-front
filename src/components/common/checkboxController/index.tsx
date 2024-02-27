import React, { memo } from 'react';
import CustomIcon from './customIcon';
import { WrapperStyled, CheckboxStyled } from './style';

interface CheckboxControllerProps {
  wrapperStyle?: any;
  onChange?: () => void;
  isChecked?: boolean;
  isDisabled?: boolean;
  checkboxStyle?: string;
}

const CheckboxController: React.FC<CheckboxControllerProps> = (props) => {
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

export default memo(CheckboxController);
