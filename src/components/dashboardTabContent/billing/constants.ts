export const inputConfig: {
  inputType?: string;
  name: string;
  isRequired?: boolean;
}[] = [
  {
    inputType: 'input',
    name: 'bankName',
    isRequired: true,
  },
  {
    inputType: 'textarea',
    name: 'address',
    isRequired: true,
  },
  {
    inputType: 'input',
    name: 'accountNumber',
    isRequired: true,
  },
  {
    inputType: 'input',
    name: 'swift',
    isRequired: true,
  }
];
