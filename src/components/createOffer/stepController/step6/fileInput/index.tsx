import React, { memo, useState, useCallback } from 'react';
import { DropzoneDialog } from 'material-ui-dropzone';
import { imageItem } from '../../../interfaces';
import {
  TextStyled,
  FlexStyled,
  IconWrapperStyled,
  FilesWrapperStyled,
  FileItemWrapperStyled,
  FileItemTitleStyled,
  FileItemIconStyled,
  BoxStyled
} from './style';

interface FileInputProps {
  files: imageItem[];
  title: string;
  onSaveFiles: (files: File[]) => void;
  handleDeleteFile: (id: number) => void;
  wrapperStyle?: any;
  inputStyle?: any;
}

const FileInput: React.FC<FileInputProps> = (props) => {
  const {
    title,
    onSaveFiles,
    files,
    handleDeleteFile,
    wrapperStyle,
    inputStyle
  } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSave = useCallback(
    async (files: File[]) => {
      if (!files.length) {
        return;
      }

      await onSaveFiles(files);
      setIsOpen(false);
    },
    [onSaveFiles]
  );

  return (
    <>
      <DropzoneDialog
        open={isOpen}
        onSave={(files) => handleSave(files)}
        acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
        showPreviews={true}
        maxFileSize={5000000}
        onClose={() => setIsOpen(false)}
        filesLimit={3}
      />
      <BoxStyled style={wrapperStyle}>
        <TextStyled>{title}</TextStyled>
        <FlexStyled style={inputStyle}>
          <FilesWrapperStyled>
            {files.map((file, index) => (
              <FileItemWrapperStyled key={index}>
                <FileItemTitleStyled>{file?.filename}</FileItemTitleStyled>
                <FileItemIconStyled onClick={() => handleDeleteFile(file.id)}>
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
                </FileItemIconStyled>
              </FileItemWrapperStyled>
            ))}
          </FilesWrapperStyled>
          <IconWrapperStyled onClick={() => setIsOpen(true)}>
            <svg
              width="8"
              height="15"
              viewBox="0 0 8 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.30713 1.95837L6.62481 7.50004L1.30713 13.0417"
                stroke="#020055"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </IconWrapperStyled>
        </FlexStyled>
      </BoxStyled>
    </>
  );
};

export default memo(FileInput);
