import { configurationItem, InputValuesTypes, OptionsData } from './interfaces';

export const initialOptions = (t: any): OptionsData => ({
  price: [
    {
      id: 1,
      value: '0 - 250 $',
      label: `0 - 250 ${t('offers', 'filter', 'currency')}`,
      type: 'option',
      field: 'price'
    },
    {
      id: 2,
      value: '250 - 1000 $',
      label: `250 - 1000 ${t('offers', 'filter', 'currency')}`,
      type: 'option',
      field: 'price'
    },
    {
      id: 3,
      value: '1000 - 10000 $',
      label: `1000 - 10000 ${t('offers', 'filter', 'currency')}`,
      type: 'option',
      field: 'price'
    },
    {
      id: 4,
      value: '',
      label: '',
      type: 'inputNumber',
      custom: true,
      field: 'price'
    }
  ],
  deliveryDate: [
    {
      id: 1,
      value: '0 - 1 day',
      label: `0 - 1 ${t('offers', 'filter', 'day')}`,
      field: 'deliveryDate'
    },
    {
      id: 2,
      value: '1 - 14 days',
      label: `1 - 14 ${t('offers', 'filter', 'days')}`,
      field: 'deliveryDate'
    },
    {
      id: 3,
      value: '14 - 28 days',
      label: `14 - 28 ${t('offers', 'filter', 'days')}`,
      field: 'deliveryDate'
    },
    {
      id: 4,
      value: '',
      label: '',
      type: 'inputNumber',
      inputValues: {
        priceMin: '',
        priceMax: '',
        deliveryDateMin: '',
        deliveryDateMax: ''
      },
      custom: true,
      field: 'deliveryDate'
    }
  ],
  sortList: [
    {
      id: 1,
      value: 'price',
      label: t('offers', 'filter', 'price'),
      type: 'option',
      field: 'order_by'
    },
    {
      id: 2,
      value: '-price',
      label: t('offers', 'filter', 'priceDescending'),
      type: 'option',
      field: 'order_by'
    },
    {
      id: 3,
      value: 'delivery_time',
      label: t('offers', 'filter', 'deliveryTime'),
      type: 'option',
      field: 'order_by'
    },
    {
      id: 4,
      value: '-delivery_time',
      label: t('offers', 'filter', 'deliveryTimeDescending'),
      type: 'option',
      field: 'order_by'
    },
    {
      id: 5,
      value: 'rating',
      label: t('offers', 'filter', 'rating'),
      type: 'option',
      field: 'order_by'
    },
    {
      id: 6,
      value: '-rating',
      label: t('offers', 'filter', 'ratingDescending'),
      type: 'option',
      field: 'order_by'
    }
  ],
  filterOffers: [
    {
      id: 4,
      value: '',
      label: '',
      type: 'inputNumber',
      custom: true,
      field: 'titleInput'
    }
  ]
});

export const initialInputValues: InputValuesTypes = {
  priceMin: '',
  priceMax: '',
  deliveryDateMin: '',
  deliveryDateMax: '',
  isValidField: {
    priceMin: true,
    priceMax: true,
    deliveryDateMin: true,
    deliveryDateMax: true
  }
};

export const hardcodedConfiguration: configurationItem[] = [
  {
    type: 'select',
    placeholder: 'filterOffers',
    name: 'filterOffers',
    options: [
      {
        id: 1,
        value: 'price',
        label: 'Price',
        type: 'option',
        field: 'order_by'
      },
      {
        id: 2,
        value: '-price',
        label: 'Price (descending)',
        type: 'option',
        field: 'order_by'
      },
      {
        id: 3,
        value: 'delivery_time',
        label: 'Delivery time',
        type: 'option',
        field: 'order_by'
      },
      {
        id: 4,
        value: '-delivery_time',
        label: 'Delivery time (descending)',
        type: 'option',
        field: 'order_by'
      },
      {
        id: 5,
        value: 'rating',
        label: 'Rating',
        type: 'option',
        field: 'order_by'
      },
      {
        id: 6,
        value: '-rating',
        label: 'Rating (descending)',
        type: 'option',
        field: 'order_by'
      }
    ]
  },
  {
    type: 'select',
    placeholder: 'yourBudget',
    name: 'price',
    options: [
      {
        id: 1,
        value: '0 - 250 $',
        label: '0 - 250 $',
        type: 'option',
        field: 'price'
      },
      {
        id: 2,
        value: '250 - 1000 $',
        label: '250 - 1000 $',
        type: 'option',
        field: 'price'
      },
      {
        id: 3,
        value: '1000 - 10000 $',
        label: '1000 - 10000 $',
        type: 'option',
        field: 'price'
      },
      {
        id: 4,
        value: '',
        label: '',
        type: 'inputNumber',
        custom: true,
        field: 'price'
      }
    ]
  },
  {
    type: 'select',
    placeholder: 'deliveryTime',
    name: 'deliveryDate',
    options: [
      {
        id: 1,
        value: '0 - 1 day',
        label: '0 - 1 day',
        field: 'deliveryDate'
      },
      {
        id: 2,
        value: '1 - 14 days',
        label: '1 - 14 days',
        field: 'deliveryDate'
      },
      {
        id: 3,
        value: '14 - 28 days',
        label: '14 - 28 days',
        field: 'deliveryDate'
      },
      {
        id: 4,
        value: '',
        label: '',
        type: 'inputNumber',
        inputValues: {
          priceMin: '',
          priceMax: '',
          deliveryDateMin: '',
          deliveryDateMax: ''
        },
        custom: true,
        field: 'deliveryDate'
      }
    ]
  },
  {
    type: 'select',
    placeholder: 'sortList',
    name: 'sortList',
    options: [
      {
        id: 1,
        value: 'Price',
        label: 'Price',
        field: 'sortList'
      },
      {
        id: 2,
        value: 'Rating',
        label: 'Rating',
        field: 'sortList'
      }
    ]
  }
];
