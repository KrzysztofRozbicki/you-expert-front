import React, { memo, useState, useCallback } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import uniqid from 'uniqid';
import useTranslation from '../../../../../hooks/useTranslation';
import FileItem from './fileItem';
import { WrapperStyled, DropAreaStyled, FilesAreaStyled } from './style';

interface DropZoneProps {}

const DropZone: React.FC<DropZoneProps> = (props) => {
  const [files, setFiles] = useState<{ id: string; file: File }[]>([]);
  const { t } = useTranslation();

  const handleUploadFile = useCallback(
    (file: File): void => {
      if (file) {
        setFiles((prev) => [...prev, { id: uniqid(), file }]);
      }
    },
    [setFiles]
  );

  const handleDeleteFile = useCallback(
    (id: string): void => {
      setFiles((prev) => prev.filter((file) => file.id !== id));
    },
    [setFiles]
  );

  return (
    <WrapperStyled>
      <DropAreaStyled>
        <DropzoneArea
          onChange={(files: File[]) =>
            handleUploadFile(files[files.length - 1])
          }
          inputProps={{ multiple: false }}
          filesLimit={100}
          showPreviews={false}
          showPreviewsInDropzone={false}
          acceptedFiles={['image/jpeg', 'image/png', 'application/pdf']}
          dropzoneText={t('createOrder', 'step3', 'dropZone')}
        />
      </DropAreaStyled>
      <FilesAreaStyled>
        {files.map((fileData, index) => (
          <FileItem
            key={index}
            fileData={fileData}
            handleDeleteFile={handleDeleteFile}
          />
        ))}
      </FilesAreaStyled>
    </WrapperStyled>
  );
};

export default memo(DropZone);
