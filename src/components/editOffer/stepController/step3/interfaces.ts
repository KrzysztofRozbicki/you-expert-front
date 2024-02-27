import { IEditOfferData } from '../../interfaces';
import { initialState } from './index';

export interface Step3ItemProps {
  t: any;
  state: initialState;
  offer: IEditOfferData;
  taxRate: string;
  getTotalPrice: (packageName: string) => string;
  handleChangeCommission: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
