import React from "react";
import {
  FormControl,
  Input,
  Button,
  Center,
  Box,
  Heading,
  VStack,
  InputGroup,
  InputLeftElement,
  Spinner,
} from "@chakra-ui/react";
import { FiUser, FiVideo } from "react-icons/fi";
import StyledLabel from "../Forms/StyledLabel";

import { useNavigate } from "react-router-dom";

const Lobby = ({ username, roomName, handleSubmit, connecting, role }) => {
  const router = useNavigate();
  const handleNav = () => {
    router(`../../${role}/homepage`);
  };

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
              onClick={handleNav}
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
