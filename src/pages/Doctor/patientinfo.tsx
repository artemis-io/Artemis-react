import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Heading,
  Center,
} from "@chakra-ui/react";
import Sidebar from "../../components/Main/SideBar/Sidebar";
import { Patient } from "../../shared/interface/index";
import { id } from "date-fns/locale";
import { apiMed } from "../../services/api";
import { differenceInYears, format } from "date-fns";

const PatientInfo = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const birthDate = patient?.profile?.dateOfBirth || "";
  const age = differenceInYears(new Date(), new Date(birthDate));

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await apiMed.get(`/user/${id}`);
        setPatient(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Erro ao obter médicos:", error);
      }
    };

    fetchPatient();
  }, []);
  const handleNext = () => {
    // Lógica para continuar para a próxima etapa ou página
    console.log("Continuar para a próxima etapa");
  };

  return (
    <Sidebar>
      <Box p={4}>
        <FormControl mb={2}>
          <Center>
            <Heading fontSize="2xl" mb={6}>
              Identificação
            </Heading>
          </Center>
          <FormLabel>Nome</FormLabel>
          <Input type="text" name="nome" value={patient?.name} />
        </FormControl>
        <Grid
          templateAreas={`"age sex"
                          "birth res"`}
          gridTemplateRows={"1fr 1fr"}
          gridTemplateColumns={"1fr 1fr"}
          gap="2"
        >
          <GridItem area={"age"}>
            <FormControl mb={2}>
              <FormLabel>Idade</FormLabel>
              <Input type="text" name="age" value={age} />
            </FormControl>
          </GridItem>
          <GridItem area={"sex"}>
            <FormControl>
              <FormLabel>Sexo</FormLabel>
              <Input
                type="text"
                name="gender"
                value={
                  patient?.profile.gender === "male" ? "Masculino" : "Feminino"
                }
              />
            </FormControl>
          </GridItem>
          <GridItem area={"birth"}>
            <FormControl>
              <FormLabel>Data de Nascimento</FormLabel>
              <Input
                type="text"
                name="age"
                value={
                  patient?.profile.dateOfBirth
                    ? format(
                        new Date(patient?.profile.dateOfBirth),
                        "dd/MM/yyyy"
                      )
                    : ""
                }
              />
            </FormControl>
          </GridItem>

          <GridItem area={"res"}>
            <FormControl>
              <FormLabel>Residência</FormLabel>
              <Input
                type="text"
                name="residencia"
                value={patient?.profile.city}
              />
            </FormControl>
          </GridItem>
        </Grid>

        <Center>
          <Button colorScheme="blue" mt={4} onClick={handleNext}>
            Próximo
          </Button>
        </Center>
      </Box>
    </Sidebar>
  );
};

export default PatientInfo;
