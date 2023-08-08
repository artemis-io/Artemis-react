import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { CardCompleteProps } from "../../../shared/types";

const CardComplete: React.FC<CardCompleteProps> = ({ appointments }) => {
  const router = useNavigate();

  const handleNav = (route: any) => {
    router(route);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <VStack spacing={4} w="90%">
        {appointments.map((appointment) => (
          <Box key={appointment.id}>
            <Card w="360px" h="500px" borderRadius="20px" mb={2}>
              <Image
                p={2}
                alignSelf="center"
                w="124px"
                h="190px"
                objectFit="cover"
                src="/assets/images/doctor.jpg"
                alt="Picture of a doctor"
                borderRadius="lg"
              />
              <CardHeader alignSelf="justify">
                <Heading>{appointment.name}</Heading>
                <Text color="#494949">{appointment.spec}</Text>
              </CardHeader>
              <CardBody>
                <Text fontWeight="bold" fontSize="lg" mb={2} color="#494949">
                  Atendimento Particular
                </Text>

                <Text>
                  Data:<>&nbsp;</>
                  <span>
                    {new Date(appointment.date).toLocaleDateString("pt-BR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </Text>
                <Text>Horário: {appointment.time}</Text>
                <Text>
                  <span>{appointment.spec}</span>
                </Text>
              </CardBody>
            </Card>

            <Button
              onClick={() => handleNav("/patient/schedule")}
              bg="#0078D7"
              w="293px"
              h="50px"
              color="#fafafa"
              fontSize="16px"
            >
              Confirmar Consulta
            </Button>
            <Button
              onClick={() => handleNav("/patient/schedule")}
              bg="#D73A3A"
              w="293px"
              h="50px"
              color="#fafafa"
              fontSize="16px"
              mt={2}
            >
              Cancelar Consulta
            </Button>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default CardComplete;
