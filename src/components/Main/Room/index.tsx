import React, { useEffect, useState } from "react";
import { Box, Flex, VStack, Text, useDisclosure } from "@chakra-ui/react";
import { Room } from "twilio-video";
import Participant from "../Participant/index";
import RemoteParticipant from "../RemoteParticipant";
import MedicalRecord from "../MedicalRecord";

interface RoomProps {
  roomName: string | undefined;
  username: string | undefined;
  room: Room;
  handleLogout: () => void;
}

const RoomVideo = ({ room, handleLogout }: RoomProps) => {
  const [participants, setParticipants] = useState<any[]>([]);
  const [openMedRecord, setOpenMedRecord] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
    <RemoteParticipant key={participant.sid} participant={participant} />
  ));

  const openMedicalRecord = () => {
    console.log("clicou");
    onOpen();
  };

  const closeMedicalRecord = () => {
    console.log("clicou em fechar");
    onClose();
  };
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
            onOpen={onOpen}
            key={room.localParticipant.sid}
            participant={room.localParticipant}
            handleLogout={handleLogout}
            openMedicalRecord={openMedicalRecord}
          />
        )}
      </Flex>
    </Box>
  );
};

export default RoomVideo;
