import { Box, Heading, Stack } from "@chakra-ui/react";

import ImageProfileDoctor from "../../components/Main/FormProfile/ImageProfileDoctor";
import FormDoctorProfile from "../../components/Main/FormProfile/FormDoctorProfile";
import Sidebar from "../../components/Main/SideBar/Sidebar";

export default function SettingsDoctor() {
  return (
    <Sidebar>
      <Box>
        <Box>
          <Stack spacing={4} w={"full"} maxW={"md"} p={6}>
            <Heading fontSize="3xl" textAlign="center">
              Configurações de conta
            </Heading>
            <ImageProfileDoctor />
            <FormDoctorProfile />
          </Stack>
        </Box>
      </Box>
    </Sidebar>
  );
}
