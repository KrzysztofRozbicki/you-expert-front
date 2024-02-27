import React, { memo, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import useTranslation from '../../hooks/useTranslation';
import { initialStateType } from '../../redux/interfaces/app';
import { screenSizesNumber } from '../../styles/theme/breakpoints';
import OrderPreviewItemDesktop from './OrderPreviewItem.desktop';
import OrderPreviewItemMobile from './OrderPreviewItem.mobile';

interface IOrderPreviewItemProps {
  order: any;
  contentType?: string;
  isExpert: boolean;
  isShouldShowInvoiceColumn: boolean;
}

const OrderPreviewItem: React.FC<IOrderPreviewItemProps> = (props) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { isExpert, order, isShouldShowInvoiceColumn, contentType } = props;
  const { windowWidth } = useSelector(
    (state: any): initialStateType => state.app
  );

  const onOrderClick = useCallback(
    (orderId: number) => {
      const {
        query: { locale }
      } = router;

      router.push(
        '/[locale]/order-details/[orderId]/',
        `/${locale}/order-details/${orderId}/`
      );
    },
    [router]
  );

  const handleClickAskInvoiceButton = useCallback(
    (e: React.MouseEvent<HTMLParagraphElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const {
        push,
        query: { locale }
      } = router;

      push({
        pathname: `/${locale}/order-details/${order?.id}`,
        query: { askInvoice: true }
      });
    },
    [router, order?.id]
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

      if (!order?.unreadMessagesCount) {
        return;
      }

      const {
        push,
        query: { locale }
      } = router;

      push({
        pathname: `/${locale}/order-details/${order?.id}`,
        query: { focusChat: true }
      });
    },
    [router, order]
  );

  return windowWidth >= screenSizesNumber?.md ? (
    <OrderPreviewItemDesktop
      t={t}
      order={order}
      isExpert={isExpert}
      contentType={contentType}
      isShouldShowInvoiceColumn={isShouldShowInvoiceColumn}
      onOrderClick={onOrderClick}
      handleUnreadMessageClick={handleUnreadMessageClick}
      handleClickAskInvoiceButton={handleClickAskInvoiceButton}
      handleClickExpertDoesntIssueInvoices={
        handleClickExpertDoesntIssueInvoices
      }
    />
  ) : (
    <OrderPreviewItemMobile
      t={t}
      order={order}
      isExpert={isExpert}
      contentType={contentType}
      isShouldShowInvoiceColumn={isShouldShowInvoiceColumn}
      onOrderClick={onOrderClick}
      handleUnreadMessageClick={handleUnreadMessageClick}
      handleClickAskInvoiceButton={handleClickAskInvoiceButton}
    />
  );
};

export default memo(OrderPreviewItem);
