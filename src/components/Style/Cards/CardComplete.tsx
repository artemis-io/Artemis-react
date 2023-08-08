import {
  Box,
  Button,
  Flex,
  Grid,
  Image,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface Appointment {
  id: number;
  name: string;
  spec: string;
  imageUrl: string;
  modality: string;
  date: string;
  time: string;
}

interface CardCompleteProps {
  appointments: Appointment[];
}

const CardComplete: React.FC<CardCompleteProps> = ({ appointments }) => {
  const router = useNavigate();
  
  const handleNav = (route: any) => {
    router(route);
  };

  return (
    <>
      <Text fontSize="xl" fontWeight="bold" mt={4}>
        MInhas Consultas
      </Text>
      <VStack spacing={4} w="90%">
        {appointments.map((appointment) => (
          <Box
            key={appointment.id}
            bg="white"
            p={4}
            borderRadius="md"
            w="100%"
            borderColor="gray.200"
            boxShadow="1px 1px 1px 1px rgba(0, 0, 0, 0.10)"
          >
            <Grid
              gridTemplateColumns="80px 1fr"
              alignItems="center"
              columnGap={2}
            >
              <Image
                src={appointment.imageUrl}
                alt="Imagem do Card"
                width="80px"
                height="85px"
                objectFit="cover"
              />
              <Box>
                <Flex flexDirection="row">
                  <Text fontWeight="bold" fontSize="lg" mb={2}>
                    {appointment.name}
                  </Text>
                  <Spacer />
                  <Text>
                    <span>
                      {new Date(appointment.date).toLocaleDateString("pt-BR", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </Text>
                </Flex>
                <Text>
                  <span>{appointment.spec}</span>
                </Text>
                <Flex flexDirection="row">
                  <Text>
                    <span>{appointment.modality}</span>
                  </Text>
                  <Spacer />
                  <Text>{appointment.time}</Text>
                </Flex>
              </Box>
            </Grid>
          </Box>
        ))}
        <Button
          position="fixed"
          bottom="60px"
          p={4}
          onClick={() => handleNav("/patient/schedule")}
          bg="#19A588"
          w="293px"
          h="50px"
          color="#fafafa"
          fontSize="16px"
        >
          Adicionar Novo Atendimento
        </Button>
        <Button
          position="fixed"
          bottom={1}
          p={4}
          onClick={() => handleNav("/patient/documents")}
          bg="#0078D7"
          w="293px"
          h="50px"
          color="#fafafa"
          fontSize="16px"
        >
          Anexar Documentos
        </Button>
      </VStack>
    </>
  );
};

export default CardComplete;
