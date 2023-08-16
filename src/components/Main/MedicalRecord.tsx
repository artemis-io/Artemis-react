import React from "react";
import {
  Box,
  Button,
  CloseButton,
  Divider,
  Flex,
  Textarea,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

interface MedicalRecordProps {
  children: React.ReactNode;
}

export default function MedicalRecord({ children }: MedicalRecordProps) {
  return <Box>{children}</Box>;
}

export const MedicalRecordContent = () => {
  const { onClose } = useDisclosure();

  return (
    <Flex
      bg="rgba(0, 0, 0, 0.8)"
      pos="relative"
      top="0"
      left="0"
      right="0"
      bottom="0"
      alignItems="center"
      justifyContent="center"
      zIndex="999"
    >
      <Box
        bg="white"
        h="100vh" // Ocupa a altura total da tela
        w="100vw" // Ocupa a largura total da tela
        p="4"
        boxShadow="lg"
        borderRadius="md"
        overflowY="scroll" // Adicione scroll caso o conteúdo seja muito longo
      >
        <Flex h="20" alignItems="center" justifyContent="space-between">
          <Text fontSize="xl" fontWeight="bold">
            Prontuário Médico
          </Text>
          <CloseButton
            display={{ base: "flex", md: "none" }}
            onClick={onClose}
          />
        </Flex>

        <Divider my="4" />

        {/* Informações do paciente */}
        <Text fontSize="md" fontWeight="semibold">
          Informações do Paciente
        </Text>
        <Input placeholder="Nome completo" mt="2" />
        <Input placeholder="Data de Nascimento" mt="2" />
        <Textarea placeholder="Diagnóstico" mt="2" />

        <Divider my="4" />

        {/* Tratamento */}
        <Text fontSize="md" fontWeight="semibold">
          Tratamento
        </Text>
        <Textarea placeholder="Prescrição Médica" mt="2" />

        <Divider my="4" />

        <Button colorScheme="blue" onClick={onClose}>
          Salvar
        </Button>
      </Box>
    </Flex>
  );
};
