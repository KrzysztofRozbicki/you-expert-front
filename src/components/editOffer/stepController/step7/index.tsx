import React, { memo, useCallback, useState, useMemo } from 'react';
import { Flex, Image, useToast } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import copy from 'copy-to-clipboard';
import { useRouter } from 'next/router';
import { FacebookShareButton } from 'react-share';
import StepLayout from '../../../createOffer/stepController/stepLayout';
import { StepProps } from '../interfaces';
import useTranslation from '../../../../hooks/useTranslation';
import { ButtonController } from '../../../common/ButtonController';
import { iconsData } from './contants';
import OfferItem from './offerItem';
import { IEditOfferInitialState } from '../../interfaces';
import { findInString } from '../../../../utils';
import {
  LeftContainerStyled,
  RightContainerStyled,
  RightAboveBlockStyled,
  HeadingStyled,
  IconWrapperStyled
} from './style';
import {
  editOfferAction,
  setEditOfferPublishedDataAction
} from '../../actions';

const Step7: React.FC<StepProps> = (props) => {
  const { goPrevStep, goNextStep } = props;
  const { query, push } = useRouter();
  const dispatch = useDispatch();
  const { isEdited, editOfferData, publishedData, initialOfferData } =
    useSelector((state: any): IEditOfferInitialState => state.editOffer);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { t } = useTranslation();
  const toast = useToast();

  const offerLink = useMemo(() => {
    const { locale } = query;

    if (!publishedData?.id) {
      return '';
    }

    if (editOfferData?.subcategory?.slug) {
      return `/${locale}/categories/${editOfferData?.category?.slug}/${editOfferData?.subcategory?.slug}/services/${editOfferData?.service?.slug}/offers/${publishedData?.id}`;
    }

    return `/${locale}/categories/${editOfferData?.category?.slug}/services/${editOfferData?.service?.slug}/offers/${publishedData?.id}`;
  }, [editOfferData, publishedData, query]);

  const publicOfferLink = useMemo(() => {
    try {
      const url = window?.location?.href;
      const index = findInString(url, '/', 3);
      if (index) {
        return `${url.slice(0, index)}${offerLink}`;
      }

      return '';
    } catch {
      return '';
    }
  }, [offerLink]);

  const title = useMemo((): string => {
    if (publishedData?.isActive) {
      return t('createOffer', 'step6', 'offerSuccessfullyPublished');
    }

    if (isEdited) {
      return t('createOffer', 'step6', 'offerSuccessfullyCreated');
    }

    return t('createOffer', 'step6', 'offerSummary');
  }, [isEdited, t, publishedData]);

  const underTitleText = useMemo((): string => {
    if (isEdited) {
      return t('createOffer', 'step6', 'offerHasBeenEditedSuccessfully');
    }

    return '';
  }, [isEdited, t]);

  const handleSaveClick = useCallback(() => {
    if (!isLoading) {
      setIsLoading(true);
      editOfferAction(editOfferData, initialOfferData)
        .then((data) => {
          dispatch(setEditOfferPublishedDataAction(data));
        })
        .then(() => {
          toast({
            title,
            description: t(
              'createOffer',
              'step6',
              'offerSuccessfullyPublishedDesc'
            ),
            status: 'success',
            duration: 4000,
            isClosable: true
          });
        })
        .catch(() => {
          toast({
            title: t('createOffer', 'step6', 'offerWasntPublished'),
            description: t('createOffer', 'step6', 'smthWentWrong'),
            status: 'error',
            duration: 4000,
            isClosable: true
          });
          setIsLoading(false);
        });
    }
  }, [toast, isLoading, dispatch, t, title, initialOfferData, editOfferData]);

  const handleCopyLinkClick = useCallback((): void => {
    try {
      copy(publicOfferLink);
      toast({
        title: t('createOffer', 'step6', 'linkWasCopiedToClipboard'),
        status: 'success',
        duration: 4000,
        isClosable: true
      });
    } catch {
      toast({
        title: t('createOffer', 'step6', 'smthWentWrong'),
        status: 'error',
        duration: 4000,
        isClosable: true
      });
    }
  }, [publicOfferLink, t, toast]);

  const handleClickCreateNewOffer = useCallback(() => {
    const { locale } = query;
    push(`/${locale}/create-offer`);
  }, [push, query]);

  const handleClickUpdateYourProfile = useCallback(() => {
    const { locale } = query;
    push(`/${locale}/dashboard/settings/account`);
  }, [push, query]);

  return (
    <StepLayout
      title={title}
      underTitleText={underTitleText}
      handleClickSave={goNextStep}
      handleClickCancel={goPrevStep}
      isHideButtons
      bodyProps={{ p: '0' }}
      titleIconSrc={'/images/sections/createOffer/offer_published_icon.svg'}
    >
      <Flex flexDirection={{ sm: 'column', md: 'row' }}>
        <LeftContainerStyled
          w={{ sm: '100%', md: '50%' }}
          p={{ sm: '30px', lg: '64px' }}
          borderRight={{ sm: 'none', md: '1px solid #E2E8F0' }}
        >
          <OfferItem offer={editOfferData} link={offerLink} />
        </LeftContainerStyled>
        <RightContainerStyled
          w={{ sm: '100%', md: '50%' }}
          p={{ sm: '30px', lg: '64px 94px 64px 64px' }}
        >
          {isEdited && (
            <>
              {publishedData?.isActive && (
                <RightAboveBlockStyled>
                  <HeadingStyled>
                    {t('createOffer', 'step6', 'shareOnSocialMedia')}
                  </HeadingStyled>
                  <Flex mb="30px">
                    <FacebookShareButton url={publicOfferLink}>
                      <IconWrapperStyled borderColor="#020055">
                        <Image src="/images/common/Facebook.svg" />
                      </IconWrapperStyled>
                    </FacebookShareButton>
                    <IconWrapperStyled
                      borderColor="#020055"
                      onClick={handleCopyLinkClick}
                    >
                      <Image src="/images/common/Link.svg" />
                    </IconWrapperStyled>
                  </Flex>
                </RightAboveBlockStyled>
              )}
              <Flex
                w="100%"
                justifyContent="space-between"
                flexDirection={{ sm: 'column', md: 'row' }}
              >
                <ButtonController
                  variant="yellow"
                  onClick={handleClickCreateNewOffer}
                  mb={{ sm: '10px', md: '0' }}
                  mr={{ sm: '0', md: '10px' }}
                  customStyle={{ fontSize: '0.8rem', minHeight: '57px' }}
                >
                  {t('createOffer', 'buttons', 'createNewOffer')}
                </ButtonController>
                <ButtonController
                  variant="yellow"
                  onClick={handleClickUpdateYourProfile}
                  customStyle={{
                    fontSize: '0.8rem',
                    minHeight: '57px'
                  }}
                >
                  {t('createOffer', 'buttons', 'updateYourProfile')}
                </ButtonController>
              </Flex>
            </>
          )}
          {!isEdited && (
            <Flex
              alignItems="center"
              justifyContent={{ sm: 'flex-start', lg: 'space-between' }}
            >
              <ButtonController
                variant="grey"
                onClick={goPrevStep}
                customStyle={{ fontSize: '0.8rem', minHeight: '57px' }}
              >
                {t('createOffer', 'buttons', 'stepBack')}
              </ButtonController>
              <ButtonController
                variant="pink"
                onClick={handleSaveClick}
                customStyle={{
                  fontSize: '0.8rem',
                  minHeight: '57px'
                }}
              >
                {t('createOffer', 'step6', 'updateOffer')}
              </ButtonController>
            </Flex>
          )}
        </RightContainerStyled>
      </Flex>
    </StepLayout>
  );
};

export default memo(Step7);
