import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Heading, Flex } from '@chakra-ui/react';
import UI from './UI';
import { initialStateType } from '../../redux/interfaces/offers';
import { getUserDataById } from '../../api/account';
import { UserState } from '../../common/interfaceTypes';
import useTranslation from '../../hooks/useTranslation';

export const Opinions = () => {
  const { t } = useTranslation();
  const { publicUserData } = useSelector(
    (state: any): initialStateType => state.offers
  );
  const { isAuthenticated } = useSelector((state: UserState) => state.user);

  if (!isAuthenticated)
    return (
      <Flex direction="column" pt="40px" pl="5%">
        <Heading fontSize="1.6rem" fontWeight="500" mb="45px">
          {t('offer', 'opinions', 'title')}
        </Heading>
        {t('offer', 'opinions', 'notAvailble')}
      </Flex>
    );

  if (!publicUserData) return null;

  return <UI content={publicUserData.reviews} />;
};
