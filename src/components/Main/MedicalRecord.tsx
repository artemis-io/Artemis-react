import React from "react";
import {
  Box,
  Button,
  CloseButton,
  Divider,
  Flex,
  Input,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { PatientInfoData } from "./Controls";


interface MedicalRecordProps {
  children: React.ReactNode;
}

export default function MedicalRecord({ children }: MedicalRecordProps) {
  return <Box>{children}</Box>;
}

interface MedicalRecordContentProps {
  medicalRecord: PatientInfoData;
  setMedicalRecord: React.Dispatch<React.SetStateAction<PatientInfoData>>;
}

export const MedicalRecordContent = ({
  setMedicalRecord,
  medicalRecord,
}: MedicalRecordContentProps) => {
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
        h="100vh"
        w="100vw"
        p="4"
        boxShadow="lg"
        borderRadius="md"
        overflowY="scroll"
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

        <Text fontSize="md" fontWeight="semibold">
          Informações do Paciente
        </Text>
        <Input
          placeholder="Nome completo"
          mt="2"
          value={medicalRecord.patientName}
          onChange={(event) =>
            setMedicalRecord((prevMedicalRecord: PatientInfoData) => ({
              ...prevMedicalRecord,
              patientName: event.target.value,
            }))
          }
        />

        <Input
          placeholder="Data de Nascimento"
          mt="2"
          defaultValue={medicalRecord.birthDate}
          onChange={(event) =>
            setMedicalRecord((prevMedicalRecord: PatientInfoData) => ({
              ...prevMedicalRecord,
              birthDate: event.target.value,
            }))
          }
        />

        <Divider my="4" />

        <Text fontSize="md" fontWeight="semibold">
          Tratamento
        </Text>

        <Textarea
          placeholder="Diagnóstico"
          mt="2"
          value={medicalRecord.diagnosis}
          onChange={(event) =>
            setMedicalRecord((prevMedicalRecord: PatientInfoData) => ({
              ...prevMedicalRecord,
              diagnosis: event.target.value,
            }))
          }
        />

        <Textarea
          placeholder="Prescrição Médica"
          mt="2"
          value={medicalRecord.prescription}
          onChange={(event) =>
            setMedicalRecord((prevMedicalRecord: PatientInfoData) => ({
              ...prevMedicalRecord,
              prescription: event.target.value,
            }))
          }
        />

        <Input
          placeholder="Queixa Principal"
          mt="2"
          value={medicalRecord.queixaprincipal}
          onChange={(event) =>
            setMedicalRecord((prevMedicalRecord:PatientInfoData) => ({
              ...prevMedicalRecord,
              queixaprincipal: event.target.value,
            }))
          }
        />

        <Input
          placeholder="Histórico da Doença"
          mt="2"
          value={medicalRecord.historiadoenca}
          onChange={(event) =>
            setMedicalRecord((prevMedicalRecord: PatientInfoData) => ({
              ...prevMedicalRecord,
              historiadoenca: event.target.value,
            }))
          }
        />

        <Input
          placeholder="Histórico Patológico"
          mt="2"
          value={medicalRecord.historiapatologica}
          onChange={(event) =>
            setMedicalRecord((prevMedicalRecord: PatientInfoData) => ({
              ...prevMedicalRecord,
              historiapatologica: event.target.value,
            }))
          }
        />

        <Input
          placeholder="Alergias"
          mt="2"
          value={medicalRecord.alergias}
          onChange={(event) =>
            setMedicalRecord((prevMedicalRecord: PatientInfoData) => ({
              ...prevMedicalRecord,
              alergias: event.target.value,
            }))
          }
        />

        <Input
          placeholder="Peso"
          mt="2"
          value={medicalRecord.peso}
          onChange={(event) =>
            setMedicalRecord((prevMedicalRecord: PatientInfoData) => ({
              ...prevMedicalRecord,
              peso: event.target.value,
            }))
          }
        />

        <Input
          placeholder="Altura"
          mt="2"
          value={medicalRecord.altura}
          onChange={(event) =>
            setMedicalRecord((prevMedicalRecord: PatientInfoData) => ({
              ...prevMedicalRecord,
              altura: event.target.value,
            }))
          }
        />

        <Input
          placeholder="IMC"
          mt="2"
          value={medicalRecord.imc}
          onChange={(event) =>
            setMedicalRecord((prevMedicalRecord: PatientInfoData) => ({
              ...prevMedicalRecord,
              imc: event.target.value,
            }))
          }
        />

        <Input
          placeholder="Frequência Cardíaca"
          mt="2"
          value={medicalRecord.freqcardiaca}
          onChange={(event) =>
            setMedicalRecord((prevMedicalRecord: PatientInfoData) => ({
              ...prevMedicalRecord,
              freqcardiaca: event.target.value,
            }))
          }
        />

        <Input
          placeholder="Frequência Respiratória"
          mt="2"
          value={medicalRecord.freqrespiratoria}
          onChange={(event) =>
            setMedicalRecord((prevMedicalRecord: PatientInfoData) => ({
              ...prevMedicalRecord,
              freqrespiratoria: event.target.value,
            }))
          }
        />

        <Input
          placeholder="Pressão Arterial"
          mt="2"
          value={medicalRecord.pressaoarterial}
          onChange={(event) =>
            setMedicalRecord((prevMedicalRecord: PatientInfoData) => ({
              ...prevMedicalRecord,
              pressaoarterial: event.target.value,
            }))
          }
        />

        <Input
          placeholder="Tax"
          mt="2"
          value={medicalRecord.tax}
          onChange={(event) =>
            setMedicalRecord((prevMedicalRecord: PatientInfoData) => ({
              ...prevMedicalRecord,
              tax: event.target.value,
            }))
          }
        />

        <Input
          placeholder="Escala de Glasgow"
          mt="2"
          value={medicalRecord.glasgow}
          onChange={(event) =>
            setMedicalRecord((prevMedicalRecord: PatientInfoData) => ({
              ...prevMedicalRecord,
              glasgow: event.target.value,
            }))
          }
        />

        <Input
          placeholder="Tipo Sanguíneo"
          mt="2"
          value={medicalRecord.tiposanguineo}
          onChange={(event) =>
            setMedicalRecord((prevMedicalRecord: PatientInfoData) => ({
              ...prevMedicalRecord,
              tiposanguineo: event.target.value,
            }))
          }
        />

        <Input
          placeholder="Medicamentos"
          mt="2"
          value={medicalRecord.medicamentos}
          onChange={(event) =>
            setMedicalRecord((prevMedicalRecord: PatientInfoData) => ({
              ...prevMedicalRecord,
              medicamentos: event.target.value,
            }))
          }
        />

        <Input
          placeholder="Anotações"
          mt="2"
          value={medicalRecord.anotacoes}
          onChange={(event) =>
            setMedicalRecord((prevMedicalRecord: PatientInfoData) => ({
              ...prevMedicalRecord,
              anotacoes: event.target.value,
            }))
          }
        />

        <Divider my="4" />
        <Button colorScheme="blue" onClick={onClose}>
          Salvar
        </Button>
      </Box>
    </Flex>
  );
};
