import {
  Box,
  Button,
  Flex,
  Text,
  VStack,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { FiShare2, FiHeart, FiAlertCircle, FiFileText } from "react-icons/fi";
import { MedicalRecordDataDoctor } from "../../../shared/interface";

interface ModalRecordProps {
  historyData: MedicalRecordDataDoctor["history"]; // Defina o tipo apropriado para os dados de histórico
}

const ModalRecordDoctor: React.FC<ModalRecordProps> = ({
  historyData,
}) => {
  return (
    <Flex direction="column" align="center" justify="center" px={4}>
      <Text fontSize="xl" fontWeight="bold" mb={10}>
        Detalhes do Histórico
      </Text>

      <Box
        bg="white"
        p={4}
        borderRadius={20}
        shadow="md"
        mb={4}
        w="100%"
        maxW="600px"
      >
        <VStack spacing={4} align="start">
          <HStack>
            <Icon as={FiAlertCircle} fontSize="xl" color="blue.500" />
            <Text fontSize="lg" fontWeight="bold">
              Data da Consulta:
            </Text>
            <Text fontSize="lg">{historyData.alergias}</Text>
          </HStack>

          <HStack>
            <Icon as={FiHeart} fontSize="xl" color="red.500" />
            <Text fontSize="lg" fontWeight="bold">
              Queixa Principal:
            </Text>
            <Text fontSize="lg">{historyData.queixaprincipal}</Text>
          </HStack>

          <HStack>
            <Icon as={FiFileText} fontSize="xl" color="purple.500" />
            <Text fontSize="lg" fontWeight="bold">
              História da Doença:
            </Text>
            <Text fontSize="lg">{historyData.historiadoenca}</Text>
          </HStack>

          {/* Adicione mais propriedades e ícones conforme necessário */}
        </VStack>
      </Box>

      <Button
        mt={4}
        py={6}
        colorScheme="blue"
        rightIcon={<FiShare2 fontSize={25} />}
        width="100%"
        maxW="600px"
        justifyContent={"space-between"}
      >
        Gerar Arquivo
      </Button>
    </Flex>
  );
};
export default ModalRecordDoctor;
