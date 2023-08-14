import React, { useState } from "react";
import { Box, Button, FormControl, Input, Stack } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setStep2Data } from "../../../../shared/reducer/PatientReducer";
import { apiMed } from "../../../../services/api";
import StyledLabel from "../../Forms/StyledLabel";
import { useNavigate } from "react-router-dom";
import { InputMasked } from "../../React/Mask/Inputs";
import {
  maskInputCep,
  maskInputCpf,
  maskInputRG,
} from "../../../../shared/constant";
import { GenderSelect } from "../../Gender";

export function PatientInfo() {
  const router = useNavigate();
  const dispatch = useDispatch();

  const step1Data = useSelector((state: any) => state.patient.patientStep1Data.step1);

  const [cepValue, setCepValue] = useState("");

  const [step2, setStep2] = useState({
    cpf: "",
    rg: "",
    gender: "",
    cep: cepValue,
    address: "",
    number: "",
    state: "",
    district: "",
    city: "",
    dateOfBirth: new Date().toISOString(),
  });

  const updateStep2 = (updatedFields: any) => {
    const updatedData = { ...step2, ...updatedFields };
    setStep2(updatedData);
    dispatch(setStep2Data(updatedData));
  };

  const fetchAddressFromCorreios = async (cep: any) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (!data.erro) {
        updateStep2({
          cep,
          address: data.logradouro,
          district: data.bairro,
          city: data.localidade,
          state: data.uf,
        });
      } else {
        // Clear the address fields in case of no results
        updateStep2({
          cep: "",
          address: "",
          district: "",
          city: "",
          state: "",
        });
      }
    } catch (error) {
      console.error("Erro ao buscar endereço:", error);
    }
  };

  const handleCepChange = async (e: any) => {
    const { value } = e.target;
    const sanitizedValue = value.replace(/\D/g, ""); // Remove non-numeric characters from value

    if (sanitizedValue.length === 8) {
      await fetchAddressFromCorreios(sanitizedValue);
    }

    setCepValue(sanitizedValue); // Update the CEP value
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    setStep2((prevStep2) => ({
      ...prevStep2,
      [name]: value,
    }));
  };

  const handleGenderChange = (e: any) => {
    const { value } = e.target;
    updateStep2({ gender: value });
  };

  const handleFinish = async (e: any) => {
    e.preventDefault();

    const formDataPatient = {
      ...step1Data,
      ...step2,
    };

    console.log(JSON.stringify(formDataPatient));

    try {
      await apiMed.post("/user", formDataPatient);

      router("/patient/homepage");
    } catch (error) {
      console.log(error);
    }
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
          <InputMasked
            mask={maskInputCpf}
            onChange={handleInputChange}
            value={step2.cpf}
            name="cpf"
            placeholder="000.000.000-00"
          />
        </FormControl>

        <FormControl id="rg">
          <StyledLabel>RG</StyledLabel>
          <InputMasked
            mask={maskInputRG}
            onChange={handleInputChange}
            value={step2.rg}
            name="rg"
            placeholder="00000000"
          />
        </FormControl>

        <FormControl id="dateOfBirth">
          <StyledLabel>Data de Nascimento</StyledLabel>
          <Input
            type="date"
            name="dateOfBirth"
            value={step2.dateOfBirth}
            onChange={handleInputChange}
            variant="flushed"
            _placeholder={{ color: "gray.500" }}
          />
        </FormControl>

        <FormControl>
          <StyledLabel>Gênero</StyledLabel>
          <GenderSelect value={step2.gender} onChange={handleGenderChange} />
        </FormControl>

        <FormControl id="cep" isRequired>
          <StyledLabel>CEP</StyledLabel>
          <InputMasked
            mask={maskInputCep}
            onChange={handleCepChange}
            value={cepValue}
            name="cep"
            placeholder="00000-000"
          />
        </FormControl>

        <FormControl id="address" isRequired>
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

        <FormControl id="number" isRequired>
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

        <FormControl id="state" isRequired>
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

        <FormControl id="city" isRequired>
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

        <FormControl id="district" isRequired>
          <StyledLabel>Bairro</StyledLabel>
          <Input
            onChange={handleInputChange}
            value={step2.district}
            name="district"
            variant="flushed"
            _placeholder={{ color: "gray.500" }}
            type="text"
          />
        </FormControl>

        <Button
          onClick={handleFinish}
          bg={"blue.400"}
          color={"white"}
          w="full"
          _hover={{
            bg: "blue.500",
          }}
        >
          Concluir Registro
        </Button>
      </Stack>
    </Box>
  );
}
