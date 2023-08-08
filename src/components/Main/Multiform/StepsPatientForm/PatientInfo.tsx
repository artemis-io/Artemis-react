import { Box, Button, FormControl, Input, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PatientStep2Data } from "../../../../shared/types";
import { submitPatientData } from "../../../../shared/reducer/PatientReducer";
import { apiMed } from "../../../../services/api";
import StyledLabel from "../../Forms/StyledLabel";
import { useNavigate } from "react-router-dom";

export function PatientInfo() {
  const router = useNavigate();
  const dispatch = useDispatch();
  const [step2, setStep2] = useState<PatientStep2Data>({
    cpf: "",
    rg: "",
    gender: "",
    cep: "",
    address: "",
    number: "",
    state: "",
    district: "",
    city: "",
  });
  const step1Data = useSelector((state: any) => state.patient.patientStep1Data);
  const step2Data = useSelector((state: any) => state.patient.patientStep2Data);
  console.log("1", step1Data);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStep2((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleFinish = async (e: React.FormEvent) => {
    const formDataPatient = {
      step1Data,
      step2Data,
    };
    console.log("2", formDataPatient);
    dispatch(submitPatientData(formDataPatient));
    console.log(formDataPatient, "42");
    e.preventDefault();

    try {
      const response = await apiMed.post("/api/user", formDataPatient);
      console.log(formDataPatient, "43");
      router("/patient/homepage");
      console.log(response);
      console.log("Dados do form:", formDataPatient);
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
          <Input
            onChange={handleInputChange}
            value={step2.cpf}
            name="cpf"
            variant="flushed"
            placeholder="000.000.000-00"
            _placeholder={{ color: "gray.500" }}
            type="text"
          />
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
        <FormControl id="gender">
          <StyledLabel>Gênero</StyledLabel>
          <Input
            onChange={handleInputChange}
            value={step2.gender}
            name="gender"
            variant="flushed"
            placeholder="Feminino/Masculino"
            _placeholder={{ color: "gray.500" }}
            type="text"
          />
        </FormControl>
        <FormControl id="cep" isRequired>
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
