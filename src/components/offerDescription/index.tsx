import UI from './UI';
import { DescriptionItem } from './common';
import { useSelector } from 'react-redux';
import { OffersState } from '../../common/interfaceTypes';

const hardcodedDescription: DescriptionItem[] = [
  {
    title: 'How it will look like - the whole process of creation',
    description:
      'Pariatur ex aliqua elit ut enim consequat amet non do ut. Ad aute deserunt fugiat qui Lorem in quis velit labore voluptate. Laboris non exercitation dolor sint id pariatur incididunt nostrud.',
    options: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor'
    ]
  },
  {
    title: 'How it will look like - the whole process of creation',
    description:
      'Pariatur ex aliqua elit ut enim consequat amet non do ut. Ad aute deserunt fugiat qui Lorem in quis velit labore voluptate. Laboris non exercitation dolor sint id pariatur incididunt nostrud.',
    options: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor'
    ]
  }
];

export const OfferDescription = () => {
  const { currentOffer } = useSelector((state: OffersState) => state.offers);

  if (!currentOffer) return null;

  return <UI description={currentOffer.description} />;
};
