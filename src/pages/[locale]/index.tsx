import { useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';
import { getInitialLocale } from '../../translations/getInitialLocale';

import WithLocale from '../../hocs/withLocale';

const Locale = () => {
  const router = useRouter();

  useEffect(() => {
    const locale = getInitialLocale();
    router.replace('/[locale]/home', `/${locale}/home`);
  });
  return <div></div>;
};

export default WithLocale(Locale);
