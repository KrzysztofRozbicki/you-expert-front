export interface IValuesState {
  avatar: {
    id: number;
    filename: string;
    file: string;
  };
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  description: string;
}

export interface IErrorsState {
  avatar: boolean;
  title: boolean;
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  description: boolean;
}

export interface IState {
  values: IValuesState;
  errors: IErrorsState;
}
