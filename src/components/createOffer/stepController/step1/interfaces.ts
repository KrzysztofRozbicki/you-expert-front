import { categoryItem } from '../../interfaces';

export type initialStateType = {
  values: {
    serviceTitle: string;
    category: categoryItem;
    subcategory: categoryItem;
    service: categoryItem;
  };
  errors: {
    serviceTitle: boolean;
    category: boolean;
    subcategory: boolean;
    service: boolean;
  };
};
