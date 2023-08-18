import { ChangeEvent, useState } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import Sidebar from "../../components/Main/DoctorSideBar/Sidebar";
import { apiMed } from "../../services/api";

const MedicalRecordPage = () => {
  const [patientData, setPatientData] = useState({
    queixaPrincipal: "",
    historiaDoenca: "",
    historiaPatologica: "",
    alergias: "",
    peso: 0,
    altura: 0,
    imc: "",
    freqCardiaca: "",
    freqRespiratoria: "",
    pressaoArterial: "",
    tax: "",
    glasgow: "",
    tipoSanguineo: "",
    medicamentos: "",
    anotacoes: "",
  });

  const handleSave = async () => {
    try {
      const response = await apiMed.post("/api/update-patient", patientData);
      console.log("Data updated:", response.data);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleCalcIMC = () => {
    const { altura, peso } = patientData;
    if (altura && peso) {
      const alturaMetros = altura; // Convert height to meters
      const imc = (peso / (alturaMetros * alturaMetros)).toFixed(2);
      setPatientData((prevData) => ({
        ...prevData,
        imc: imc,
      }));
    } else {
      setPatientData((prevData) => ({
        ...prevData,
        imc: "",
      }));
    }
  };

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setPatientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "altura" || name === "peso") {
      handleCalcIMC();
    }
  };

  return (
    <Sidebar>
      <Box p={4}>
        <Center>
          <Heading fontSize="2xl" mb={6}>
            Prontuário
          </Heading>
        </Center>
        <FormControl mb={2}>
          <FormLabel>Queixa principal</FormLabel>
          <Input type="text" name="queixaPrincipal" onChange={handleChange} />
        </FormControl>

        <FormControl mb={2}>
          <FormLabel>História da doença atual</FormLabel>
          <Textarea name="historiaDoenca" onChange={handleChange} />
        </FormControl>

        <FormControl mb={2}>
          <FormLabel>História Patológica Pregressa</FormLabel>
          <Textarea name="historiaPatologica" onChange={handleChange} />
        </FormControl>

        <FormControl mb={2}>
          <FormLabel>Alergias</FormLabel>
          <Textarea name="alergias" onChange={handleChange} />
        </FormControl>

        <FormControl mb={2}>
          <FormLabel>Medicamentos Utilizados</FormLabel>
          <Textarea name="medicamentos" onChange={handleChange} />
        </FormControl>

        <Text fontWeight="bold" fontSize="md" mt="6" mb="4">
          Dados Vitais
        </Text>
        <Grid
          templateAreas={`"weight height"
                            "imc freqc"
                            "freqr press"
                            "tax glas"`}
          gridTemplateRows={"1fr 1fr 1fr"}
          gridTemplateColumns={"1fr 1fr"}
          gap="2"
        >
          <GridItem area={"weight"}>
            <FormControl mb={2}>
              <FormLabel>Peso</FormLabel>
              <Input
                type="number"
                step="0.01"
                name="peso"
                onChange={handleChange}
              />
            </FormControl>
          </GridItem>
          <GridItem area={"height"}>
            <FormControl mb={2}>
              <FormLabel>Altura</FormLabel>
              <Input
                type="number"
                step="0.01"
                name="altura"
                placeholder="1,60"
                onChange={handleChange}
              />
            </FormControl>
          </GridItem>
          <GridItem area={"imc"}>
            <FormControl mb={2}>
              <FormLabel>IMC</FormLabel>
              <Input
                type="number"
                step="0.01"
                name="imc"
                value={patientData.imc}
                onChange={handleChange}
              />
            </FormControl>
          </GridItem>
          <GridItem area={"freqc"}>
            <FormControl mb={2}>
              <FormLabel>Freq. Cardíaca</FormLabel>
              <Input type="text" name="freqCardiaca" onChange={handleChange} />
            </FormControl>
          </GridItem>
          <GridItem area={"freqr"}>
            <FormControl mb={2}>
              <FormLabel>Freq. Respiratória</FormLabel>
              <Input
                type="text"
                name="freqRespiratoria"
                onChange={handleChange}
              />
            </FormControl>
          </GridItem>
          <GridItem area={"press"}>
            <FormControl mb={2}>
              <FormLabel>Pressão Arterial</FormLabel>
              <Input
                type="text"
                name="pressaoArterial"
                onChange={handleChange}
              />
            </FormControl>
          </GridItem>
          <GridItem area={"tax"}>
            <FormControl mb={2}>
              <FormLabel>TAX</FormLabel>
              <Input type="text" name="tax" onChange={handleChange} />
            </FormControl>
          </GridItem>
          <GridItem area={"glas"}>
            <FormControl mb={2}>
              <FormLabel>Glasgow</FormLabel>
              <Input type="text" name="glasgow" onChange={handleChange} />
            </FormControl>
          </GridItem>
        </Grid>
        <FormControl mb={2}>
          <FormLabel>Tipo Sanguíneo</FormLabel>
          <Input type="text" name="tipoSanguineo" onChange={handleChange} />
        </FormControl>

        <FormControl mb={2}>
          <FormLabel>Observações</FormLabel>
          <Textarea name="observacoes" onChange={handleChange} />
        </FormControl>
        <Center>
        <Button colorScheme="blue" mt={4} onClick={handleSave}>
          Salvar
        </Button>
        </Center>
      </Box>
    </Sidebar>
  );
};

export default MedicalRecordPage;
