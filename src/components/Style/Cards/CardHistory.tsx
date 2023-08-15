import React, { useState } from "react";
import {
  Badge,
  Box,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import ModalRecord from "../../Main/ModalRecord";
import { MedicalRecordData } from "../../../pages/Doctor/medicalRecord";

interface CardProps {
  id: string;
  type: string;
  query: string;
  patientName: string;
  patientAvatar: string;
  date: string;
  address: string;
  state: string;
  district: string;
  city: string;
  history: MedicalRecordData["history"];
  number: string;
}

const CardHistory: React.FC<CardProps> = ({
  id,
  type,
  query,
  patientName,
  patientAvatar,
  date,
  history,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      m={2}
      boxShadow="lg"
      bg="white"
      cursor="pointer"
      onClick={handleOpenModal}
    >
      <Flex justify="space-between" align="center">
        <Badge colorScheme="blue" p={2}>
          {type}
        </Badge>
        <Text fontSize="sm" color="gray.600">
          {date}
        </Text>
      </Flex>
      <Text fontSize="xl" fontWeight="semibold" mb={2}>
        {query}
      </Text>
      <Flex align="center" mt={2}>
        <img
          src={patientAvatar}
          alt={patientName}
          width="30"
          height="30"
          style={{ borderRadius: "50%", marginRight: "8px" }}
        />
        <Text fontSize="sm">{patientName}</Text>
      </Flex>

      <Modal isOpen={isOpen} onClose={handleCloseModal} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{query}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ModalRecord key={id} historyData={history} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CardHistory;
