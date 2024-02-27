import React, { memo, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Flex, Text, useToast } from '@chakra-ui/react';
import { toBase64 } from '../../../../utils';
import FileInput from './fileInput';
import VideoUrl from './videoUrl';
import StepLayout from '../stepLayout';
import useTranslation from '../../../../hooks/useTranslation';
import { StepProps } from '../interfaces';
import { initialState } from './interfaces';
import { imageItem, offerType } from '../../interfaces';
import { setCreateOfferStateAction } from '../../actions';
import DragAndDropImageUpload from '../../../dragAndDropImageUpload';
import { MAX_UPLOAD_FILE_SIZE } from '../../constants';
import { ALLOWED_FORMATS } from '../../../orderChat/constants';

const Step6: React.FC<StepProps> = (props) => {
  const { goNextStep, goPrevStep } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const toast = useToast();
  const offer = useSelector((state: any): offerType => state.createOffer.offer);
  const [state, setState] = useState<initialState>({
    images: offer.images,
    videos: offer.videos
  });

  const callToast = useCallback(
    (type: 'success' | 'error', titleName: string, descName?: string): void => {
      const options = {
        title: t('chat', 'toast', titleName),
        status: type,
        duration: 4000,
        isClosable: true
      } as any;

      if (descName) {
        options.description = t('chat', 'toast', descName);
      }

      toast(options);
    },
    [toast, t]
  );

  const handleSaveImages = useCallback(
    async (files: File[]): Promise<void> => {
      if (!files.length) {
        return;
      }

      const validFiles = [];
      for (let i = 0; i < files?.length; i++) {
        if (files[i].size > MAX_UPLOAD_FILE_SIZE) {
          callToast('error', 'fileSizeIsBiggerThenAllowed', 'smthWentWrong');
          continue;
        }

        validFiles.push(files[i]);
      }

      const newFiles: imageItem[] = [];
      for (let i = 0; i < validFiles.length; i++) {
        const fileBase64 = await toBase64(validFiles[i]).catch((e) => Error(e));
        if (fileBase64 instanceof Error) {
          continue;
        }

        const newFile: any = {
          id: new Date().getTime(),
          filename: validFiles[i].name,
          file: fileBase64
        };

        if (
          ALLOWED_FORMATS.some((format) =>
            newFile?.filename.includes(`.${format}`)
          ) &&
          !state.images.some((file) => file?.isOfferImage) &&
          !newFiles.some((file) => file?.isOfferImage)
        ) {
          newFile.isOfferImage = true;
        }

        newFiles.push(newFile);
      }

      const newImages = [...state.images, ...newFiles].sort((a, b) =>
        +!!a?.isOfferImage > +!!b?.isOfferImage ? -1 : 1
      );

      setState((prev) => ({
        ...prev,
        images: newImages
      }));
    },
    [callToast, state, setState]
  );

  const onSelectOfferImage = useCallback(
    (id: number) => {
      const newImages = state.images
        .map((file) =>
          id === file?.id
            ? { ...file, isOfferImage: true }
            : { ...file, isOfferImage: false }
        )
        .sort((a, b) => (+!!a?.isOfferImage > +!!b?.isOfferImage ? -1 : 1));

      setState((prev) => ({ ...prev, images: newImages }));
    },
    [state.images]
  );

  const handleSaveVideoUrl = useCallback(
    (videoUrl: string) => {
      if (!videoUrl) {
        return;
      }

      setState((prev) => ({
        ...prev,
        videos: [...prev.videos, { id: new Date().getTime(), videoUrl }]
      }));
    },
    [setState]
  );

  const handleDeleteFile = useCallback(
    (id: number, fileType: string): void => {
      if (fileType === 'images') {
        const file = state.images.find((file) => file.id === id);
        if (file?.isOfferImage) {
          const newData = state.images.filter((file) => file.id !== id);
          const findIndex = newData.findIndex((file) =>
            ALLOWED_FORMATS.some((format) =>
              file?.filename.includes(`.${format}`)
            )
          );

          if (findIndex === -1) {
            setState((prev) => ({
              ...prev,
              images: [...newData]
            }));
          } else {
            newData[findIndex].isOfferImage = true;
            const newImages = newData.sort((a, b) =>
              +!!a?.isOfferImage > +!!b?.isOfferImage ? -1 : 1
            );
            setState((prev) => ({
              ...prev,
              images: newImages
            }));
          }
          return;
        }
      }

      const newData = state[fileType].filter((file) => file.id !== id);
      setState((prev) => ({
        ...prev,
        [fileType]: [...newData]
      }));
    },
    [state, setState]
  );

  const handleClickBack = useCallback(() => {
    dispatch(
      setCreateOfferStateAction({
        ...offer,
        images: state.images,
        videos: state.videos
      })
    );
    goPrevStep();
  }, [state, dispatch, goPrevStep]);

  const handleClickNext = useCallback(() => {
    dispatch(
      setCreateOfferStateAction({
        ...offer,
        images: state.images,
        videos: state.videos
      })
    );
    goNextStep();
  }, [state, dispatch, goNextStep]);

  return (
    <StepLayout
      title={t('createOffer', 'step5', 'gallery')}
      handleClickSave={handleClickNext}
      handleClickCancel={handleClickBack}
    >
      {/* <FileInput
        files={state.images}
        title={t('createOffer', 'step5', 'addPhotos')}
        onSaveFiles={handleSaveImages}
        handleDeleteFile={(id: number) => handleDeleteFile(id, 'images')}
      /> */}
      <Box mb="20px">
        <Text fontSize="0.8rem" ml="23px" mb="10px">
          {t('createOffer', 'step5', 'addPhotos')}
        </Text>
        <DragAndDropImageUpload
          files={state.images}
          onUploadImage={handleSaveImages}
          onDeleteImage={(id: number) => handleDeleteFile(id, 'images')}
          onSelectOfferImage={(id: number) => onSelectOfferImage(id)}
        />
      </Box>
      <VideoUrl
        fileUrls={state.videos}
        title={t('createOffer', 'step5', 'addVideos')}
        onSaveVideo={handleSaveVideoUrl}
        handleDeleteFile={(id: number) => handleDeleteFile(id, 'videos')}
      />
    </StepLayout>
  );
};

export default memo(Step6);
