import React, { memo, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Flex, Spinner, Text } from '@chakra-ui/react';
import { MAX_OFFER_SECTION } from '../../common/constants';
import { Filters } from '../../components/filters';
import { OffersList } from '../../components/offersList';
import ServicesList from '../../components/servicesList';
import { SelectedWorks } from '../../components/selectedWorks';
import CreateAccountPreview from '../../components/createAccountPreview';
import useTranslation from '../../hooks/useTranslation';
import { getSearchDataAsyncAction } from './actions';

const SearchPageComponent: React.FC = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const {
    query: { locale, name, service },
    push
  } = useRouter();

  const onServiceClick = useCallback(
    (serviceItem: any) => {
      if (serviceItem?.id) {
        push({ query: { name, service: serviceItem?.id } });
      }
    },
    [push, locale, name]
  );

  const onFiltersChange = useCallback(
    (params: any) => {
      getSearchDataAsyncAction({ name, service, ...params })
        .then((data: any) => setData(data))
        .catch((e) => console.error(e));
    },
    [name, service]
  );

  useEffect(() => {
    setIsLoading(true);
    getSearchDataAsyncAction({ name, service })
      .then((data: any) => setData(data))
      .catch((e) => console.error(e))
      .finally(() => setIsLoading(false));
  }, [name, service]);

  return isLoading ? (
    <Flex w="100%" p="75px 0" justifyContent="center">
      <Spinner />
    </Flex>
  ) : (
    <>
      <ServicesList
        servicesList={data?.services}
        onServiceClick={onServiceClick}
      />
      <Filters
        onFiltersChange={onFiltersChange}
        wrapperProps={{ p: '34px 0 28px 0' }}
      />
      {!!data?.offers?.length ? (
        <OffersList offers={data?.offers?.slice(0, MAX_OFFER_SECTION)} />
      ) : (
        <Flex m="20px 0" justifyContent="center">
          <Text fontSize="0.8rem">{t('search', 'common', 'noOffers')}</Text>
        </Flex>
      )}
      <CreateAccountPreview />
      {data?.offers?.length > MAX_OFFER_SECTION && (
        <OffersList offers={data?.offers?.slice(MAX_OFFER_SECTION)} />
      )}
      <SelectedWorks title={t('offers', 'selectedWorks', 'title')} />
    </>
  );
};

export default memo(SearchPageComponent);
