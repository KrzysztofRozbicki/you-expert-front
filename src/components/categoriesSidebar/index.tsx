import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesTreeAction } from '../../redux/actions/caregories';
import { CategoryState, CategoryItem } from '../../common/interfaceTypes';
import UI from './UI';

export const CategoriesSidebar = () => {
  const dispatch = useDispatch();
  const { categoryList } = useSelector(
    (state: CategoryState) => state.categories
  );
  const [subcategories, setSubcategories] = useState({
    allSubcategories: [],
    currentSubcategories: []
  });
  const { allSubcategories, currentSubcategories } = subcategories;

  const formattCurrentSubcategories = (items: CategoryItem[]) => {
    const formattedItems = [];

    items
      .filter((i) => i.subcategories)
      .forEach((i) => formattedItems.push(...i.subcategories));
    setSubcategories((prevState) => ({
      ...prevState,
      allSubcategories: formattedItems,
      currentSubcategories: formattedItems.slice(0, 10)
    }));
  };

  useEffect(() => {
    dispatch(getCategoriesTreeAction());
  }, []);

  useEffect(() => {
    if (
      !subcategories.allSubcategories.length &&
      categoryList &&
      categoryList.length
    ) {
      formattCurrentSubcategories(categoryList);
    }
  }, [categoryList]);

  const onButtonClick = () => {
    const currentSubcategoriesLength = currentSubcategories.length;
    const allSubcategoriesLength = allSubcategories.length;
    const updatedCurrentItems = currentSubcategoriesLength + 5;
    const isAllItems = currentSubcategoriesLength === allSubcategoriesLength;
    let formattedCurrentSubcategories = [];

    if (isAllItems) {
      formattedCurrentSubcategories = [...allSubcategories.slice(0, 10)];
    } else {
      formattedCurrentSubcategories = [
        ...currentSubcategories,
        ...allSubcategories.slice(
          currentSubcategoriesLength,
          updatedCurrentItems
        )
      ];
    }
    setSubcategories((prevState) => ({
      ...prevState,
      currentSubcategories: formattedCurrentSubcategories
    }));
  };

  if (!currentSubcategories.length) return null;

  return (
    <UI
      onButtonClick={onButtonClick}
      allSubcategories={allSubcategories}
      currentSubcategories={currentSubcategories}
    />
  );
};
