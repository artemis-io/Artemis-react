import React from "react";
import {
  FormControl,
  Input,
  Box,
  Heading,
  VStack,
  InputGroup,
  InputLeftElement,
  Image,
  FormLabel,
} from "@chakra-ui/react";
import { FaUser, FaVideo } from "react-icons/fa";
import PrimaryButton from "../../Style/Buttons/Primarybutton";

const Lobby = ({ username, roomName, handleSubmit, connecting }: any) => {
  return (
    <Box h="100vh">
      <VStack spacing={6}>
        <Image src="/assets/images/logo.png" alt="logo" maxWidth="300px" />
        <Box w="400px" p="6" bg="white" borderRadius="lg" boxShadow="lg">
          <Heading as="h2" size="lg">
            Join a Video Chat
          </Heading>

          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <FormControl>
              <FormLabel htmlFor="name">Paciente:</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaUser />
                </InputLeftElement>
                <Input
                  type="text"
                  id="name"
                  value={username}
                  readOnly={connecting}
                  placeholder="Enter your name"
                  required
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel mt={2} htmlFor="room">
                Sala:
              </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaVideo />
                </InputLeftElement>
                <Input
                  type="text"
                  id="room"
                  value={roomName}
                  readOnly={connecting}
                  placeholder="Enter room name"
                  required
                />
              </InputGroup>
            </FormControl>

            <PrimaryButton
              type="submit"
              mt={4}
              height="50px"
              width="full"
              isLoading={connecting}
              loadingText="Entrando"
            >
              {connecting ? "Entrando" : "Ir para consulta"}
            </PrimaryButton>
          </form>
        </Box>
      </VStack>
    </Box>
  );
};

export default Lobby;
