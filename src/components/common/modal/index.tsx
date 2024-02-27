import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button
} from '@chakra-ui/react';

interface ModalControllerProps {
  isOpen: boolean;
  onOpen?: () => void;
  onClose: () => void;
  children?: React.ReactNode;
}

export const ModalController: React.FC<ModalControllerProps> = (props) => {
  const { isOpen, onClose, children } = props;
  
  return (
    <>
      <Modal size="lg" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="rgba(20, 20, 42, 0.9)" />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody p="0">{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
