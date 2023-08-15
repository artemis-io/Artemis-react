import React, { useState } from "react";
import {
  HStack,
  IconButton,
  Tooltip,
  Flex,
  Box,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { MdMic, MdMicOff, MdVideocam, MdVideocamOff } from "react-icons/md";
import { FiMessageSquare, FiPhone } from "react-icons/fi";
import { BsThreeDotsVertical, BsChatSquareQuote } from "react-icons/bs";
import MedicalRecord, { MedicalRecordContent } from "../MedicalRecord";

interface ControlsBarProps {
  handleLogout: () => void;
  openMedicalRecord: () => void;
  isAudioEnabled: boolean;
  toggleVideoEnabled: () => void;
  toggleAudioEnabled: () => void;
  isVideoEnabled: boolean;
}

const ControlsBar = ({
  handleLogout,
  isAudioEnabled,
  isVideoEnabled,
  toggleAudioEnabled,
  toggleVideoEnabled,
  openMedicalRecord,
}: ControlsBarProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex
      justify="center"
      position="fixed"
      bottom="0"
      left="50%"
      transform="translateX(-50%)"
      width="100%"
      padding="12px 36px"
    >
      <HStack
        borderRadius="20px"
        bg="rgba(0, 0, 0, 0.5)"
        p="12px 36px"
        gap="24px"
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
        {/*    <IconButton
          aria-label=""
          icon={<FiMessageSquare />}
          bg="#494949"
          colorScheme="white"
        /> */}
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
                >
                  Chat
                </Button>
                {/*    <Button
                  w="194px"
                  variant="ghost"
                  rightIcon={<BsChatSquareQuote />}
                  justifyContent="space-between"
                  fontWeight="bold"
                  fontSize="lg"
                  color="#fafafa"
                  onClick={onOpen}
                >
               Teste
                </Button> */}

                <MedicalRecord
                  onClick={onOpen}
                  children={
                    <MedicalRecordContent closeMedicalRecord={onClose} />
                  }
                />
              </VStack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </HStack>
    </Flex>
  );
};

export default ControlsBar;
