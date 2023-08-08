import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import { apiMed } from "../../../services/api";
import { useNavigate } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const router = useNavigate();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await apiMed.post("/security-token/forgot-password", { email });
      setSuccessMessage("Verifique sua caixa de entrada ou spam.")
      console.log('Email:', email)
    } catch (error) {
      console.error(error);
      setErrorMessage("Ocorreu um erro ao enviar o e-mail de recuperação de senha.");
    }
  };
  
  const handleGoBack = (route: any) => {
    router(route);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
      padding={4}
      mx={5}
      mt={8}
    >
      <Image src="/assets/images/logo.png" alt="logo" maxWidth="400px" />
      <Center minWidth="max-content" alignItems="center" gap="2">
        <Heading size="md" pb="10" mb="10" fontWeight="bold" color="#747B7D">
         Informe o e-mail cadastrado
        </Heading>
      </Center>
      <form onSubmit={handleSubmit}>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input
            backgroundColor="white"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </FormControl>

        <Flex flexDirection="column" gap="12px">
          <Button type="submit" colorScheme="blue" px={140} mt={4}>
            Enviar
          </Button>
        </Flex>
        {successMessage && (
        <Center minWidth="max-content" alignItems="center" gap="2">
          <Text color="green" pt="2">
            {successMessage}
          </Text>
        </Center>
      )}
        {errorMessage && (
        <Center minWidth="max-content" alignItems="center" gap="2">
          <Text color="red" pt="2">
            {errorMessage}
          </Text>
        </Center>
      )}
        <Center
          minWidth="max-content"
          alignItems="center"
          gap="2"
          onClick={() => handleGoBack('/signIn')}
        >
         <Link href="../signIn">
            <Text pt="15" pb="40" fontWeight="bold" color="#747B7D">
              Voltar para login
            </Text>
          </Link>
        </Center>
      </form>
    </Box>
  );
};

export default ForgotPassword;
