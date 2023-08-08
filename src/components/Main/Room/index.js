import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  VStack,
  Text,
} from "@chakra-ui/react";

import Participant from "../Participant/index";

const Room = ({ room, handleLogout }) => {
  const [participants, setParticipants] = useState([]);

  const participantConnected = (participant) => {
    setParticipants((prevParticipants) => [...prevParticipants, participant]);
  };

  const participantDisconnected = (participant) => {
    setParticipants((prevParticipants) =>
      prevParticipants.filter((p) => p !== participant)
    );
  };

  useEffect(() => {
    room.on("participantConnected", participantConnected);
    room.on("participantDisconnected", participantDisconnected);
    room.participants.forEach(participantConnected);
    return () => {
      room.off("participantConnected", participantConnected);
      room.off("participantDisconnected", participantDisconnected);
    };
  }, [room]);

  const remoteParticipants = participants.map((participant) => (
    <Participant key={participant.sid} participant={participant} />
  ));

  return (
    <Box bg="#202124" h="100vh">
      <Flex direction="column" alignItems="center" p={6}>
        <Flex justify="space-between" w="100%">
          <VStack spacing={4} align="center">
            <Text fontSize="lg" fontWeight="bold">
              Remote Participants
            </Text>
            {remoteParticipants}
          </VStack>
        </Flex>
        <Flex
          position="fixed"
          bottom={4}
          right={4}
          borderRadius="md"
          boxShadow="md"
          align="flex-end"
        >
          <Box borderRadius="md" p={4} mb={4}>
            {room && (
              <Participant
                key={room.localParticipant.sid}
                participant={room.localParticipant}
                handleLogout={handleLogout}
              />
            )}
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Room;
