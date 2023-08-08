import { Center } from "@chakra-ui/react";

export const IconBox = ({ icon, bg }: any) => {
  return (
    <Center bg={bg} color="white" borderRadius="full" boxSize="60px" mb={4}>
      {icon}
    </Center>
  );
};
