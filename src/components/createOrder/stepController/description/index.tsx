import React, { memo } from 'react';
import { WrapperStyled, TextStyled, TitleStyled } from './style';

interface DescriptionProps {
  text: string;
  title: string;
}

const Description: React.FC<DescriptionProps> = (props) => {
  const { text, title } = props;
  return (
    <WrapperStyled>
      <TitleStyled>{title}</TitleStyled>
      <TextStyled>{text}</TextStyled>
    </WrapperStyled>
  );
};

export default memo(Description);
