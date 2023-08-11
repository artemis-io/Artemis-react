import { Box, Heading, Stack } from "@chakra-ui/react";

import ImageProfilePatient from "../../components/Main/FormProfile/ImageProfilePatient";
import FormPatientProfile from "../../components/Main/FormProfile/FormPatientProfile";
import PatientSidebar from "../../components/Main/PatientSideBar/PatientSideBar";

export default function SettingsPatient() {
  return (
    <PatientSidebar>
      <Box>
        <Box>
          <Stack spacing={4} w={"full"} maxW={"md"} p={6}>
            <Heading fontSize="3xl" textAlign="center">
              Configurações de conta
            </Heading>
            <ImageProfilePatient />
            <FormPatientProfile />
          </Stack>
        </Box>
      </Box>
    </PatientSidebar>
  );
}
