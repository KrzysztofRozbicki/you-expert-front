import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { debounce } from 'lodash';
import { searchCategories } from '../../api/offers';
import UI from './UI';
import { AppState } from '../../common/interfaceTypes';
import { initialStateType } from '../../redux/interfaces/app';
import { screenSizesNumber } from '../../styles/theme/breakpoints';

export const FindExpertSection = (props) => {
  const router = useRouter();
  const { currentLocale } = useSelector((state: AppState) => state.app);
  const [searchValue, setValue] = useState('');
  const [hints, setHints] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState('');
  const [timeout, setTimeoutVal] = useState(null);
  const { windowWidth } = useSelector(
    (state: any): initialStateType => state.app
  );

  const getSearchOffers = async (data: string) => {
    try {
      const response = await searchCategories(data);
      if (response && response.data.count) {
        setHints(response.data.results.slice(0, 6));
      } else {
        setHints([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getHints = debounce(async (value: string) => {
    getSearchOffers(value);
  }, 1000);

  const onSearchChange = (event: React.FormEvent<HTMLInputElement>) => {
    const newValue =
      typeof event === 'string' ? event : event.currentTarget.value;

    if (timeout) clearTimeout(timeout);
    setValue(newValue);
    if (newValue) {
      let delay: ReturnType<typeof setTimeout>;
      delay = setTimeout(() => {
        getHints(newValue);
      }, 1000);

      setTimeoutVal(delay);
    } else {
      setHints([]);
    }
  };

  const onSelect = (value, url) => {
    if (url && url.includes('/')) {
      const [slug1, slug2, slug3] = url.split('/');
      if (slug1 && slug2 && slug3) {
        router.push(
          '/[locale]/categories/[category]/[subcategory]/services/[service]/offers/',
          `/${currentLocale}/categories/${slug1}/${slug2}/services/${slug3}/offers/`
        );
      } else if (slug1 && slug2) {
        router.push(
          '/[locale]/categories/[category]/services/[service]/offers/',
          `/${currentLocale}/categories/${slug1}/services/${slug2}/offers/`
        );
      }

      setValue('');
      setHints([]);
    }
  };

  const onClick = () => {
    if (searchValue) {
      router.push({
        pathname: `/${currentLocale}/search`,
        query: { name: searchValue }
      });
    }
  };

  const isMobile = useMemo((): boolean => {
    return windowWidth < screenSizesNumber?.lg;
  }, [windowWidth]);

  return (
    <UI
      {...props}
      isMobile={isMobile}
      onSearchChange={onSearchChange}
      hints={hints}
      searchValue={searchValue}
      selectedOffer={selectedOffer}
      onSelect={onSelect}
      onClick={onClick}
      closeHints={() => setHints([])}
    />
  );
};
