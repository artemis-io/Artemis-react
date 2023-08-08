import { useEffect } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";

const ErrorModal = ({ error, onClose }: any) => {
  const { isOpen, onOpen, onClose: onCloseModal } = useDisclosure();

  useEffect(() => {
    if (error) {
      onOpen();
    }
  }, [error, onOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onCloseModal();
        onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Error</ModalHeader>
        <ModalBody>{error}</ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            onClick={() => {
              onCloseModal();
              onClose();
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ErrorModal;
