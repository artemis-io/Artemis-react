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
  useToast,
} from "@chakra-ui/react";
import { apiMed } from "../../../services/api";
import StyledLabel from "../../../components/Main/Forms/StyledLabel";


const PasswordForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const toast = useToast();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await apiMed.post("/api/security-token/forgot-password", { email });
      console.log("Email:", email);
      toast({
        position: "top",
        title: "Sucesso",
        description: "As instruções foram enviadas para seu e-mail",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        position: "top",
        title: "Erro",
        description:
          "Ocorreu um erro, verifique as informações e tente novamente.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
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
          Recuperação de senha
        </Heading>
      </Center>
      <form onSubmit={handleSubmit}>
        <FormControl id="email">
          <StyledLabel>Email</StyledLabel>
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
        <Center minWidth="max-content" alignItems="center" gap="2">
          <Link href="/security/login">
            <Text pt="15" pb="40" fontWeight="bold" color="#747B7D">
              Voltar para login
            </Text>
          </Link>
        </Center>
      </form>
    </Box>
  );
};

export default PasswordForm;
