import React, { memo } from 'react';
import { StepProps } from '../interfaces';
import Title from './title';
import Buttons from './buttons';
import { StepWrapperStyled, StepBodyStyled } from './style';

interface StepLayoutProps {
  title: string;
  underTitleText?: string;
  children: React.ReactNode;
  isHideButtons?: boolean;
  bodyProps?: any;
  titleIconSrc?: string;
  handleClickSave: () => void;
  handleClickCancel: () => void;
  isHideBackButton?: boolean;
  isRequired?: boolean;
}

const StepLayout: React.FC<StepLayoutProps> = (props) => {
  const {
    handleClickCancel,
    handleClickSave,
    title,
    underTitleText,
    children,
    isHideButtons,
    bodyProps,
    titleIconSrc,
    isHideBackButton,
    isRequired
  } = props;

  return (
    <StepWrapperStyled>
      <Title
        title={title}
        titleIconSrc={titleIconSrc}
        isRequired={isRequired}
        underTitleText={underTitleText}
      />
      <StepBodyStyled p={{ sm: '30px', lg: '64px 119px' }} {...bodyProps}>
        {children}
        {!isHideButtons && (
          <Buttons
            handleClickCancel={handleClickCancel}
            handleClickSave={handleClickSave}
            isHideBackButton={isHideBackButton}
          />
        )}
      </StepBodyStyled>
    </StepWrapperStyled>
  );
};

export default memo(StepLayout);
