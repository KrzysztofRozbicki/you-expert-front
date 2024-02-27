import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import useTranslation from './useTranslation';

export const useOfferBreadcrumbs = (): {
  title: string;
  link?: string;
}[] => {
  const { t } = useTranslation();
  const { categoryList } = useSelector((state: any) => state.categories);
  const { currentOffer } = useSelector((state: any) => state.offers);
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

    let selectedService;
    if (service) {
      if (selectedSubcategory) {
        selectedService = selectedSubcategory?.services?.find(
          (item) => item?.slug === service
        );

        if (selectedService) {
          result.push({
            title: selectedService?.name,
            link: `/${locale}/categories/${selectedCategory?.slug}/${selectedSubcategory?.slug}/services/${selectedService?.slug}/offers`
          });
        }
      } else {
        selectedService = selectedCategory?.services?.find(
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

    if (currentOffer && currentOffer?.title) {
      if (selectedSubcategory) {
        if (selectedService) {
          result.push({
            title: currentOffer?.title,
            link: `/${locale}/categories/${selectedCategory?.slug}/${selectedSubcategory?.slug}/services/${selectedService?.slug}/offers/${currentOffer?.id}`
          });
        } else {
          result.push({
            title: currentOffer?.title,
            link: `/${locale}/categories/${selectedCategory?.slug}/${selectedSubcategory?.slug}/offers/${currentOffer?.id}`
          });
        }
      } else {
        if (selectedService) {
          result.push({
            title: currentOffer?.title,
            link: `/${locale}/categories/${selectedCategory?.slug}/services/${selectedService?.slug}/offers/${currentOffer?.id}`
          });
        } else {
          result.push({
            title: currentOffer?.title,
            link: `/${locale}/categories/${selectedCategory?.slug}/offers/${currentOffer?.id}`
          });
        }
      }
    }

    return result;
  }, [locale, category, subcategory, service, t, categoryList, currentOffer]);

  return breadcrumbs;
};
