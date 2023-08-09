import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
  Box,
  Heading,
  VStack,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import { FiUser, FiVideo } from "react-icons/fi";

import { useCallback, useEffect, useState } from "react";
import { connect as ConnectVideo } from "twilio-video";
import { Container } from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth";
import { apiMed } from "../../services/api";
import Room from "../../components/Main/Room";
import Lobby from "../../components/Main/Lobby";
import { useParams } from "react-router-dom";
import StyledLabel from "../../components/Main/Forms/StyledLabel";

const VideoChat = () => {
  const { roomName } = useParams();

  const { user } = useAuth();
  console.log(user);
  const [room, setRoom] = useState(null);
  const [connecting, setConnecting] = useState(false);

  const handleSubmit = useCallback(
    async (event: any) => {
      event.preventDefault();
      setConnecting(true);

      try {
        const response = await apiMed.post("twilio/video/token", {
          identity: user?.id,
          room: roomName,
        });

        ConnectVideo(response.data.token, {
          networkQuality: true,
          name: roomName,
          preferredVideoCodecs: ["H264", "VP8"],
          // preferredVideoCodecs: ["H264"],
        })
          .then((room) => {
            setConnecting(false);
            setRoom(room);
          })
          .catch((err) => {
            console.error(err);
            setConnecting(false);
          });
      } catch (error) {
        console.error(error);
        setConnecting(false);
      }
    },
    [roomName, user]
  );

  const handleLogout = useCallback(() => {
    setRoom((prevRoom: any) => {
      if (prevRoom) {
        prevRoom.localParticipant.tracks.forEach((trackPub: any) => {
          trackPub.track.stop();
        });
        prevRoom.disconnect();
      }
      return null;
    });
  }, []);

  useEffect(() => {
    if (room) {
      const tidyUp = (event: any) => {
        if (event.persisted) {
          return;
        }
        if (room) {
          handleLogout();
        }
      };
      window.addEventListener("pagehide", tidyUp);
      window.addEventListener("beforeunload", tidyUp);
      return () => {
        window.removeEventListener("pagehide", tidyUp);
        window.removeEventListener("beforeunload", tidyUp);
      };
    }
  }, [room, handleLogout]);

const Lobby = ({ username, roomName, handleSubmit, connecting }: any) => {
  return (
    <Center h="100vh">
      <Box w="400px" p="6" bg="white" borderRadius="lg" boxShadow="lg">
        <VStack spacing={6}>
          <Heading as="h2" size="lg">
            Entrar na E-consulta
          </Heading>

          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <FormControl>
              <StyledLabel htmlFor="name">Nome:</StyledLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FiUser />
                </InputLeftElement>
                <Input
                  type="text"
                  id="name"
                  value={username}
                  readOnly={connecting}
                  required
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <StyledLabel mt={2} htmlFor="room">
                Sala:
              </StyledLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FiVideo />
                </InputLeftElement>
                <Input
                  type="text"
                  id="room"
                  value={roomName}
                  readOnly={connecting}
                  required
                />
              </InputGroup>
            </FormControl>

            <Button
              bg="#0078D7"
              type="submit"
              mt={4}
              colorScheme="blue"
              size="lg"
              width="full"
              isLoading={connecting}
              loadingText="Entrando"
              loadingRight={<Spinner size="sm" />}
            >
              {connecting ? "Entrando" : "Ir para consulta"}
            </Button>
            <Button
              bg="#0078D7"
              type="submit"
              mt={4}
              colorScheme="blue"
              size="lg"
              width="full"
            >
              Voltar
            </Button>
          </form>
        </VStack>
      </Box>
    </Center>
  );
};

export default Lobby;
