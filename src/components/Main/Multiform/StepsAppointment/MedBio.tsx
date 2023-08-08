import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Card,
  CardHeader,
  CardBody,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DoctorInfo } from "../../../../shared/interface";
import { apiMed } from "../../../../services/api";

export default function MedBio({ handleNextStep }: any) {
  const [doctor, setDoctor] = useState<DoctorInfo | null>(null);

  const id = useSelector((state: any) => state.appointment.appointmentStep4Data.id_doctor);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await apiMed.get(`api/user/doctor/${id}`);
        setDoctor(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Erro ao obter médicos:", error);
      }
    };

    fetchDoctor();
  }, [id]);

  if (!doctor) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Text>Loading...</Text>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Card
        w="360px"
        h="500px"
        borderRadius="20px"
        mb={2}
        color="#747B7D"
        justifyContent="space-beetween"
      >
        <VStack>
          <CardHeader
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Heading>{doctor.name}</Heading>
            <Text color="#494949">{doctor.doctor.speciality.join(", ")}</Text>
          </CardHeader>
          <CardBody>
            <Text>Valor da consulta: R${doctor.doctor.pricing}</Text>
            <Text>{doctor.doctor.bio}</Text>
          </CardBody>
        </VStack>
      </Card>

      <Button
        onClick={() => {
          /*   handleNav(); */
          handleNextStep(); // Chame a função handleNextStep aqui
        }}
        bg="#0078D7"
        w="293px"
        h="50px"
        color="#fafafa"
        fontSize="16px"
      >
        Selecionar Horário
      </Button>
    </Box>
  );
}
