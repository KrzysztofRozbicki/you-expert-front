export interface BusinessInformationProps {}

export interface BusinessInformationState {
  values: {
    companyName: string;
    nipNumber: string;
    country: string;
    city: string;
    street: string;
    zipCode: string;
    phoneNumber: string;
    eInvoices: boolean;
    issuingInvoices: boolean;
    termsAndConditions: boolean;
    isCompany: boolean;
  };
  errors: {
    companyName: boolean;
    nipNumber: boolean;
    country: boolean;
    city: boolean;
    street: boolean;
    zipCode: boolean;
    phoneNumber: boolean;
    eInvoices: boolean;
    issuingInvoices: boolean;
    termsAndConditions: boolean;
    isCompany: boolean;
  };
}
