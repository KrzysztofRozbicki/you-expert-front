import React, { memo, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import en from 'date-fns/locale/en-US';
import pl from 'date-fns/locale/pl';
import CustomInput from './customInput';

import 'react-datepicker/dist/react-datepicker.css';

interface DateControllerProps {
  value: string;
  onChange: (date: string) => void;
  minDate?: string;
  maxDate?: string;
}

const DateController: React.FC<DateControllerProps> = (props) => {
  const { value, onChange, minDate, maxDate } = props;
  const {
    query: { locale }
  } = useRouter();

  const dictionary = useMemo(() => {
    if (locale === 'pl') {
      return pl;
    }

    return en;
  }, [locale]);

  return (
    <DatePicker
      selected={value}
      onChange={(date) => onChange(date)}
      customInput={<CustomInput onResetButtonClick={() => onChange('')} />}
      minDate={minDate}
      maxDate={maxDate}
      locale={dictionary}
    />
  );
};

export default memo(DateController);
