export interface IErrors {
  bankName: boolean;
  address: boolean;
  accountNumber: boolean;
  swift: boolean;
}

export interface IValues {
  bankName: string;
  address: string;
  accountNumber: string;
  swift: string;
}

export interface IState {
  values: IValues;
  errors: IErrors;
}
