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
import { PricingByScreenSizeProps } from './interfaces';
import { selectedTabStyles, packages } from '../../constants';
import TooltipController from '../../../../common/TooltipController';
import InputItemWithText from '../../../../createOffer/stepController/inputItemWithText';
import { SpanStyled } from '../../style';
import Checkbox from '../../../../createOffer/stepController/step2/checkbox';
import ParamsItemMobile from '../../../../createOffer/stepController/step2/pricing/paramsItem/paramsItem.mobile';
import RequiredMark from '../../../../common/RequiredMark';

const PricingMobile: React.FC<PricingByScreenSizeProps> = (props) => {
  const {
    t,
    state,
    paramsByService,
    handleСhangeDate,
    handleChangePrice,
    handleCheckboxChange,
    getValueForParamsItem,
    getErrorForParamsItem,
    handleParamsItemChange,
    getDisabledPackageForParamsItem
  } = props;

  const [tabIndex, setTabIndex] = useState<number>(0);

  const onPackageTitleClick = useCallback(
    (tabIndex: number) => {
      if (
        (tabIndex === 1 && !state.values.pricing.standard.isOn) ||
        (tabIndex === 2 && !state.values.pricing.premium.isOn)
      ) {
        return;
      }

      setTabIndex(tabIndex);
    },
    [state.values]
  );

  const handlePackagesOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, pck: string, value: boolean) => {
      e.preventDefault();
      e.stopPropagation();

      if (!value && tabIndex > 0) {
        if (pck === 'standard') {
          setTabIndex(0);
        } else if (pck === 'premium') {
          setTabIndex(1);
        }
      }

      if (value) {
        if (pck === 'standard') {
          setTabIndex(1);
        } else if (pck === 'premium') {
          setTabIndex(2);
        }
      }

      handleCheckboxChange(pck, value);
    },
    [tabIndex, handleCheckboxChange]
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
            bg={state.values.pricing[pck].isOn ? '#FFF' : '#FBFBFD'}
            _selected={selectedTabStyles}
          >
            <TooltipController
              text={t('createOffer', 'step2', pck)}
              placement="bottom"
            >
              <SpanStyled style={{ marginRight: '3px' }}>
                {t('createOffer', 'step2', pck)}
              </SpanStyled>
            </TooltipController>
            <Checkbox
              wrapperStyle={{ width: 'fit-content' }}
              checkboxStyle="span { width: 27px; height: 27px; }"
              isChecked={state.values.pricing[pck].isOn}
              onChange={(e) =>
                handlePackagesOnChange(e, pck, !state.values.pricing[pck].isOn)
              }
              isDisabled={
                pck === 'premium' && !state.values.pricing.standard.isOn
              }
            />
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
            {paramsByService.parameters.map((item, index) => (
              <ParamsItemMobile
                key={index}
                index={index}
                parameter={item}
                packageName={pck}
                getValue={getValueForParamsItem}
                getError={getErrorForParamsItem}
                handleChange={handleParamsItemChange}
                getDisabled={getDisabledPackageForParamsItem}
              />
            ))}
            <Flex mb="10px" alignItems="center" justifyContent="space-between">
              <Text w="48%">
                {t('createOffer', 'step2', 'deliveryTime')} <RequiredMark />
              </Text>
              <Flex w="48%" maxWidth="150px">
                <InputItemWithText
                  value={state.values.pricing[pck].deliveryTime}
                  onChange={(e) => handleСhangeDate(e?.target?.value, pck)}
                  isDisabled={!state.values.pricing[pck].isOn}
                  text={t('createOffer', 'step2', 'tableDays')}
                  inputProps={{
                    fontSize: '0.6rem !important',
                    height: '30px',
                    paddingTop: '0',
                    paddingBottom: '0',
                    borderRadius: '0px',
                    borderBottom: state.errors.pricing[pck].deliveryTime
                      ? '2px solid#D74F3E !important'
                      : '2px solid #DCDCF4 !important'
                  }}
                  textProps={{ fontSize: '0.6rem !important' }}
                  isError={state.errors.pricing[pck].deliveryTime}
                  errorText={t('createOffer', 'general', 'thisFieldIsRequired')}
                  errorTextProps={{ fontSize: '0.5rem' }}
                />
              </Flex>
            </Flex>
            <Flex mb="10px" alignItems="center" justifyContent="space-between">
              <Text w="48%">
                {t('createOffer', 'step2', 'price')} <RequiredMark />
              </Text>
              <Flex w="48%" maxWidth="150px">
                <InputItemWithText
                  value={state.values.pricing[pck].price}
                  onChange={(e) => handleChangePrice(e, pck)}
                  isDisabled={!state.values.pricing[pck].isOn}
                  text="PLN"
                  inputProps={{
                    fontSize: '0.6rem !important',
                    height: '30px',
                    paddingTop: '0',
                    paddingBottom: '0',
                    borderRadius: '0px',
                    borderBottom: state.errors.pricing[pck].price
                      ? '2px solid#D74F3E !important'
                      : '2px solid #DCDCF4 !important'
                  }}
                  textProps={{ fontSize: '0.6rem !important' }}
                  isError={state.errors.pricing[pck].price}
                  errorText={t('createOffer', 'general', 'thisFieldIsRequired')}
                  errorTextProps={{ fontSize: '0.5rem' }}
                />
              </Flex>
            </Flex>
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default memo(PricingMobile);
