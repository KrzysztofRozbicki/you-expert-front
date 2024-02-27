import React, { memo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react';
import { setModalDataAction } from './action';
import {
  modalInitialState,
  TextConfirmProps,
  ChatFileUploadWindowProps,
  AcceptTermsProps
} from './interfaces';
import TextConfirm from './textConfirm';
import ChatFileUploadWindow from './chatFileUploadWindow';
import AcceptTerms from './acceptTerms';

const ModalController: React.FC = () => {
  const dispatch = useDispatch();
  const { modalName, modalProps } = useSelector(
    (state: any): modalInitialState => state.modal
  );

  const handleClose = useCallback(() => {
    dispatch(setModalDataAction({ modalName: '', modalProps: null }));
  }, [dispatch]);

  return (
    <>
      <Modal size="lg" isOpen={!!modalName} onClose={handleClose}>
        <ModalOverlay bg="rgba(20, 20, 42, 0.9)" />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody p="0">
            {modalName === 'textConfirm' && (
              <TextConfirm
                {...(modalProps as TextConfirmProps)}
                onClose={handleClose}
              />
            )}
            {modalName === 'chatFileUploadWindow' && (
              <ChatFileUploadWindow
                {...(modalProps as ChatFileUploadWindowProps)}
                onClose={handleClose}
              />
            )}
            {modalName === 'acceptTerms' && (
              <AcceptTerms
                {...(modalProps as AcceptTermsProps)}
                onClose={handleClose}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default memo(ModalController);
