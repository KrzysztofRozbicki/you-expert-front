import React, { memo } from 'react';
import { Image, Flex, Box } from '@chakra-ui/react';
import useTranslation from '../../../../../hooks/useTranslation';
import Checkbox from '../checkbox';
import CustomTooltip from './tooltip';
import { PaymentWrapperStyled, PaymentTitleBlockStyled } from '../style';
import { CardDetailsWrapperStyled, TextStyled, InputStyled } from './style';

const Card: React.FC = (props) => {
  const { t } = useTranslation();

  return (
    <PaymentWrapperStyled>
      <PaymentTitleBlockStyled>
        <Checkbox
          onChange={() => true}
          wrapperStyle={{ width: 'fit-content', marginRight: '44px' }}
        />
        <Image
          src="/images/sections/createOrder/visa.png"
          w="98px"
          h="40px"
          mr="23px"
        />
        <Image
          src="/images/sections/createOrder/mastercard.png"
          w="179px"
          h="47px"
        />
      </PaymentTitleBlockStyled>
      <CardDetailsWrapperStyled>
        <Flex justifyContent="space-between" mb="30px">
          <Box width="46%">
            <TextStyled>{t('createOrder', 'step2', 'cardNumber')}</TextStyled>
            <InputStyled type="text" maxLength={200} />
          </Box>
          <Flex width="46%" justifyContent="space-between">
            <Box width="46%">
              <TextStyled>
                {t('createOrder', 'step2', 'expirationDate')}
              </TextStyled>
              <InputStyled type="text" maxLength={200} />
            </Box>
            <Box width="46%">
              <Flex alignItems="center">
                <TextStyled>
                  {t('createOrder', 'step2', 'securityCode')}
                </TextStyled>
                <CustomTooltip text="" wrapperStyle="margin-bottom: 10px;" />
              </Flex>
              <InputStyled type="text" maxLength={200} />
            </Box>
          </Flex>
        </Flex>
        <Flex justifyContent="space-between" mb="30px">
          <Box width="46%">
            <TextStyled>{t('createOrder', 'step2', 'firstName')}</TextStyled>
            <InputStyled type="text" maxLength={200} />
          </Box>
          <Box width="46%">
            <TextStyled>{t('createOrder', 'step2', 'lastName')}</TextStyled>
            <InputStyled type="text" maxLength={200} />
          </Box>
        </Flex>
        <Flex alignItems="center">
          <Checkbox
            onChange={() => true}
            wrapperStyle={{ width: 'fit-content', marginRight: '19px' }}
          />
          <TextStyled customStyle="margin: 0;">
            {t('createOrder', 'step2', 'saveAsDefault')}
          </TextStyled>
          <CustomTooltip
            text={t('createOrder', 'step2', 'saveAsDefaultTooltip')}
          />
        </Flex>
      </CardDetailsWrapperStyled>
    </PaymentWrapperStyled>
  );
};

export default memo(Card);
