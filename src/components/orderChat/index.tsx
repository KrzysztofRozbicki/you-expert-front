import React, {
  memo,
  useRef,
  useEffect,
  useCallback,
  useState,
  useMemo
} from 'react';
import { Flex, Text, Spinner, useToast, Button } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import useTranslation from '../../hooks/useTranslation';
import MessageItem from '../messageItem';
import { chatInitialState, IMessage } from './interfaces';
import { MAX_UPLOAD_FILE_SIZE, ALLOWED_FORMATS } from './constants';
import { wsHost } from '../../api/common';
import { setModalDataAction } from '../common/modalController/action';
import {
  getMessageDataAction,
  setChatMessageDataAction,
  resetChatStoreAction,
  uploadFileAction
} from './actions';
import { MessageWrapperStyled, TextareaStyled } from './style';
import { initialStateType } from '../../redux/interfaces/app';
import { screenSizesNumber } from '../../styles/theme/breakpoints';

interface IOrderChatState {
  isLoading: boolean;
  isSending: boolean;
  message: string;
  isWSConnected: boolean;
}

interface IOrderChatProps {
  orderId: string;
  dialogWith: string;
  askInvoice?: boolean;
  focusChat?: boolean;
  initialMessage?: string;
  warningMessage?: string;
}

const OrderChat: React.FC<IOrderChatProps> = (props) => {
  const {
    orderId,
    dialogWith,
    initialMessage,
    warningMessage,
    askInvoice,
    focusChat
  } = props;
  const { t } = useTranslation();
  const { messageData } = useSelector(
    (state: any): chatInitialState => state.orderChat
  );
  const { accessToken, profileData } = useSelector((state: any) => state.user);
  const { windowWidth } = useSelector(
    (state: any): initialStateType => state.app
  );
  const toast = useToast();
  const dispatch = useDispatch();
  const socketRef = useRef<any>(null);
  const messageWrapperRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [state, setState] = useState<IOrderChatState>({
    isLoading: false,
    isWSConnected: false,
    isSending: false,
    message: warningMessage || initialMessage || ''
  });

  const isMobile = useMemo(
    (): boolean => windowWidth < screenSizesNumber?.md,
    [windowWidth]
  );

  const callToast = useCallback(
    (type: 'success' | 'error', titleName: string, descName?: string): void => {
      const options = {
        title: t('chat', 'toast', titleName),
        status: type,
        duration: 4000,
        isClosable: true
      } as any;

      if (descName) {
        options.description = t('chat', 'toast', descName);
      }

      toast(options);
    },
    [toast, t]
  );

  const setWebSocketConnection = useCallback(() => {
    socketRef.current = new WebSocket(`${wsHost}/thread/?token=${accessToken}`);
    socketRef.current.onopen = () => {
      setState((prev) => ({ ...prev, isWSConnected: true }));
    };
    socketRef.current.onclose = () => {
      setState((prev) => ({ ...prev, isWSConnected: false }));
    };
    socketRef.current.onerror = (e: string) => console.error(e);
    socketRef.current.onmessage = (message) => {
      try {
        console.log(message);
        if (message?.data) {
          const data = JSON.parse(message.data);
          if (data?.msg_type === 8) {
            getMessageDataAction(dialogWith, orderId)
              .then((data) => dispatch(setChatMessageDataAction(data)))
              .catch(() => callToast('error', 'smthWentWrong'));
          }
        }
      } catch {
        callToast('error', 'smthWentWrong');
      }
    };
  }, [socketRef, state, dispatch, dialogWith, orderId, callToast]);

  const getMessageData = useCallback(() => {
    setState((prev) => ({ ...prev, isLoading: true }));
    getMessageDataAction(dialogWith, orderId)
      .then((data) => {
        dispatch(setChatMessageDataAction(data));
        setState((prev) => ({ ...prev, isLoading: false }));
        setWebSocketConnection();
      })
      .catch(() => {
        callToast('error', 'cantGetData', 'smthWentWrong');
      });
  }, [dialogWith, orderId, dispatch, callToast]);

  const handleMessageChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const {
        target: { value }
      } = e;

      setState((prev) => ({ ...prev, message: value }));
    },
    []
  );

  const handleSendMessage = useCallback(() => {
    if (state.message && state.message !== warningMessage) {
      try {
        setState((prev) => ({ ...prev, isSending: true }));
        socketRef.current.send(
          JSON.stringify({
            msg_type: 3,
            text: state.message,
            user_pk: dialogWith,
            order_pk: orderId,
            random_id: new Date().getTime() * -1
          })
        );
        setState((prev) => ({ ...prev, message: '', isSending: false }));
      } catch {
        callToast('error', 'smthWentWrong');
      }
    }
  }, [
    state,
    socketRef,
    callToast,
    dialogWith,
    orderId,
    dispatch,
    warningMessage
  ]);

  const handleUploadFile = useCallback(
    (data: { filename: string; file: string }[]): void => {
      setState((prev) => ({ ...prev, isSending: true }));
      uploadFileAction(data)
        .then((data) => {
          socketRef.current.send(
            JSON.stringify({
              msg_type: 4,
              file_ids: data?.map((item) => item?.id),
              user_pk: dialogWith,
              order_pk: orderId,
              random_id: new Date().getTime() * -1
            })
          );
        })
        .catch(() => {
          callToast('error', 'cantUploadFile', 'smthWentWrong');
        })
        .finally(() => setState((prev) => ({ ...prev, isSending: false })));
    },
    [callToast, socketRef, dialogWith, orderId]
  );

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const {
        target: { files }
      } = e;

      if (!files?.length) {
        return;
      }

      const validFiles = [];
      for (let i = 0; i < files?.length; i++) {
        if (files[i].size > MAX_UPLOAD_FILE_SIZE) {
          callToast('error', 'fileSizeIsBiggerThenAllowed', 'smthWentWrong');
          continue;
        }

        validFiles.push(files[i]);
      }

      dispatch(
        setModalDataAction({
          modalName: 'chatFileUploadWindow',
          modalProps: {
            files: validFiles,
            onUpload: handleUploadFile
          }
        })
      );
    },
    [dispatch, callToast]
  );

  const handleAddFileClick = useCallback(() => {
    try {
      if (state.isWSConnected) {
        inputRef.current.click();
      }
    } catch (e) {
      console.error(e);
    }
  }, [state.isWSConnected, inputRef]);

  const handleFocusTextarea = useCallback(() => {
    if (state.message === warningMessage) {
      setState((prev) => ({ ...prev, message: '' }));
    }
  }, [state, warningMessage]);

  const renderMessages = useMemo((): IMessage[] => {
    if (messageData && messageData?.results) {
      return messageData?.results?.reverse();
    }
    return [];
  }, [messageData]);

  useEffect(() => {
    try {
      if (messageWrapperRef && messageWrapperRef?.current) {
        const { current: div } = messageWrapperRef;

        div.scrollTop = div.scrollHeight - div.clientHeight;
      }
    } catch (e) {
      console.error(e);
    }
  }, [messageWrapperRef, state.isLoading, renderMessages]);

  useEffect(() => {
    if (
      (focusChat || askInvoice) &&
      messageWrapperRef &&
      messageWrapperRef?.current
    ) {
      try {
        const { current: div } = messageWrapperRef;
        window.scrollTo(0, div?.offsetTop - 100);
      } catch (e) {
        console.error(e);
      }
    }
  }, [messageWrapperRef, state.isLoading, askInvoice, focusChat]);

  useEffect(() => {
    getMessageData();

    return () => {
      dispatch(resetChatStoreAction());
      socketRef.current.close();
    };
  }, []);

  return (
    <Flex w="100%" maxH="500px" direction="column" alignItems="center">
      {state?.isLoading ? (
        <Spinner />
      ) : (
        <>
          <MessageWrapperStyled
            ref={messageWrapperRef}
            p={{ sm: '0 10px', md: '0 20px' }}
          >
            {renderMessages.map((item, index) => (
              <MessageItem
                key={index}
                isMe={item.sender === profileData?.user_id}
                messageData={item}
              />
            ))}
          </MessageWrapperStyled>
          {/* {warningMessage && (
            <Text mb="10px" color="general.red" fontWeight="500">
              {warningMessage}
            </Text>
          )} */}
          <Flex h="100px" w="100%" mb="10px">
            <Flex flex={1}>
              <TextareaStyled
                value={state.message}
                onFocus={handleFocusTextarea}
                onChange={handleMessageChange}
                placeholder={t('chat', 'general', 'typeMessageHere')}
                borderRadius={{ sm: '5px', md: '15px' }}
              />
            </Flex>
            {!isMobile && (
              <Flex w="150px" ml="20px">
                <Button
                  w="100%"
                  h="100%"
                  color="#fff"
                  onClick={handleSendMessage}
                  fontSize="0.8rem"
                  background="#EC8581"
                  borderRadius="15px"
                  fontWeight="500"
                  disabled={
                    state.isSending || state.isLoading || !state.isWSConnected
                  }
                >
                  {state.isSending ? <Spinner /> : t('chat', 'general', 'send')}
                </Button>
              </Flex>
            )}
          </Flex>
          <Flex pl="20px" w="100%" justifyContent="space-between">
            <input
              key={new Date().getTime()}
              ref={inputRef}
              type="file"
              style={{ display: 'none' }}
              onChange={handleFileInputChange}
              multiple
            />
            <Text
              cursor="pointer"
              fontSize="0.6rem"
              onClick={handleAddFileClick}
            >
              {t('chat', 'general', 'addFiles')}
            </Text>
            {isMobile && (
              <Flex>
                <Button
                  w="100%"
                  h="100%"
                  color="#fff"
                  onClick={handleSendMessage}
                  fontSize="0.8rem"
                  background="#EC8581"
                  borderRadius="5px"
                  padding="10px 15px !important"
                  disabled={
                    state.isSending || state.isLoading || !state.isWSConnected
                  }
                >
                  {state.isSending ? <Spinner /> : t('chat', 'general', 'send')}
                </Button>
              </Flex>
            )}
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default memo(OrderChat);
