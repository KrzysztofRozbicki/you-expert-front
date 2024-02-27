import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import UI from './UI';
import { option } from './interfaces';
import { getAllOffersAction } from '../../redux/actions/offers';

interface FiltersProps {
  onFiltersChange?: Function;
  wrapperProps?: { [key: string]: string | number };
}

export const Filters: React.FC<FiltersProps> = (props) => {
  const { onFiltersChange, wrapperProps } = props;
  const dispatch = useDispatch();
  const router = useRouter();
  const [filtersData, setFiltersData] = useState({});
  const [selectedOptions, setSelectedOption] = useState(null);

  const getFilterOptionData = (selectedValue: option) => {
    const { field, value } = selectedValue;
    if (field === 'title') {
      return { [field]: value || '' };
    }

    if (!field || field === 'sortList') return selectedValue;

    if (field === 'order_by') {
      return {
        order_by: value || ''
      };
    }

    const [min, max] = value.match(/\d+/g);
    if (field === 'price') {
      return {
        price__gte: min,
        price__lte: max
      };
    }

    if (field === 'deliveryDate') {
      return {
        delivery_date_in_days_basic_min: min,
        delivery_date_in_days_basic_max: max
      };
    }

    return {};
  };

  const onFilterChange = (selectedValue: option) => {
    if (!selectedValue) return null;

    const { category, subcategory, service } = router.query;
    let updatedFiltersData = {
      category,
      subcategory,
      service
    };
    const formattedParameter = getFilterOptionData(selectedValue);

    const selectedOptionsKeys = selectedOptions
      ? Object.keys(selectedOptions)
      : null;
    if (selectedOptionsKeys) {
      selectedOptionsKeys.forEach((key) => {
        if (
          selectedOptions[key] &&
          formattedParameter[key] &&
          selectedOptions[key] === formattedParameter[key]
        ) {
          delete formattedParameter[key];
          delete filtersData[key];
        }
      });
    }

    setSelectedOption((prevState: any) => ({
      ...prevState,
      ...formattedParameter
    }));
    updatedFiltersData = {
      ...updatedFiltersData,
      ...formattedParameter
    };

    setFiltersData((prevState: any) => ({
      ...prevState,
      ...updatedFiltersData
    }));

    if (onFiltersChange) {
      onFiltersChange({ ...filtersData, ...updatedFiltersData });
    } else {
      dispatch(getAllOffersAction({ ...filtersData, ...updatedFiltersData }));
    }
  };
  return <UI onChange={onFilterChange} wrapperProps={wrapperProps} />;
};
