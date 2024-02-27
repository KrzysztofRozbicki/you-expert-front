import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import useTranslation from './useTranslation';

export const useCategoriesBreadcrumbs = (): {
  title: string;
  link?: string;
}[] => {
  const { t } = useTranslation();
  const { categoryList } = useSelector((state: any) => state.categories);
  const {
    query: { locale, category, subcategory, service }
  } = useRouter();

  const breadcrumbs = useMemo((): { title: string; link?: string }[] => {
    const result = [
      { title: t('header', 'links', 'general'), link: `/${locale}/home` }
    ];

    if (!category) {
      return result;
    }

    const selectedCategory = categoryList?.find(
      (item) => item?.slug === category
    );

    if (!selectedCategory) {
      return result;
    }

    result.push({
      title: selectedCategory?.name,
      link: `/${locale}/categories/${selectedCategory?.slug}`
    });

    let selectedSubcategory;
    if (subcategory) {
      selectedSubcategory = selectedCategory?.subcategories?.find(
        (item) => item?.slug === subcategory
      );

      if (selectedSubcategory) {
        result.push({
          title: selectedSubcategory?.name,
          link: `/${locale}/categories/${selectedCategory?.slug}/${selectedSubcategory?.slug}/offers`
        });
      }
    }

    if (service) {
      if (selectedSubcategory) {
        const selectedService = selectedSubcategory?.services?.find(
          (item) => item?.slug === service
        );

        if (selectedService) {
          result.push({
            title: selectedService?.name,
            link: `/${locale}/categories/${selectedCategory?.slug}/${selectedSubcategory?.slug}/services/${selectedService?.slug}/offers`
          });
        }
      } else {
        const selectedService = selectedCategory?.services?.find(
          (item) => item?.slug === service
        );

        if (selectedService) {
          result.push({
            title: selectedService?.name,
            link: `/${locale}/categories/${selectedCategory?.slug}/services/${selectedService?.slug}/offers`
          });
        }
      }
    }

    return result;
  }, [locale, category, subcategory, service, t, categoryList]);

  return breadcrumbs;
};
