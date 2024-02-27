import { useSelector } from 'react-redux';
import UI from './UI';
import { CategoryState } from '../../common/interfaceTypes';

export const ServiceCategories = (props) => {
  const { categoryList } = useSelector(
    (state: CategoryState) => state.categories
  );

  return <UI {...props} categoryList={categoryList} />;
};
