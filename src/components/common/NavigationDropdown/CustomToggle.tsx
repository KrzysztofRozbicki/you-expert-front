import React from 'react';
import LinkController from '../LinkController';
import { useRouter } from 'next/router';

import styles from './NavigationDropdown.module.scss';

interface CustomToggleProps {
  children: string;
  locale: string;
  slug: string;
  className: string;
  show: boolean;
}

export const CustomToggle = React.forwardRef(
  (props: CustomToggleProps, ref) => {
    const router = useRouter();
    const { category } = router.query;
    const { children, locale, slug, className, show } = props;

    return (
      <div
        className={`${className} ${category === slug ? styles.active : ''} ${
          show ? styles.active : ''
        }`}
        ref={ref as React.RefObject<HTMLDivElement>}
      >
        <LinkController
          href={'/[locale]/categories/[category]'}
          as={`/${locale || 'en'}/categories/${slug}`}
        >
          {children}
        </LinkController>
      </div>
    );
  }
);
