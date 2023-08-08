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
} from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitFormData } from "../../../../shared/reducer/AppointmentReducer";
import ScheduleResumeCard from "../../../Style/Cards/ScheduleResumeCard";
import SecondaryButton from "../../../Style/Buttons/SecondayButton";
import AppointmentConfirmButton from "../../../Style/Buttons/AppointmentConfirmButton";

export default function Order() {
  const dispatch = useDispatch();
  const step1Data = useSelector(
    (state: any) => state.appointment.appointmentStep1Data
  );
  const step2Data = useSelector(
    (state: any) => state.appointment.appointmentStep2Data
  );
  const step3Data = useSelector(
    (state: any) => state.appointment.appointmentStep3Data
  );
  const step4Data = useSelector(
    (state: any) => state.appointment.appointmentStep4Data
  );
  const step5Data = useSelector(
    (state: any) => state.appointment.appointmentStep5Data
  );
  const step6Data = useSelector(
    (state: any) => state.appointment.appointmentStep6Data
  );

  const handleFinish = () => {
    // Crie o objeto com os dados a serem enviados
    const formData = {
      step1Data,
      step2Data,
      step3Data,
      step4Data,
      step5Data,
    };
    // Execute a ação de envio dos dados (você precisa criar essa ação no reducer)
    dispatch(submitFormData(formData));
  };

  const OverlayOne = () => (
    <ModalOverlay bg="#494949" backdropFilter="blur(10px) hue-rotate(90deg)" />
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  return (
    <Box>
      <Heading color="#747B7D" fontSize="24px" mb={2}>
        Total - R$ 500,00
      </Heading>

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-around"
        h="78vh"
      >
        <Box display="flex" flexDirection="column" gap={2}>
          <ScheduleResumeCard
            name={step4Data?.doctorName}
            spec={step3Data?.speciality}
            imageUrl={""}
            price={2500}
            date={step6Data?.date}
          />
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
            <AppointmentConfirmButton h="50px" onClick={handleFinish}>
              Entendi
            </AppointmentConfirmButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
