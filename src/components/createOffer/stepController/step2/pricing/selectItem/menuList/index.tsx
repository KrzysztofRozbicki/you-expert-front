import React, { memo, useEffect } from 'react';
import { MenuListStyled, MenuListItemStyled } from './style';
import { option } from '../index';

interface MenuListProps {
  selectedValue: option;
  options: option[];
  onChange: (option: option) => void;
  onClose: () => void;
}

const MenuList: React.FC<MenuListProps> = (props) => {
  const { selectedValue, options, onChange, onClose } = props;

  useEffect(() => {
    document.addEventListener('click', onClose, { once: true });
  }, []);

  return (
    <MenuListStyled>
      {options.map((item, index) => (
        <MenuListItemStyled
          key={index}
          isActive={selectedValue.value === item.value}
          onClick={() => onChange(item)}
          style={index + 1 === options.length ? { borderBottom: 'none' } : {}}
          p={{ sm: '20px', lg: '19.5px 51px'}}
        >
          {item.label}
        </MenuListItemStyled>
      ))}
    </MenuListStyled>
  );
};

export default memo(MenuList);
