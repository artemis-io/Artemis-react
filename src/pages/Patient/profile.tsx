import { Box, Heading, Stack } from "@chakra-ui/react";

import ImageProfile from "../../components/Main/FormProfile/ImageProfile";
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
            <ImageProfile />
            <FormPatientProfile />
          </Stack>
        </Box>
      </Box>
    </PatientSidebar>
  );
}
