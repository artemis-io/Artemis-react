import React from "react";
import {
  Box,
  Button,
  CloseButton,
  Divider,
  Flex,
  FormControl,
  HStack,
  Input,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { PatientInfoData } from "./Controls";
import StyledLabel from "./Forms/StyledLabel";

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
  const { isOpen, onClose } = useDisclosure();

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
      transition="opacity 0.5s ease-in-out"
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
        <Stack spacing={4} w={"full"} maxW={"md"} p={1}>
          <Text fontSize="md" fontWeight="semibold" color="#747B7D">
            Informações do Paciente
          </Text>
          <FormControl>
            <StyledLabel>Nome</StyledLabel>
            <Input
              value={medicalRecord.patientName}
              onChange={(event) =>
                setMedicalRecord((prevMedicalRecord: PatientInfoData) => ({
                  ...prevMedicalRecord,
                  patientName: event.target.value,
                }))
              }
            />
          </FormControl>

          <HStack>
            <FormControl>
              <StyledLabel>Data de Nascimento</StyledLabel>
              <Input
                type="date"
                defaultValue={medicalRecord.birthDate}
                onChange={(event) =>
                  setMedicalRecord((prevMedicalRecord: PatientInfoData) => ({
                    ...prevMedicalRecord,
                    birthDate: event.target.value,
                  }))
                }
              />
            </FormControl>

            <FormControl>
              <StyledLabel>Tipo sanguíneo</StyledLabel>
              <Input
                value={medicalRecord.tiposanguineo}
                onChange={(event) =>
                  setMedicalRecord((prevMedicalRecord: PatientInfoData) => ({
                    ...prevMedicalRecord,
                    tiposanguineo: event.target.value,
                  }))
                }
              />
            </FormControl>
          </HStack>

          <Divider my="4" />

          <Text fontSize="md" fontWeight="semibold" color="#747B7D">
            Tratamento
          </Text>
          <FormControl>
            <StyledLabel>Diagnóstico</StyledLabel>
            <Textarea
              value={medicalRecord.diagnosis}
              onChange={(event) =>
                setMedicalRecord((prevMedicalRecord: PatientInfoData) => ({
                  ...prevMedicalRecord,
                  diagnosis: event.target.value,
                }))
              }
            />
          </FormControl>
          <FormControl>
            <StyledLabel>Prescrição Médica</StyledLabel>
            <Textarea
              value={medicalRecord.prescription}
              onChange={(event) =>
                setMedicalRecord((prevMedicalRecord: PatientInfoData) => ({
                  ...prevMedicalRecord,
                  prescription: event.target.value,
                }))
              }
            />
          </FormControl>
          <FormControl>
            <StyledLabel>Alergias</StyledLabel>
            <Textarea
              value={medicalRecord.alergias}
              onChange={(event) =>
                setMedicalRecord((prevMedicalRecord: PatientInfoData) => ({
                  ...prevMedicalRecord,
                  alergias: event.target.value,
                }))
              }
            />
          </FormControl>

          <FormControl>
            <StyledLabel>Medicamentos</StyledLabel>
            <Textarea
              value={medicalRecord.medicamentos}
              onChange={(event) =>
                setMedicalRecord((prevMedicalRecord: PatientInfoData) => ({
                  ...prevMedicalRecord,
                  medicamentos: event.target.value,
                }))
              }
            />
          </FormControl>
          <FormControl>
            <StyledLabel>Anotações</StyledLabel>
            <Textarea
              value={medicalRecord.anotacoes}
              onChange={(event) =>
                setMedicalRecord((prevMedicalRecord: PatientInfoData) => ({
                  ...prevMedicalRecord,
                  anotacoes: event.target.value,
                }))
              }
            />
          </FormControl>
          <FormControl>
            <StyledLabel>Queixa principal</StyledLabel>
            <Textarea
              value={medicalRecord.queixaprincipal}
              onChange={(event) =>
                setMedicalRecord((prevMedicalRecord: PatientInfoData) => ({
                  ...prevMedicalRecord,
                  queixaprincipal: event.target.value,
                }))
              }
            />
          </FormControl>
          <FormControl>
            <StyledLabel>Histórico da Doença</StyledLabel>
            <Textarea
              value={medicalRecord.historiadoenca}
              onChange={(event) =>
                setMedicalRecord((prevMedicalRecord: PatientInfoData) => ({
                  ...prevMedicalRecord,
                  historiadoenca: event.target.value,
                }))
              }
            />
          </FormControl>
          <FormControl>
            <StyledLabel>Histórico Patológica</StyledLabel>
            <Textarea
              value={medicalRecord.historiapatologica}
              onChange={(event) =>
                setMedicalRecord((prevMedicalRecord: PatientInfoData) => ({
                  ...prevMedicalRecord,
                  historiapatologica: event.target.value,
                }))
              }
            />
          </FormControl>

          <Divider my="4" />

          <Text fontSize="md" fontWeight="semibold" color="#747B7D">
            Dados Vitais
          </Text>
          <HStack>
            <FormControl>
              <StyledLabel>Altura</StyledLabel>
              <Input
                value={medicalRecord.altura}
                onChange={(event) =>
                  setMedicalRecord((prevMedicalRecord: PatientInfoData) => ({
                    ...prevMedicalRecord,
                    altura: event.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl>
              <StyledLabel>Peso</StyledLabel>
              <Input
                value={medicalRecord.peso}
                onChange={(event) =>
                  setMedicalRecord((prevMedicalRecord: PatientInfoData) => ({
                    ...prevMedicalRecord,
                    peso: event.target.value,
                  }))
                }
                style={{ paddingRight: "40px" }}
              />
              <Text
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "70%",
                  transform: "translateY(-50%)",
                  fontSize: "12px",
                  color: "#666",
                }}
              >
                kg
              </Text>
            </FormControl>
          </HStack>

          <HStack>
            <FormControl>
              <StyledLabel>IMC</StyledLabel>
              <Input
                value={medicalRecord.imc}
                onChange={(event) =>
                  setMedicalRecord((prevMedicalRecord: PatientInfoData) => ({
                    ...prevMedicalRecord,
                    imc: event.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl>
              <StyledLabel fontSize="sm">Frequência Cardíaca</StyledLabel>
              <Input
                value={medicalRecord.freqcardiaca}
                onChange={(event) =>
                  setMedicalRecord((prevMedicalRecord: PatientInfoData) => ({
                    ...prevMedicalRecord,
                    freqcardiaca: event.target.value,
                  }))
                }
                style={{ paddingRight: "40px" }}
              />
              <Text
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "70%",
                  transform: "translateY(-50%)",
                  fontSize: "12px",
                  color: "#666",
                }}
              >
                bpm
              </Text>
            </FormControl>
          </HStack>

          <Box>
            <HStack>
              <FormControl>
                <StyledLabel fontSize="sm">Frequência Respiratória</StyledLabel>
                <Input
                  value={medicalRecord.freqrespiratoria}
                  onChange={(event) =>
                    setMedicalRecord((prevMedicalRecord: PatientInfoData) => ({
                      ...prevMedicalRecord,
                      freqrespiratoria: event.target.value,
                    }))
                  }
                  style={{ paddingRight: "40px" }}
                />
                <Text
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "70%",
                    transform: "translateY(-50%)",
                    fontSize: "12px",
                    color: "#666",
                  }}
                >
                  mrm
                </Text>
              </FormControl>
              <FormControl>
                <StyledLabel fontSize="sm">Pressão Arterial</StyledLabel>
                <Input
                  value={medicalRecord.pressaoarterial}
                  onChange={(event) =>
                    setMedicalRecord((prevMedicalRecord: PatientInfoData) => ({
                      ...prevMedicalRecord,
                      pressaoarterial: event.target.value,
                    }))
                  }
                  style={{ paddingRight: "40px" }}
                />
                <Text
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "70%",
                    transform: "translateY(-50%)",
                    fontSize: "12px",
                    color: "#666",
                  }}
                >
                  mmHg
                </Text>
              </FormControl>
            </HStack>
          </Box>
          <Box>
            <HStack>
              <FormControl>
                <StyledLabel fontSize="sm">TAX</StyledLabel>
                <Input
                  value={medicalRecord.tax}
                  onChange={(event) =>
                    setMedicalRecord((prevMedicalRecord: PatientInfoData) => ({
                      ...prevMedicalRecord,
                      tax: event.target.value,
                    }))
                  }
                  style={{ paddingRight: "40px" }}
                />
                <Text
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "70%",
                    transform: "translateY(-50%)",
                    fontSize: "12px",
                    color: "#666",
                  }}
                >
                  °C
                </Text>
              </FormControl>
              <FormControl>
                <StyledLabel fontSize="sm">Glasgow</StyledLabel>
                <Input
                  value={medicalRecord.glasgow}
                  onChange={(event) =>
                    setMedicalRecord((prevMedicalRecord: PatientInfoData) => ({
                      ...prevMedicalRecord,
                      glasgow: event.target.value,
                    }))
                  }
                />
              </FormControl>
            </HStack>
          </Box>
          <Divider my="4" />
          <Button colorScheme="blue" onClick={onClose}>
            Salvar
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
};
