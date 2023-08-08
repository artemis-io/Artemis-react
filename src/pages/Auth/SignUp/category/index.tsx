import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { DoctorForm } from "../../../../components/Main/Forms/DoctorForm";
import { PatientForm } from "../../../../components/Main/Forms/PatientForm";

const Register = () => {
  const { category } = useParams();

  return (
    <Box p={8} fontWeight="semibold">
      {category === "doctor" && <DoctorForm />}
      {category === "patient" && <PatientForm />}
    </Box>
  );
};

export default Register;
