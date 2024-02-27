import { useContext } from 'react';
import { LocaleContext } from '../context/LocaleContext';
import strings from '../translations/strings';
import { defaultLocale } from '../translations/config';

export default function useTranslation() {
  const { locale } = useContext(LocaleContext);

  function t(slug: string, section: string, key: string) {
    if (!strings[locale][slug][section][key]) {
      console.warn(`Translation '${key}' for locale '${locale}' not found.`);
    }
    return (
      strings[locale][slug][section][key] ||
      strings[defaultLocale][slug][section][key] ||
      ''
    );
  }

  return {
    t,
    locale
  };
}
