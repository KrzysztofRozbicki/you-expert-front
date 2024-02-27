import React, { memo } from 'react';
import { Tooltip, Text, Flex } from '@chakra-ui/react';
import { WrapperStyled } from './style';

interface TooltipProps {
  wrapperStyle?: string;
  text: string;
}

const LabelComponent: React.FC<{ text: string }> = ({ text }) => (
  <Text fontSize="11px" m="0" lineHeight="16.5px" color="inherit">
    {text}
  </Text>
);

const CustomTooltip: React.FC<TooltipProps> = (props) => {
  const { wrapperStyle, text } = props;
  return (
    <Tooltip label={<LabelComponent text={text} />} placement="right">
      <WrapperStyled customStyle={wrapperStyle}>
        <svg
          width="6"
          height="9"
          viewBox="0 0 6 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.904 0.0579993C3.66667 0.0579993 4.279 0.266999 4.741 0.685C5.21033 1.09567 5.445 1.664 5.445 2.39C5.445 3.10867 5.214 3.65867 4.752 4.04C4.29 4.414 3.67767 4.601 2.915 4.601L2.871 5.448H1.518L1.463 3.578H1.958C2.596 3.578 3.08733 3.49367 3.432 3.325C3.77667 3.15633 3.949 2.84833 3.949 2.401C3.949 2.07833 3.85367 1.82167 3.663 1.631C3.47967 1.44033 3.22667 1.345 2.904 1.345C2.56667 1.345 2.30267 1.43667 2.112 1.62C1.92867 1.80333 1.837 2.05633 1.837 2.379H0.385C0.377667 1.93167 0.473 1.532 0.671 1.18C0.869 0.828 1.15867 0.552999 1.54 0.354999C1.92867 0.156999 2.38333 0.0579993 2.904 0.0579993ZM2.189 8.077C1.91033 8.077 1.67933 7.99267 1.496 7.824C1.32 7.648 1.232 7.43167 1.232 7.175C1.232 6.91833 1.32 6.70567 1.496 6.537C1.67933 6.361 1.91033 6.273 2.189 6.273C2.46033 6.273 2.684 6.361 2.86 6.537C3.036 6.70567 3.124 6.91833 3.124 7.175C3.124 7.43167 3.036 7.648 2.86 7.824C2.684 7.99267 2.46033 8.077 2.189 8.077Z"
            fill="#020055"
          />
        </svg>
      </WrapperStyled>
    </Tooltip>
  );
};

export default memo(CustomTooltip);
