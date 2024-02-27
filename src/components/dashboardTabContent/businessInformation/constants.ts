import { BusinessInformationState } from './interfaces';

export const inputsConfig: {
  name: string;
  isRequired?: boolean;
  maxLength?: number;
}[] = [
  {
    name: 'companyName',
    isRequired: true,
    maxLength: 40
  },
  {
    name: 'nipNumber',
    isRequired: true,
    maxLength: 13
  },
  {
    name: 'country',
    isRequired: true,
    maxLength: 30
  },
  {
    name: 'city',
    isRequired: true,
    maxLength: 20
  },
  {
    name: 'street',
    isRequired: true,
    maxLength: 30
  },
  {
    name: 'zipCode',
    isRequired: true,
    maxLength: 6
  },
  {
    name: 'phoneNumber',
    isRequired: true,
    maxLength: 12
  }
];

export const stateValues = {
  companyName: '',
  nipNumber: '',
  country: '',
  city: '',
  street: '',
  zipCode: '',
  phoneNumber: '',
  eInvoices: false,
  issuingInvoices: false,
  termsAndConditions: false,
  isCompany: false
};

export const stateErrors = {
  companyName: false,
  nipNumber: false,
  country: false,
  city: false,
  street: false,
  zipCode: false,
  phoneNumber: false,
  eInvoices: false,
  issuingInvoices: false,
  termsAndConditions: false,
  isCompany: false
};
