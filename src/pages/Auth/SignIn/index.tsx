import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import PrimaryButton from "../../../components/Style/Buttons/Primarybutton";

const SignIn = () => {
  const router = useNavigate(); // Inicialize o useHistory

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  const { signIn } = useAuth();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = await signIn({ email, password });

      if (!user) {
        toast({
          title: "Erro",
          description: "E-mail ou senha incorretos.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
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

  const handleNav = (route: any) => {
    router(route);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding={4}
      mx={5}
    >
      <Box>
        <Image src="/assets/images/logo.png" alt="logo" maxWidth="400px" />

        <form onSubmit={handleSignIn}>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input
              backgroundColor="white"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
          </FormControl>

          <FormControl id="password" mt={4}>
            <FormLabel>Senha</FormLabel>
            <InputGroup>
              <Input
                backgroundColor="white"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={handleTogglePasswordVisibility}
                >
                  {showPassword ? (
                    <ViewOffIcon color="gray.500" />
                  ) : (
                    <ViewIcon color="gray.500" />
                  )}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Flex flexDirection="column" gap="12px">
            <Button type="submit" bg="#0078D7" px={140} mt={4} color='#fafafa'>
              Entrar
            </Button>
            <Button onClick={() => handleNav("/signUp")} bg="#0078D7" px={140} color='#fafafa'>
              Registrar
            </Button>
          </Flex>
        </form>
        <Center minWidth="max-content" alignItems="center" gap="2">
          <Link href="/forgot-password">
            <Text pt="15" fontWeight="bold" color="#747B7D">
              Esqueci minha senha
            </Text>
          </Link>
        </Center>
        <Center>
          <Text mt={4} color="#494949">
            Versão 1.0.00
          </Text>
        </Center>
      </Box>
    </Box>
  );
};

export default SignIn;
