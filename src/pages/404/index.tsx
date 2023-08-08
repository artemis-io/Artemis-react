import { Box, Center, Heading, Button, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; // Importe o useHistory

const NotFound = () => {
  const history = useNavigate(); // Inicialize o useHistory

  const handleGoBack = () => {
    history(-1); // Use o método goBack() para navegar para a página anterior
  };

  return (
    <Center height="70vh">
      <Box textAlign="center">
        <Heading fontSize="5xl" mb={8} color="black">
          404
        </Heading>
        <Heading fontSize="2xl" mb={4} color="black">
          Página não encontrada
        </Heading>
        <Button
          as={Link}
          onClick={handleGoBack} // Chame a função handleGoBack ao clicar no botão
          colorScheme="blue"
          color="white"
          size="lg"
        >
          Voltar
        </Button>
      </Box>
    </Center>
  );
};

export default NotFound;
