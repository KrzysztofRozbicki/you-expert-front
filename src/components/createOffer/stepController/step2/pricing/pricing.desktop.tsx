import React, { memo } from 'react';
import { Text } from '@chakra-ui/react';
import TooltipController from '../../../../common/TooltipController';
import InputItemWithText from '../../inputItemWithText';
import Checkbox from '../checkbox';
import ParamsItemDesktop from './paramsItem/paramsItem.desktop';
import { PricingByScreenSizeProps } from './interfaces';
import {
  TableWrapperStyled,
  RowStyled,
  RowItemStyled,
  SpanStyled
} from '../../style';
import RequiredMark from '../../../../common/RequiredMark';

const PricingDesktop: React.FC<PricingByScreenSizeProps> = (props) => {
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

  return (
    <TableWrapperStyled>
      <RowStyled>
        <RowItemStyled
          isHeader
          customStyle={`
              width: 294px; 
              font-size: 0.8rem; 
              align-items: flex-end; 
              padding-left: 38px;
              border-top-left-radius: 5px; 
            `}
        >
          {t('createOffer', 'step2', 'parameters')}
        </RowItemStyled>
        <RowStyled customStyle="border: none; flex: 1;">
          <RowItemStyled isHeader>
            <TooltipController
              text={t('createOffer', 'step2', 'basic')}
              placement="bottom-start"
            >
              <SpanStyled>{t('createOffer', 'step2', 'basic')}</SpanStyled>
            </TooltipController>
            <Checkbox
              wrapperStyle={{ width: 'fit-content' }}
              isChecked={state.values.pricing.basic.isOn}
              onChange={() =>
                handleCheckboxChange('basic', !state.values.pricing.basic.isOn)
              }
            />
          </RowItemStyled>
          <RowItemStyled isHeader>
            <TooltipController
              text={t('createOffer', 'step2', 'standard')}
              placement="bottom-start"
            >
              <SpanStyled>{t('createOffer', 'step2', 'standard')}</SpanStyled>
            </TooltipController>
            <Checkbox
              wrapperStyle={{ width: 'fit-content' }}
              isChecked={state.values.pricing.standard.isOn}
              onChange={() =>
                handleCheckboxChange(
                  'standard',
                  !state.values.pricing.standard.isOn
                )
              }
            />
          </RowItemStyled>
          <RowItemStyled
            isHeader
            customStyle="border: none; border-top-right-radius: 5px;"
          >
            <TooltipController
              text={t('createOffer', 'step2', 'premium')}
              placement="bottom-start"
            >
              <SpanStyled>{t('createOffer', 'step2', 'premium')}</SpanStyled>
            </TooltipController>
            <Checkbox
              wrapperStyle={{ width: 'fit-content' }}
              isChecked={state.values.pricing.premium.isOn}
              isDisabled={!state.values.pricing.standard.isOn}
              onChange={() =>
                handleCheckboxChange(
                  'premium',
                  !state.values.pricing.premium.isOn
                )
              }
            />
          </RowItemStyled>
        </RowStyled>
      </RowStyled>
      {paramsByService.parameters.map((item, index) => (
        <ParamsItemDesktop
          key={index}
          index={index}
          parameter={item}
          getValue={getValueForParamsItem}
          getError={getErrorForParamsItem}
          handleChange={handleParamsItemChange}
          getDisabled={getDisabledPackageForParamsItem}
        />
      ))}
      <RowStyled>
        <RowItemStyled
          isHeader
          customStyle={`
              min-height: 66px; 
              width: 294px; 
              font-size: 0.8rem; 
              padding-left: 38px;
              flex-direction: column;
              align-items: flex-start;
              justify-content: center;
            `}
        >
          <Text fontSize="inherit" fontWeight="inherit">
            {t('createOffer', 'step2', 'deliveryTime')} <RequiredMark />
          </Text>
        </RowItemStyled>
        <RowStyled customStyle="border: none; flex: 1;">
          <RowItemStyled
            isDisabled={!state.values.pricing.basic.isOn}
            isError={state.errors.pricing.basic.deliveryTime}
          >
            <InputItemWithText
              value={state.values.pricing.basic.deliveryTime}
              onChange={(e) => handleСhangeDate(e?.target?.value, 'basic')}
              isDisabled={!state.values.pricing.basic.isOn}
              text={t('createOffer', 'step2', 'tableDays')}
              isError={state.errors.pricing.basic.deliveryTime}
              errorText={t('createOffer', 'general', 'thisFieldIsRequired')}
            />
          </RowItemStyled>
          <RowItemStyled
            isDisabled={!state.values.pricing.standard.isOn}
            isError={state.errors.pricing.standard.deliveryTime}
          >
            <InputItemWithText
              value={state.values.pricing.standard.deliveryTime}
              onChange={(e) => handleСhangeDate(e?.target?.value, 'standard')}
              isDisabled={!state.values.pricing.standard.isOn}
              text={t('createOffer', 'step2', 'tableDays')}
              isError={state.errors.pricing.standard.deliveryTime}
              errorText={t('createOffer', 'general', 'thisFieldIsRequired')}
            />
          </RowItemStyled>
          <RowItemStyled
            customStyle="border: none;"
            isDisabled={!state.values.pricing.premium.isOn}
            isError={state.errors.pricing.premium.deliveryTime}
          >
            <InputItemWithText
              value={state.values.pricing.premium.deliveryTime}
              onChange={(e) => handleСhangeDate(e?.target?.value, 'premium')}
              isDisabled={!state.values.pricing.premium.isOn}
              text={t('createOffer', 'step2', 'tableDays')}
              isError={state.errors.pricing.premium.deliveryTime}
              errorText={t('createOffer', 'general', 'thisFieldIsRequired')}
            />
          </RowItemStyled>
        </RowStyled>
      </RowStyled>
      <RowStyled customStyle="border: none;">
        <RowItemStyled
          isHeader
          customStyle={`
              min-height: 66px; 
              width: 294px; 
              font-size: 0.8rem; 
              padding-left: 38px;
              border-bottom-left-radius: 5px; 
              flex-direction: column;
              align-items: flex-start;
              justify-content: center;
            `}
        >
          <Text fontSize="inherit" fontWeight="inherit">
            {t('createOffer', 'step2', 'price')} <RequiredMark />
          </Text>
        </RowItemStyled>
        <RowStyled customStyle="border: none; flex: 1;">
          <RowItemStyled
            isDisabled={!state.values.pricing.basic.isOn}
            isError={state.errors.pricing.basic.price}
          >
            <InputItemWithText
              value={state.values.pricing.basic.price}
              onChange={(e) => handleChangePrice(e, 'basic')}
              isDisabled={!state.values.pricing.basic.isOn}
              text="PLN"
              isError={state.errors.pricing.basic.price}
              errorText={t('createOffer', 'general', 'thisFieldIsRequired')}
            />
          </RowItemStyled>
          <RowItemStyled
            isDisabled={!state.values.pricing.standard.isOn}
            isError={state.errors.pricing.standard.price}
          >
            <InputItemWithText
              value={state.values.pricing.standard.price}
              onChange={(e) => handleChangePrice(e, 'standard')}
              isDisabled={!state.values.pricing.standard.isOn}
              text="PLN"
              isError={state.errors.pricing.standard.price}
              errorText={t('createOffer', 'general', 'thisFieldIsRequired')}
            />
          </RowItemStyled>
          <RowItemStyled
            customStyle="border: none; border-bottom-right-radius: 5px;"
            isDisabled={!state.values.pricing.premium.isOn}
            isError={state.errors.pricing.premium.price}
          >
            <InputItemWithText
              value={state.values.pricing.premium.price}
              onChange={(e) => handleChangePrice(e, 'premium')}
              isDisabled={!state.values.pricing.premium.isOn}
              text="PLN"
              isError={state.errors.pricing.premium.price}
              errorText={t('createOffer', 'general', 'thisFieldIsRequired')}
            />
          </RowItemStyled>
        </RowStyled>
      </RowStyled>
    </TableWrapperStyled>
  );
};

export default memo(PricingDesktop);
