import { Box, Center, Heading, Image, VStack, Button } from "@chakra-ui/react";
import { useState } from "react";
import { DoctorData } from "../Multiform/StepsDoctorForm/DoctorData";
import { DoctorInfo } from "../Multiform/StepsDoctorForm/DoctorInfo";
import DoctorChose from "../Multiform/StepsDoctorForm/DoctorChose";

export function DoctorForm() {
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
          Cadastro de Médico
        </Heading>
      </VStack>
      {step === 1 && <DoctorData handleNextStep={handleNextStep} />}
      {step === 2 && <DoctorInfo handleNextStep={handleNextStep} />}
      {step === 3 && <DoctorChose />}
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