import { Box, Flex, FormControl, Text } from "@chakra-ui/react";

import { useDispatch } from "react-redux";
import PrimaryButton from "../../../Style/Buttons/Primarybutton";
import { setStep1Data } from "../../../../shared/reducer/AppointmentReducer";

export default function AppointmentType({ handleNextStep }: any) {
  const dispatch = useDispatch();

  const handleSubmit = (e: string) => {
    dispatch(setStep1Data({ type: e }));
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
        Tipo de Atendimento:
      </Text>
      <form>
        <FormControl>
          <Flex flexDirection="column" gap="12px">
            {/* <PrimaryButton onClick={() => handleSubmit("healthInsurance")} id="type">
              Convênio
            </PrimaryButton> */}
            <PrimaryButton onClick={() => handleSubmit("particular")} id="type">
              Particular
            </PrimaryButton>
          </Flex>
        </FormControl>
      </form>
    </Box>
  );
}