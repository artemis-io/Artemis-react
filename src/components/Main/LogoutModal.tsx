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
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Desconectar</ModalHeader>
        <ModalCloseButton />
        <ModalBody fontWeight='bold' color='#747B7D'>Deseja sair da sua conta?</ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onLogout}>
            Desconectar
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LogoutModal;
