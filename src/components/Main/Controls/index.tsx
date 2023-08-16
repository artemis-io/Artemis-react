import React, { useState } from "react";
import {
  HStack,
  IconButton,
  Tooltip,
  Flex,
  Button,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  VStack,
} from "@chakra-ui/react";
import { MdMic, MdMicOff, MdVideocam, MdVideocamOff } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { BsThreeDotsVertical, BsChatSquareQuote } from "react-icons/bs";
import MedicalRecord, { MedicalRecordContent } from "../MedicalRecord";

interface ControlsBarProps {
  handleLogout: () => void;
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
  toggleVideoEnabled: () => void;
  toggleAudioEnabled: () => void;
}

const ControlsBar = ({
  handleLogout,
  isAudioEnabled,
  isVideoEnabled,
  toggleAudioEnabled,
  toggleVideoEnabled,
}: ControlsBarProps) => {
  const [showMedicalRecord, setShowMedicalRecord] = useState(false); // Estado para controlar a visibilidade do prontuário

  const handleToggleMedicalRecord = () => {
    setShowMedicalRecord(!showMedicalRecord);
  };

  return (
    <Flex
      direction="column" // Alinhar os elementos verticalmente
      justify="flex-end" // Alinhar o conteúdo no final do container
      align="center" // Centralizar horizontalmente
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      width="100%"
      height="100%" // Ocupar a altura total da tela
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
              icon={<BsThreeDotsVertical />}
              variant="solid"
              w="fit-content"
              bg="#494949"
              colorScheme="white"
            />
          </PopoverTrigger>
          <PopoverContent
            w="fit-content"
            _focus={{ boxShadow: "none" }}
            bg="#494949"
            border="transparent"
          >
            <PopoverBody>
              <VStack>
                <Button
                  w="194px"
                  variant="ghost"
                  rightIcon={<BsChatSquareQuote />}
                  justifyContent="space-between"
                  fontWeight="bold"
                  fontSize="lg"
                  color="#fafafa"
                  onClick={handleToggleMedicalRecord} // Altera o estado para mostrar/ocultar o prontuário
                >
                  Chat
                </Button>

                {showMedicalRecord && ( // Renderiza o prontuário somente se showMedicalRecord for verdadeiro
                  <MedicalRecord>
                    <MedicalRecordContent />
                  </MedicalRecord>
                )}
              </VStack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </HStack>
    </Flex>
  );
};

export default ControlsBar;
