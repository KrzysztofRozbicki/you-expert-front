import React, { memo, useMemo, useState, useCallback } from 'react';
import { Flex, Text, Avatar } from '@chakra-ui/react';
import TooltipController from '../common/TooltipController';
import { statuses } from './constants';

interface IOrderPreviewItemMobileProps {
  t: any;
  order: any;
  isExpert: boolean;
  contentType?: string;
  isShouldShowInvoiceColumn: boolean;
  onOrderClick: (orderId: number) => void;
  handleUnreadMessageClick: (e: React.MouseEvent<HTMLParagraphElement>) => void;
  handleClickAskInvoiceButton: (
    e: React.MouseEvent<HTMLParagraphElement>
  ) => void;
}

const OrderPreviewItemMobile: React.FC<IOrderPreviewItemMobileProps> = (
  props
) => {
  const {
    t,
    order: {
      id,
      isNew,
      title,
      createdAt,
      status,
      delivered_at,
      deadlineDate,
      service,
      expert,
      unreadMessagesCount,
      representationStatus,
      cancellationRequestClient,
      cancellationRequestExpert
    },
    contentType,
    isExpert,
    isShouldShowInvoiceColumn,
    onOrderClick,
    handleUnreadMessageClick,
    handleClickAskInvoiceButton
  } = props;

  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);
  const formattedCreatedDate = useMemo(
    () => (createdAt ? createdAt.split('T')[0] : null),
    [createdAt]
  );

  const handleClickExpertDoesntIssueInvoices = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      setIsTooltipOpen(!isTooltipOpen);
    },
    [isTooltipOpen]
  );

  const isBoldText = useMemo(
    (): boolean => isExpert && isNew && contentType === 'myAssignments',
    [isExpert, isNew, contentType]
  );

  const isRedText = useMemo(
    (): boolean =>
      (contentType === 'myAssignments' && cancellationRequestClient) ||
      (contentType === 'myOrders' && cancellationRequestExpert),
    [cancellationRequestClient, cancellationRequestExpert, contentType]
  );

  return (
    <Flex
      cursor="pointer"
      p="21px"
      mb="15px"
      borderRadius="5px"
      border="1px solid #DCDCF4"
      onClick={() => onOrderClick(id)}
      flexDirection="column"
    >
      {!isExpert && (
        <Flex mb="10px" alignItems="center">
          <Avatar src={expert?.avatarUrl} name={expert?.publicName} mr="10px" />
          <Text fontSize="0.8rem" color={isRedText ? 'general.red' : '#020055'}>
            {expert?.publicName || ''}
          </Text>
        </Flex>
      )}
      <Text
        w="100%"
        fontSize="1.1rem"
        color={isRedText ? 'general.red' : '#020055'}
        mb="10px"
        fontWeight={isBoldText ? '900' : '500'}
      >
        {title}
      </Text>
      <Text
        fontSize="0.8rem"
        mb="3px"
        fontWeight={isBoldText ? '600' : '400'}
        color={isRedText ? 'general.red' : '#020055'}
      >
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
      <Text fontSize="0.8rem" mb="3px" fontWeight={isBoldText ? '900' : '500'}>
        {t('common', 'labels', 'status')}:{' '}
        <span style={{ color: '#60DB5D' }}>{representationStatus}</span>
      </Text>
      <Text
        fontSize="0.8rem"
        onClick={handleUnreadMessageClick}
        mb="3px"
        color={isRedText ? 'general.red' : '#020055'}
      >
        {t('common', 'labels', 'messages')}:{' '}
        {unreadMessagesCount ? unreadMessagesCount : '-'}
      </Text>
      {isShouldShowInvoiceColumn &&
        (status === 'DELIVERED_PAID' || status === 'DELIVERED_NOT_PAID') && (
          <>
            {!!expert?.issuingInvoices ? (
              <Text
                fontSize="0.8rem"
                onClick={handleClickAskInvoiceButton}
                lineHeight={1}
              >
                {t('common', 'labels', 'askForInvoice')}
              </Text>
            ) : (
              <TooltipController
                isOpen={isTooltipOpen}
                text={t('common', 'labels', 'expertDoenstIssueInvoices')}
                placement="bottom"
              >
                <Flex
                  w="100%"
                  alignItems="center"
                  justifyContent="space-between"
                  onClick={handleClickExpertDoesntIssueInvoices}
                >
                  <Text fontSize="0.8rem" lineHeight={1}>
                    {t('common', 'labels', 'askForInvoice')}
                  </Text>
                  <svg
                    width="14"
                    height="14"
                    xmlns="http://www.w3.org/2000/svg"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    cursor="default"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm.5 17h-1v-9h1v9zm-.5-12c.466 0 .845.378.845.845 0 .466-.379.844-.845.844-.466 0-.845-.378-.845-.844 0-.467.379-.845.845-.845z" />
                  </svg>
                </Flex>
              </TooltipController>
            )}
          </>
        )}
    </Flex>
  );
};

export default memo(OrderPreviewItemMobile);
