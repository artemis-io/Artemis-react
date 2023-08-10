import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Image,
  Radio,
  RadioGroup,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const router = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string>("");

  const handleRoleSelection = (value: string) => {
    setSelectedRole(value);
  };

  const handleConfirmation = () => {
    if (selectedRole === "doctor") {
      router(`../register/${selectedRole}`);
    } else if (selectedRole === "patient") {
      router(`../register/${selectedRole}`);
    }
  };

  const handleGoBack = () => {
    router("/signIn"); 
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      padding={4}
      mx={5}
      textAlign="center"
    >
      <Image src="/assets/images/logo.png" alt="logo" maxWidth="400px" />

      <VStack spacing={4} mt={4}>
        <Text fontWeight="bold" fontSize="lg" color="#494949">
          Escolha uma opção:
        </Text>
        <RadioGroup value={selectedRole} onChange={handleRoleSelection}>
          <VStack spacing={2} align="start">
            <Radio value="doctor" colorScheme="blue">
              Médico
            </Radio>
            <Radio value="patient" colorScheme="blue">
              Paciente
            </Radio>
          </VStack>
        </RadioGroup>
        <Button
          bg="#0078D7"
          onClick={handleConfirmation}
          color="#fafafa"
          isDisabled={!selectedRole}
          w={{ base: "100%", md: "300px" }}
          h="45px"
        >
          Continuar
        </Button>
        <Center mt={4}>
          <Button onClick={handleGoBack} variant="link" color="#747B7D">
            Voltar para login
          </Button>
        </Center>
      </VStack>
    </Box>
  );
};

export default SignUp;
