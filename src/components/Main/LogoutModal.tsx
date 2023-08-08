import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { LogoutModalProps } from "../../shared/interface";

const LogoutModal: React.FC<LogoutModalProps> = ({
  isOpen,
  onClose,
  onLogout,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirmation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Are you sure you want to log out?</ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onLogout}>
            Logout
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LogoutModal;
