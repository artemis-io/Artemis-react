import React from "react";
import { Box, Text, Image } from "@chakra-ui/react";

interface PatientDetailsProps {
  name: string;
  avatarUrl: string;
}

const PatientDetails: React.FC<PatientDetailsProps> = ({ name, avatarUrl }) => {
  return (
    <Box display="flex" alignItems="center">
      <Image
        boxSize="40px"
        width="40px"
        borderRadius="50%"
        objectFit="cover"
        src={avatarUrl}
        alt="Foto de perfil"
        mr={2}
      />
      <Text fontSize="lg" fontWeight="bold">
        {name}
      </Text>
    </Box>
  );
};

export default PatientDetails;
