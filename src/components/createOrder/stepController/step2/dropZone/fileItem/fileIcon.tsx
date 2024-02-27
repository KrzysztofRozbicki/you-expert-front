import React, { memo } from 'react';

const FileIcon: React.FC = () => {
  return (
    <svg
      width="35"
      height="35"
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26.25 26.2499V21.1458C26.25 19.9383 27.23 18.9583 28.4375 18.9583V18.9583C29.645 18.9583 30.625 19.9383 30.625 21.1458V27.7083C30.625 30.1247 28.6665 32.0833 26.25 32.0833V32.0833C23.8335 32.0833 21.875 30.1247 21.875 27.7083V23.3333"
        stroke="#020055"
        strokeWidth="2.1875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.0418 23.3334H10.2085"
        stroke="#020055"
        strokeWidth="2.1875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.4168 17.4999H10.2085"
        stroke="#020055"
        strokeWidth="2.1875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.4168 11.6667H10.2085"
        stroke="#020055"
        strokeWidth="2.1875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26.25 13.125V7.29167C26.25 5.68021 24.9448 4.375 23.3333 4.375H7.29167C5.68021 4.375 4.375 5.68021 4.375 7.29167V27.7083C4.375 29.3198 5.68021 30.625 7.29167 30.625H16.0417"
        stroke="#020055"
        strokeWidth="2.1875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default memo(FileIcon);
