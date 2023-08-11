import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FiArrowDown } from "react-icons/fi";
import {
  Box,
  Button,
  FormControl,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import { DoctorStep2Data } from "../../../../shared/types";
import { setStep2Data } from "../../../../shared/reducer/DoctorReducer";
import StyledLabel from "../../Forms/StyledLabel";

export function DoctorInfo({ handleNextStep }: any) {
  const dispatch = useDispatch();

  const [step2, setStep2] = useState<DoctorStep2Data>({
    cpf: "",
    rg: "",
    gender: "",
    cep: "",
    address: "",
    number: "",
    state: "",
    district: "",
    city: "",
    dateOfBirth: new Date().toISOString(), // Serialize initial date
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let updatedData;

    if (name === "dateOfBirth") {
      const selectedDate = new Date(value);
      updatedData = { ...step2, [name]: selectedDate.toISOString() };
    } else {
      updatedData = { ...step2, [name]: value };
    }

    setStep2(updatedData);
    dispatch(setStep2Data(updatedData));
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    updateStep2AndDispatch({ district: value });
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    updateStep2AndDispatch({ gender: value });
  };

  const updateStep2AndDispatch = (updatedFields: Partial<DoctorStep2Data>) => {
    const updatedData = { ...step2, ...updatedFields };
    setStep2(updatedData);
    dispatch(setStep2Data(updatedData));
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Stack spacing={6} w={"full"} maxW={"md"} p={2}>
        <FormControl id="cpf">
          <StyledLabel>CPF</StyledLabel>
          <Input
            onChange={handleInputChange}
            value={step2.cpf}
            name="cpf"
            variant="flushed"
            placeholder="123.456.789-00" // Example format
            type="text"
          />
        </FormControl>
        <FormControl>
          <StyledLabel>Gênero</StyledLabel>
          <Select
            icon={<FiArrowDown />}
            placeholder="Gênero"
            onChange={handleGenderChange}
            value={step2.gender}
          >
            <option value="male">Masculino</option>
            <option value="female">Feminino</option>
          </Select>
        </FormControl>

        <FormControl id="rg">
          <StyledLabel>RG</StyledLabel>
          <Input
            onChange={handleInputChange}
            value={step2.rg}
            name="rg"
            variant="flushed"
            placeholder="00000000"
            _placeholder={{ color: "gray.500" }}
            type="text"
          />
        </FormControl>
        <FormControl id="dateOfBirth">
          <StyledLabel>Data de Nascimento</StyledLabel>
          <Input
            type="date"
            name="dateOfBirth"
            value={new Date(step2.dateOfBirth).toLocaleDateString("en-CA")}
            onChange={handleInputChange}
            variant="flushed"
            _placeholder={{ color: "gray.500" }}
          />
        </FormControl>

        <FormControl id="cep">
          <StyledLabel>CEP</StyledLabel>
          <Input
            onChange={handleInputChange}
            value={step2.cep}
            name="cep"
            variant="flushed"
            placeholder="00000-000"
            _placeholder={{ color: "gray.500" }}
            type="text"
          />
        </FormControl>
        <FormControl id="address">
          <StyledLabel>Endereço</StyledLabel>
          <Input
            onChange={handleInputChange}
            value={step2.address}
            name="address"
            variant="flushed"
            placeholder="Rua..."
            _placeholder={{ color: "gray.500" }}
            type="text"
          />
        </FormControl>

        <FormControl id="number">
          <StyledLabel>Número</StyledLabel>
          <Input
            onChange={handleInputChange}
            value={step2.number}
            name="number"
            variant="flushed"
            _placeholder={{ color: "gray.500" }}
            type="number"
          />
        </FormControl>

        <FormControl id="state">
          <StyledLabel>Estado</StyledLabel>
          <Input
            onChange={handleInputChange}
            value={step2.state}
            name="state"
            variant="flushed"
            _placeholder={{ color: "gray.500" }}
            type="text"
          />
        </FormControl>

        <FormControl id="city">
          <StyledLabel>Cidade</StyledLabel>
          <Input
            onChange={handleInputChange}
            value={step2.city}
            name="city"
            variant="flushed"
            _placeholder={{ color: "gray.500" }}
            type="text"
          />
        </FormControl>

        <FormControl id="district">
          <StyledLabel>Bairro</StyledLabel>
          <Input
            onChange={handleDistrictChange}
            value={step2.district}
            name="district"
            variant="flushed"
            _placeholder={{ color: "gray.500" }}
            type="text"
          />
        </FormControl>
        <Button
          onClick={handleNextStep}
          bg={"blue.400"}
          color={"white"}
          w="full"
          _hover={{ bg: "blue.500" }}
        >
          Próximo
        </Button>
      </Stack>
    </Box>
  );
}
