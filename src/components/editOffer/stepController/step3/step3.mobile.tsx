import React, { memo, useState, useCallback } from 'react';
import {
  Text,
  Flex,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel
} from '@chakra-ui/react';
import { selectedTabStyles, packages } from '../constants';
import InputItemWithText from '../../../createOffer/stepController/inputItemWithText';
import TooltipController from '../../../common/TooltipController';
import { SpanStyled } from '../style';
import { Step3ItemProps } from './interfaces';
import {
  MAX_OFFER_COMMISSION,
  MIN_OFFER_COMMISSION
} from '../../../../common/constants';
import RequiredMark from '../../../common/RequiredMark';

const Step3Mobile: React.FC<Step3ItemProps> = (props) => {
  const { t, state, offer, taxRate, getTotalPrice, handleChangeCommission } =
    props;

  const [tabIndex, setTabIndex] = useState<number>(0);

  const onPackageTitleClick = useCallback(
    (tabIndex: number) => {
      if (
        (tabIndex === 1 && !offer.pricing.standard.isOn) ||
        (tabIndex === 2 && !offer.pricing.premium.isOn)
      ) {
        return;
      }

      setTabIndex(tabIndex);
    },
    [offer.pricing]
  );

  return (
    <Tabs index={tabIndex} onChange={onPackageTitleClick}>
      <TabList bg="#FBFBFD">
        {packages.map((pck, index) => (
          <Tab
            key={index}
            width="100%"
            justify="center"
            h={{ sm: '64px', xl: '84px' }}
            p={{ sm: '1.5%', xl: '2%' }}
            border="1px solid #DCDCF4"
            fontSize="0.6rem"
            fontWeight="400"
            borderRadius="5px 5px 0 0"
            bg={offer.pricing[pck].isOn ? '#FFF' : '#FBFBFD'}
            _selected={selectedTabStyles}
          >
            <TooltipController
              text={t('createOffer', 'step2', pck)}
              placement="bottom"
            >
              <SpanStyled>{t('createOffer', 'step2', pck)}</SpanStyled>
            </TooltipController>
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {packages.map((pck, index) => (
          <TabPanel
            key={index}
            p="20px"
            border="1px solid #DCDCF4"
            fontSize="0.6rem"
            borderTop="none"
            borderBottomEndRadius="5px"
            borderBottomStartRadius="5px"
          >
            <Flex mb="10px" alignItems="center" justifyContent="space-between">
              <Text w="48%">{t('createOffer', 'step2', 'price')}</Text>
              <Flex w="48%" maxWidth="150px">
                <InputItemWithText
                  value={offer.pricing[pck].price}
                  onChange={() => true}
                  isDisabled={true}
                  text="PLN"
                  inputProps={{
                    fontSize: '0.6rem !important',
                    height: '30px',
                    paddingTop: '0',
                    paddingBottom: '0'
                  }}
                  textProps={{ fontSize: '0.6rem !important' }}
                />
              </Flex>
            </Flex>
            <Flex mb="10px" alignItems="center" justifyContent="space-between">
              <Text w="48%">
                {t('createOffer', 'general', 'commission')} (
                {MIN_OFFER_COMMISSION}-{MAX_OFFER_COMMISSION}%) <RequiredMark />
              </Text>
              <Flex w="48%" maxWidth="150px">
                <InputItemWithText
                  value={state.values.commission}
                  onChange={handleChangeCommission}
                  isDisabled={false}
                  text="%"
                  inputProps={{
                    fontSize: '0.6rem !important',
                    height: '30px',
                    paddingTop: '0',
                    paddingBottom: '0',
                    borderRadius: '0px',
                    borderBottom: state.errors.commission
                      ? '2px solid#D74F3E !important'
                      : '2px solid #DCDCF4 !important'
                  }}
                  textProps={{ fontSize: '0.6rem !important' }}
                  isError={state.errors.commission && !state.values.commission}
                  errorText={t('createOffer', 'general', 'thisFieldIsRequired')}
                  errorTextProps={{ fontSize: '0.5rem' }}
                />
              </Flex>
            </Flex>
            <Flex mb="10px" alignItems="center" justifyContent="space-between">
              <Text w="48%">{t('createOffer', 'general', 'totalPrice')}</Text>
              <Flex w="48%" maxWidth="150px">
                <InputItemWithText
                  value={getTotalPrice(pck)}
                  onChange={() => true}
                  isDisabled={true}
                  text="PLN"
                  inputProps={{
                    fontSize: '0.6rem !important',
                    height: '30px',
                    paddingTop: '0',
                    paddingBottom: '0'
                  }}
                  textProps={{ fontSize: '0.6rem !important' }}
                />
              </Flex>
            </Flex>
          </TabPanel>
        ))}
      </TabPanels>
      <Text fontSize="0.6rem" fontWeight="400">
        *{t('createOffer', 'general', 'totalPriceIncludesTAX')} {taxRate}%
      </Text>
    </Tabs>
  );
};

export default memo(Step3Mobile);
