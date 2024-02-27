import React, { memo } from 'react';
import { Text } from '@chakra-ui/react';
import {
  TableWrapperStyled,
  RowStyled,
  RowItemStyled,
  SpanStyled
} from '../style';
import TooltipController from '../../../common/TooltipController';
import InputItemWithText from '../../../createOffer/stepController/inputItemWithText';
import { Step3ItemProps } from './interfaces';
import {
  MIN_OFFER_COMMISSION,
  MAX_OFFER_COMMISSION
} from '../../../../common/constants';
import RequiredMark from '../../../common/RequiredMark';

const Step3Desktop: React.FC<Step3ItemProps> = (props) => {
  const { t, state, offer, taxRate, getTotalPrice, handleChangeCommission } =
    props;

  return (
    <>
      <TableWrapperStyled customStyle="margin-bottom: 10px;">
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
            </RowItemStyled>
            <RowItemStyled isHeader>
              <TooltipController
                text={t('createOffer', 'step2', 'standard')}
                placement="bottom-start"
              >
                <SpanStyled>{t('createOffer', 'step2', 'standard')}</SpanStyled>
              </TooltipController>
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
            </RowItemStyled>
          </RowStyled>
        </RowStyled>
        <RowStyled>
          <RowItemStyled
            isHeader
            customStyle={`
              min-height: 66px; 
              width: 294px; 
              font-size: 0.8rem; 
              padding-left: 38px;
            `}
          >
            {t('createOffer', 'step2', 'price')}
          </RowItemStyled>
          <RowStyled customStyle="border: none; flex: 1;">
            <RowItemStyled
              isDisabled={!offer.pricing.basic.isOn}
              isError={false}
            >
              <InputItemWithText
                value={offer.pricing.basic.price}
                onChange={(e) => true}
                isDisabled={true}
                text="PLN"
              />
            </RowItemStyled>
            <RowItemStyled
              isDisabled={!offer.pricing.standard.isOn}
              isError={false}
            >
              <InputItemWithText
                value={offer.pricing.standard.price}
                onChange={(e) => true}
                isDisabled={true}
                text="PLN"
              />
            </RowItemStyled>
            <RowItemStyled
              customStyle="border: none;"
              isDisabled={!offer.pricing.premium.isOn}
              isError={false}
            >
              <InputItemWithText
                value={offer.pricing.premium.price}
                onChange={(e) => true}
                isDisabled={true}
                text="PLN"
              />
            </RowItemStyled>
          </RowStyled>
        </RowStyled>
        <RowStyled>
          <RowItemStyled
            isHeader
            customStyle={`
              min-height: 66px; 
              width: 294px; 
              font-size: 0.8rem; 
              padding-left: 38px;
            `}
          >
            {t('createOffer', 'general', 'commission')} ({MIN_OFFER_COMMISSION}-
            {MAX_OFFER_COMMISSION}%) <RequiredMark />
          </RowItemStyled>
          <RowStyled customStyle="border: none; flex: 1;">
            <RowItemStyled
              customStyle="border: none;"
              isDisabled={!offer.pricing.basic.isOn}
              isError={state.errors.commission}
            >
              <InputItemWithText
                value={state.values.commission}
                onChange={handleChangeCommission}
                isDisabled={false}
                text="%"
                isError={state.errors.commission && !state.values.commission}
                errorText={t('createOffer', 'general', 'thisFieldIsRequired')}
              />
            </RowItemStyled>
            <RowItemStyled
              customStyle="border: none;"
              isDisabled={!offer.pricing.standard.isOn}
              isError={false}
            />
            <RowItemStyled
              customStyle="border: none;"
              isDisabled={!offer.pricing.premium.isOn}
              isError={false}
            />
          </RowStyled>
        </RowStyled>
        <RowStyled>
          <RowItemStyled
            isHeader
            customStyle={`
              min-height: 66px; 
              width: 294px; 
              font-size: 0.8rem; 
              padding-left: 38px;
            `}
          >
            {t('createOffer', 'general', 'totalPrice')}
          </RowItemStyled>
          <RowStyled customStyle="border: none; flex: 1;">
            <RowItemStyled
              isDisabled={!offer.pricing.basic.isOn}
              isError={false}
            >
              <InputItemWithText
                value={getTotalPrice('basic')}
                onChange={(e) => true}
                isDisabled={true}
                text="PLN"
              />
            </RowItemStyled>
            <RowItemStyled
              isDisabled={!offer.pricing.standard.isOn}
              isError={false}
            >
              <InputItemWithText
                value={getTotalPrice('standard')}
                onChange={(e) => true}
                isDisabled={true}
                text="PLN"
              />
            </RowItemStyled>
            <RowItemStyled
              customStyle="border: none;"
              isDisabled={!offer.pricing.premium.isOn}
              isError={false}
            >
              <InputItemWithText
                value={getTotalPrice('premium')}
                onChange={(e) => true}
                isDisabled={true}
                text="PLN"
              />
            </RowItemStyled>
          </RowStyled>
        </RowStyled>
      </TableWrapperStyled>
      <Text fontSize="0.7rem" fontWeight="400">
        *{t('createOffer', 'general', 'totalPriceIncludesTAX')} {taxRate}%
      </Text>
    </>
  );
};

export default memo(Step3Desktop);
