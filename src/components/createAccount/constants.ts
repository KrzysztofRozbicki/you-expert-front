export const inputFirstStepConfig: {
  name: string;
  underMessage?: string;
}[] = [
  {
    name: 'email'
  },
  {
    name: 'password',
    underMessage: 'underPasswordMessage',
  }
];

export const inputSecondStepConfig: {
  name: string;
}[] = [
  {
    name: 'firstName'
  },
  {
    name: 'lastName'
  }
];
