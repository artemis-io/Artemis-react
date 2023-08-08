import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setStep1Data } from "../../../../shared/reducer/DoctorReducer";
import { DoctorStep1Data } from "../../../../shared/types";

export function DoctorData({ handleNextStep }: any) {
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
    dispatch(
      setStep1Data({
        name: step1.name,
        email: step1.email,
        passoword: step1.password,
        confirmPassword: step1.confirmPassword,
      })
    );
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
    handleNextStep();
  };

  return (
    <Box>
      <Stack spacing={4} w={"full"} maxW={"md"} p={4}>
        <Heading fontSize={{ base: "2xl", sm: "3xl" }}>
          Cadastro de médico
        </Heading>
        <FormControl id="name">
          <FormLabel>Nome Completo</FormLabel>
          <Input
            backgroundColor="white"
            type="text"
            name="name"
            value={step1.name}
            onChange={handleInputChange}
            borderRadius="md"
            boxShadow="md"
            borderColor="gray.300"
            _hover={{ borderColor: "blue.400" }}
            _focus={{ borderColor: "blue.400" }}
          />
        </FormControl>

        <FormControl id="email" mt={4}>
          <FormLabel>Email</FormLabel>
          <Input
            backgroundColor="white"
            type="email"
            name="email"
            placeholder="exemplo@mail.com"
            value={step1.email}
            onChange={handleInputChange}
            borderRadius="md"
            boxShadow="md"
            borderColor="gray.300"
            _hover={{ borderColor: "blue.400" }}
            _focus={{ borderColor: "blue.400" }}
          />
        </FormControl>

        <FormControl id="password" mt={4}>
          <FormLabel>Senha</FormLabel>
          <InputGroup>
            <Input
              backgroundColor="white"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="123@Abcd"
              value={step1.password}
              onChange={handleInputChange}
              borderRadius="md"
              boxShadow="md"
              borderColor="gray.300"
              _hover={{ borderColor: "blue.400" }}
              _focus={{ borderColor: "blue.400" }}
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
          <FormLabel>Confirme sua Senha</FormLabel>
          <InputGroup>
            <Input
              backgroundColor="white"
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={step1.confirmPassword}
              onChange={handleInputChange}
              boxShadow="md"
              borderColor="gray.300"
              _hover={{ borderColor: "blue.400" }}
              _focus={{ borderColor: "blue.400" }}
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
        <Button
          onClick={handleSubmit}
          bg={"blue.400"}
          color={"white"}
          w="full"
          _hover={{
            bg: "blue.500",
          }}
        >
          Proximo
        </Button>
      </Stack>
    </Box>
  );
}
