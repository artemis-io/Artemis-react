import {
  Box,
  Heading,
  Text,
  VStack,
  Spacer,
  ModalOverlay,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Avatar,
  Card,
  CardHeader,
  Flex,
  IconButton,
  GridItem,
} from "@chakra-ui/react";
import React from "react";
import ScheduleResumeCard from "../../components/Style/Cards/ScheduleResumeCard";
import SecondaryButton from "../../components/Style/Buttons/SecondayButton";
import AppointmentConfirmButton from "../../components/Style/Buttons/AppointmentConfirmButton";
import PatientSidebar from "../../components/Main/PatientSideBar";
import { Appointment } from "../../shared/entities/appointments.entities";
import { FiTrash2 } from "react-icons/fi";

interface OrderProps {
  selectedAppointment: Appointment | null; // Receive the selected appointment data
}

export default function Order({ selectedAppointment }: OrderProps) {
  const OverlayOne = () => (
    <ModalOverlay bg="#494949" backdropFilter="blur(10px) hue-rotate(90deg)" />
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  return (
    <PatientSidebar>
      <Box>
       

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-around"
          h="78vh"
        >
          <Box display="flex" flexDirection="column" gap={2}>
            {selectedAppointment && (
              /*   <ScheduleResumeCard
                name={selectedAppointment.doctor.name}
                spec={selectedAppointment.doctor.doctor.speciality.join(", ")}
                imageUrl={selectedAppointment.doctor.avatar_url}
                price={0} // Update this with the actual price
                date={selectedAppointment.date}
              /> */

              <Card
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                boxShadow="1px 2px 2px 1px rgba(0, 0, 0, 0.25)"
              >
                <CardHeader>
                  <Flex justifyContent="space-between" alignItems="flex-start">
                    <Flex gap="4" alignItems="center">
                      <Avatar
                        name="Segun Adebayo"
                        src={selectedAppointment.doctor.avatar_url}
                        width="80px"
                        height="120px"
                        borderRadius="12px"
                      />

                      <Box>
                        <Heading
                          color="#494949"
                          fontSize="16px"
                          fontWeight="700"
                        >
                          {selectedAppointment.doctor.name}
                        </Heading>

                        <Box display="flex" gap={1} flexDirection="column">
                          <Heading color="#494949" fontSize="16px">
                            R${selectedAppointment.doctor.doctor.pricing},00
                          </Heading>

                          <Text
                            color="#494949"
                            fontSize="14px"
                            fontWeight="300"
                          >
                            {selectedAppointment.doctor.doctor.speciality.join(
                              ", "
                            )}
                          </Text>
                          <GridItem area={"date"} pl="10px">
                            <Text fontSize="sm">
                              {new Date(
                                selectedAppointment.date
                              ).toLocaleDateString("pt-BR", {
                                day: "numeric",
                                month: "short",
                              })}
                            </Text>
                            <Text fontSize="sm" color="gray.500">
                              {new Date(
                                selectedAppointment.date
                              ).toLocaleTimeString("pt-BR", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </Text>
                          </GridItem>
                        </Box>
                      </Box>
                    </Flex>
                  </Flex>
                </CardHeader>
              </Card>
            )}
          </Box>
          <Spacer />
          <VStack mt={2}>
            <SecondaryButton bg="#19A588">
              Adicionar novo atendimento
            </SecondaryButton>
            <SecondaryButton
              onClick={() => {
                setOverlay(<OverlayOne />);
                onOpen();
              }}
            >
              {" "}
              Seguir para pagamento
            </SecondaryButton>
          </VStack>
        </Box>
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          {overlay}

          <ModalContent
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <ModalHeader>Atenção!</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontWeight="bold">
                Os atendimentos somente poderão ser cancelados até 24hs antes do
                horário agendado.
              </Text>
            </ModalBody>
            <ModalFooter>
              <AppointmentConfirmButton h="50px">
                Entendi
              </AppointmentConfirmButton>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </PatientSidebar>
  );
}
