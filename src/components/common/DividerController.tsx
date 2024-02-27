import React from 'react';
import { Divider } from '@chakra-ui/react';
import { DividerControllerProps } from '../../common/interfaceTypes';

const DividerController: React.FC<DividerControllerProps> = ({
  background,
  customM
}) => {
  return (
    <Divider
      h={{ lg: '3px', xl: '4px' }}
      background={background || '#DCDCF4'}
      m={customM || ''}
    />
  );
};

export default DividerController;
