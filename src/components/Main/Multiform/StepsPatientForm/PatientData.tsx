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
import { setStep1Data } from "../../../../shared/reducer/PatientReducer";
import StyledLabel from "../../Forms/StyledLabel";
import { PatientStep1Data } from "../../../../shared/types";
import { useNavigate } from "react-router-dom";

export function PatientData({ handleNextStep }: any) {
  const router = useNavigate();
  const [step1, setStep1] = useState<PatientStep1Data>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStep1((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const isPasswordValid = () => {
    const { password } = step1;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPasswordValid()) {
      alert(
        "A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial."
      );
      return;
    }
    dispatch(setStep1Data({ step1 }));
    handleNextStep();
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
    >
      <Stack spacing={4} w={"full"} maxW={"md"} p={4}>
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
            placeholder="exemplo@mail.com"
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
              placeholder="123@Abcd"
              value={step1.password}
              onChange={handleInputChange}
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
        >
          Próximo
        </Button>
        <Center mt={4}>
          <Button onClick={handleGoBack} variant="link" color="#747B7D">
            Voltar para login
          </Button>
        </Center>
      </Stack>
    </Box>
  );
}
