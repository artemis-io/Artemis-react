import { Box, Heading, VStack, Image, Button } from "@chakra-ui/react";
import { useState } from "react";
import { PatientData } from "../Multiform/StepsPatientForm/PatientData";
import { PatientInfo } from "../Multiform/StepsPatientForm/PatientInfo";

export function PatientForm() {
  const [step, setStep] = useState(1);
  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <Box>
      <VStack>
        <Image src="/assets/images/logo.png" alt="logo" maxWidth="150px" />
        <Heading fontSize={{ base: "2xl", sm: "3xl" }} color="#747B7D" mb={4}>
          Cadastro de Paciente
        </Heading>
      </VStack>
      {step === 1 && <PatientData handleNextStep={handleNextStep} />}
      {step === 2 && <PatientInfo />}
      {step > 1 && (
        <Box p={2}>
          <Button
            bg={"blue.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "blue.500",
            }}
            onClick={handlePrevStep}
          >
            Voltar
          </Button>
        </Box>
      )}
    </Box>
  );
}
