import React, {
  useRef,
  useState,
  memo,
  useCallback,
  useMemo,
  useEffect
} from 'react';
import { Flex, Input, InputGroup, Button, Text } from '@chakra-ui/react';
import { components } from 'react-select';
import { useSelector } from 'react-redux';
import SelectController from '../common/SelectController';
import useTranslation from '../../hooks/useTranslation';
import selectStyle from './selectStyle';
import { configurationItem, OptionsData, InputValuesTypes } from './interfaces';
import {
  initialInputValues,
  initialOptions,
  hardcodedConfiguration
} from './constants';
import { isHasCharacters } from '../../utils/index';
import { screenSizesNumber } from '../../styles/theme/breakpoints';

import styles from './Filters.module.scss';

const CustomOption = (props) => {
  const { t } = useTranslation();
  const { data, innerRef, innerProps } = props;

  const firstRef = useRef<HTMLInputElement | null>(null);
  const secondRef = useRef<HTMLInputElement | null>(null);

  const handleClick = (event, ref, shouldCallOnClick) => {
    event.stopPropagation();
    event.preventDefault();

    if (shouldCallOnClick) {
      innerProps.onClick();
    }

    if (ref && ref.current) {
      ref.current.focus();
    }
  };

  if (data.custom) {
    const {
      onButtonClick,
      onCustomFieldChange,
      cleanFilter,
      inputValues,
      field
    } = data;

    const onSetOptions = () => {
      onButtonClick(props.selectOption, field);
    };

    const onKeyDownHandler = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === '.') {
          e.preventDefault();
        }
      },
      []
    );

    if (field === 'titleInput') {
      return (
        <InputGroup p="20px" bg="general.white">
          {inputValues.titleInput ? (
            <Button
              onClick={(e) => {
                inputValues.titleInput = '';
                cleanFilter(props.selectOption, 'titleInput', {
                  target: { name: 'titleInput', value: '' }
                });
                props.clearValue();
              }}
              style={{ width: '20px' }}
              mr="10px"
              p="5px !important"
              w="70%"
              fontSize="0.8rem"
            >
              X
            </Button>
          ) : null}
          <Input
            w="100%"
            tabIndex={1}
            value={inputValues.titleInput || ''}
            onChange={(event) => {
              onCustomFieldChange(event);
            }}
            mr="20px"
            name="titleInput"
            ref={firstRef}
            onClick={(e) => handleClick(e, firstRef, false)}
            // onMouseUp={(e) => handleClick(e, firstRef, false)}
            // onTouchEnd={(e) => handleClick(e, firstRef, false)}
            //onTouchStart={(e) => handleClick(e, firstRef, false)}
            type="text"
            placeholder={t('offers', 'filter', 'title')}
            min="0"
            step="1"
            onKeyDown={onKeyDownHandler}
            style={{ caretColor: '#000' }}
            fontSize="0.8rem"
          />
          <Button w="70%" onClick={() => onSetOptions()} fontSize="0.8rem">
            {t('offers', 'filter', 'OK')}
          </Button>
        </InputGroup>
      );
    }

    return (
      <InputGroup p="20px" bg="general.white">
        <Input
          tabIndex={1}
          borderColor={
            inputValues.isValidField[`${field}Min`]
              ? '#DCDCF4'
              : 'red !important'
          }
          value={inputValues[`${field}Min`] || ''}
          onChange={(event) => {
            onCustomFieldChange(event);
          }}
          mr="20px"
          name={`${field}Min`}
          ref={firstRef}
          onClick={(e) => handleClick(e, firstRef, false)}
          // onMouseUp={(e) => handleClick(e, firstRef, false)}
          // onTouchEnd={(e) => handleClick(e, firstRef, false)}
          //onTouchStart={(e) => handleClick(e, firstRef, false)}
          type="text"
          placeholder={t('offers', 'filter', 'min')}
          min="0"
          step="1"
          // onKeyDown={onKeyDownHandler}
          style={{ caretColor: '#000' }}
          fontSize="0.8rem"
        />
        <Input
          tabIndex={2}
          borderColor={
            inputValues.isValidField[`${field}Max`]
              ? '#DCDCF4'
              : 'red !important'
          }
          mr="20px"
          value={inputValues[`${field}Max`] || ''}
          name={`${field}Max`}
          onChange={(event) => onCustomFieldChange(event)}
          ref={secondRef}
          onClick={(e) => handleClick(e, secondRef, false)}
          // onMouseUp={(e) => handleClick(e, secondRef, false)}
          // onTouchEnd={(e) => handleClick(e, secondRef, false)}
          //onTouchStart={(e) => handleClick(e, secondRef, false)}
          type="number"
          placeholder={t('offers', 'filter', 'max')}
          min="0"
          step="1"
          onKeyDown={onKeyDownHandler}
          style={{ caretColor: '#000' }}
          fontSize="0.8rem"
        />
        <Button w="70%" onClick={() => onSetOptions()} fontSize="0.8rem">
          {t('offers', 'filter', 'OK')}
        </Button>
      </InputGroup>
    );
  }

  return <components.Option {...props} />;
};

const UI = (props) => {
  const { t } = useTranslation();
  const { onChange, wrapperProps } = props;
  const [inputValues, setValues] =
    useState<InputValuesTypes>(initialInputValues);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState<boolean>(false);
  const windowWidth = useSelector(
    (state: any): number => state.app.windowWidth
  );

  const [options, setOptions] = useState<OptionsData>(initialOptions(t));

  const handleSelectChange = (selectedValue) => {
    onChange(selectedValue);
    setIsFilterMenuOpen(false);
  };

  const onCustomFilterFieldChange = (event, isBackspace) => {
    const { value, name } = event.target;

    if (
      isHasCharacters(value) &&
      !isNaN(Number(value)) &&
      name !== 'titleInput'
    ) {
      setValues((prevProps) => ({
        ...prevProps,
        [name]: inputValues[name]
      }));
      return null;
    }
    if (name === 'titleInput') {
      setValues((prevProps) => ({
        ...prevProps,
        [name]: isBackspace ? value.slice(0, -1) : value
      }));
      return null;
    }

    if (value.includes('-') || value === 0) {
      return event.preventDefault();
    }

    let formattedValue = isBackspace
      ? value.substring(0, value.length - 1)
      : value;
    formattedValue =
      formattedValue[0] === '0' ? formattedValue.slice(1) : formattedValue;

    if (value === '0') {
      setValues((prevProps) => ({
        ...prevProps,
        [name]: value
      }));
      return null;
    }

    setValues((prevProps) => ({
      ...prevProps,
      [name]: formattedValue ? Number(formattedValue) : ''
    }));
  };

  const isDisabledPriceSetButton = useMemo(
    () => !(inputValues.priceMin || inputValues.priceMax),
    [inputValues.priceMin, inputValues.priceMax]
  );

  const isDisabledDeliveryDateSetButton = useMemo(
    () => !(inputValues.deliveryDateMin || inputValues.deliveryDateMax),
    [inputValues.deliveryDateMin, inputValues.deliveryDateMax]
  );

  const cleanFilter = (finishAction: Function, optionName: string) => {
    onButtonClick(finishAction, optionName);
  };

  const onButtonClick = (finishAction: Function, optionName: string) => {
    if (optionName === 'titleInput') {
      const filterValue = inputValues.titleInput;
      if (!filterValue) {
        finishAction({
          value: '',
          label: '',
          field: 'title'
        });
        return null;
      }
      finishAction({
        value: filterValue.toLowerCase(),
        label: filterValue,
        field: 'title'
      });
      return null;
    }
    if (
      (optionName === 'price' && !isDisabledPriceSetButton) ||
      (optionName === 'deliveryDate' && !isDisabledDeliveryDateSetButton)
    ) {
      const minFieldName = `${optionName}Min`;
      const maxFieldName = `${optionName}Max`;
      const minValue = inputValues[minFieldName];
      const maxValue = inputValues[maxFieldName];
      const isValidValues =
        (minValue && maxValue && minValue <= maxValue) ||
        (minValue && !maxValue) ||
        (!minValue && maxValue);

      let optionTextValue;
      if (minValue && maxValue) {
        optionTextValue = `${minValue} - ${maxValue}`;
      } else if (minValue && !maxValue) {
        optionTextValue = `${t('offers', 'filter', 'from')} ${minValue}`;
      } else if (!minValue && maxValue) {
        optionTextValue = `0 - ${maxValue}`;
      }

      if (optionName === 'price') {
        optionTextValue += ` ${t('offers', 'filter', 'currency')}`;
      } else if (optionName === 'deliveryDate') {
        optionTextValue += ` ${t('offers', 'filter', 'days')}`;
      }

      if (isValidValues) {
        setValues((prevState) => ({
          ...prevState,
          priceMin: '',
          priceMax: '',
          deliveryDateMin: '',
          deliveryDateMax: '',
          isValidField: {
            ...prevState.isValidField,
            [minFieldName]: true,
            [maxFieldName]: true
          }
        }));
        let currentOptionsList = [...options[optionName]];
        const lastItem = currentOptionsList.splice(
          currentOptionsList.length - 1,
          1
        );
        const newOption = {
          id: currentOptionsList.length + 2,
          value: optionTextValue,
          label: optionTextValue,
          field: optionName,
          isCustom: true
        };

        const hasCurrentOption = currentOptionsList.find(
          (option) => option.value === newOption.value
        );
        if (!hasCurrentOption) {
          currentOptionsList = currentOptionsList.filter((i) => !i?.isCustom);

          currentOptionsList.push(newOption);
          currentOptionsList.push(...lastItem);

          setOptions((prevState) => ({
            ...prevState,
            [optionName]: currentOptionsList
          }));
        }

        finishAction(newOption);
        setIsFilterMenuOpen(false);
      } else {
        setValues((prevState) => ({
          ...prevState,
          isValidField: {
            ...prevState.isValidField,
            [minFieldName]: false,
            [maxFieldName]: false
          }
        }));
      }
    }
  };

  const renderFiltersList = (
    scheme: configurationItem[],
    optionsData: OptionsData
  ) => {
    return scheme.map((item) => {
      const { type, placeholder, name } = item;

      if (type === 'select') {
        const formattedOptions = optionsData[name].map((i) => {
          if (i.custom) {
            i.onCustomFieldChange = onCustomFilterFieldChange;
            i.inputValues = inputValues;
            i.onButtonClick = onButtonClick;
            i.cleanFilter = cleanFilter;
          }
          return i;
        });
        return (
          <Flex
            w={{ sm: '100%', md: '49%', lg: '23%' }}
            mb={{ sm: '15px', md: '30px', lg: '0' }}
          >
            <SelectController
              wrapperStyle={{ width: '100%' }}
              key={name}
              customStyle={selectStyle}
              placeholder={t('offers', 'filter', placeholder)}
              name={name}
              isSearchable={false}
              options={formattedOptions}
              components={{ Option: CustomOption }}
              onChange={(value) => handleSelectChange(value)}
              onCustomFilterFieldChange={onCustomFilterFieldChange}
              setOptions={setOptions}
            />
          </Flex>
        );
      }
      return <Input />;
    });
  };

  useEffect(() => {
    if (windowWidth >= screenSizesNumber.md) {
      setIsFilterMenuOpen(false);
    }
  }, [windowWidth]);

  return (
    <>
      {windowWidth >= screenSizesNumber.md ? (
        <Flex
          w="100%"
          m="0 auto"
          p="50px 0"
          align="center"
          justifyContent="space-between"
          flexWrap="wrap"
          {...wrapperProps}
        >
          {renderFiltersList(hardcodedConfiguration, options)}
        </Flex>
      ) : (
        <Flex
          w="100%"
          h="74px"
          position="relative"
          m={{ sm: '20px 0', lg: '55px 0' }}
        >
          <Flex
            w="100%"
            position="absolute"
            top="0"
            left="0"
            background="#fff"
            border="1px solid #DCDCF4"
            borderRadius="37px"
            height={isFilterMenuOpen ? '345px' : '72px'}
            zIndex={1}
            flexDirection="column"
            overflow={!isFilterMenuOpen ? 'hidden' : 'initial'}
            transition="all 0.1s ease-in-out 0s"
            padding="0 10px"
          >
            <Flex
              w="100%"
              h="71px"
              alignItems="center"
              flexShrink={0}
              onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
              pl="30px"
            >
              <Text flex={1} fontSize="16px" fontWeight="500">
                {t('offers', 'filter', 'filters')}
              </Text>
              <Flex
                w="41px"
                h="41px"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                borderRadius="50%"
                background="general.iconBackground"
                transform={isFilterMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)'}
                transition="transform 0.1s ease-in-out 0s"
              >
                <svg
                  width="15"
                  height="8"
                  viewBox="0 0 15 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.0416 1.30713L7.49996 6.62481L1.95829 1.30713"
                    stroke="#020055"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Flex>
            </Flex>
            {renderFiltersList(hardcodedConfiguration, options)}
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default memo(UI);
