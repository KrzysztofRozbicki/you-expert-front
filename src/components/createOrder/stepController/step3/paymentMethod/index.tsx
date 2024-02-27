import React, { memo } from 'react';
import { Image } from '@chakra-ui/react';
import Checkbox from '../checkbox';
import { PaymentWrapperStyled, PaymentTitleBlockStyled } from '../style';

interface IPaymentMethodProps {
  isChecked: boolean;
  onChange: () => void;
  imgSrc: string;
  imageProps?: any;
}

const PaymentMethod: React.FC<IPaymentMethodProps> = (props) => {
  const { isChecked, onChange, imgSrc, imageProps } = props;

  return (
    <PaymentWrapperStyled>
      <PaymentTitleBlockStyled customStyle="border: none;">
        <Checkbox
          onChange={onChange}
          isChecked={isChecked}
          wrapperStyle={{ width: 'fit-content', marginRight: '44px' }}
        />
        <Image src={imgSrc} {...imageProps} />
      </PaymentTitleBlockStyled>
    </PaymentWrapperStyled>
  );
};

export default memo(PaymentMethod);
