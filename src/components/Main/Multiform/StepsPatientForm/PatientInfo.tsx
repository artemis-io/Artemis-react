import {
  Box,
  Button,
  FormControl,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PatientStep2Data } from "../../../../shared/types";
import { setStep2Data, submitPatientData } from "../../../../shared/reducer/PatientReducer";
import { apiMed } from "../../../../services/api";
import StyledLabel from "../../Forms/StyledLabel";
import { useNavigate } from "react-router-dom";
import { FiArrowDown } from "react-icons/fi";

export function PatientInfo() {
  const router = useNavigate();
  const dispatch = useDispatch();

  const step1Data = useSelector((state: any) => state.patient.patientStep1Data);
  const step2Data = useSelector((state: any) => state.patient.patientStep2Data);
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
  console.log("1", step1Data);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setStep2((prevStep2) => 
    ({ ...prevStep2,
       [name]: value,
       }));
       dispatch(setStep2Data({ ...step2Data, [name]: value }));
  };

  const handleFinish = async (e: any) => {
    e.preventDefault();
    const formDataPatient = {
      ...step1Data,
      step2,
    };
    console.log("2", formDataPatient);
    dispatch(submitPatientData(formDataPatient));
    console.log(formDataPatient, "42");
    e.preventDefault();

    try {
      const response = await apiMed.post("/user", formDataPatient);
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
        <FormControl id="birthDate">
          <StyledLabel>Data de Nascimento</StyledLabel>
          <Input
            type="date"
            name="birthDate"
            /*   value={step2.birthDate} */
            /*    onChange={handleInputChange} */
            variant="flushed"
            _placeholder={{ color: "gray.500" }}
          />
        </FormControl>
        <FormControl>
          <StyledLabel>Gênero</StyledLabel>
          <Select
            icon={<FiArrowDown />}
            placeholder="Gênero"
            /*    onChange={handleGenderChange}
            value={step2.gender} */
            defaultValue="Gênero"
          >
            <option value="male">Masculino</option>
            <option value="female">Feminino</option>
          </Select>
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
