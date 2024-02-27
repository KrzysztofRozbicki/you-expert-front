import React from 'react';
import UI from './UI';

export const OffersList: React.FC<{ offers: any }> = (props) => {
  const { offers } = props;

  if (!offers || !offers.length) return null;

  return <UI offers={offers} />;
};
