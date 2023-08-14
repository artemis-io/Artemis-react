import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { DoctorStep1Data } from "../../../../shared/types";
import { setStep1Data } from "../../../../shared/reducer/DoctorReducer";
import StyledLabel from "../../Forms/StyledLabel";
import { useNavigate } from "react-router-dom";

export function DoctorData({ handleNextStep }: any) {
  const router = useNavigate();
  const dispatch = useDispatch();
  const [step1, setStep1] = useState<DoctorStep1Data>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStep1((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isPasswordValid = () => {
    const { password } = step1;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPasswordValid()) {
      alert(
        "A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial."
      );
      return;
    }
    dispatch(setStep1Data(step1));
    handleNextStep();
  };

  const goBackToLogin = () => {
    router("/signIn");
  };

  const goBackToRegister = () => {
    router("/signUp");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Stack spacing={4} w={"full"} maxW={"md"} p={2}>
        <FormControl id="name">
          <StyledLabel>Nome Completo</StyledLabel>
          <Input
            variant="flushed"
            type="text"
            name="name"
            value={step1.name}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl id="email" mt={4}>
          <StyledLabel>Email</StyledLabel>
          <Input
            variant="flushed"
            type="email"
            name="email"
            value={step1.email}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl id="password" mt={4}>
          <StyledLabel>Senha</StyledLabel>
          <InputGroup>
            <Input
              variant="flushed"
              type={showPassword ? "text" : "password"}
              name="password"
              value={step1.password}
              onChange={handleInputChange}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={togglePasswordVisibility}>
                {showPassword ? (
                  <ViewOffIcon color="gray.500" />
                ) : (
                  <ViewIcon color="gray.500" />
                )}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl id="confirmPassword" mt={4}>
          <StyledLabel>Confirme sua Senha</StyledLabel>
          <InputGroup>
            <Input
              variant="flushed"
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={step1.confirmPassword}
              onChange={handleInputChange}
            />
          </InputGroup>
        </FormControl>
        <Button
          onClick={handleSubmit}
          bg={"blue.400"}
          color={"white"}
          w="full"
          _hover={{
            bg: "blue.500",
          }}
          // ... add other button styles here
        >
          Próximo
        </Button>
        <Center mt={4}>
          <Box display={"flex"} flexDirection={"column"}>
            <Button
              onClick={goBackToRegister}
              variant="link"
              color="#747B7D"
              padding={3}
            >
              Voltar para Register
            </Button>
            <Button
              onClick={goBackToLogin}
              variant="link"
              color="#747B7D"
              padding={3}
            >
              Voltar para login
            </Button>
          </Box>
        </Center>
      </Stack>
    </Box>
  );
}
