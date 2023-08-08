import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import { apiMed } from "../../../services/api";
import { useNavigate, useParams } from "react-router-dom";

const ResetPasswordPage: React.FC = () => {
  const router = useNavigate();

  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    setError("");
    setIsLoading(true);

    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match.");
      }

      await apiMed.post("/security-token/reset-password", {
        token,
        password,
      });

      // Redirecionar o usuário para a página de sucesso após a redefinição de senha
      router("/signIn");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
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
      mt={8}
    >
      <Image src="/assets/images/logo.png" alt="logo" maxWidth="400px" />
      <Center minWidth="max-content" alignItems="center" gap="2">
        <Heading size="md" pb="10" mb="10">
          Redefinir Senha
        </Heading>
      </Center>
      <form>
        <FormControl id="password">
          <FormLabel>Nova Senha</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <FormControl id="confirmPassword">
          <FormLabel>Confirmar Nova Senha</FormLabel>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormControl>

        <Button
          type="submit"
          colorScheme="blue"
          px={140}
          mt={4}
          isLoading={isLoading}
          onClick={handleResetPassword}
        >
          Redefinir
        </Button>

        {error && (
          <Text color="red" pt="2">
            {error}
          </Text>
        )}

        <Center
          minWidth="max-content"
          alignItems="center"
          gap="2"
          onClick={() => router("/signIn")}
          cursor="pointer"
          pt="15"
          pb="40"
        >
          <Link href="/signIn">Voltar para o Login</Link>
        </Center>
      </form>
    </Box>
  );
};

export default ResetPasswordPage;
