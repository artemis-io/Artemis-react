import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { PatientData } from "../Multiform/StepsPatientForm/PatientData";
import { PatientInfo } from "../Multiform/StepsPatientForm/PatientInfo";

export function PatientForm() {
  const [step, setStep] = useState(1);
  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  return (
    <Box>
      {step === 1 && <PatientData handleNextStep={handleNextStep} />}
      {step === 2 && <PatientInfo />}
    </Box>
  );
}
