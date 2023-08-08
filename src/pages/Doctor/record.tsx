import { ChangeEvent, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";

const MedicalRecordPage = () => {
  const [patientData, setPatientData] = useState({
    queixaPrincipal: "",
    historiaDoenca: "",
    historiaPatologica: "",
    alergias: "",
    peso: "",
    altura: "",
    imc: "",
    freqCardiaca: "",
    freqRespiratoria: "",
    pressaoArterial: "",
    tax: "",
    glasgow: "",
    tipoSanguineo: "",
    medicamentos: "",
  });

  const handlePrevious = () => {
    // Lógica para continuar para a próxima etapa ou página
    console.log("Continuar para a próxima etapa");
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
  };

  return (
    <Box p={4}>
      <FormControl>
        <FormLabel>Queixa principal</FormLabel>
        <Input type="text" name="queixaPrincipal" onChange={handleChange} />
      </FormControl>

      <FormControl>
        <FormLabel>História da doença atual</FormLabel>
        <Textarea name="historiaDoenca" onChange={handleChange} />
      </FormControl>

      <FormControl>
        <FormLabel>História Patológica Pregressa</FormLabel>
        <Textarea name="historiaPatologica" onChange={handleChange} />
      </FormControl>

      <FormControl>
        <FormLabel>Alergias</FormLabel>
        <Textarea name="alergias" onChange={handleChange} />
      </FormControl>

      <FormControl>
        <FormLabel>Peso</FormLabel>
        <Input type="number" step="0.01" name="peso" onChange={handleChange} />
      </FormControl>

      <FormControl>
        <FormLabel>Altura</FormLabel>
        <Input
          type="number"
          step="0.01"
          name="altura"
          onChange={handleChange}
        />
      </FormControl>

      <FormControl>
        <FormLabel>IMC</FormLabel>
        <Input
          type="number"
          step="0.01"
          name="altura"
          onChange={handleChange}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Frequência Cardíaca</FormLabel>
        <Input type="text" name="freqCardiaca" onChange={handleChange} />
      </FormControl>

      <FormControl>
        <FormLabel>Frequencia Respiratória</FormLabel>
        <Input type="text" name="freqRespiratoria" onChange={handleChange} />
      </FormControl>

      <FormControl>
        <FormLabel>Pressão Arterial</FormLabel>
        <Input type="text" name="pressaoArterial" onChange={handleChange} />
      </FormControl>

      <FormControl>
        <FormLabel>TAX</FormLabel>
        <Input type="text" name="tax" onChange={handleChange} />
      </FormControl>

      <FormControl>
        <FormLabel>Glasgow</FormLabel>
        <Input type="text" name="glasgow" onChange={handleChange} />
      </FormControl>

      <FormControl>
        <FormLabel>Tipo Sanguíneo</FormLabel>
        <Input type="text" name="tipoSanguineo" onChange={handleChange} />
      </FormControl>

      <FormControl>
        <FormLabel>Medicamentos Utilizados</FormLabel>
        <Textarea name="medicamentos" onChange={handleChange} />
      </FormControl>

      {/* Outros campos do prontuário aqui */}

      <Button mt={4} onClick={handlePrevious}>
        Voltar
      </Button>
    </Box>
  );
};

export default MedicalRecordPage;
