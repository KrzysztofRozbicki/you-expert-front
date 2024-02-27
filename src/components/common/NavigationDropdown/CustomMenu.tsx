import React from 'react';
import LinkController from '../LinkController';
import { Subcategory } from '../../../common/interfaceTypes';
import styles from './NavigationDropdown.module.scss';

interface CustomMenuProps {
  [key: string]: any;
}

const renderSubcategories = (
  items: Subcategory[],
  locale: string,
  categiry: string
) => {
  if (!items) return null;

  return items.map((i) => {
    const { id, slug } = i;
    return (
      <LinkController
        customStyle={{ fontWeight: '600', color: '#7B72DF' }}
        key={`subcategory-link-${id}-${slug}`}
        href={'/[locale]/categories/[category]/[subcategory]/offers'}
        as={`/${locale || 'en'}/categories/${categiry}/${slug}/offers`}
      >
        {`${i.name}`}
      </LinkController>
    );
  });
};

const renderServices = (
  items: Subcategory[],
  locale: string,
  category: string
) => {
  if (!items) return null;

  return items.map((i) => {
    const { id, slug } = i;

    return (
      <LinkController
        key={`service-link-${id}-${slug}`}
        href={'/[locale]/categories/[category]/services/[service]/offers'}
        as={`/${locale || 'en'}/categories/${category}/services/${slug}/offers`}
      >
        {i.name}
      </LinkController>
    );
  });
};

export const CustomMenu = React.forwardRef((props: CustomMenuProps, ref) => {
  const { className, subcategories, services, style, locale, categiry } = props;

  if (
    (!subcategories && !services) ||
    (!subcategories.length && !services.length)
  )
    return null;

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={style}
      className={className}
    >
      <div className={styles.links_wrapper}>
        {renderSubcategories(subcategories, locale, categiry)}
      </div>
      <div className={styles.links_wrapper}>
        {renderServices(services, locale, categiry)}
      </div>
    </div>
  );
});
