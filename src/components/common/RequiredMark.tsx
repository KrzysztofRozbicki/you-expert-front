import React, { memo } from 'react';

const requiredMarkStyle = {
  color: '#D74F3E'
};

const RequiredMark: React.FC = () => {
  return <span style={requiredMarkStyle}>*</span>;
};

export default memo(RequiredMark);
