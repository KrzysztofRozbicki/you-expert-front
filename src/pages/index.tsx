import { useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';
import { getInitialLocale } from '../translations/getInitialLocale';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (router.pathname === '/') {
      router.replace('/[locale]', `/${getInitialLocale()}`);
    }
  });
  return <div id="root"></div>;
}
