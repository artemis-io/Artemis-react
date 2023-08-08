import { Box, Heading, Text } from "@chakra-ui/react";
import { DoctorInfo } from "../../../shared/interface";

const DoctorCard = ({ name, doctor }: DoctorInfo) => {
  return (
    <Box
      display="flex"
      height="80px"
      width="360px"
      padding="24px 12px"
      bg="white"
      alignItems="center"
      gap="22px"
      flexShrink={0}
      borderWidth="1px"
      borderRadius="20px"
      borderColor="gray.200"
      boxShadow="1px 1px 1px 1px rgba(0, 0, 0, 0.10)"
    >
      <Box>
        <Heading color="#494949" fontSize="16px" fontWeight="700">
          {name}
        </Heading>
        <Text color="#494949" fontSize="13px" fontWeight="300">
          {doctor.speciality.join(", ")}
        </Text>
      </Box>
    </Box>
  );
};

export default DoctorCard;
