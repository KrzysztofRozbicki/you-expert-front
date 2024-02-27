import React, { useCallback } from 'react';
import { Flex, Text, Avatar } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useTranslation from '../../hooks/useTranslation';
import { ButtonController } from '../common/ButtonController';
import TooltipController from '../common/TooltipController';

export const statuses = {
  AWAITING_PAYMENT: 'Awaiting payment',
  ACTIVE: 'Active',
  APPROVAL_REQUESTED: 'Approval requested',
  REJECTED_BY_EXPERT: 'Rejected by expert',
  CANCELLED: 'Cancelled',
  FAILED: 'Failed',
  DELIVERED_NOT_PAID: 'Delivered not paid',
  DELIVERED_PAID: 'Delivered paid',
  NOT_PAID: 'Not payed'
};

const OrderPreviewItem = (props) => {
  const { t } = useTranslation();
  const router = useRouter();
  const {
    id,
    title,
    createdAt,
    status,
    delivered_at,
    deadlineDate,
    is_expert,
    service,
    expert,
    unreadMessagesCount,
    isShouldShowInvoiceColumn
  } = props;

  const avatar_url = expert?.avatarUrl;
  const public_name = expert?.publicName;
  const serviceLabel = service && service.name ? service.name : '';

  const onOrderClick = (orderId: number) => {
    const { query } = router;
    const { locale } = query;

    router.push(
      '/[locale]/order-details/[orderId]/',
      `/${locale}/order-details/${orderId}/`
    );
  };

  const formattedCreatedDate = createdAt ? createdAt.split('T')[0] : null;

  const handleClickAskInvoiceButton = useCallback(
    (e: React.MouseEvent<HTMLParagraphElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const {
        push,
        query: { locale }
      } = router;

      push({
        pathname: `/${locale}/order-details/${id}`,
        query: { askInvoice: true }
      });
    },
    [router, id]
  );

  const handleClickExpertDoesntIssueInvoices = useCallback(
    (e: React.MouseEvent<HTMLOrSVGElement>) => {
      e.preventDefault();
      e.stopPropagation();
    },
    []
  );

  const handleUnreadMessageClick = useCallback(
    (e: React.MouseEvent<HTMLParagraphElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (!unreadMessagesCount) {
        return;
      }

      const {
        push,
        query: { locale }
      } = router;

      push({
        pathname: `/${locale}/order-details/${id}`,
        query: { focusChat: true }
      });
    },
    [router, id, unreadMessagesCount]
  );

  if (is_expert) {
    return (
      <Flex
        cursor="pointer"
        justify="space-between"
        alignItems="center"
        p="27px"
        mb="15px"
        borderRadius="5px"
        border="1px solid #DCDCF4"
        onClick={() => onOrderClick(id)}
      >
        <Text w="25%" fontSize="1rem" color="#020055" fontWeight="500">
          {serviceLabel || '-'}
        </Text>
        <Text pl="10px" minWidth="25%" fontSize="0.8rem" textAlign="center">
          <span style={{ whiteSpace: 'nowrap' }}>
            {t('common', 'labels', 'start')}:
          </span>{' '}
          <span style={{ whiteSpace: 'nowrap' }}>
            {formattedCreatedDate || '-'}
          </span>
          <br />
          <span style={{ whiteSpace: 'nowrap' }}>
            {t('common', 'labels', 'ending')}:
          </span>{' '}
          <span style={{ whiteSpace: 'nowrap' }}>
            {deadlineDate ? deadlineDate.split('T')[0] : null}
          </span>
        </Text>
        <Text
          textAlign="center"
          w="25%"
          color="#60DB5D"
          fontSize="0.8rem"
          fontWeight="500"
        >
          {statuses[status] || status || '-'}
        </Text>
        <Flex
          w="25%"
          height="100%"
          fontSize="0.8rem"
          fontWeight="500"
          alignItems="center"
          justifyContent="center"
          cursor={!!unreadMessagesCount ? 'pointer' : 'default'}
          onClick={handleUnreadMessageClick}
          _hover={{
            textDecoration: !!unreadMessagesCount ? 'underline' : 'none'
          }}
        >
          {unreadMessagesCount ? unreadMessagesCount : '-'}
        </Flex>
        {isShouldShowInvoiceColumn && (
          <Flex w="15%" ml="10px" justifyContent="center">
            {(status === 'DELIVERED_PAID' ||
              status === 'DELIVERED_NOT_PAID') && (
              <>
                {!!expert?.issuingInvoices ? (
                  <Text
                    textAlign="center"
                    fontSize="0.8rem"
                    fontWeight="500"
                    onClick={handleClickAskInvoiceButton}
                    lineHeight={1}
                  >
                    {t('common', 'labels', 'askForInvoice')}
                  </Text>
                ) : (
                  <TooltipController
                    text={t('common', 'labels', 'expertDoenstIssueInvoices')}
                    placement="bottom"
                  >
                    <svg
                      width="24"
                      height="24"
                      xmlns="http://www.w3.org/2000/svg"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      cursor="default"
                      onClick={handleClickExpertDoesntIssueInvoices}
                    >
                      <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm.5 17h-1v-9h1v9zm-.5-12c.466 0 .845.378.845.845 0 .466-.379.844-.845.844-.466 0-.845-.378-.845-.844 0-.467.379-.845.845-.845z" />
                    </svg>
                  </TooltipController>
                )}
              </>
            )}
          </Flex>
        )}
      </Flex>
    );
  }
  
  return (
    <Flex
      cursor="pointer"
      justify="space-between"
      alignItems="center"
      p="27px"
      mb="15px"
      borderRadius="5px"
      border="1px solid #DCDCF4"
      onClick={() => onOrderClick(id)}
    >
      <Flex w="16%">{avatar_url ? <Avatar src={avatar_url} /> : null}</Flex>
      <Text w="16%" fontSize="0.8rem">
        {public_name || ''}
      </Text>
      <Text textAlign="center" w="16%" fontSize="0.8rem">
        {serviceLabel || ''}
      </Text>
      <Text minWidth="16%" fontSize="0.8rem" textAlign="center">
        <span style={{ whiteSpace: 'nowrap' }}>
          {t('common', 'labels', 'start')}:
        </span>{' '}
        <span style={{ whiteSpace: 'nowrap' }}>
          {formattedCreatedDate || '-'}
        </span>
        <br />
        <span style={{ whiteSpace: 'nowrap' }}>
          {t('common', 'labels', 'ending')}:
        </span>{' '}
        <span style={{ whiteSpace: 'nowrap' }}>
          {deadlineDate ? deadlineDate.split('T')[0] : null}
        </span>
      </Text>
      <Text
        textAlign="center"
        w="16%"
        color="#60DB5D"
        fontSize="0.8rem"
        fontWeight="500"
      >
        {statuses[status] || status || '-'}
      </Text>
      <Flex
        w="16%"
        height="100%"
        fontSize="0.8rem"
        fontWeight="500"
        alignItems="center"
        justifyContent="center"
        cursor={!!unreadMessagesCount ? 'pointer' : 'default'}
        onClick={handleUnreadMessageClick}
        _hover={{
          textDecoration: !!unreadMessagesCount ? 'underline' : 'none'
        }}
      >
        {unreadMessagesCount ? unreadMessagesCount : '-'}
      </Flex>
      {isShouldShowInvoiceColumn && (
        <Flex w="16%" ml="10px" justifyContent="center">
          {(status === 'DELIVERED_PAID' || status === 'DELIVERED_NOT_PAID') && (
            <>
              {!!expert?.issuingInvoices ? (
                <Text
                  textAlign="center"
                  fontSize="0.8rem"
                  fontWeight="500"
                  onClick={handleClickAskInvoiceButton}
                  lineHeight={1}
                >
                  {t('common', 'labels', 'askForInvoice')}
                </Text>
              ) : (
                <TooltipController
                  text={t('common', 'labels', 'expertDoenstIssueInvoices')}
                  placement="bottom"
                >
                  <svg
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    cursor="default"
                    onClick={handleClickExpertDoesntIssueInvoices}
                  >
                    <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm.5 17h-1v-9h1v9zm-.5-12c.466 0 .845.378.845.845 0 .466-.379.844-.845.844-.466 0-.845-.378-.845-.844 0-.467.379-.845.845-.845z" />
                  </svg>
                </TooltipController>
              )}
            </>
          )}
        </Flex>
      )}
    </Flex>
  );
};

export default OrderPreviewItem;
