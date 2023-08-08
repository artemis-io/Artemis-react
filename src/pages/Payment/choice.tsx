// pages/ChoicePage.tsx
import { VStack, Heading, Button } from "@chakra-ui/react";
import { FaCreditCard, FaBarcode } from "react-icons/fa";
import { Link } from "react-router-dom";

const ChoicePage = () => {
  return (
    <VStack spacing={8}>
      <Heading as="h1" size="lg" pb="10">
        Escolha a forma de pagamento:
      </Heading>
      <Link to="/payment/creditcard">
        <Button
          boxSize={40}
          display="flex"
          flexDir="column"
          colorScheme="blue"
          size="lg"
          gap="2"
        >
          <FaCreditCard size={80} />
          Cartão
        </Button>
      </Link>
      <Link to="/payment/billet">
        <Button
          boxSize={40}
          display="flex"
          flexDir="column"
          colorScheme="green"
          size="lg"
          gap="2"
        >
          <FaBarcode size={80} />
          Boleto
        </Button>
      </Link>
    </VStack>
  );
};

export default ChoicePage;
