import React from "react";
import { HStack, IconButton, Tooltip, Flex } from "@chakra-ui/react";
import { MdMic, MdMicOff, MdVideocam, MdVideocamOff } from "react-icons/md";
import { FiMessageSquare, FiPhone } from "react-icons/fi";

const ControlsBar = ({
  handleLogout,
  isAudioEnabled,
  isVideoEnabled,
  toggleAudioEnabled,
  toggleVideoEnabled,
}: any) => {
  return (
    <Flex
      justify="center"
      position="fixed"
      bottom="0"
      left="50%"
      transform="translateX(-50%)"
      width="100%"
      bgColor="rgba(0, 0, 0, 0.5)"
      padding="12px 36px"
      borderRadius="20px"
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
          bg="red"
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
              bg="red"
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
              bg="red"
              colorScheme="white"
              onClick={toggleVideoEnabled}
            />
          )}
        </Tooltip>
        <IconButton
          aria-label=""
          icon={<FiMessageSquare />}
          bg="#494949"
          colorScheme="white"
        />
      </HStack>
    </Flex>
  );
};

export default ControlsBar;
