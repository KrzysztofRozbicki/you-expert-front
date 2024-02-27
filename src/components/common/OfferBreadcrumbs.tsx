import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { Breadcrumb, BreadcrumbItem } from '@chakra-ui/react';
import LinkController from '../common/LinkController';
import { CategoryState } from '../../common/interfaceTypes';

interface Item {
  href: string;
  as: string;
  text: string;
}

const linkStyle = {
  fontSize: '0.6rem',
  color: '#020055',
  fontWeight: '400'
};

export const OfferBreadcrumbs = () => {
  const router = useRouter();
  const { categoryList } = useSelector(
    (state: CategoryState) => state.categories
  );

  const renderBreadcrumbItem = (items: Item[]) => {
    return items.map((item) => {
      const { href, as, text } = item;

      return (
        <BreadcrumbItem>
          <LinkController href={href} as={as} customStyle={linkStyle}>
            {text}
          </LinkController>
        </BreadcrumbItem>
      );
    });
  };

  const renderLinkList = () => {
    if (!categoryList.length) return null;

    const { query } = router;
    const { locale, category, subcategory, service, offer } = query;
    const currentCategory = categoryList.find((i) => i.slug === category);

    if (currentCategory) {
      const configuration = [];
      configuration.push({
        href: '/[locale]/categories/[category]/offers/',
        as: `/${locale}/categories/${category}/offers/`,
        text: currentCategory.name
      });
      const currentSubcategory = currentCategory.subcategories.find(
        (i) => i.slug === subcategory
      );

      if (currentSubcategory) {
        configuration.push({
          href: currentSubcategory
            ? '/[locale]/categories/[category]/[subcategory]/offers/'
            : '/[locale]/categories/[category]/offers/',
          as: currentSubcategory
            ? `/${locale}/categories/${category}/${currentSubcategory.slug}/offers/`
            : `/${locale}/categories/${category}/offers/`,
          text: currentSubcategory.name
        });
      }

      if (service) {
        let currentService;
        if (currentSubcategory) {
          currentService = currentSubcategory.services.find(
            (i) => i.slug === service
          );
        } else {
          currentService = currentCategory.services.find(
            (i) => i.slug === service
          );
        }

        if (currentService) {
          configuration.push({
            href: currentSubcategory
              ? '/[locale]/categories/[category]/[subcategory]/services/[service]/offers/'
              : '/[locale]/categories/[category]/services/[service]/offers/',
            as: currentSubcategory
              ? `/${locale}/categories/${category}/${currentSubcategory.slug}/services/${currentService.slug}/offers/`
              : `/${locale}/categories/${category}/services/${currentService.slug}/offers/`,
            text: currentService.name
          });
        }
      }

      return (
        <Breadcrumb
          p={{ sm: '20px 0 20px 5%', xl: '25px 0 25px 5%' }}
          border="1px solid #DCDCF4"
          fontWeight="medium"
          fontSize="0.6rem"
          separator={''}
        >
          {renderBreadcrumbItem(configuration)}
        </Breadcrumb>
      );
    }

    return null;
  };

  return renderLinkList();
};
