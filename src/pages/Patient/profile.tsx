import { Box, Heading, Stack } from "@chakra-ui/react";

import ImageProfile from "../../components/Main/FormProfile/ImageProfile";
import FormPatientProfile from "../../components/Main/FormProfile/FormPatientProfile";

export default function SettingsPatient() {
  return (
    <Box>
      <Box>
        <Stack spacing={4} w={"full"} maxW={"md"} p={6}>
          <Heading fontSize={{ base: "2xl", sm: "3xl" }}>
            Configurações de conta
          </Heading>

          <ImageProfile />
          <FormPatientProfile />
        </Stack>
      </Box>
    </Box>
  );
}
