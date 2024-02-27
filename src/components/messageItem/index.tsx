import React, { memo, useMemo, useCallback, useState } from 'react';
import { Flex, Avatar, Text, useToast, Spinner } from '@chakra-ui/react';
import { saveAs } from 'file-saver';
import useTranslation from '../../hooks/useTranslation';
// import FileIcon from './fileIcon';
import DonwloadIcon from './donwloadIcon';
import { WrapperStyled, MessageWrapperStyled } from './style';
import { IMessage, IFileItem } from '../orderChat/interfaces';
import { getFullDate } from '../../utils';
import FileItem from './fileItem';

interface MessageItemProps {
  isMe?: boolean;
  messageData: IMessage;
}

const MessageItem: React.FC<MessageItemProps> = (props) => {
  const { isMe, messageData } = props;
  const toast = useToast();
  const { t } = useTranslation();
  const [isAllFilesDownloading, setIsAllFilesDownloading] =
    useState<boolean>(false);

  const getFileName = useCallback(
    (fileItem: IFileItem): string => {
      if (fileItem) {
        let index = fileItem.name.lastIndexOf('/');
        if (index === -1) {
          return fileItem.name;
        }

        return fileItem.name.slice(index + 1);
      }

      return '';
    },
    [messageData]
  );

  const getFileSize = useCallback(
    (fileItem: IFileItem): string => {
      if (fileItem) {
        const totalBytes = +fileItem?.size;
        if (totalBytes < 1000000) {
          return Math.floor(totalBytes / 1000) + 'KB';
        }

        return Math.floor(totalBytes / 1000000) + 'MB';
      }

      return '';
    },
    [messageData]
  );

  const downloadAllFiles = useCallback(async (): Promise<void> => {
    if (!messageData?.files?.length) {
      return;
    }

    try {
      setIsAllFilesDownloading(true);
      for (let i = 0; i < messageData?.files?.length; i++) {
        await saveAs(
          messageData?.files[i]?.url,
          getFileName(messageData?.files[i])
        );
      }
    } catch {
      toast({
        title: t('chat', 'toast', 'cantDownloadFile'),
        description: t('chat', 'toast', 'smthWentWrong'),
        status: 'error',
        duration: 4000,
        isClosable: true
      });
    } finally {
      setIsAllFilesDownloading(false);
    }
  }, [getFileName, t, isAllFilesDownloading]);

  const textMessage = useMemo((): string => {
    try {
      return messageData?.text
        ?.replace(/(<([^>]+)>)/gi, '')
        ?.replace(/\\n/g, '<br />');
    } catch {
      return '';
    }
  }, [messageData]);

  return (
    <WrapperStyled isMe={isMe}>
      <MessageWrapperStyled
        isMe={isMe}
        p={{ sm: '15px', md: '30px' }}
        w={{ sm: '90%', md: '80%' }}
      >
        <Flex mb="20px">
          <Avatar mr="20px" src={''} />
          <Flex direction="column">
            <Text fontSize="0.8rem">{messageData?.senderUsername}</Text>
            <Text fontWeight="600" fontSize="0.8rem">
              {messageData?.senderTitle}
            </Text>
          </Flex>
        </Flex>
        <Flex direction="column">
          {!!messageData?.files?.length ? (
            <Flex flexDirection="column">
              {messageData?.files?.length > 1 && (
                <Text
                  fontSize="0.6rem"
                  mb="10px"
                  cursor="pointer"
                  _hover={{ textDecoration: 'underline' }}
                  onClick={downloadAllFiles}
                >
                  {t('chat', 'general', 'downloadAll')}
                </Text>
              )}
              <Flex flexWrap="wrap">
                {messageData?.files?.map((item: IFileItem, index: number) => (
                  <FileItem
                    key={index}
                    file={item?.url}
                    fileName={getFileName(item)}
                    fileSize={getFileSize(item)}
                    isAllFilesDownloading={isAllFilesDownloading}
                  />
                ))}
              </Flex>
            </Flex>
          ) : (
            <Text
              mb="10px"
              fontSize="0.8rem"
              dangerouslySetInnerHTML={{ __html: textMessage }}
            />
          )}
          <Text fontSize="0.6rem" color="general.smallText">
            {getFullDate(messageData?.created)}
          </Text>
        </Flex>
      </MessageWrapperStyled>
    </WrapperStyled>
  );
};

export default memo(MessageItem);
