import { VStack } from "@chakra-ui/react";
import CardComplete from "../../components/Style/Cards/CardComplete";

const AppointmentList = () => {
  const upcomingAppointments = [
    {
      id: 1,
      date: "2023-06-28",
      time: "10:00",
      name: "João Silva",
      modality: "Presencial",
      spec: "Psiquiatra",
      imageUrl: "/assets/images/doctor.jpg",
    },
    {
      id: 2,
      date: "2023-06-29",
      time: "14:30",
      name: "Maria Santos",
      modality: "Teleconsulta",
      spec: "Psicóloga",
      imageUrl: "/assets/images/doctor.jpg",
    },
    // Adicione mais consultas aqui
  ];

  return (
    <VStack spacing={5}>
      <CardComplete appointments={upcomingAppointments} />
    </VStack>
  );
};

export default AppointmentList;
