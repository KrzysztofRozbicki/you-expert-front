import React, { memo, useState, useCallback } from 'react';
import { Box } from '@chakra-ui/react';
import ModalBody from './modalBody';
import useTranslation from '../../../../../hooks/useTranslation';
import { ModalController } from '../../../../common/modal';
import { videoItem } from '../../../interfaces';
import {
  TextStyled,
  FlexStyled,
  IconWrapperStyled,
  FilesWrapperStyled,
  FileItemWrapperStyled,
  FileItemTitleStyled,
  FileItemIconStyled
} from './style';

interface VideoUrlProps {
  fileUrls: videoItem[];
  title: string;
  onSaveVideo: (videoUrl: string) => void;
  handleDeleteFile: (id: number) => void;
}

const VideoUrl: React.FC<VideoUrlProps> = (props) => {
  const { title, onSaveVideo, fileUrls, handleDeleteFile } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { t } = useTranslation();

  const handleSaveVideo = useCallback((videoUrl: string) => {
    onSaveVideo(videoUrl);
    setIsOpen(false);
  }, []);

  return (
    <>
      <ModalController isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalBody
          title={t('createOffer', 'step5', 'typeVideoUrl')}
          buttonLabel={t('createOffer', 'step5', 'add')}
          handleAddVideo={handleSaveVideo}
        />
      </ModalController>
      <Box>
        <TextStyled>{title}</TextStyled>
        <FlexStyled>
          <FilesWrapperStyled>
            {fileUrls.map((file, index) => (
              <FileItemWrapperStyled key={index}>
                <FileItemTitleStyled>{file?.videoUrl}</FileItemTitleStyled>
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
      </Box>
    </>
  );
};

export default memo(VideoUrl);
