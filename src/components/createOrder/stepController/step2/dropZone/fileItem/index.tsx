import React, { memo } from 'react';
import { Tooltip, Text } from '@chakra-ui/react';
import FileIcon from './fileIcon';
import {
  TextStyled,
  WrapperStyled,
  IconWrapperStyled,
  CloseWrapperStyled
} from './style';

interface FileItemProps {
  fileData: { id: string; file: File };
  handleDeleteFile: (id: string) => void;
}

const LabelComponent: React.FC<{ text: string }> = ({ text }) => (
  <Text fontSize="11px" m="0" lineHeight="16.5px" color="inherit">
    {text}
  </Text>
);

const FileItem: React.FC<FileItemProps> = (props) => {
  const { fileData, handleDeleteFile } = props;

  return (
    <WrapperStyled>
      <CloseWrapperStyled onClick={() => handleDeleteFile(fileData.id)}>
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
      <IconWrapperStyled>
        <FileIcon />
      </IconWrapperStyled>
      <Tooltip
        label={<LabelComponent text={fileData.file?.name} />}
        placement="bottom"
      >
        <TextStyled>{fileData.file?.name}</TextStyled>
      </Tooltip>
    </WrapperStyled>
  );
};

export default memo(FileItem);
