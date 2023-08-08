import { Box, Heading } from "@chakra-ui/react";

export default function Checkout() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" minH="85vh">
      <Heading fontSize="3xl" mb="36px" fontWeight={600} color="#D9D9D9">
        Pagamento
      </Heading>
    </Box>
  );
}
