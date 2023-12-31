import React, { useEffect, useState } from "react";
import { Box, Flex, VStack, Text, Heading } from "@chakra-ui/react";
import { Room } from "twilio-video";
import Participant from "../Participant/index";
import RemoteParticipant from "../RemoteParticipant";

interface RoomProps {
  doctorId: string;
  patientId: string;
  roomName: string | undefined;
  username: string | undefined;
  room: Room;
  handleLogout: () => void;
}

const RoomVideo = ({
  room,
  handleLogout,
  doctorId,
  patientId,
  roomName,
}: RoomProps) => {
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
      doctorId={doctorId}
      patientId={patientId}
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
            roomName={roomName}
            doctorId={doctorId}
            patientId={patientId}
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
