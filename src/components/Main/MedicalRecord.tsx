import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Center,
  CloseButton,
  Divider,
  Flex,
  FormControl,
  HStack,
  Input,
  Stack,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";

import StyledLabel from "./Forms/StyledLabel";
import { apiMed } from "../../services/api";
import { Patient } from "../../shared/interface";
import { AUTH_TOKEN_STORAGE } from "../../shared/storage/config";

interface MedicalRecordProps {
  children: React.ReactNode;
}

export default function MedicalRecord({ children }: MedicalRecordProps) {
  return <Box>{children}</Box>;
}

export interface PatientInfoData {
  diagnosis: string;
  queixaprincipal: string;
  historiadoenca: string;
  historiapatologica: string;
  alergias: string;
  peso: string;
  altura: string;
  imc: string;
  freqcardiaca: string;
  freqrespiratoria: string;
  pressaoarterial: string;
  tax: string;
  glasgow: string;
  tiposanguineo: string;
  medicamentos: string;
  anotacoes: string;
}

interface MedicalRecordContentProps {
  // medicalRecord: PatientInfoData;
  // setMedicalRecord: React.Dispatch<React.SetStateAction<PatientInfoData>>;
  patientId: string;
  patient: Patient | null;
  roomName: string | undefined;
}

export const MedicalRecordContent = ({
  patient,
  roomName,
}: // setMedicalRecord,
// medicalRecord,
MedicalRecordContentProps) => {
  const [history, setHistory] = useState(null);
  const [isFetchSuccessful, setIsFetchSuccessful] = useState(false);
  const [medRecUpdate, setmedRecUpdate] = useState(false);
  const [medicalRecord, setMedicalRecord] = useState<PatientInfoData>({
    diagnosis: "",
    queixaprincipal: "",
    historiadoenca: "",
    historiapatologica: "",
    alergias: "",
    altura: "",
    peso: "",
    imc: "",
    freqcardiaca: "",
    freqrespiratoria: "",
    pressaoarterial: "",
    tax: "",
    glasgow: "",
    tiposanguineo: "",
    medicamentos: "",
    anotacoes: "",
  });
  const toast = useToast();

  /*  const age = useMemo(
    () => differenceInYears(new Date(), new Date(patient?.profile.dateOfBirth)),
    [patient?.profile.dateOfBirth]
  );
 */

  useEffect(() => {
    const fetchMedicalHistoryData = async () => {
      const item = localStorage.getItem(AUTH_TOKEN_STORAGE);
      try {
        const response = await apiMed.get(
          `/appointment/findHistoryById/${roomName}`,
          {
            headers: {
              Authorization: `Bearer ${item}`,
            },
          }
        );
        if (!response.data) {
          console.log("Prontuário não localizado");
          setIsFetchSuccessful(false);
        } else {
          setHistory(response.data);
          setMedicalRecord(response.data);
          setIsFetchSuccessful(true);
          console.log("Dados do prontuário:", response.data);
        }
      } catch (error) {
        console.error("Erro ao obter prontuário", error);
      }
    };
    fetchMedicalHistoryData();
  }, [roomName, setMedicalRecord, medRecUpdate]);

  const handleSubmit = async () => {
    const item = localStorage.getItem(AUTH_TOKEN_STORAGE);
    console.log("Dados enviados:", medicalRecord);
    const requestData = {
      diagnosis: medicalRecord.diagnosis,
      queixaprincipal: medicalRecord.queixaprincipal,
      historiadoenca: medicalRecord.historiadoenca,
      historiapatologica: medicalRecord.historiapatologica,
      alergias: medicalRecord.alergias,
      peso: medicalRecord.peso,
      altura: medicalRecord.altura,
      imc: medicalRecord.imc,
      freqcardiaca: medicalRecord.freqcardiaca,
      freqrespiratoria: medicalRecord.freqrespiratoria,
      pressaoarterial: medicalRecord.pressaoarterial,
      tax: medicalRecord.tax,
      glasgow: medicalRecord.glasgow,
      tiposanguineo: medicalRecord.tiposanguineo,
      medicamentos: medicalRecord.medicamentos,
      anotacoes: medicalRecord.anotacoes,
    };

    if (isFetchSuccessful) {
      try {
        const response = await apiMed.put(
          `/appointment/update-infoPatient/${roomName}`,
          requestData,
          {
            headers: {
              Authorization: `Bearer ${item}`,
            },
          }
        );

        if (response.data) {
          console.log("Prontuário atualizado:", response.data);
          toast({
            description: "Dados atualizados com sucesso!",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setMedicalRecord(response.data);
          setmedRecUpdate(true);
        }
      } catch (error) {
        console.error("Erro ao atualizar prontuário", error);
      }
    } else {
      try {
        const response = await apiMed.post(
          `/appointment/create-infoPatient/${roomName}`,
          requestData,
          {
            headers: {
              Authorization: `Bearer ${item}`,
            },
          }
        );

        if (response.data) {
          console.log("Informações do paciente registradas:", response.data);
          toast({
            description: "Prontuário registrado com sucesso!",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setMedicalRecord(response.data);
        }
      } catch (error) {
        console.error("Erro ao registrar prontuário:", error);
      }
    }
  };

  return (
    <Box
      pos="relative"
      top="0"
      left="0"
      right="0"
      bottom="0"
      zIndex="999"
      transition="opacity 0.8s ease-in-out"
      boxShadow="12px"
      borderRadius="20px"
      borderWidth="sm"
    >
      <Box bg="white" h="90vh" w={["100vw", "40vw"]} p="4" overflowY="scroll">
        {/*   <Flex h="20" alignItems="center" justifyContent="center" mt={20}>
          <CloseButton display={{ base: "flex", md: "none" }} />
        </Flex> */}
        <Center>
          <Stack spacing={4} w={"full"} maxW={"md"} p={1} mt={8}>
            <VStack>
              <StyledLabel fontSize="md" fontWeight="semibold">
                Prontuário Eletrônico
              </StyledLabel>
              <StyledLabel fontSize="md" fontWeight="semibold">
                {patient?.name}
              </StyledLabel>
            </VStack>

            <Text>{patient?.profile.dateOfBirth}</Text>
            {/*    <Text>{age}</Text> */}
            <HStack>
              <FormControl>
                <StyledLabel fontSize="sm">Tipo sanguíneo</StyledLabel>
                <Input
                  defaultValue={medicalRecord.tiposanguineo}
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
              <StyledLabel fontSize="sm">Diagnóstico</StyledLabel>
              <Textarea
                defaultValue={medicalRecord.diagnosis}
                onChange={(event) =>
                  setMedicalRecord((prevMedicalRecord: PatientInfoData) => ({
                    ...prevMedicalRecord,
                    diagnosis: event.target.value,
                  }))
                }
              />
            </FormControl>

            <FormControl>
              <StyledLabel fontSize="sm">Alergias</StyledLabel>
              <Textarea
                defaultValue={medicalRecord.alergias}
                onChange={(event) =>
                  setMedicalRecord((prevMedicalRecord: PatientInfoData) => ({
                    ...prevMedicalRecord,
                    alergias: event.target.value,
                  }))
                }
              />
            </FormControl>

            <FormControl>
              <StyledLabel fontSize="sm">Medicamentos</StyledLabel>
              <Textarea
                defaultValue={medicalRecord.medicamentos}
                onChange={(event) =>
                  setMedicalRecord((prevMedicalRecord: PatientInfoData) => ({
                    ...prevMedicalRecord,
                    medicamentos: event.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl>
              <StyledLabel fontSize="sm">Anotações</StyledLabel>
              <Textarea
                defaultValue={medicalRecord.anotacoes}
                onChange={(event) =>
                  setMedicalRecord((prevMedicalRecord: PatientInfoData) => ({
                    ...prevMedicalRecord,
                    anotacoes: event.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl>
              <StyledLabel fontSize="sm">Queixa principal</StyledLabel>
              <Textarea
                defaultValue={medicalRecord.queixaprincipal}
                onChange={(event) =>
                  setMedicalRecord((prevMedicalRecord: PatientInfoData) => ({
                    ...prevMedicalRecord,
                    queixaprincipal: event.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl>
              <StyledLabel fontSize="sm">Histórico da Doença</StyledLabel>
              <Textarea
                defaultValue={medicalRecord.historiadoenca}
                onChange={(event) =>
                  setMedicalRecord((prevMedicalRecord: PatientInfoData) => ({
                    ...prevMedicalRecord,
                    historiadoenca: event.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl>
              <StyledLabel fontSize="sm">Histórico Patológica</StyledLabel>
              <Textarea
                defaultValue={medicalRecord.historiapatologica}
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
                <StyledLabel fontSize="sm">Altura</StyledLabel>
                <Input
                  defaultValue={medicalRecord.altura}
                  onChange={(event) =>
                    setMedicalRecord((prevMedicalRecord: PatientInfoData) => ({
                      ...prevMedicalRecord,
                      altura: event.target.value,
                    }))
                  }
                />
              </FormControl>
              <FormControl>
                <StyledLabel fontSize="sm">Peso</StyledLabel>
                <Input
                  defaultValue={medicalRecord.peso}
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
                <StyledLabel fontSize="sm">IMC</StyledLabel>
                <Input
                  defaultValue={medicalRecord.imc}
                  onChange={(event) =>
                    setMedicalRecord((prevMedicalRecord: PatientInfoData) => ({
                      ...prevMedicalRecord,
                      imc: event.target.value,
                    }))
                  }
                />
              </FormControl>
              <FormControl>
                <StyledLabel fontSize="sm">Freq. Cardíaca</StyledLabel>
                <Input
                  defaultValue={medicalRecord.freqcardiaca}
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
                  <StyledLabel fontSize="sm">Freq. Respiratória</StyledLabel>
                  <Input
                    defaultValue={medicalRecord.freqrespiratoria}
                    onChange={(event) =>
                      setMedicalRecord(
                        (prevMedicalRecord: PatientInfoData) => ({
                          ...prevMedicalRecord,
                          freqrespiratoria: event.target.value,
                        })
                      )
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
                  <StyledLabel fontSize="sm">Glasgow</StyledLabel>
                  <Input
                    defaultValue={medicalRecord.glasgow}
                    onChange={(event) =>
                      setMedicalRecord(
                        (prevMedicalRecord: PatientInfoData) => ({
                          ...prevMedicalRecord,
                          glasgow: event.target.value,
                        })
                      )
                    }
                  />
                </FormControl>
              </HStack>
            </Box>
            <Box>
              <HStack>
                <FormControl>
                  <StyledLabel fontSize="sm">TAX</StyledLabel>
                  <Input
                    defaultValue={medicalRecord.tax}
                    onChange={(event) =>
                      setMedicalRecord(
                        (prevMedicalRecord: PatientInfoData) => ({
                          ...prevMedicalRecord,
                          tax: event.target.value,
                        })
                      )
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
                  <StyledLabel fontSize="sm">Pressão Arterial</StyledLabel>
                  <Input
                    defaultValue={medicalRecord.pressaoarterial}
                    onChange={(event) =>
                      setMedicalRecord(
                        (prevMedicalRecord: PatientInfoData) => ({
                          ...prevMedicalRecord,
                          pressaoarterial: event.target.value,
                        })
                      )
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
            <Divider my="4" />
            <Button bg="#0078D7" color="#fafafa" onClick={handleSubmit}>
              Salvar
            </Button>
          </Stack>
        </Center>
      </Box>
    </Box>
  );
};
