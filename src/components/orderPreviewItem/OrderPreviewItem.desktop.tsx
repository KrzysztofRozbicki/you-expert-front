import React, { memo, useMemo } from 'react';
import { Flex, Text, Avatar } from '@chakra-ui/react';
import TooltipController from '../common/TooltipController';
import { statuses } from './constants';

interface IOrderPreviewItemDesktopProps {
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
  handleClickExpertDoesntIssueInvoices: (
    e: React.MouseEvent<HTMLOrSVGElement>
  ) => void;
}

const OrderPreviewItemDesktop: React.FC<IOrderPreviewItemDesktopProps> = (
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
    handleClickAskInvoiceButton,
    handleClickExpertDoesntIssueInvoices
  } = props;

  const formattedCreatedDate = useMemo(
    () => (createdAt ? createdAt.split('T')[0] : null),
    [createdAt]
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

  if (isExpert) {
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
        <Text
          w="25%"
          fontSize="1rem"
          color={isRedText ? 'general.red' : '#020055'}
          fontWeight={isBoldText ? '900' : '500'}
        >
          {service?.name || '-'}
        </Text>
        <Text
          pl="10px"
          color={isRedText ? 'general.red' : '#020055'}
          w="33%"
          minWidth="33%"
          fontSize="0.8rem"
          textAlign="center"
          fontWeight={isBoldText ? '600' : '400'}
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
        <Text
          textAlign="center"
          w="25%"
          color="#60DB5D"
          fontSize="0.8rem"
          fontWeight={isBoldText ? '900' : '500'}
        >
          {representationStatus}
        </Text>
        <Flex
          w="17%"
          height="100%"
          fontSize="0.8rem"
          fontWeight="500"
          alignItems="center"
          justifyContent="center"
          color={isRedText ? 'general.red' : '#020055'}
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
      <Flex w="16%">
        <Avatar src={expert?.avatarUrl} name={expert?.publicName} />
      </Flex>
      <Text
        w="16%"
        fontSize="0.8rem"
        color={isRedText ? 'general.red' : '#020055'}
      >
        {expert?.publicName || ''}
      </Text>
      <Text
        textAlign="center"
        w="16%"
        fontSize="0.8rem"
        color={isRedText ? 'general.red' : '#020055'}
      >
        {service?.name || '-'}
      </Text>
      <Text
        minWidth="16%"
        fontSize="0.8rem"
        textAlign="center"
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
      <Text
        textAlign="center"
        w="16%"
        color="#60DB5D"
        fontSize="0.8rem"
        fontWeight="500"
      >
        {representationStatus}
      </Text>
      <Flex
        w="16%"
        height="100%"
        fontSize="0.8rem"
        fontWeight="500"
        alignItems="center"
        color={isRedText ? 'general.red' : '#020055'}
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
          {!!expert?.issuingInvoices ? (
            <>
              {(status === 'DELIVERED_PAID' ||
                status === 'DELIVERED_NOT_PAID') && (
                <Text
                  textAlign="center"
                  fontSize="0.8rem"
                  fontWeight="500"
                  onClick={handleClickAskInvoiceButton}
                  lineHeight={1}
                >
                  {t('common', 'labels', 'askForInvoice')}
                </Text>
              )}
            </>
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
        </Flex>
      )}
    </Flex>
  );
};

export default memo(OrderPreviewItemDesktop);
