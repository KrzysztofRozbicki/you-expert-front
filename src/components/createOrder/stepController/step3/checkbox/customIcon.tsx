import React, { memo } from 'react';

const CustomIcon: React.FC<{ isChecked: boolean }> = (props) => {
  const { isChecked } = props;

  return isChecked ? (
    <svg
      width="37"
      height="37"
      viewBox="0 0 37 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.5"
        y="0.5"
        width="36"
        height="36"
        rx="4.5"
        fill="white"
        stroke="#CFCFE5"
      />
      <rect
        x="13.1209"
        y="24.15"
        width="21.0111"
        height="3"
        transform="rotate(-45 13.1209 24.15)"
        fill="#7A72DF"
        stroke="#7A72DF"
      />
      <rect
        x="9.41422"
        y="16.1999"
        width="11"
        height="3"
        transform="rotate(45 9.41422 16.1999)"
        fill="#7A72DF"
        stroke="#7A72DF"
      />
    </svg>
  ) : (
    <></>
  );
};

export default memo(CustomIcon);
