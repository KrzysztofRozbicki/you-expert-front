import React, {
  memo,
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo
} from 'react';
import { Flex, useToast, Spinner } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import useTranslation from '../../hooks/useTranslation';
import Dialogs from './dialogs';
import DialogWindow from './dialogWindow';
import { wsHost } from '../../api/common';
import {
  getInboxDialogsAction,
  setInboxDialogsAction,
  getInboxDialogMessages,
  setInboxDialogMessagesAction,
  uploadFileAction
} from './actions';
import {
  IDialogs,
  IMessages,
  IInboxInitialState,
  IDialogItem
} from './interfaces';
import { initialStateType } from '../../redux/interfaces/app';
import { screenSizesNumber } from '../../styles/theme/breakpoints';

const Inbox: React.FC = () => {
  const socketRef = useRef<any>(null);
  const { t } = useTranslation();
  const toast = useToast();
  const dispatch = useDispatch();
  const { push } = useRouter();
  const { accessToken, fullProfileData } = useSelector(
    (state: any) => state.user
  );
  const { dialogs, messages } = useSelector(
    (state: any): IInboxInitialState => state.inbox
  );
  const { windowWidth } = useSelector(
    (state: any): initialStateType => state.app
  );
  const [search, setSearch] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDialogWindowLoading, setIsDialogWindowLoading] =
    useState<boolean>(false);
  const [selectedDialog, setSelectedDialog] = useState<IDialogItem>(null);
  const [isWSConnected, setIsWSConnected] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);

  const isMobile = useMemo(
    (): boolean => windowWidth < screenSizesNumber?.md,
    [windowWidth]
  );

  const callToast = useCallback(
    (type: 'success' | 'error', titleName: string, descName?: string): void => {
      const options = {
        title: t('inbox', 'toast', titleName),
        status: type,
        duration: 4000,
        isClosable: true
      } as any;

      if (descName) {
        options.description = t('inbox', 'toast', descName);
      }

      toast(options);
    },
    [toast, t]
  );

  const handleGetAllData = () => {
    try {
      getInboxDialogsAction()
        .then((data: IDialogs) => {
          dispatch(setInboxDialogsAction(data));
          const urlParams = new URLSearchParams(window?.location?.search);
          const dialogId = urlParams.get('dialog');
          if (dialogId) {
            const dialogData = data.results.find(
              (item) => item?.id === +dialogId
            );
            if (dialogData) {
              getInboxDialogMessages(dialogData?.dialogWith?.id)
                .then((data: IMessages) =>
                  dispatch(setInboxDialogMessagesAction(data))
                )
                .catch((e) => console.error(e));
            }
          }
        })
        .catch((e) => console.error(e));
    } catch (e) {
      console.error(e);
    }
  };

  const setWebSocketConnection = () => {
    socketRef.current = new WebSocket(`${wsHost}/chat/?token=${accessToken}`);
    socketRef.current.onopen = () => {
      setIsWSConnected(true);
    };
    socketRef.current.onclose = () => {
      setIsWSConnected(false);
    };
    socketRef.current.onerror = (e: string) => console.error(e);
    socketRef.current.onmessage = (message) => {
      try {
        if (message?.data) {
          const data = JSON.parse(message.data);
          if (data?.msg_type === 8) {
            handleGetAllData();
          }
        }
      } catch (e) {
        callToast('error', 'smthWentWrong');
      }
    };
  };

  const getDialogs = useCallback(() => {
    setIsLoading(true);
    getInboxDialogsAction()
      .then((data: IDialogs) => {
        if (data) {
          dispatch(setInboxDialogsAction(data));
          const urlParams = new URLSearchParams(window?.location?.search);
          const dialogId = urlParams?.get('dialog');

          if (dialogId) {
            const selectedDialog = data?.results?.find(
              (dl) => dl.id === +dialogId
            );
            if (selectedDialog) {
              onSelectDialog(selectedDialog);
            }
          } else if (!!data?.results?.length) {
            onSelectDialog(data?.results[0]);
          }

          setWebSocketConnection();
          setIsLoading(false);
        }
      })
      .catch(() => callToast('error', 'cantGetData', 'smthWentWrong'));
  }, [dispatch, toast, t, setWebSocketConnection, callToast]);

  const onSelectDialog = useCallback(
    (dialog: IDialogItem): void => {
      setIsDialogWindowLoading(true);
      getInboxDialogMessages(dialog?.dialogWith?.id)
        .then((data: IMessages) => {
          if (data) {
            dispatch(setInboxDialogMessagesAction(data));
            push({ query: { dialog: dialog?.id } });
            setSelectedDialog(dialog);
            setIsDialogWindowLoading(false);
          }
        })
        .catch(() => callToast('error', 'cantGetData', 'smthWentWrong'));
    },
    [dispatch, toast, t]
  );

  const handleSendMessage = useCallback(
    (message: string): void => {
      if (message) {
        try {
          setIsSending(true);
          socketRef.current.send(
            JSON.stringify({
              msg_type: 3,
              text: message,
              user_pk: `${selectedDialog?.dialogWith?.id}`,
              random_id: new Date().getTime() * -1
            })
          );
          setIsSending(false);
        } catch {
          callToast('error', 'smthWentWrong');
        }
      }
    },
    [socketRef, callToast, dispatch, selectedDialog]
  );

  const handleUploadFile = useCallback(
    (data: { filename: string; file: string }[]): void => {
      setIsSending(true);
      uploadFileAction(data)
        .then((data) => {
          socketRef.current.send(
            JSON.stringify({
              msg_type: 4,
              file_ids: data?.map((item) => item?.id),
              user_pk: `${selectedDialog?.dialogWith?.id}`,
              random_id: new Date().getTime() * -1
            })
          );
        })
        .catch(() => {
          callToast('error', 'cantUploadFile', 'smthWentWrong');
        })
        .finally(() => setIsSending(false));
    },
    [callToast, socketRef, selectedDialog]
  );

  const handleChangeSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const {
        target: { value }
      } = e;

      setSearch(value);
    },
    []
  );

  const filteredDialogs = useMemo((): IDialogs => {
    try {
      if (!search) {
        return dialogs;
      }

      return {
        ...dialogs,
        results: dialogs?.results?.filter((dialog: IDialogItem): boolean =>
          dialog?.dialogWith?.publicName
            ?.toLowerCase()
            ?.includes(search?.toLowerCase())
        )
      };
    } catch {
      return dialogs;
    }
  }, [dialogs, search]);

  const handleEscapeClick = useCallback((e) => {
    const { key } = e;
    if (key === 'Escape') {
      setSearch('');
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeClick);
    return () => document.removeEventListener('keydown', handleEscapeClick);
  }, []);

  useEffect(() => {
    getDialogs();

    return () => {
      socketRef.current.close();
    };
  }, []);

  return (
    <Flex h="600px" w="100%" alignItems="center" justifyContent="center">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {!isMobile && (
            <Flex w={{ md: '250px', lg: '350px' }} h="100%" overflow="hidden">
              <Dialogs
                search={search}
                dialogs={filteredDialogs}
                onSelectDialog={onSelectDialog}
                selectedDialog={selectedDialog}
                handleChangeSearch={handleChangeSearch}
              />
            </Flex>
          )}
          <Flex flex={1} h="100%" alignItems="center" justifyContent="center">
            {selectedDialog && (
              <>
                {isDialogWindowLoading ? (
                  <Spinner />
                ) : (
                  <DialogWindow
                    isMobile={isMobile}
                    search={search}
                    dialogs={filteredDialogs}
                    onSelectDialog={onSelectDialog}
                    isWSConnected={isWSConnected}
                    isSending={isSending}
                    handleSendMessage={handleSendMessage}
                    handleUploadFile={handleUploadFile}
                    callToast={callToast}
                    messages={messages}
                    userId={fullProfileData?.id}
                    selectedDialog={selectedDialog}
                    handleChangeSearch={handleChangeSearch}
                  />
                )}
              </>
            )}
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default memo(Inbox);
