import React, { memo, useMemo } from 'react';
import { Image, Flex, Text } from '@chakra-ui/react';
import useTranslation from '../../../hooks/useTranslation';
import TooltipController from '../../common/TooltipController';
import {
  TextStyled,
  WrapperStyled,
  IconWrapperStyled,
  CloseWrapperStyled
} from './style';
import { FileItemProps } from '../interfaces';
import { ALLOWED_FORMATS } from '../../orderChat/constants';
import FileIcon from '../../common/icons/fileIcon';
import CheckboxController from '../../common/checkboxController';

const FileItem: React.FC<FileItemProps> = (props) => {
  const { fileData, handleDeleteFile, handleSelectOffer } = props;
  const { t } = useTranslation();

  const isImage = useMemo(
    (): boolean =>
      ALLOWED_FORMATS.some((format) =>
        fileData?.filename.includes(`.${format}`)
      ),
    [fileData]
  );

  return (
    <WrapperStyled>
      <CloseWrapperStyled onClick={handleDeleteFile}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="53.7"
          height="53.7"
          viewBox="0 0 53.7 53.7"
        >
          <path
            opacity=".6"
            fill="%23666E6E"
            d="M35.6 34.4L28 26.8l7.6-7.6c.2-.2.2-.5 0-.7l-.5-.5c-.2-.2-.5-.2-.7 0l-7.6 7.6-7.5-7.6c-.2-.2-.5-.2-.7 0l-.6.6c-.2.2-.2.5 0 .7l7.6 7.6-7.6 7.5c-.2.2-.2.5 0 .7l.5.5c.2.2.5.2.7 0l7.6-7.6 7.6 7.6c.2.2.5.2.7 0l.5-.5c.2-.2.2-.5 0-.7z"
          />
        </svg>
      </CloseWrapperStyled>
      {isImage && (
        <Flex position="absolute" top="10px" left="10px">
          <CheckboxController
            isChecked={!!fileData?.isOfferImage}
            onChange={handleSelectOffer}
            checkboxStyle="span { width: 27px; height: 27px; }"
          />
        </Flex>
      )}
      <Flex
        flex={1}
        borderRadius="5px"
        overflow="hidden"
        alignItems="center"
        justifyContent="center"
      >
        {!!fileData?.isOfferImage ? (
          <TooltipController
            text={t('createOffer', 'general', 'offerImage')}
            placement="bottom"
          >
            <Image
              src={fileData?.file || fileData?.imageUrl}
              width="100%"
              height="100%"
              objectFit="cover"
            />
          </TooltipController>
        ) : (
          <>
            {isImage ? (
              <Image
                src={fileData?.file || fileData?.imageUrl}
                width="100%"
                height="100%"
                objectFit="cover"
              />
            ) : (
              <FileIcon />
            )}
          </>
        )}
      </Flex>
      <Flex
        w="100%"
        h="20px"
        alignItems="center"
        justifyContent="center"
        p="0 10px"
        overflow="hidden"
      >
        <TooltipController text={fileData?.filename} placement="bottom">
          <Text
            fontSize="0.6rem"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            cursor="default"
          >
            {fileData?.filename}
          </Text>
        </TooltipController>
      </Flex>
    </WrapperStyled>
  );
};

export default memo(FileItem);
