import {
  Box,
  Text,
  VStack,
  IconButton,
  Badge,
  Image,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { AiOutlineVideoCamera } from "react-icons/ai";
import { Link as RouterLink } from "react-router-dom"; 

interface Appointment {
  id: string;
  id_patient: string;
  id_doctor: string;
  date: string;
  type: string;
  status: string | null;
  payment: boolean;
  query: string;
  multiple_users: boolean;
  createdAt: string;
  updatedAt: string;
  patient: {
    name: string;
    avatar_url: string;
  };
}

interface UpcomingAppointmentsProps {
  appointments: Appointment[];
}

const UpcomingAppointmentsDoctor: React.FC<UpcomingAppointmentsProps> = ({
  appointments,
}) => {
  return (
    <VStack spacing={4} alignItems="flex-start" w="95%" mx="auto">
      <Text fontSize="xl" fontWeight="bold" mt={4}>
        Próximas Consultas
      </Text>
      {appointments.map((appointment) => (
        <Box
          key={appointment?.id}
          bg="white"
          p={6}
          borderRadius="lg"
          w="100%"
          boxShadow="md"
          position="relative"
        >
          <Grid
            templateAreas={`"img name vid"
                            "img spec date"
                            "footer footer footer"`}
            gridTemplateRows={"40px 1fr 30px"}
            gridTemplateColumns={"60px 1fr"}
            gap={1}
          >
            <GridItem area={"img"}>
              <Image
                boxSize="90px"
                width="50px"
                borderRadius={10}
                objectFit="cover"
                src={appointment?.patient.avatar_url}
                alt="Foto de perfil"
              />
            </GridItem>
            <GridItem area={"name"}>
              <Text fontSize="lg" fontWeight="bold" pt="5px ">
                {appointment?.patient.name}
              </Text>
            </GridItem>
            <GridItem area={"spec"}>
              <Text fontSize="xm" color="gray.500" pt="5px">
                {appointment?.query === "person"
                  ? "Presencial"
                  : "Teleconsulta"}
              </Text>
            </GridItem>
            <GridItem area={"date"} pl="10px">
              <Text fontSize="sm">
                {new Date(appointment?.date).toLocaleDateString("pt-BR", {
                  day: "numeric",
                  month: "short",
                })}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {new Date(appointment?.date).toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </GridItem>

            <GridItem area={"vid"}>
              {appointment?.query === "teleconsultation" && (
                <IconButton
                  as={RouterLink}
                  to={`/video/${appointment?.id}`}
                  variant="outline"
                  colorScheme="blue"
                  aria-label="Entrar na chamada de vídeo"
                  icon={<AiOutlineVideoCamera />}
                  left="15px"
                />
              )}
            </GridItem>
            <GridItem area={"footer"} pt="5px">
              <Text fontSize="md">
                Status:{" "}
                <Badge colorScheme={appointment?.payment ? "green" : "red"}>
                  {appointment?.payment ? "Pago" : "Aguardando pagamento"}
                </Badge>
              </Text>
            </GridItem>
          </Grid>
        </Box>
      ))}
    </VStack>
  );
};

export default UpcomingAppointmentsDoctor;
