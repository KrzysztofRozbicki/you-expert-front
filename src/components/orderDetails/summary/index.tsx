import React, { memo, useState, useCallback, useMemo } from 'react';
import { Text, Flex, useToast, Link } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import useTranslation from '../../../hooks/useTranslation';
import { ModalController } from '../../common/modal';
import { ButtonController } from '../../common/ButtonController';
import ExpertReview from './expertReview';
import {
  getDateFromTimestamp,
  isStringContainsOnlyNumbersOrPoint
} from '../../../utils';
import { setModalDataAction } from '../../common/modalController/action';
import {
  rejectOrderByClientAction,
  rejectOrderByExpertAction,
  requestApprovalAction,
  undoCancellationRequestAction
} from '../actions';
import { orderDetailsDataType } from '../interfaces';
import {
  WrapperStyled,
  SummaryBlockStyled,
  TitleWrapperStyled,
  IconWrapperStyled,
  ServiceWrapperStyled,
  ServiceItemStyled
} from './style';
import { SUPPORT_EMAIL_ADDRESS } from '../../../common/constants';

interface SummaryProps {
  isClient: boolean;
  isExpert: boolean;
  data: orderDetailsDataType;
  getData: () => void;
}

const Summary: React.FC<SummaryProps> = (props) => {
  const { isClient, isExpert, data, getData } = props;
  const dispatch = useDispatch();
  const {
    push,
    query: { locale }
  } = useRouter();
  const toast = useToast();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpenReviewModal, setIsOpenReviewModal] = useState<boolean>(false);

  const handleRejectOfferByExpert = useCallback(() => {
    dispatch(
      setModalDataAction({
        modalName: 'textConfirm',
        modalProps: {
          text: t(
            'orderDetails',
            'summary',
            'areYouSureYouWantToRejectThisOrder'
          ),
          onConfirm: () => {
            if (!isLoading) {
              setIsLoading(true);
              rejectOrderByExpertAction(data.id)
                .then(() => {
                  toast({
                    title: t('orderDetails', 'toast', 'orderWasRejected'),
                    status: 'success',
                    duration: 4000,
                    isClosable: true
                  });
                })
                .then(() => getData())
                .catch(() => {
                  toast({
                    title: t('orderDetails', 'toast', 'orderWasntRejected'),
                    description: t('orderDetails', 'toast', 'smthWentWrong'),
                    status: 'error',
                    duration: 4000,
                    isClosable: true
                  });
                })
                .finally(() => setIsLoading(false));
            }
          }
        }
      })
    );
  }, [isLoading, data, dispatch, t, getData]);

  const handleCancellationRequestByExpert = useCallback(() => {
    dispatch(
      setModalDataAction({
        modalName: 'textConfirm',
        modalProps: {
          text: t(
            'orderDetails',
            'summary',
            'doYouWantRequestOrderCancellationFromClient'
          ),
          onConfirm: () => {
            if (!isLoading) {
              setIsLoading(true);
              rejectOrderByExpertAction(data.id)
                .then(() => {
                  toast({
                    title: t(
                      'orderDetails',
                      'toast',
                      'cancellationWasRequested'
                    ),
                    status: 'success',
                    duration: 4000,
                    isClosable: true
                  });
                })
                .then(() => getData())
                .catch(() => {
                  toast({
                    title: t(
                      'orderDetails',
                      'toast',
                      'cancellationWasntRequested'
                    ),
                    description: t('orderDetails', 'toast', 'smthWentWrong'),
                    status: 'error',
                    duration: 4000,
                    isClosable: true
                  });
                })
                .finally(() => setIsLoading(false));
            }
          }
        }
      })
    );
  }, [isLoading, data, dispatch, t, getData]);

  const handleApproveCancellationRequestByExpert = useCallback(() => {
    dispatch(
      setModalDataAction({
        modalName: 'textConfirm',
        modalProps: {
          text: t(
            'orderDetails',
            'summary',
            'clientIsAskingToTerminateThisOrder'
          ),
          onCancel: () => {
            if (!isLoading) {
              setIsLoading(true);
              undoCancellationRequestAction(data.id)
                .then(() => {
                  toast({
                    title: t(
                      'orderDetails',
                      'toast',
                      'cancellationRequestWasCancelled'
                    ),
                    status: 'success',
                    duration: 4000,
                    isClosable: true
                  });
                })
                .then(() => getData())
                .catch(() => {
                  toast({
                    title: t('errors', 'common', 'smthWentWrong'),
                    description: t('errors', 'common', 'tryAgainLater'),
                    status: 'error',
                    duration: 4000,
                    isClosable: true
                  });
                })
                .finally(() => setIsLoading(false));
            }
          },
          onConfirm: () => {
            if (!isLoading) {
              setIsLoading(true);
              rejectOrderByExpertAction(data.id)
                .then(() => {
                  toast({
                    title: t(
                      'orderDetails',
                      'toast',
                      'cancellationWasApproved'
                    ),
                    status: 'success',
                    duration: 4000,
                    isClosable: true
                  });
                })
                .then(() => getData())
                .catch(() => {
                  toast({
                    title: t(
                      'orderDetails',
                      'toast',
                      'cancellationWasntApproved'
                    ),
                    description: t('orderDetails', 'toast', 'smthWentWrong'),
                    status: 'error',
                    duration: 4000,
                    isClosable: true
                  });
                })
                .finally(() => setIsLoading(false));
            }
          }
        }
      })
    );
  }, [isLoading, data, dispatch, t, getData]);

  const handleRejectOfferByClient = useCallback(() => {
    dispatch(
      setModalDataAction({
        modalName: 'textConfirm',
        modalProps: {
          text: t(
            'orderDetails',
            'summary',
            'doYouWantRequestOrderCancellationFromExpert'
          ),
          onConfirm: () => {
            if (!isLoading) {
              setIsLoading(true);
              rejectOrderByClientAction(data.id)
                .then(() => {
                  toast({
                    title: t('orderDetails', 'toast', 'orderWasRejected'),
                    description: t(
                      'orderDetails',
                      'toast',
                      'orderWasRejectedWithSuccess'
                    ),
                    status: 'success',
                    duration: 4000,
                    isClosable: true
                  });
                })
                .then(() => getData())
                .catch(() => {
                  toast({
                    title: t('orderDetails', 'toast', 'orderWasntRejected'),
                    description: t('orderDetails', 'toast', 'smthWentWrong'),
                    status: 'error',
                    duration: 4000,
                    isClosable: true
                  });
                })
                .finally(() => setIsLoading(false));
            }
          }
        }
      })
    );
  }, [isLoading, data]);

  const handleApproveCancellationRequestByClient = useCallback(() => {
    dispatch(
      setModalDataAction({
        modalName: 'textConfirm',
        modalProps: {
          text: t(
            'orderDetails',
            'summary',
            'expertIsAskingToTerminateThisOrder'
          ),
          onConfirm: () => {
            if (!isLoading) {
              setIsLoading(true);
              rejectOrderByClientAction(data.id)
                .then(() => {
                  toast({
                    title: t(
                      'orderDetails',
                      'toast',
                      'cancellationWasApproved'
                    ),
                    status: 'success',
                    duration: 4000,
                    isClosable: true
                  });
                })
                .then(() => getData())
                .catch(() => {
                  toast({
                    title: t(
                      'orderDetails',
                      'toast',
                      'cancellationWasntApproved'
                    ),
                    description: t('orderDetails', 'toast', 'smthWentWrong'),
                    status: 'error',
                    duration: 4000,
                    isClosable: true
                  });
                })
                .finally(() => setIsLoading(false));
            }
          }
        }
      })
    );
  }, [isLoading, data, dispatch, t, getData]);

  const handleRequestApprovalByExpert = useCallback(() => {
    dispatch(
      setModalDataAction({
        modalName: 'textConfirm',
        modalProps: {
          text: t('orderDetails', 'summary', 'doYouWantToRequestApproval'),
          onConfirm: () => {
            if (!isLoading) {
              setIsLoading(true);
              requestApprovalAction(data.id)
                .then(() => {
                  toast({
                    title: t('orderDetails', 'toast', 'approvalWasRequested'),
                    status: 'success',
                    duration: 4000,
                    isClosable: true
                  });
                })
                .then(() => getData())
                .catch(() => {
                  toast({
                    title: t('orderDetails', 'toast', 'approvalWasntRequested'),
                    description: t('orderDetails', 'toast', 'smthWentWrong'),
                    status: 'error',
                    duration: 4000,
                    isClosable: true
                  });
                })
                .finally(() => setIsLoading(false));
            }
          }
        }
      })
    );
  }, [isLoading, data, dispatch, t, getData]);

  const handleUndoCancellationRequest = useCallback(() => {
    dispatch(
      setModalDataAction({
        modalName: 'textConfirm',
        modalProps: {
          text: t(
            'orderDetails',
            'summary',
            'areYouSureYouWantToUndoCancellationRequest'
          ),
          onConfirm: () => {
            if (!isLoading) {
              setIsLoading(true);
              undoCancellationRequestAction(data.id)
                .then(() => {
                  toast({
                    title: t(
                      'orderDetails',
                      'toast',
                      'cancellationRequestWasCancelled'
                    ),
                    status: 'success',
                    duration: 4000,
                    isClosable: true
                  });
                })
                .then(() => getData())
                .catch(() => {
                  toast({
                    title: t('errors', 'common', 'smthWentWrong'),
                    description: t('errors', 'common', 'tryAgainLater'),
                    status: 'error',
                    duration: 4000,
                    isClosable: true
                  });
                })
                .finally(() => setIsLoading(false));
            }
          }
        }
      })
    );
  }, [isLoading, data, dispatch, t, getData]);

  // const getTextByStatus = useMemo((): string => {
  //   switch (data?.status) {
  //     case 'NOT_PAID':
  //       return t('orderDetails', 'summary', 'paymentVerification');
  //     case 'ACTIVE':
  //       return t('orderDetails', 'summary', 'inProgress');
  //     case 'CANCELLED':
  //       return t('orderDetails', 'summary', 'cancelled');
  //     case 'FAILED':
  //       return t('orderDetails', 'summary', 'cancelled');
  //     case 'REJECTED_EXPERT':
  //       return t('orderDetails', 'summary', 'rejectedByExpert');
  //     case 'DELIVERED_NOT_PAID':
  //       return t('orderDetails', 'summary', 'completed');
  //     case 'DELIVERED_PAID':
  //       return t('orderDetails', 'summary', 'completed');
  //     case 'NEEDS_APPROVAL':
  //       return t('orderDetails', 'summary', 'awaitingApproval');
  //     default:
  //       return '';
  //   }
  // }, [data, t]);

  const isShowDeliveryDate = useMemo((): boolean => {
    return data?.status === 'ACTIVE' || data?.status === 'NEEDS_APPROVAL';
  }, [data]);

  const deliveryTimeLabel = useMemo((): string => {
    if (data?.deliveryTimeInDays === 1) {
      return t('orderDetails', 'summary', 'expectedDeliveryTomorrow');
    } else if (data?.deliveryTimeInDays > 1) {
      return `${t('orderDetails', 'summary', 'expectedDeliveryIn')} ${
        data?.deliveryTimeInDays
      } ${t('orderDetails', 'summary', 'days')}`;
    } else if (data?.deliveryTimeInDays === 0) {
      return t('orderDetails', 'summary', 'expectedDeliveryToday');
    } else if (data?.deliveryTimeInDays < 0) {
      return `${t('orderDetails', 'summary', 'deliveryDelayed')} ${
        data?.deliveryTimeInDays
      } ${t('orderDetails', 'summary', 'days')}`;
    }

    return '';
  }, [data, t]);

  const handleCloseExpertReviewPopup = useCallback(() => {
    setIsOpenReviewModal(false);
    getData();
  }, [getData]);

  const emailParams = useMemo((): string => {
    return `subject=${t('orderDetails', 'summary', 'complaintAboutOrder')} ${
      data?.id
    }&body=${t('orderDetails', 'summary', 'complaintOrderMessage')} ${
      data?.id
    }`;
  }, [t, data]);

  return (
    <>
      <ModalController
        isOpen={isOpenReviewModal}
        onClose={() => setIsOpenReviewModal(false)}
      >
        <ExpertReview
          data={data}
          closeCallback={handleCloseExpertReviewPopup}
        />
      </ModalController>
      <WrapperStyled>
        <SummaryBlockStyled>
          <TitleWrapperStyled>
            <Text fontSize="0.8rem" fontWeight="600">
              {t('createOrder', 'summary', 'summary')}
            </Text>
            <IconWrapperStyled>
              <svg
                width="20"
                height="24"
                viewBox="0 0 20 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 2.016C0 0.888 0.888355 0 1.9928 0H18.0072C19.1116 0 20 0.888 20 2.016V22.008C20 23.112 19.1116 24.024 18.0072 24.024H1.9928C0.888355 24 0 23.112 0 21.984V2.016ZM1.9928 21.984H18.0072V1.992H1.9928V21.984ZM4.0096 7.008C4.0096 6.456 4.46579 6 4.994 6H13.0132C13.5654 6 13.9976 6.432 13.9976 7.008C13.9976 7.56 13.5414 8.016 13.0132 8.016H4.994C4.44178 7.992 4.0096 7.56 4.0096 7.008ZM4.0096 10.992C4.0096 10.44 4.46579 9.984 4.994 9.984H13.0132C13.5654 9.984 13.9976 10.416 13.9976 10.992C13.9976 11.544 13.5414 12 13.0132 12H4.994C4.44178 12 4.0096 11.568 4.0096 10.992ZM4.0096 15C4.0096 14.448 4.46579 13.992 5.01801 13.992H9.0036C9.55582 13.992 10.012 14.424 10.012 15C10.012 15.552 9.55582 16.008 9.0036 16.008H5.01801C4.44178 16.008 4.0096 15.552 4.0096 15Z"
                  fill="#020055"
                />
              </svg>
            </IconWrapperStyled>
          </TitleWrapperStyled>
          <ServiceWrapperStyled customStyle="border: none;">
            <ServiceItemStyled>
              <Text fontSize="0.8rem">
                {t('orderDetails', 'summary', 'quantity')}
              </Text>
              <Text fontSize="0.8rem">{data?.quantity}</Text>
            </ServiceItemStyled>
            <ServiceItemStyled>
              <Text fontSize="0.8rem">
                {t('orderDetails', 'summary', 'totalCost')}
              </Text>
              <Text fontSize="0.8rem">
                {isStringContainsOnlyNumbersOrPoint(data?.totalPrice)
                  ? `${data?.totalPrice} PLN`
                  : data?.totalPrice}
              </Text>
            </ServiceItemStyled>
            {isShowDeliveryDate && (
              <ServiceItemStyled alignItems="flex-start" lineHeight={1}>
                <Text fontSize="0.8rem" mr="20px">
                  {t('orderDetails', 'summary', 'deliveryDate')}
                </Text>
                <Text fontSize="0.8rem" textAlign="right">
                  {deliveryTimeLabel}
                </Text>
              </ServiceItemStyled>
            )}
            <ServiceItemStyled>
              <Text fontSize="0.8rem">
                {t('orderDetails', 'summary', 'orderedAt')}
              </Text>
              <Text fontSize="0.8rem">
                {getDateFromTimestamp(data?.createdAt)}
              </Text>
            </ServiceItemStyled>
            <ServiceItemStyled alignItems="flex-start" lineHeight={1}>
              <Text fontSize="0.8rem" mr="20px">
                {t('orderDetails', 'summary', 'status')}
              </Text>
              <Text fontSize="0.8rem" textAlign="right">
                {data?.representationStatus}
              </Text>
            </ServiceItemStyled>
            {!!data?.deliveredAt && (
              <ServiceItemStyled>
                <Text fontSize="0.8rem">
                  {t('orderDetails', 'summary', 'deliveryAt')}
                </Text>
                <Text fontSize="0.8rem">
                  {getDateFromTimestamp(data?.deliveredAt)}
                </Text>
              </ServiceItemStyled>
            )}
            {(isExpert && data?.cancellationRequestExpert) ||
            (isClient && data?.cancellationRequestClient) ? (
              <ServiceItemStyled>
                <Text fontSize="0.8rem">
                  {t('orderDetails', 'summary', 'cancellation')}
                </Text>
                <Text fontSize="0.8rem">
                  {t('orderDetails', 'summary', 'requested')}
                </Text>
              </ServiceItemStyled>
            ) : (
              <></>
            )}
          </ServiceWrapperStyled>
        </SummaryBlockStyled>
        {isClient && !isExpert && data?.status !== 'CANCELLED' && (
          <Flex
            w="100%"
            pt="18px"
            justifyContent="center"
            flexDirection="column"
          >
            {!!data?.cancellationRequestClient && (
              <ButtonController
                variant="pink"
                onClick={handleUndoCancellationRequest}
                customStyle={{ marginBottom: '18px', fontSize: '0.8rem' }}
                isDisabled={isLoading}
              >
                {t('orderDetails', 'summary', 'undoCancellationRequest')}
              </ButtonController>
            )}
            {(data?.status === 'ACTIVE' ||
              data?.status === 'NEEDS_APPROVAL' ||
              data?.status === 'CHANGE_REQUEST') && (
              <ButtonController
                variant="pink"
                onClick={() => setIsOpenReviewModal(true)}
                customStyle={{ marginBottom: '18px', fontSize: '0.8rem' }}
                isDisabled={isLoading}
              >
                {t('orderDetails', 'summary', 'approveExpertSolution')}
              </ButtonController>
            )}
            {/* <ButtonController
              variant="yellow"
              // onClick={() =>
              //   push(`/${locale}/chat/${data?.expertData?.id}/${data?.id}`)
              // }
              onClick={() => true}
              customStyle={{ marginBottom: '18px' }}
              isDisabled={isLoading}
            >
              {t('orderDetails', 'summary', 'contactExpert')}
            </ButtonController> */}
            {!data?.cancellationRequestExpert &&
              !data?.cancellationRequestClient &&
              (data?.status === 'NOT_PAID' ||
                data?.status === 'ACTIVE' ||
                data?.status === 'NEEDS_APPROVAL' ||
                data?.status === 'CHANGE_REQUEST') && (
                <ButtonController
                  variant="yellow"
                  onClick={handleRejectOfferByClient}
                  isDisabled={isLoading}
                  customStyle={{ fontSize: '0.8rem' }}
                >
                  {t('orderDetails', 'summary', 'cancellationRequest')}
                </ButtonController>
              )}
            {data?.cancellationRequestExpert && (
              <ButtonController
                variant="pink"
                onClick={handleApproveCancellationRequestByClient}
                isDisabled={isLoading}
                customStyle={{ fontSize: '0.8rem' }}
              >
                {t('orderDetails', 'summary', 'cancellationRequestedByExpert')}
              </ButtonController>
            )}
          </Flex>
        )}
        {isClient && (
          <Flex w="100%" pt="18px">
            <Link
              w="100%"
              display="flex"
              color="#fff"
              cursor="pointer"
              padding="19px 32px"
              minHeight="72px"
              bg="general.orange"
              fontWeight="600"
              borderRadius="36px"
              alignItems="center"
              justifyContent="center"
              fontSize="0.8rem"
              href={`mailto:${SUPPORT_EMAIL_ADDRESS}?${emailParams}`}
              _hover={{
                textDecoration: 'none',
                background: 'rgb(156, 120, 195)'
              }}
            >
              {t('orderDetails', 'summary', 'makeComplaint')}
            </Link>
          </Flex>
        )}
        {!isClient && isExpert && data?.status !== 'CANCELLED' && (
          <Flex
            w="100%"
            justifyContent="center"
            pt="18px"
            flexDirection="column"
          >
            {!!data?.cancellationRequestExpert && (
              <ButtonController
                variant="pink"
                onClick={handleUndoCancellationRequest}
                customStyle={{ marginBottom: '18px', fontSize: '0.8rem' }}
                isDisabled={isLoading}
              >
                {t('orderDetails', 'summary', 'undoCancellationRequest')}
              </ButtonController>
            )}
            {(data?.status === 'ACTIVE' ||
              data?.status === 'CHANGE_REQUEST') && (
              <ButtonController
                variant="pink"
                onClick={handleRequestApprovalByExpert}
                customStyle={{ marginBottom: '18px', fontSize: '0.8rem' }}
                isDisabled={isLoading}
              >
                {t('orderDetails', 'summary', 'requestApproval')}
              </ButtonController>
            )}
            {data?.isCancelable &&
              (data?.status === 'NOT_PAID' || data?.status === 'ACTIVE') && (
                <ButtonController
                  variant="pink"
                  onClick={handleRejectOfferByExpert}
                  customStyle={{ marginBottom: '18px', fontSize: '0.8rem' }}
                  isDisabled={isLoading}
                >
                  {t('orderDetails', 'summary', 'cancelOrder')}
                </ButtonController>
              )}
            {!data?.cancellationRequestExpert &&
              !data?.cancellationRequestClient &&
              !data?.isCancelable &&
              (data?.status === 'NOT_PAID' ||
                data?.status === 'ACTIVE' ||
                data?.status === 'NEEDS_APPROVAL' ||
                data?.status === 'CHANGE_REQUEST') && (
                <ButtonController
                  variant="pink"
                  onClick={handleCancellationRequestByExpert}
                  customStyle={{ marginBottom: '18px', fontSize: '0.8rem' }}
                  isDisabled={isLoading}
                >
                  {t('orderDetails', 'summary', 'cancellationRequest')}
                </ButtonController>
              )}
            {data?.cancellationRequestClient && (
              <ButtonController
                variant="pink"
                onClick={handleApproveCancellationRequestByExpert}
                customStyle={{ marginBottom: '18px', fontSize: '0.8rem' }}
                isDisabled={isLoading}
              >
                {t('orderDetails', 'summary', 'cancellationRequestedByClient')}
              </ButtonController>
            )}
            {/* <ButtonController
              variant="yellow"
              // onClick={() =>
              //   push(`/${locale}/chat/${data?.clientData?.id}/${data?.id}`)
              // }
              onClick={() => true}
              isDisabled={isLoading}
            >
              {t('orderDetails', 'summary', 'contactClient')}
            </ButtonController> */}
          </Flex>
        )}
      </WrapperStyled>
    </>
  );
};

export default memo(Summary);
