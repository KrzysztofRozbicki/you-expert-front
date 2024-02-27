import React, { useState } from 'react';
import Switch from 'react-switch';
import { Flex, Text } from '@chakra-ui/react';
import useTranslation from '../../hooks/useTranslation';
import { SwitchItem } from './Interfaces';

const SwitchController: React.FC<SwitchItem> = ({
  checked,
  label,
  handleChange,
  disabled
}) => {
  const { t } = useTranslation();
  // const [isChecked, setChecked] = useState(checked);

  return (
    <Flex align="center" cursor={disabled ? 'no-drop' : 'pointer'}>
      {label && <Text>{label}</Text>}
      <Switch
        offColor="#DCDCF4"
        onColor="#DCDCF4"
        onChange={handleChange}
        checkedIcon={false}
        uncheckedIcon={false}
        checked={checked}
        onHandleColor="#280363"
        handleDiameter={17}
        disabled={disabled}
      />
      <Text
        w="30px"
        fontSize="0.8rem"
        lineHeight="34px"
        fontWeight="600"
        ml="22px"
      >
        {checked ? t('common', 'answers', 'yes') : t('common', 'answers', 'no')}
      </Text>
    </Flex>
  );
};

export default SwitchController;
