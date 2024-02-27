import { serviceParameters } from '../../../../interfaces';

export interface paramsItemProps {
    parameter: serviceParameters;
    index: number;
    getValue: (pricingPackage: string, index: number) => any;
    handleChange: (value: any, pricingPackage: string, index: number) => void;
    getDisabled: (pricingPackage: string) => boolean;
    getError: (pricingPackage: string, index: number) => boolean;
  }