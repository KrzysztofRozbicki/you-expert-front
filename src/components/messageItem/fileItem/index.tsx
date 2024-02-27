import React, { memo, useCallback, useState } from 'react';
import { Flex, Image, Text, Spinner, useToast } from '@chakra-ui/react';
import { saveAs } from 'file-saver';
import useTranslation from '../../../hooks/useTranslation';
import TooltipController from '../../common/TooltipController';
import DonwloadIcon from '../donwloadIcon';
import FileIcon from '../../common/icons/fileIcon';
import { ALLOWED_FORMATS } from '../../inbox/constants';

interface FileItemProps {
  file: string;
  fileName: string;
  fileSize: string;
  isAllFilesDownloading?: boolean;
}

const FileItem: React.FC<FileItemProps> = (props) => {
  const { file, fileName, fileSize, isAllFilesDownloading } = props;
  const { t } = useTranslation();
  const toast = useToast();
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const downloadFile = useCallback(async (): Promise<void> => {
    if (!file || !fileName || isDownloading || isAllFilesDownloading) {
      return;
    }

    try {
      setIsDownloading(true);
      await saveAs(file, fileName);
    } catch {
      toast({
        title: t('chat', 'toast', 'cantDownloadFile'),
        description: t('chat', 'toast', 'smthWentWrong'),
        status: 'error',
        duration: 4000,
        isClosable: true
      });
    } finally {
      setIsDownloading(false);
    }
  }, [file, fileName, t, isDownloading, isAllFilesDownloading]);

  return (
    <Flex w="150px" h="150px" mr="10px" mb="10px" flexDirection="column">
      <Flex
        flex={1}
        borderRadius="5px"
        overflow="hidden"
        alignItems="center"
        justifyContent="center"
      >
        {!!file && (
          <a
            href={file}
            target="_blank"
            style={{
              flex: 1,
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}
          >
            {ALLOWED_FORMATS.some((format) =>
              fileName.includes(`.${format}`)
            ) ? (
              <Image src={file} width="100%" height="100%" objectFit="cover" />
            ) : (
              <FileIcon />
            )}
          </a>
        )}
      </Flex>
      <Flex h="20px" w="100%" alignItems="center">
        <Flex
          mr="10px"
          cursor="pointer"
          alignItems="center"
          justifyContent="center"
          onClick={downloadFile}
        >
          {isDownloading ? <Spinner /> : <DonwloadIcon />}
        </Flex>
        <TooltipController text={fileName} placement="bottom">
          <a href={file} target="_blank" style={{ overflow: 'hidden' }}>
            <Text
              fontSize="0.5rem"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              mr="10px"
            >
              {fileName}
            </Text>
          </a>
        </TooltipController>
        <Text fontSize="0.5rem" cursor="default">
          ({fileSize})
        </Text>
      </Flex>
    </Flex>
  );
};

export default memo(FileItem);
