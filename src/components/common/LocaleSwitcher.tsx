import { useContext, useCallback, memo } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { locales, languageNames } from '../../translations/config';
import { LocaleContext } from '../../context/LocaleContext';
import { setCurrentLocale } from '../../redux/actions/app';

const LocaleSwitcher: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { locale } = useContext(LocaleContext);

  const handleLocaleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const regex = new RegExp(`^/(${locales.join('|')})`);
      dispatch(setCurrentLocale(e.target.value));
      router.push(
        router.pathname,
        router.asPath.replace(regex, `/${e.target.value}`)
      );
    },
    [router]
  );

  return (
    <select value={locale} onChange={handleLocaleChange}>
      {locales.map((locale) => (
        <option key={locale} value={locale}>
          {languageNames[locale]}
        </option>
      ))}
    </select>
  );
};

export default memo(LocaleSwitcher);
