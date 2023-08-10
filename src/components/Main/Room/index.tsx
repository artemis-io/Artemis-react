import React, { useEffect, useState } from "react";
import { Box, Flex, VStack, Text } from "@chakra-ui/react";

import Participant from "../Participant/index";
import RemoteParticipant from "../../RemoteParticipant";

interface RoomProps {
  room: any;
  participant: any;
  handleLogout: () => void;
}

const RoomVideo = ({ room, handleLogout }: RoomProps) => {
  const [participants, setParticipants] = useState<any[]>([]);

  const participantConnected = (participant: any) => {
    setParticipants((prevParticipants) => [...prevParticipants, participant]);
  };

  const participantDisconnected = (participant: any) => {
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
    <RemoteParticipant
      key={participant.sid}
      participant={participant}
      handleLogout={handleLogout}
    />
  ));

  return (
    <Box
      bg="#202124"
      h="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <VStack spacing={4} align="center">
        <Text fontSize="lg" fontWeight="bold">
          Remote Participants
        </Text>

        {remoteParticipants}
      </VStack>

      <Flex
        position="fixed"
        bottom={4}
        right={4}
        borderRadius="md"
        boxShadow="md"
        align="flex-end"
      >
        {room && (
          <Participant
            key={room.localParticipant.sid}
            participant={room.localParticipant}
            handleLogout={handleLogout}
          />
        )}
      </Flex>
    </Box>
  );
};

export default RoomVideo;
