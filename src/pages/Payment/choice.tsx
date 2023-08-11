// pages/ChoicePage.tsx
import {
  VStack,
  Heading,
  Button,
  ModalOverlay,
  useDisclosure,
  Image,
  Box,
  Grid,
  GridItem,
  Text,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  AbsoluteCenter,
} from "@chakra-ui/react";
import { FaCreditCard, FaBarcode } from "react-icons/fa";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import PatientSidebar from "../../components/Main/PatientSideBar";
import { Appointment } from "../../shared/entities/appointments.entities";
import AppointmentConfirmButton from "../../components/Style/Buttons/AppointmentConfirmButton";

interface OrderProps {
  selectedAppointment: Appointment | null;
}

export default function ChoicePage({ selectedAppointment }: OrderProps) {
  const OverlayOne = () => (
    <ModalOverlay bg="#2b2727" backdropFilter="blur(10px) hue-rotate(90deg)" />
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onOpen(); // Abre o modal assim que a página for carregada
  }, []);

  return (
    <PatientSidebar>
      <Box minH="85vh">
        <Center p={4}>
          <Heading color="#747B7D">Pagamento</Heading>
        </Center>

        {selectedAppointment && (
          <Box
            key={selectedAppointment.id}
            bg="white"
            p={6}
            borderRadius="12px"
            w="100%"
            boxShadow="md"
            position="relative"
          >
            <Grid
              templateAreas={`"img name name"
                            "img spec date"
                            `}
              gridTemplateRows={"20px 1fr 5px"}
              gridTemplateColumns={"60px 1fr"}
              gap={1}
            >
              <GridItem area={"img"}>
                <Image
                  boxSize="90px"
                  width="50px"
                  borderRadius={10}
                  objectFit="cover"
                  src={selectedAppointment.doctor.avatar_url}
                  alt="Foto de perfil"
                />
              </GridItem>
              <GridItem area={"name"}>
                <Text fontSize="lg" fontWeight="bold">
                  {selectedAppointment.doctor.profile.gender === "male"
                    ? "Dr. "
                    : "Dra. "}
                  {selectedAppointment.doctor.name}
                </Text>
              </GridItem>
              <GridItem area={"spec"} mt={2}>
                <Text fontSize="sm" color="gray.500">
                  {selectedAppointment.doctor.doctor.speciality.join(", ")}
                </Text>
                <Heading color="#494949" fontSize="16px" mt={2}>
                  R${selectedAppointment.doctor.doctor.pricing},00
                </Heading>
              </GridItem>
              <GridItem area={"date"} pl="8px">
                <Text fontSize="sm">
                  {new Date(selectedAppointment.date).toLocaleDateString(
                    "pt-BR",
                    {
                      day: "numeric",
                      month: "short",
                    }
                  )}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {new Date(selectedAppointment.date).toLocaleTimeString(
                    "pt-BR",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </Text>
              </GridItem>
            </Grid>
          </Box>
        )}
        <Box mt={4}>
          <VStack spacing={2}>
            <Link to="/payment/creditcard">
              <Button
                boxSize={40}
                display="flex"
                flexDir="column"
                colorScheme="blue"
                size="lg"
                gap="2"
              >
                <FaCreditCard size={80} />
                Cartão
              </Button>
            </Link>
            <Link to="/payment/billet">
              <Button
                boxSize={40}
                display="flex"
                flexDir="column"
                colorScheme="green"
                size="lg"
                gap="2"
              >
                <FaBarcode size={80} />
                Boleto
              </Button>
            </Link>
          </VStack>
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
        <ModalOverlay
          bg="#2b2727"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          bg="transparent"
        >
          <ModalHeader color="#fafafa">Atenção!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" color="#fafafa">
              Os atendimentos somente poderão ser cancelados até 24hs antes do
              horário agendado.
            </Text>
          </ModalBody>
          <ModalFooter>
            <AppointmentConfirmButton h="50px" mt={10} onClick={onClose}>
              Entendi
            </AppointmentConfirmButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </PatientSidebar>
  );
}
