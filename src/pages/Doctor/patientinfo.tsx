import { ChangeEvent, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";

const PatientInfo = () => {
  const [patientData, setPatientData] = useState({
    nomeCompleto: "",
    sexo: "",
    dataNascimento: "",
    idade: "",
    cpf: "",
    email: "",
    numeroTelefone: "",
    corRaca: "",
    estadoCivil: "",
    naturalidade: "",
    residencia: "",
    escolaridade: "",
    profissao: "",
  });

  // useEffect(() => {
  //   // Simulação da busca dos dados do paciente no banco de dados
  //   fetchPatientData()
  //     .then((data) => {
  //       if (data) {
  //         setPatientData(data);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  // const fetchPatientData = () => {
  //   // Simulação da chamada ao banco de dados para buscar os dados do paciente
  //   return new Promise<{ name: string; age: string; color: string }>((resolve, reject) => {
  //     // Aqui você deve fazer a chamada real ao banco de dados para buscar os dados do paciente
  //     // Neste exemplo, estamos retornando dados fictícios
  //     setTimeout(() => {
  //       // Se os dados do paciente estiverem disponíveis no banco de dados, retorne-os
  //       resolve({
  //         name: "Nome do Paciente",
  //         age: "30",
  //         color: "Cor do Paciente"
  //       });

  //       // Caso contrário, retorne null ou um objeto vazio para permitir que o médico preencha os campos
  //       // resolve(null);
  //     }, 1000);
  //   });
  // };

  const handleNext = () => {
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
        <FormLabel>Nome</FormLabel>
        <Input
          type="text"
          name="nomeCompleto"
          value={patientData.nomeCompleto}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Idade</FormLabel>
        <Input
          type="text"
          name="idade"
          value={patientData.idade}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Cor</FormLabel>
        <Input
          type="text"
          name="corRaca"
          value={patientData.corRaca}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Sexo</FormLabel>
        <Select name="sexo" onChange={handleChange}>
          <option value="">Selecione</option>
          <option value="masculino">Masculino</option>
          <option value="feminino">Feminino</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Data de Nascimento</FormLabel>
        <Input type="date" name="dataNascimento" onChange={handleChange} />
      </FormControl>

      <FormControl>
        <FormLabel>Estado Civil</FormLabel>
        <Input type="text" name="estadoCivil" onChange={handleChange} />
      </FormControl>

      <FormControl>
        <FormLabel>Naturalidade</FormLabel>
        <Input type="text" name="naturalidade" onChange={handleChange} />
      </FormControl>

      <FormControl>
        <FormLabel>Residência</FormLabel>
        <Input type="text" name="residencia" onChange={handleChange} />
      </FormControl>

      <FormControl>
        <FormLabel>Escolaridade</FormLabel>
        <Input type="text" name="escolaridade" onChange={handleChange} />
      </FormControl>

      <FormControl>
        <FormLabel>Profissão</FormLabel>
        <Input type="text" name="profissao" onChange={handleChange} />
      </FormControl>

      {/* Outros campos do prontuário aqui */}

      <Button mt={4} onClick={handleNext}>
        Próximo
      </Button>
    </Box>
  );
};

export default PatientInfo;
