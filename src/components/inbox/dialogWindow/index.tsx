import React, {
  memo,
  useRef,
  useState,
  useCallback,
  useEffect,
  useMemo
} from 'react';
import { Flex, Text, Spinner, Avatar, Button, Input } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useTranslation from '../../../hooks/useTranslation';
import MessageItem from '../../messageItem';
import { setModalDataAction } from '../../common/modalController/action';
import { MAX_UPLOAD_FILE_SIZE, ALLOWED_FORMATS } from '../constants';
import { TextareaStyled, MessageWrapperStyled } from './style';
import { IDialogItem, IMessages, IMessageItem, IDialogs } from '../interfaces';

interface DialogWindowProps {
  isMobile: boolean;
  onSelectDialog: (dialog: IDialogItem) => void;
  dialogs: IDialogs;
  userId: number;
  selectedDialog: IDialogItem;
  isWSConnected: boolean;
  isSending: boolean;
  messages: IMessages;
  handleSendMessage: (message: string) => void;
  handleUploadFile: (data: { filename: string; file: string }[]) => void;
  callToast: (
    type: 'success' | 'error',
    titleName: string,
    descName?: string
  ) => void;
  search: string;
  handleChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DialogWindow: React.FC<DialogWindowProps> = (props) => {
  const {
    isMobile,
    search,
    dialogs,
    userId,
    isWSConnected,
    isSending,
    messages,
    handleSendMessage,
    handleUploadFile,
    callToast,
    selectedDialog,
    onSelectDialog,
    handleChangeSearch
  } = props;

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    query: { locale }
  } = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const messageWrapperRef = useRef<HTMLDivElement | null>(null);
  const [message, setMessage] = useState<string>('');

  const handleMessageChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
      const {
        target: { value }
      } = e;

      setMessage(value);
    },
    []
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

  const onSendMessageClick = useCallback(() => {
    handleSendMessage(message);
    setMessage('');
  }, [message, handleSendMessage]);

  const renderMessages = useMemo((): IMessageItem[] => {
    if (messages && messages?.results) {
      return messages?.results?.reverse();
    }
    return [];
  }, [messages]);

  useEffect(() => {
    try {
      if (messageWrapperRef && messageWrapperRef?.current) {
        const { current: div } = messageWrapperRef;
        div.scrollTop = div.scrollHeight - div.clientHeight;
      }
    } catch (e) {
      console.error(e);
    }
  }, [renderMessages]);

  return (
    <Flex
      h="100%"
      flex={1}
      flexDirection="column"
      overflow="hidden"
      bg={{ sm: 'general.tableHeaderBackground', md: '#fff' }}
    >
      {!isMobile && (
        <Flex
          w="100%"
          h="60px"
          borderBottom="1px solid"
          borderColor="general.tableHeaderBackground"
          p="10px 20px"
          overflow="hidden"
          alignItems="center"
        >
          {!!selectedDialog?.dialogWith?.isExpert ? (
            <>
              <Text
                mr="10px"
                fontWeight="500"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                fontSize="0.8rem"
              >
                {selectedDialog?.dialogWith?.publicName}
              </Text>
              <Link
                href={`/${locale}/profile/${selectedDialog?.dialogWith?.id}`}
              >
                <a>
                  <Text fontSize="0.6rem" textDecoration="underline">
                    ({t('inbox', 'dialogWindow', 'viewProfile')})
                  </Text>
                </a>
              </Link>
            </>
          ) : (
            <Text
              fontWeight="500"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              fontSize="0.8rem"
            >
              {selectedDialog?.dialogWith?.publicName}
            </Text>
          )}
        </Flex>
      )}
      <Flex flex={1} flexDirection="column" overflow="hidden">
        {isMobile && (
          <Flex>
            <Input
              bg="#fff"
              value={search}
              h="60px"
              w="100%"
              padding="20px"
              onChange={handleChangeSearch}
              placeholder={t('inbox', 'dialogs', 'search')}
              border="none"
              fontSize="0.8rem"
              borderBottom="1px solid"
              borderBottomColor="rgba(220, 220, 244, 0.28)"
              borderRadius="0px"
              _focus={{ borderBottomColor: 'rgba(220, 220, 244, 0.28)' }}
              _hover={{ borderBottomColor: 'rgba(220, 220, 244, 0.28)' }}
            />
          </Flex>
        )}
        <Flex
          mb="20px"
          overflow="hidden"
          borderBottom={{
            sm: '1px solid rgba(220, 220, 244, 0.28)',
            md: 'none'
          }}
        >
          {isMobile && (
            <Flex
              w="100px"
              h="100%"
              flexDir="column"
              overflow="auto"
              borderRight="1px solid"
              borderColor="general.tableHeaderBackground"
            >
              {dialogs.results.map((dialog, index) => (
                <Flex
                  key={index}
                  minHeight="100px"
                  w="100%"
                  p="10px"
                  cursor="pointer"
                  alignItems="center"
                  flexDirection="column"
                  overflow="hidden"
                  borderBottom="1px solid"
                  borderColor="rgba(220, 220, 244, 0.28)"
                  onClick={() => onSelectDialog(dialog)}
                  borderRight={
                    selectedDialog?.id === dialog?.id ? 'none' : '1px solid'
                  }
                  bg={
                    selectedDialog?.id === dialog?.id
                      ? 'general.tableHeaderBackground'
                      : '#fff'
                  }
                >
                  <Avatar
                    src={dialog?.dialogWith?.avatarUrl}
                    name={dialog?.dialogWith?.publicName}
                    size="md"
                    mb="5px"
                  />
                  <Text
                    maxW="100%"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                    fontSize="0.8rem"
                    fontWeight={
                      selectedDialog?.id === dialog?.id ? '500' : '400'
                    }
                  >
                    {dialog?.dialogWith?.publicName}
                  </Text>
                </Flex>
              ))}
              <Flex
                flex={1}
                borderRight="1px solid rgba(220, 220, 244, 0.28)"
              />
            </Flex>
          )}
          <Flex
            flexDirection="column"
            overflow="hidden"
            flex={1}
            bg={{ sm: 'general.tableHeaderBackground', md: '#fff' }}
          >
            <MessageWrapperStyled
              ref={messageWrapperRef}
              p={{ sm: '0 10px', md: '0 20px' }}
            >
              {renderMessages.map((message, index) => (
                <MessageItem
                  key={index}
                  isMe={message?.sender === userId}
                  messageData={message}
                />
              ))}
            </MessageWrapperStyled>
          </Flex>
        </Flex>
        <Flex
          h="100px"
          w="100%"
          mb="10px"
          p="0 20px"
          bg={{ sm: 'general.tableHeaderBackground', md: '#fff' }}
        >
          <Flex flex={1}>
            <TextareaStyled
              fontSize="0.8rem"
              value={message}
              onChange={handleMessageChange}
              placeholder={t('inbox', 'dialogWindow', 'typeMessageHere')}
              borderRadius={{ sm: '5px', md: '15px' }}
            />
          </Flex>
          {!isMobile && (
            <Flex w="150px" ml="20px">
              <Button
                w="100%"
                h="100%"
                color="#fff"
                onClick={onSendMessageClick}
                fontSize="0.8rem"
                background="#EC8581"
                borderRadius="15px"
                disabled={!isWSConnected || isSending}
                fontWeight="500"
              >
                {isSending ? <Spinner /> : t('inbox', 'dialogWindow', 'send')}
              </Button>
            </Flex>
          )}
        </Flex>
        <Flex p="0 20px 20px 40px" w="100%" justifyContent="space-between">
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
            onClick={() => inputRef.current.click()}
          >
            {t('inbox', 'dialogWindow', 'addFiles')}
          </Text>
          {isMobile && (
            <Flex>
              <Button
                w="100%"
                h="100%"
                color="#fff"
                onClick={onSendMessageClick}
                fontSize="0.8rem"
                background="#EC8581"
                borderRadius="5px"
                disabled={!isWSConnected || isSending}
                fontWeight="500"
              >
                {isSending ? <Spinner /> : t('inbox', 'dialogWindow', 'send')}
              </Button>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default memo(DialogWindow);
