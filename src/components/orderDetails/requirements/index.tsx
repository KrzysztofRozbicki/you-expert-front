import React, { memo, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import useTranslation from '../../../hooks/useTranslation';
import { orderDetailsDataType } from '../interfaces';
import {
  WrapperStyled,
  TextStyled,
  TitleStyled,
  SeparatorStyled
} from './style';

interface RequirementsProps {
  data: orderDetailsDataType;
}

const Requirements: React.FC<RequirementsProps> = (props) => {
  const { data } = props;
  const { t } = useTranslation();
  const [tab, setTab] = useState<'client' | 'service'>('client');

  return (
    <WrapperStyled>
      <Flex mb="30px">
        <TitleStyled
          isActive={tab === 'client'}
          onClick={() => setTab('client')}
          fontSize={{ sm: '1rem', md: '1.6rem' }}
          paddingRight='20px'
          borderRight='1px solid'
          borderColor='general.link'
        >
          {t('orderDetails', 'requirements', 'clientRequirements')}
        </TitleStyled>
        <TitleStyled
          isActive={tab === 'service'}
          onClick={() => setTab('service')}
          fontSize={{ sm: '1rem', md: '1.6rem' }}
          paddingLeft='20px'
        >
          {t('orderDetails', 'requirements', 'serviceRequirements')}
        </TitleStyled>
      </Flex>
      {tab === 'client' && <TextStyled>{data?.clientRequirements}</TextStyled>}
      {tab === 'service' && (
        <TextStyled>{data?.offerData?.requirements}</TextStyled>
      )}
    </WrapperStyled>
  );
};

export default memo(Requirements);
