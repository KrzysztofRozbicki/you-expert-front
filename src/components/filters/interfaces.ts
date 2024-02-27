export interface InputValuesTypes {
  priceMin: string | number;
  priceMax: string | number;
  deliveryDateMin: string | number;
  deliveryDateMax: string | number;
  titleInput?: string;
  isValidField?: {
    priceMin: boolean;
    priceMax: boolean;
    deliveryDateMin: boolean;
    deliveryDateMax: boolean;
  };
}

export interface option {
  id: number;
  value: string;
  label: string;
  type?: string;
  custom?: boolean;
  isCustom?: boolean;
  field: string;
  inputValues?: {
    priceMin: string;
    priceMax: string;
    deliveryDateMin: string;
    deliveryDateMax: string;
  };
  onCustomFieldChange?: Function;
  onButtonClick?: Function;
}

export interface configurationItem {
  type: string;
  placeholder: string;
  name: string;
  options: option[];
}

export interface OptionsData {
  price: option[];
  deliveryDate: option[];
  sortList: option[];
  filterOffers: option[] | [];
}
