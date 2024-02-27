export const accountUIConfiguration: {
    inputType: string;
    name: string;
    isRequired?: boolean;
    isDisabled?: boolean;
  }[] = [
    {
      inputType: 'image',
      name: 'avatar'
    },
    {
      inputType: 'text',
      name: 'title'
    },
    {
      inputType: 'text',
      name: 'firstName',
      isRequired: true,
    },
    {
      inputType: 'text',
      name: 'lastName',
      isRequired: true,
    },
    {
      inputType: 'text',
      name: 'email',
      isDisabled: true
    },
    {
      inputType: 'description',
      name: 'description'
    },
  ];