import { pricingState } from '../../interfaces';

export interface pricingStateType {
  values: {
    pricing: pricingState;
  };
  errors: {
    pricing: {
      basic: {
        deliveryTime: boolean;
        price: boolean;
        params: boolean[];
      };
      standard: {
        deliveryTime: boolean;
        price: boolean;
        params: boolean[];
      };
      premium: {
        deliveryTime: boolean;
        price: boolean;
        params: boolean[];
      };
    };
  };
}
