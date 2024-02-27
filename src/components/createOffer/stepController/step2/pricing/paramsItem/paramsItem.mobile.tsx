import React, { memo, useMemo } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import useTranslation from '../../../../../../hooks/useTranslation';
import SelectItem from '../selectItem';
import Checkbox from '../../checkbox';
import InputItem from '../inputItem';
import { paramsItemProps } from './interfaces';
import RequiredMark from '../../../../../common/RequiredMark';

interface paramsItemPropsMobile extends paramsItemProps {
  packageName: 'basic' | 'standard' | 'premium';
}

const ParamsItemMobile: React.FC<paramsItemPropsMobile> = (props) => {
  const {
    packageName,
    parameter,
    getValue,
    handleChange,
    index,
    getDisabled,
    getError
  } = props;

  const { t } = useTranslation();

  const isDisabled = getDisabled(packageName);
  const isError = getError(packageName, index);

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
          <SelectItem
            options={options}
            selected={getValue(packageName, index)}
            onChange={({ value }) => handleChange(value, packageName, index)}
            isDisabled={isDisabled}
            wrapperProps={{ p: '10px 0', fontSize: '0.6rem !important' }}
            textWrapperProps={{
              fontSize: '0.6rem !important',
              borderBottom: isError
                ? '2px solid#D74F3E !important'
                : '2px solid #DCDCF4 !important'
            }}
            isError={isError}
            errorText={t('createOffer', 'general', 'thisFieldIsRequired')}
            errorTextProps={{ fontSize: '0.5rem' }}
          />
        </>
      );
    } else if (parameter.type === 'INT') {
      return (
        <>
          <InputItem
            value={getValue(packageName, index)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e.target.value, packageName, index)
            }
            type="number"
            isDisabled={isDisabled}
            inputProps={{
              fontSize: '0.6rem !important',
              height: '30px',
              paddingTop: '0',
              paddingBottom: '0',
              borderRadius: '0px',
              borderBottom: isError
                ? '2px solid#D74F3E !important'
                : '2px solid #DCDCF4 !important'
            }}
            isError={isError}
            errorText={t('createOffer', 'general', 'thisFieldIsRequired')}
            errorTextProps={{ fontSize: '0.5rem' }}
          />
        </>
      );
    } else if (parameter.type === 'BOOL') {
      const isChecked = getValue(packageName, index);
      return (
        <Checkbox
          isChecked={isChecked}
          onChange={() => handleChange(!isChecked, packageName, index)}
          isDisabled={isDisabled}
          wrapperStyle={{ width: 'fit-content' }}
          checkboxStyle="span { width: 27px; height: 27px; }"
        />
      );
    }

    return <></>;
  };

  return (
    <Flex mb="10px" alignItems="center" justifyContent="space-between">
      <Text w="48%">
        {parameter?.title} {isRequired && <RequiredMark />}
      </Text>
      <Flex w="48%" maxWidth="150px" justifyContent="flex-end">
        {getComponentByType()}
      </Flex>
    </Flex>
  );
};

export default memo(ParamsItemMobile);
