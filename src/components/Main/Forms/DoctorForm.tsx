import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { DoctorData } from "../Multiform/StepsDoctorForm/DoctorData";
import { DoctorInfo } from "../Multiform/StepsDoctorForm/DoctorInfo";
import { DoctorChose } from "../Multiform/StepsDoctorForm/DoctorChose";

export function DoctorForm() {
  const [step, setStep] = useState(1);
  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  return (
    <Box>
      {step === 1 && <DoctorData handleNextStep={handleNextStep} />}
      {step === 2 && <DoctorInfo handleNextStep={handleNextStep} />}
      {step === 3 && <DoctorChose />}
    </Box>
  );
}
