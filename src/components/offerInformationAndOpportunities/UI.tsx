import { memo, useMemo, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Heading,
  Flex,
  Image,
  Button,
  Spinner,
  useToast
} from '@chakra-ui/react';
import StarRatings from 'react-star-ratings';
import { useSelector, useDispatch } from 'react-redux';
import { FacebookShareButton } from 'react-share';
import useTranslation from '../../hooks/useTranslation';
import SectionWrapper from '../common/SectionWrapper';
import { Examples } from './Examples';
import { sliderWrapperStyles, prevArrow, nextArrow } from './common';
import { TabsController } from '../common/TabsController';
import { AvatarController } from '../common/AvatarController';
import { OffersState, UserState } from '../../common/interfaceTypes';
import { getImagePath } from '../../common/strings';
import { triggerAuthModal } from '../../redux/actions/app';
import { triggerLoginUser } from '../../utils';
import ExpertInfo from '../expertInfo';
import { getDialogId } from '../../api/account';
import { setModalDataAction } from '../common/modalController/action';
import { deleteOfferAction } from './actions';
import { socialLinkStyle } from './constants';

export const buttonStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '41px',
  height: '41px',
  padding: '0',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)'
};

interface itemDescription {
  title: string;
  text: string;
  price: string;
  link: string;
}

interface item {
  header: string;
  description: itemDescription;
}

const tabsData: item[] = [
  {
    header: 'basic',
    description: {
      title: '',
      text: '',
      price: '199.00',
      link: 'Compare packages'
    }
  },
  {
    header: 'standard',
    description: {
      title: '',
      text: '',
      price: '199.00',
      link: 'Compare packages'
    }
  },
  {
    header: 'premium',
    description: {
      title: '',
      text: '',
      price: '199.00',
      link: 'Compare packages'
    }
  }
];

const UI = () => {
  const toast = useToast();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const [isDeleteOfferLoading, setIsDeleteOfferLoading] =
    useState<boolean>(false);
  const [isContactMeLoading, setIsContactMeLoading] = useState<boolean>(false);
  const { currentOffer } = useSelector((state: OffersState) => state.offers);

  const { isAuthenticated, fullProfileData } = useSelector(
    (state: any): any => state.user
  );

  const getTabsData = () => {
    if (!currentOffer) return;

    const {
      priceBasic,
      priceStandard,
      pricePremium,
      deliveryDateInDaysBasic,
      deliveryDateInDaysStandard,
      deliveryDateInDaysPremium,
      parameterAnswersBasic,
      parameterAnswersStandard,
      parameterAnswersPremium
    } = currentOffer;

    const prices = [priceBasic, priceStandard, pricePremium];

    return tabsData.map((i, idx) => {
      const currentIndex = idx + 1;

      return {
        ...i,
        title: title,
        text: currentOffer.description,
        isDisabled: prices[idx] ? false : true,
        description: {
          ...i.description,
          price: prices[idx] || '',
          deliveryDate:
            currentIndex === 1
              ? deliveryDateInDaysBasic
              : currentIndex === 2
              ? deliveryDateInDaysStandard
              : deliveryDateInDaysPremium || '',
          parameterAnswers:
            currentIndex === 1
              ? parameterAnswersBasic
              : currentIndex === 2
              ? parameterAnswersStandard
              : parameterAnswersPremium || ''
        }
      };
    });
  };

  const onTabButtonClick = (packageName: string): void => {
    if (isAuthenticated) {
      router.push(
        '/[locale]/create-order/[offerId]/[packageName]',
        `/${router?.query?.locale}/create-order/${currentOffer?.id}/${packageName}`
      );
    } else {
      triggerLoginUser(dispatch);
    }
  };

  const onContactButtonClick = useCallback(() => {
    if (isAuthenticated) {
      const {
        push,
        query: { locale }
      } = router;

      setIsContactMeLoading(true);
      getDialogId(currentOffer?.expert?.id)
        .then((data: { dialogId: number }) => {
          if (data) {
            push({
              pathname: `/${locale}/dashboard/inbox`,
              query: { dialog: data?.dialogId }
            });
          }
        })
        .catch((error) => console.error(error))
        .finally(() => setIsContactMeLoading(false));
    } else {
      triggerLoginUser(dispatch);
    }
  }, [dispatch, isAuthenticated, currentOffer, router]);

  const expertRedirect = (id: number | string) => {
    router.push(
      '/[locale]/profile/[uuid]/',
      `/${router.query.locale}/profile/${id}/`
    );
  };

  const onEditOfferButtonClick = useCallback(() => {
    const {
      push,
      query: { locale }
    } = router;

    push(
      '/[locale]/offers/[offerId]/edit',
      `/${locale}/offers/${currentOffer?.id}/edit`
    );
  }, [router, currentOffer]);

  const onDeleteOfferButtonClick = useCallback(() => {
    dispatch(
      setModalDataAction({
        modalName: 'textConfirm',
        modalProps: {
          text: t('offerDetails', 'common', 'areYouSureYouWantToDeleteOffer'),
          onConfirm: () => {
            if (isDeleteOfferLoading) {
              return;
            }

            const {
              push,
              query: { locale }
            } = router;

            setIsDeleteOfferLoading(true);
            deleteOfferAction(currentOffer?.id)
              .then(() => push(`/${locale}/profile/${fullProfileData?.id}`))
              .catch(() => {
                toast({
                  title: t('createOrder', 'toast', 'smthWentWrong'),
                  status: 'error',
                  duration: 4000,
                  isClosable: true
                });
              });
          }
        }
      })
    );
  }, [dispatch, isDeleteOfferLoading, currentOffer, router, fullProfileData]);

  const isMyOwnOffer = useMemo((): boolean => {
    return (
      fullProfileData?.isExpert &&
      fullProfileData?.id === currentOffer?.expert?.id
    );
  }, [fullProfileData, currentOffer]);

  const shareLink = useMemo((): string => {
    if (
      typeof window !== 'undefined' &&
      window?.location &&
      window?.location?.href
    ) {
      return window.location.href;
    }

    return '';
  }, []);

  const sliderItems = useMemo((): {
    imageUrl?: string;
    indexValue: number;
    type: string;
    videoUrl?: string;
  }[] => {
    if (currentOffer?.gallery?.length && !currentOffer?.representationImage) {
      return [
        {
          indexValue: 0,
          type: 'image',
          imageUrl: '/images/sections/offer_image.png'
        },
        ...currentOffer?.gallery
      ];
    }

    if (!currentOffer?.representationImage) {
      return [
        {
          indexValue: 0,
          type: 'image',
          imageUrl: '/images/sections/offer_image.png'
        }
      ];
    }

    return currentOffer?.gallery;
  }, [currentOffer]);

  if (!currentOffer || !currentOffer?.expert) return null;

  const { id, title, expert, gallery, currencySign } = currentOffer;
  const { publicName, rating, reviewCount, avatarUrl } = expert;

  return (
    <SectionWrapper
      customStyle={{
        paddingTop: '48px',
        flexDirection: 'column',
        marginBottom: '32px'
      }}
      key={id}
    >
      <Heading
        w={{ lg: '90%', xl: '60%' }}
        as="h2"
        fontWeight="500"
        fontSize="1.6rem"
        mb="40px"
      >
        {title}
      </Heading>
      <Flex w={{ sm: '100%', lg: '60%' }}>
        <ExpertInfo expert={expert} />
      </Flex>
      <Flex
        w="100%"
        justify="space-between"
        align="stretch"
        flexDirection={{ sm: 'column', lg: 'row' }}
      >
        <Flex
          w={{ sm: '100%', lg: '60%' }}
          mr={{ sm: '0', lg: '30px' }}
          mb={{ sm: '33px', lg: '0' }}
          flexDirection="column"
        >
          <Examples
            sliderWrapperStyles={sliderWrapperStyles}
            sliderExampleItems={sliderItems}
            prevArrow={prevArrow}
            nextArrow={nextArrow}
          />
        </Flex>
        <Flex w={{ sm: '100%', lg: '35%' }} direction="column">
          <TabsController
            content={getTabsData()}
            currency={currencySign || ''}
            onTabButtonClick={onTabButtonClick}
            isMyOwnOffer={isMyOwnOffer}
            onEditOfferButtonClick={onEditOfferButtonClick}
            onDeleteOfferButtonClick={onDeleteOfferButtonClick}
          />
          <Flex
            w="100%"
            mt="20px"
            alignItems="center"
            justifyContent={!isMyOwnOffer ? 'space-between' : 'flex-end'}
          >
            {currentOffer?.isActive && (
              <FacebookShareButton style={socialLinkStyle} url={shareLink}>
                <Image src="/images/common/Facebook.svg" />
              </FacebookShareButton>
            )}
            {!isMyOwnOffer && (
              <Button
                bg="general.sand"
                p="19px 32px !important"
                height={{ sm: '55px', xl: '72px' }}
                fontWeight="600"
                onClick={() => onContactButtonClick()}
                fontSize="0.8rem"
              >
                {isContactMeLoading ? (
                  <Spinner />
                ) : (
                  t('offerDetails', 'tabsContent', 'contactButton')
                )}
              </Button>
            )}
          </Flex>
        </Flex>
      </Flex>
    </SectionWrapper>
  );
};

export default memo(UI);
