import { useState } from "react";
import {
  Box,
  Text,
  VStack,
  IconButton,
  Badge,
  Image,
  Grid,
  GridItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Link,
  Card,
  Button,
} from "@chakra-ui/react";
import { AiOutlineVideoCamera } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

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
  doctor: {
    name: string;
    avatar_url: string;
    doctor: {
      speciality: string[];
      pricing: number;
    };
    profile: {
      gender: string;
    };
  };
}

interface UpcomingAppointmentsProps {
  appointments: Appointment[];
}

const UpcomingAppointments: React.FC<UpcomingAppointmentsProps> = ({
  appointments,
}) => {
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const isOpen = !!selectedAppointment;
  const router = useNavigate();

  const handleCloseModal = () => {
    setSelectedAppointment(null);
  };

  const handleNav = () => {
    router("/payment/choice", { state: { selectedAppointment } });
  };

  console.log(selectedAppointment);

  return (
    <VStack spacing={4} alignItems="flex-start" w="95%" mx="auto" mb={16}>
      <Text fontSize="xl" fontWeight="bold" mt={4}>
        Próximas Consultas
      </Text>
      {appointments.map((appointment) => (
        <Box
          key={appointment.id}
          bg="white"
          p={6}
          borderRadius="12px"
          w="100%"
          boxShadow="md"
          position="relative"
          onClick={() => setSelectedAppointment(appointment)}
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
                src={appointment.doctor.avatar_url}
                alt="Foto de perfil"
              />
            </GridItem>
            <GridItem area={"name"}>
              <Text fontSize="lg" fontWeight="bold" pt="5px ">
                {appointment.doctor.name}
              </Text>
            </GridItem>
            <GridItem area={"spec"}>
              <Text fontSize="sm" color="gray.500">
                {appointment.doctor.doctor.speciality.join(", ")}
              </Text>
              <Text fontSize="xm" color="gray.500" pt="5px">
                {appointment.query === "person" ? "Presencial" : "Teleconsulta"}
              </Text>
            </GridItem>
            <GridItem area={"date"} pl="10px">
              <Text fontSize="sm">
                {new Date(appointment.date).toLocaleDateString("pt-BR", {
                  day: "numeric",
                  month: "short",
                })}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {new Date(appointment.date).toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </GridItem>

            <GridItem area={"vid"}>
              {appointment.query === "teleconsultation" && (
                <IconButton
                  as={Link}
                  href={`/video/${appointment.id}`}
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
                <Badge colorScheme={appointment.payment ? "green" : "red"}>
                  {appointment.payment ? "Pago" : "Aguardando pagamento"}
                </Badge>
              </Text>
            </GridItem>
          </Grid>
        </Box>
      ))}

      {selectedAppointment && (
        <Modal isOpen={isOpen} onClose={handleCloseModal}>
          <ModalOverlay />
          <Card>
            <ModalContent>
              <ModalCloseButton />
              <ModalBody>
                <VStack>
                  <Image
                    boxSize="150px"
                    width="100px"
                    borderRadius={10}
                    objectFit="cover"
                    src={selectedAppointment.doctor.avatar_url}
                    alt="Foto de perfil"
                  />
                  <Text
                    fontSize="lg"
                    fontWeight="bold"
                    pt="5px"
                    color="gray.500"
                  >
                    {selectedAppointment.doctor.name}
                  </Text>
                  <Text fontSize="md" color="gray.500" pt="5px">
                    {selectedAppointment.doctor.doctor.speciality.join(", ")}
                  </Text>
                  <Text
                    fontSize="lg"
                    fontWeight="bold"
                    color="gray.500"
                    pt="20px"
                  >
                    Atendimento Particular
                  </Text>
                  <Text fontSize="md" color="gray.500" pt="5px">
                    Data:<>&nbsp;</>
                    {new Date(selectedAppointment.date).toLocaleDateString(
                      "pt-BR",
                      {
                        day: "numeric",
                        month: "long",
                      }
                    )}
                  </Text>
                  <Text fontSize="md" color="gray.500">
                    Horário:<>&nbsp;</>
                    {new Date(selectedAppointment.date).toLocaleTimeString(
                      "pt-BR",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </Text>
                  <Text fontSize="md" color="gray.500" pt="5px">
                    {selectedAppointment.query === "person"
                      ? "Presencial"
                      : "Teleconsulta"}
                  </Text>
                  <Text fontSize="md" color="gray.500" pt="5px">
                    R$ {selectedAppointment.doctor.doctor.pricing}
                  </Text>

                  <Button
                    mt={4}
                    mb={4}
                    bg="#19A588"
                    w="full"
                    color="#fafafa"
                    fontSize="16px"
                    onClick={handleNav}
                  >
                    Seguir para Pagamento
                  </Button>
                </VStack>
              </ModalBody>
            </ModalContent>
          </Card>
        </Modal>
      )}
    </VStack>
  );
};

export default UpcomingAppointments;
