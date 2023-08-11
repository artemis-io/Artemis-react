import { VStack } from "@chakra-ui/react";
import CardDetails from "../../components/Style/Cards/CardDetails";

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
  ];

  return (
    <VStack spacing={5}>
    {/*   <CardDetails appointments={upcomingAppointments} /> */}
    </VStack>
  );
};

export default AppointmentList;
