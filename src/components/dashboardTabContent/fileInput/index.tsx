import React, { memo, useState, useCallback, useRef } from 'react';
import { Avatar, Flex, useToast } from '@chakra-ui/react';
import useTranslation from '../../../hooks/useTranslation';
import { TextStyled, BoxStyled } from './style';
import { MAX_UPLOAD_FILE_SIZE } from './constants';

interface FileInputProps {
  file: string;
  title: string;
  onSaveFiles: (file: File) => void;
  handleDeleteFile: (id: number) => void;
  imgAlt?: string;
}

const FileInput: React.FC<FileInputProps> = (props) => {
  const { title, onSaveFiles, file, imgAlt, handleDeleteFile } = props;
  const { t } = useTranslation();
  const toast = useToast();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSave = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const {
        target: { files }
      } = e;

      if (files.length) {
        const file = files[0];
        if (file.size > MAX_UPLOAD_FILE_SIZE) {
          toast({
            title: t('dashboard', 'toasts', 'smthWentWrong'),
            description: t('dashboard', 'toasts', 'fileSizeIsTooBig'),
            status: 'error',
            duration: 4000,
            isClosable: true
          });
          return;
        }

        if (
          file.type !== 'image/png' &&
          file.type !== 'image/jpg' &&
          file.type !== 'image/jpeg'
        ) {
          toast({
            title: t('dashboard', 'toasts', 'smthWentWrong'),
            description: t('dashboard', 'toasts', 'notAllowedFormat'),
            status: 'error',
            duration: 4000,
            isClosable: true
          });
          return;
        }

        await onSaveFiles(file);
      }
    },
    [onSaveFiles, toast, t]
  );

  const handleOpenFileUploadingWindow = useCallback(() => {
    try {
      inputRef.current.click();
    } catch (e) {
      console.error(e);
    }
  }, [inputRef]);

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg, image/png"
        onChange={handleSave}
        style={{ display: 'none' }}
      />
      <BoxStyled>
        {/* <TextStyled>{title}</TextStyled> */}
        <Flex position="relative">
          <Avatar
            size="2xl"
            borderRadius="100%"
            src={file}
            name={imgAlt}
            onClick={handleOpenFileUploadingWindow}
            cursor="pointer"
          />
          <Flex
            top="0"
            right="-30px"
            position="absolute"
            cursor="pointer"
            onClick={handleOpenFileUploadingWindow}
          >
            <svg
              width="23"
              height="23"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.2537 1.00805C13.1756 1.00805 13.078 1.04707 13.0195 1.12512L1.11707 13.0276C1.03902 13.1056 1 13.2032 1 13.3007V16.6178C1 16.8324 1.17561 17.0081 1.39024 17.0081H4.70732C4.80488 17.0081 4.90244 16.969 4.98049 16.891L16.8829 4.98853C17.039 4.83244 17.039 4.59829 16.8829 4.44219L13.5659 1.12512C13.4878 1.02756 13.3707 0.98854 13.2537 1.00805ZM13.2927 1.94464L16.0634 4.71537L14.0732 6.6861L11.3024 3.91536L13.2927 1.94464ZM10.7561 4.48122L13.5268 7.25196L4.55122 16.2276H1.78049V13.4568L10.7561 4.48122Z"
                fill="#020055"
                stroke="#020055"
                strokeWidth="0.5"
              />
            </svg>
          </Flex>
        </Flex>
      </BoxStyled>
    </>
  );
};

export default memo(FileInput);
