import React, { useEffect, useState } from "react";
import {
  HStack,
  IconButton,
  Tooltip,
  Flex,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { MdMic, MdMicOff, MdVideocam, MdVideocamOff } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import MedicalRecord, { MedicalRecordContent } from "../MedicalRecord";
import { FaNotesMedical } from "react-icons/fa";
import { apiMed } from "../../../services/api";
import { Patient } from "../../../shared/interface";
import { AUTH_TOKEN_STORAGE } from "../../../shared/storage/config";


interface ControlsBarProps {
  handleLogout: () => void;
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
  toggleVideoEnabled: () => void;
  toggleAudioEnabled: () => void;
  patientId: string;
  roomName: string | undefined;
}

// export interface PatientInfoData {
//   diagnosis: string;
//   queixaprincipal: string;
//   historiadoenca: string;
//   historiapatologica: string;
//   alergias: string;
//   peso: string;
//   altura: string;
//   imc: string;
//   freqcardiaca: string;
//   freqrespiratoria: string;
//   pressaoarterial: string;
//   tax: string;
//   glasgow: string;
//   tiposanguineo: string;
//   medicamentos: string;
//   anotacoes: string;
// }

const ControlsBar = ({
  handleLogout,
  isAudioEnabled,
  isVideoEnabled,
  toggleAudioEnabled,
  toggleVideoEnabled,
  patientId,
  roomName,
}: ControlsBarProps) => {
  const [showMedicalRecord, setShowMedicalRecord] = useState(false);
  const [patient, setPatient] = useState<Patient | null>(null);
  // const [medicalRecord, setMedicalRecord] = useState<PatientInfoData>({
  //   diagnosis: "",
  //   queixaprincipal: "",
  //   historiadoenca: "",
  //   historiapatologica: "",
  //   alergias: "",
  //   altura: "",
  //   peso: "",
  //   imc: "",
  //   freqcardiaca: "",
  //   freqrespiratoria: "",
  //   pressaoarterial: "",
  //   tax: "",
  //   glasgow: "",
  //   tiposanguineo: "",
  //   medicamentos: "",
  //   anotacoes: "",
  // });
  const [history, setHistory] = useState(null);

  const handleToggleMedicalRecord = () => {
    setShowMedicalRecord(!showMedicalRecord);
  };

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await apiMed.get(`user/patient/${patientId}`);
        setPatient(response.data.user);
        console.log(response.data.user);
      } catch (error) {
        console.error("Erro ao obter os dados do paciente", error);
      }
    };

    fetchPatient();
  }, [patientId]);


  return (
    <Flex
      direction="column"
      justify="flex-end"
      align="center"
      position="fixed"
      bottom="0"
      left="1"
      right="1"
      width="100%"
      height="100%"
    >
      <HStack
        borderRadius="20px"
        bg="rgba(0, 0, 0, 0.5)"
        p="12px 36px"
        gap="24px"
        marginBottom="20px"
      >
        <IconButton
          aria-label=""
          icon={<FiPhone />}
          bg="#EF4037"
          colorScheme="white"
          onClick={handleLogout}
        />
        <Tooltip label={""}>
          {isAudioEnabled ? (
            <IconButton
              aria-label=""
              icon={<MdMic />}
              bg="#494949"
              colorScheme="white"
              onClick={toggleAudioEnabled}
            />
          ) : (
            <IconButton
              aria-label=""
              icon={<MdMicOff />}
              bg="#EF4037"
              colorScheme="white"
              onClick={toggleAudioEnabled}
            />
          )}
        </Tooltip>
        <Tooltip label={""}>
          {isVideoEnabled ? (
            <IconButton
              aria-label=""
              icon={<MdVideocam />}
              bg="#494949"
              colorScheme="white"
              onClick={toggleVideoEnabled}
            />
          ) : (
            <IconButton
              aria-label=""
              icon={<MdVideocamOff />}
              bg="#EF4037"
              colorScheme="white"
              onClick={toggleVideoEnabled}
            />
          )}
        </Tooltip>
        <Popover placement="top" isLazy>
          <PopoverTrigger>
            <IconButton
              aria-label="More server options"
              icon={<FaNotesMedical />}
              variant="solid"
              w="fit-content"
              bg="#494949"
              colorScheme="white"
              onClick={handleToggleMedicalRecord}
            />
          </PopoverTrigger>
          <PopoverContent css={{ all: "unset" }}>
            {showMedicalRecord && (
              <MedicalRecord>
                <MedicalRecordContent
                  roomName={roomName}
                  patient={patient}
                  patientId={patientId}
                  // medicalRecord={medicalRecord}
                  // setMedicalRecord={setMedicalRecord}
                />
              </MedicalRecord>
            )}
          </PopoverContent>
        </Popover>
      </HStack>
    </Flex>
  );
};

export default ControlsBar;
