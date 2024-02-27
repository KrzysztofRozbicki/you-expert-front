import { IOfferData, IOrderData } from '../interfaces';

export interface StepProps {
  goNextStep: () => void;
  goPrevStep: () => void;
  offerData: IOfferData;
  orderData: IOrderData;
  packageName?: string;
}
