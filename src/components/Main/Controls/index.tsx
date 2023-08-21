import React, { useState } from "react";
import {
  HStack,
  IconButton,
  Tooltip,
  Flex,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Drawer,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";
import { MdMic, MdMicOff, MdVideocam, MdVideocamOff } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import MedicalRecord, { MedicalRecordContent } from "../MedicalRecord";
import { FaNotesMedical } from "react-icons/fa";

interface ControlsBarProps {
  handleLogout: () => void;
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
  toggleVideoEnabled: () => void;
  toggleAudioEnabled: () => void;
}

export interface PatientInfoData {
  patientName: string;
  birthDate: string;
  diagnosis: string;
  prescription: string;
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

const ControlsBar = ({
  handleLogout,
  isAudioEnabled,
  isVideoEnabled,
  toggleAudioEnabled,
  toggleVideoEnabled,
}: ControlsBarProps) => {

  const [showMedicalRecord, setShowMedicalRecord] = useState(false);
  const [medicalRecord, setMedicalRecord] = useState<PatientInfoData>({
    patientName: "",
    birthDate: "",
    diagnosis: "",
    prescription: "",
    queixaprincipal: "",
    historiadoenca: "",
    historiapatologica: "",
    alergias: "",
    peso: "",
    altura: "",
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

  const handleToggleMedicalRecord = () => {
    setShowMedicalRecord(!showMedicalRecord);
  };

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
        marginBottom="20px" //
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
                      medicalRecord={medicalRecord}
                      setMedicalRecord={setMedicalRecord}
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
