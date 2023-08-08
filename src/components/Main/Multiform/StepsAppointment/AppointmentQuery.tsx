import { Box, Text, Flex } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import PrimaryButton from "../../../Style/Buttons/Primarybutton";
import { setStep2Data } from "../../../../shared/reducer/AppointmentReducer";

export default function AppointmentQuery({ handleNextStep }: any) {
  const dispatch = useDispatch();

  const handleSubmit = (e: string) => {
    dispatch(setStep2Data({ query: e }));
    handleNextStep();
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minH="85vh"
    >
      <Text
        fontSize="3xl"
        mb="36px"
        fontWeight={600}
        color="#D9D9D9"
        align="center"
      >
        Tipo de Consulta:
      </Text>
      <Flex flexDirection="column" gap="12px">
        <PrimaryButton onClick={() => handleSubmit("person")}>
          Presencial
        </PrimaryButton>
        <PrimaryButton onClick={() => handleSubmit("teleconsultation")}>
          Teleconsulta
        </PrimaryButton>
      </Flex>
    </Box>
  );
}
