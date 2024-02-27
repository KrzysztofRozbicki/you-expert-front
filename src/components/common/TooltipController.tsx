import React, { memo } from 'react';
import { Tooltip, Text, Placement } from '@chakra-ui/react';

interface TooltipControllerProps {
  text: string;
  placement: Placement;
  children: React.ReactNode;
  textProps?: { [key: string]: any };
  [key: string]: any;
}

const LabelComponent: React.FC<{
  text: string;
  textProps?: { [key: string]: any };
}> = ({ text, textProps }) => (
  <Text
    fontSize="11px"
    m="0"
    lineHeight="16.5px"
    color="inherit"
    {...textProps}
  >
    {text}
  </Text>
);

const TooltipController: React.FC<TooltipControllerProps> = (props) => {
  const { text, placement, children, textProps, ...otherProps } = props;

  return (
    <Tooltip
      {...otherProps}
      placement={placement}
      label={<LabelComponent text={text} textProps={textProps} />}
    >
      {children}
    </Tooltip>
  );
};

export default memo(TooltipController);
