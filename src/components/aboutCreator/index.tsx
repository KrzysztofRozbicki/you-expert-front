import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import UI from './UI';
import { getPublicUserDataById } from '../../api/account';
import { initialStateType } from '../../redux/interfaces/offers';

export const AboutCreator = () => {
  const router = useRouter();
  const { publicUserData } = useSelector(
    (state: any): initialStateType => state.offers
  );

  const expertRedirect = (id: number | string) => {
    router.push(
      '/[locale]/profile/[uuid]/',
      `/${router.query.locale}/profile/${id}/`
    );
  };

  if (!publicUserData) return null;

  return (
    <UI
      creatorData={publicUserData}
      expertRedirect={expertRedirect}
    />
  );
};
