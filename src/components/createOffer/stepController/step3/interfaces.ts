import { offerType } from '../../interfaces';
import { initialState } from './index';

export interface Step3ItemProps {
  t: any;
  state: initialState;
  offer: offerType;
  taxRate: string;
  getTotalPrice: (packageName: string) => string;
  handleChangeCommission: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
