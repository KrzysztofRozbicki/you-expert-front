import React, { memo, useMemo } from 'react';
import { Text } from '@chakra-ui/react';
import useTranslation from '../../../../../../hooks/useTranslation';
import SelectItem from '../selectItem';
import Checkbox from '../../checkbox';
import InputItem from '../inputItem';
import { RowStyled, RowItemStyled } from '../../../style';
import { paramsItemProps } from './interfaces';
import RequiredMark from '../../../../../common/RequiredMark';

const ParamsItemDesktop: React.FC<paramsItemProps> = (props) => {
  const { parameter, getValue, handleChange, index, getDisabled, getError } =
    props;

  const { t } = useTranslation();

  const isDisabledBasic = getDisabled('basic');
  const isDisabledStandard = getDisabled('standard');
  const isDisabledPremium = getDisabled('premium');

  const isErrorBasic = getError('basic', index);
  const isErrorStandard = getError('standard', index);
  const isErrorPremium = getError('premium', index);

  const isRequired = useMemo(
    (): boolean => !parameter?.isOptional && parameter?.type !== 'BOOL',
    [parameter]
  );

  const getComponentByType = () => {
    if (parameter.type === 'CUSTOM') {
      const options = parameter.choices.map((item) => ({
        value: item,
        label: item
      }));
      return (
        <>
          <RowItemStyled
            customStyle="padding: 0;"
            isDisabled={isDisabledBasic}
            isError={isErrorBasic}
          >
            <SelectItem
              options={options}
              selected={getValue('basic', index)}
              onChange={({ value }) => handleChange(value, 'basic', index)}
              isDisabled={isDisabledBasic}
              isError={isErrorBasic}
              errorText={t('createOffer', 'general', 'thisFieldIsRequired')}
            />
          </RowItemStyled>
          <RowItemStyled
            customStyle="padding: 0;"
            isDisabled={isDisabledStandard}
            isError={isErrorStandard}
          >
            <SelectItem
              options={options}
              selected={getValue('standard', index)}
              onChange={({ value }) => handleChange(value, 'standard', index)}
              isDisabled={isDisabledStandard}
              isError={isErrorStandard}
              errorText={t('createOffer', 'general', 'thisFieldIsRequired')}
            />
          </RowItemStyled>
          <RowItemStyled
            customStyle="padding: 0; border: none;"
            isDisabled={isDisabledPremium}
            isError={isErrorPremium}
          >
            <SelectItem
              options={options}
              selected={getValue('premium', index)}
              onChange={({ value }) => handleChange(value, 'premium', index)}
              isDisabled={isDisabledPremium}
              isError={isErrorPremium}
              errorText={t('createOffer', 'general', 'thisFieldIsRequired')}
            />
          </RowItemStyled>
        </>
      );
    } else if (parameter.type === 'INT') {
      return (
        <>
          <RowItemStyled isDisabled={isDisabledBasic} isError={isErrorBasic}>
            <InputItem
              value={getValue('basic', index)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e.target.value, 'basic', index)
              }
              type="number"
              isDisabled={isDisabledBasic}
              isError={isErrorBasic}
              errorText={t('createOffer', 'general', 'thisFieldIsRequired')}
            />
          </RowItemStyled>
          <RowItemStyled
            isDisabled={isDisabledStandard}
            isError={isErrorStandard}
          >
            <InputItem
              value={getValue('standard', index)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e.target.value, 'standard', index)
              }
              type="number"
              isDisabled={isDisabledStandard}
              isError={isErrorStandard}
              errorText={t('createOffer', 'general', 'thisFieldIsRequired')}
            />
          </RowItemStyled>
          <RowItemStyled
            customStyle="border: none;"
            isDisabled={isDisabledPremium}
            isError={isErrorPremium}
          >
            <InputItem
              value={getValue('premium', index)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e.target.value, 'premium', index)
              }
              type="number"
              isDisabled={isDisabledPremium}
              isError={isErrorPremium}
              errorText={t('createOffer', 'general', 'thisFieldIsRequired')}
            />
          </RowItemStyled>
        </>
      );
    } else if (parameter.type === 'BOOL') {
      const isCheckedByPackage = {
        basic: getValue('basic', index),
        standard: getValue('standard', index),
        premium: getValue('premium', index)
      };
      return (
        <>
          <RowItemStyled
            customStyle="padding: 0;"
            isDisabled={isDisabledBasic}
            isError={isErrorBasic}
          >
            <Checkbox
              isChecked={isCheckedByPackage.basic}
              onChange={() =>
                handleChange(!isCheckedByPackage.basic, 'basic', index)
              }
              isDisabled={isDisabledBasic}
              wrapperStyle={{
                justifyContent: 'flex-end',
                paddingRight: '26px'
              }}
            />
          </RowItemStyled>
          <RowItemStyled
            customStyle="padding: 0;"
            isDisabled={isDisabledStandard}
            isError={isErrorStandard}
          >
            <Checkbox
              isChecked={isCheckedByPackage.standard}
              onChange={() =>
                handleChange(!isCheckedByPackage.standard, 'standard', index)
              }
              isDisabled={isDisabledStandard}
              wrapperStyle={{
                justifyContent: 'flex-end',
                paddingRight: '26px'
              }}
            />
          </RowItemStyled>
          <RowItemStyled
            customStyle="padding: 0; border: none;"
            isDisabled={isDisabledPremium}
            isError={isErrorPremium}
          >
            <Checkbox
              isChecked={isCheckedByPackage.premium}
              onChange={() =>
                handleChange(!isCheckedByPackage.premium, 'premium', index)
              }
              isDisabled={isDisabledPremium}
              wrapperStyle={{
                justifyContent: 'flex-end',
                paddingRight: '26px'
              }}
            />
          </RowItemStyled>
        </>
      );
    }

    return <></>;
  };

  return (
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
          {parameter?.title} {isRequired && <RequiredMark />}
        </Text>
      </RowItemStyled>
      <RowStyled customStyle="border: none; flex: 1;">
        {getComponentByType()}
      </RowStyled>
    </RowStyled>
  );
};

export default memo(ParamsItemDesktop);
