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
  Divider,
  Avatar,
} from "@chakra-ui/react";
import {
  FaCalendar,
  FaStethoscope,
  FaMapMarkerAlt,
  FaHistory,
  FaNotesMedical,
} from "react-icons/fa";
import { MedicalRecordDataDoctor } from "../../../shared/interface";
import ModalRecordPatient from "../../Main/ModalRecord/modalRecordPatient";

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
  history: MedicalRecordDataDoctor["history"];
  number: string;
}

const CardHistoryPatient: React.FC<CardProps> = ({
  id,
  type,
  query,
  patientName,
  patientAvatar,
  date,
  address,
  state,
  district,
  city,
  history,
  number,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
      _hover={{ boxShadow: "xl" }}
    >
      <Flex direction="column">
        <Badge colorScheme="blue" mb={2}>
          {type}
        </Badge>
        <Text fontSize="sm" color="gray.600">
          <FaCalendar /> {formattedDate}
        </Text>
        <Text fontSize="xl" fontWeight="semibold" mt={2}>
          <FaStethoscope /> {query}
        </Text>
        <Flex align="center" mt={2}>
          <Avatar size="sm" name={patientName} src={patientAvatar} />
          <Text fontSize="sm" ml={2}>
            {patientName}
          </Text>
        </Flex>

        <Divider my={4} />

        <Flex align="center">
          <FaMapMarkerAlt size={20} style={{ marginRight: "8px" }} />
          <Text fontSize="sm">
            {address}, {district}, {city}, {state}
          </Text>
        </Flex>

        <Divider my={4} />

        <Flex align="center">
          <FaHistory size={20} style={{ marginRight: "8px" }} />
          <Text fontSize="sm">History Number: {number}</Text>
        </Flex>

        <Divider my={4} />

        <Flex align="center">
          <FaNotesMedical size={20} style={{ marginRight: "8px" }} />
          <Text fontSize="sm">Medical History:</Text>
        </Flex>

        <Flex direction="column" mt={2}>
          {/* Tipagem explícita para o objeto history */}
          <Text>Altura: {history.altura}</Text>
          <Text>Anotações: {history.anotacoes}</Text>
          <Text>Frequência Cardíaca: {history.freqcardiaca}</Text>
          <Text>Glasgow: {history.glasgow}</Text>
        </Flex>
      </Flex>

      <Modal isOpen={isOpen} onClose={handleCloseModal} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{query}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ModalRecordPatient key={id} historyData={history} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CardHistoryPatient;
