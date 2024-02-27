import { paramsByServiceType } from '../../../interfaces';
import { pricingStateType } from '../interfaces';

export interface PricingByScreenSizeProps {
  t: (slug: string, section: string, key: string) => string;
  state: pricingStateType;
  paramsByService: paramsByServiceType;
  handleCheckboxChange: (pricingPackage: string, value: boolean) => void;
  getValueForParamsItem: (pricingPackage: string, index: number) => any;
  getDisabledPackageForParamsItem: (pricingPackage: string) => boolean;
  handleСhangeDate: (value: string, pricingPackage: string) => void;
  handleChangePrice: (
    e: React.ChangeEvent<HTMLInputElement>,
    pricingPackage: string
  ) => void;
  handleParamsItemChange: (
    value: any,
    pricingPackage: string,
    index: number
  ) => void;
  getErrorForParamsItem: (pricingPackage: string, index: number) => boolean;
}
