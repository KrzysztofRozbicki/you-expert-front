import React, { memo } from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import { DropzoneArea } from 'material-ui-dropzone';
import useTranslation from '../../hooks/useTranslation';
import FileItem from './fileItem';
import { WrapperStyled, FilesAreaStyled } from './style';
import { DragAndDropImageUploadProps } from './interfaces';
import { MAX_UPLOAD_FILE_SIZE } from '../createOffer/constants';

const DragAndDropImageUpload: React.FC<DragAndDropImageUploadProps> = (
  props
) => {
  const { files, onUploadImage, onDeleteImage, onSelectOfferImage } = props;
  const { t } = useTranslation();

  return (
    <Box w="100%" mb="30px">
      <WrapperStyled flexDirection={{ sm: 'column', md: 'row' }}>
        <Flex
          w={{ sm: '100%', md: files?.length ? '30%' : '100%' }}
          mr={{ md: files?.length ? '30px' : '0' }}
          mb={{ sm: files?.length ? '30px' : '0', md: '0' }}
        >
          <DropzoneArea
            key={new Date().getTime()}
            onChange={(files: File[]) => onUploadImage(files)}
            filesLimit={1000}
            showPreviews={false}
            showPreviewsInDropzone={false}
            acceptedFiles={[
              'audio/*',
              'video/*',
              'image/*',
              'application/*',
              'text/*'
            ]}
            maxFileSize={MAX_UPLOAD_FILE_SIZE}
            dropzoneText={t('orderDetails', 'dropZone', 'dropZoneText')}
            showAlerts={false}
          />
        </Flex>
        {!!files?.length && (
          <FilesAreaStyled>
            {files?.map((file, index) => (
              <FileItem
                key={index}
                fileData={file}
                handleDeleteFile={() => onDeleteImage(file?.id)}
                handleSelectOffer={() => onSelectOfferImage(file?.id)}
              />
            ))}
          </FilesAreaStyled>
        )}
      </WrapperStyled>
      <Text fontSize="0.6rem" color="general.red" mt="5px">
        {t('createOffer', 'general', 'imageRecommendation')}
      </Text>
    </Box>
  );
};

export default memo(DragAndDropImageUpload);
