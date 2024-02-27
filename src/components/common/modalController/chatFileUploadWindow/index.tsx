import React, { memo, useCallback, useState, useMemo, useEffect } from 'react';
import { Flex, Text, Spinner, useToast } from '@chakra-ui/react';
import FileIcon from './fileIcon';
import { ButtonController } from '../../ButtonController';
import useTranslation from '../../../../hooks/useTranslation';
import { ChatFileUploadWindowProps } from '../interfaces';
import { toBase64 } from '../../../../utils';

interface ChatFileUploadWindowComponentProps extends ChatFileUploadWindowProps {
  onClose: () => void;
}

const ChatFileUploadWindow: React.FC<ChatFileUploadWindowComponentProps> = (
  props
) => {
  const [filesBase64, setFilesBase64] = useState<any[]>([]);
  const { files, onUpload, onClose } = props;
  const { t } = useTranslation();
  const toast = useToast();

  const getFileSize = useCallback((fileItem: File): string => {
    if (fileItem) {
      const totalBytes = fileItem?.size;
      if (totalBytes < 1000000) {
        return Math.floor(totalBytes / 1000) + 'KB';
      }

      return Math.floor(totalBytes / 1000000) + 'MB';
    }
    return '';
  }, []);

  const handleUploadClick = useCallback(() => {
    if (onUpload) {
      const filesData = filesBase64.map((file) => ({
        file: file?.base64,
        filename: file?.name
      }));
      onUpload(filesData);
    }
    onClose();
  }, [onUpload, onClose, filesBase64]);

  const readFileData = useCallback(async () => {
    try {
      const newFiles = [];
      for (let i = 0; i < files?.length; i++) {
        const base64 = await toBase64(files[i]).catch((e) => Error(e));
        if (base64 instanceof Error) {
          toast({
            title: t('modals', 'chatFileUploadWindow', 'cantReadFile'),
            status: 'error',
            duration: 4000,
            isClosable: true
          });
          continue;
        }
        newFiles.push({ name: files[i]?.name, size: files[i]?.size, base64 });
      }

      setFilesBase64(newFiles);
    } catch {
      onClose();
    }
  }, [files, onClose, toast, t]);

  useEffect(() => {
    readFileData();
  }, []);

  return (
    <Flex p="40px" direction="column">
      {!!filesBase64?.length ? (
        <>
          <Flex flexDirection="column">
            {filesBase64?.map((item, index) => (
              <Flex mb="20px" key={index}>
                <Flex mr="20px">
                  <FileIcon />
                </Flex>
                <Flex direction="column" flex={1} overflow="hidden">
                  <Text
                    fontWeight="500"
                    fontSize="1rem"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                    w="100%"
                    overflow="hidden"
                  >
                    {item?.name}
                  </Text>
                  <Text>{getFileSize(item)}</Text>
                </Flex>
              </Flex>
            ))}
          </Flex>
          <Flex justifyContent="flex-end">
            <ButtonController
              variant="darkPurpul"
              onClick={handleUploadClick}
              customStyle={{ fontSize: '0.8rem', minHeight: '27px' }}
            >
              {t('modals', 'chatFileUploadWindow', 'upload')}
            </ButtonController>
          </Flex>
        </>
      ) : (
        <Flex alignItems="center">
          <Spinner />
        </Flex>
      )}
    </Flex>
  );
};

export default memo(ChatFileUploadWindow);
