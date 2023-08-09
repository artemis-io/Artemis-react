
import {
  Box,
  Button,
  FormControl,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiArrowDown } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { DoctorStep2Data } from "../../../../shared/types";
import { setStep2Data } from "../../../../shared/reducer/DoctorReducer";
import StyledLabel from "../../Forms/StyledLabel";

export function DoctorInfo({ handleNextStep }: any) {
  const dispatch = useDispatch();
  const [step2, setStep2] = useState<DoctorStep2Data>({
    cpf: "",
    rg: "",
    cep: "",
    address: "",
    number: "",
    state: "",
    district: "",
    city: "",
  });
  const step1Data = useSelector((state: any) => state.doctor.doctorStep1Data);
  console.log("1", step1Data);
  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStep2((prevFormData) => ({ ...prevFormData, [name]: value }));
    dispatch(
      setStep2Data({
        cpf: step2.cpf,
        rg: step2.rg,
        cep: step2.cep,
        address: step2.address,
        number: step2.number,
        state: step2.state,
        district: step2.district,
        city: step2.city,
      })
    );
    console.log(dispatch);
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
            onChange={handleSubmit}
            value={step2.cpf}
            name="cpf"
            variant="flushed"
            placeholder="000.000.000-00"
            _placeholder={{ color: "gray.500" }}
            type="text"
          />
        </FormControl>
        <FormControl>
          <Select icon={<FiArrowDown />} placeholder="Gênero">
            <option value="option1">Masculino</option>
            <option value="option2">Feminino</option>
          </Select>
        </FormControl>

        <FormControl id="rg">
          <StyledLabel>RG</StyledLabel>
          <Input
            onChange={handleSubmit}
            value={step2.rg}
            name="rg"
            variant="flushed"
            placeholder="00000000"
            _placeholder={{ color: "gray.500" }}
            type="text"
          />
        </FormControl>
        <FormControl id="cep">
          <StyledLabel>CEP</StyledLabel>
          <Input
            onChange={handleSubmit}
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
            onChange={handleSubmit}
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
            onChange={handleSubmit}
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
            onChange={handleSubmit}
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
            onChange={handleSubmit}
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
            onChange={handleSubmit}
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
          _hover={{
            bg: "blue.500",
          }}
        >
          Próximo
        </Button>
      </Stack>
    </Box>
  );
}