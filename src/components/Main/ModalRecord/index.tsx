import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { FiShare2 } from "react-icons/fi";
import { MedicalRecordData } from '../../../pages/Doctor/medicalRecord';

interface ModalRecordProps {
  historyData: MedicalRecordData["history"]; // Defina o tipo apropriado para os dados de histórico
}

const ModalRecord: React.FC<ModalRecordProps> = ({ historyData }) => {
  return (
    <Flex direction="column" align="center" justify="center" px={4}>
      <Text fontSize="xl" fontWeight="bold" mb={10}>
        Histórico
      </Text>

      <Box
        bg="white"
        p={4}
        borderRadius={20}
        shadow="md"
        mb={4}
        w="100%"
        maxW="400px"
      >
        <Text>Altura: {historyData.altura}</Text>
        <Text>Anotações: {historyData.anotacoes}</Text>
        <Text>Frequência Cardíaca: {historyData.freqcardiaca}</Text>
        {/* ... e assim por diante para outros campos */}
      </Box>

      <Button
        mt={4}
        py={6}
        colorScheme="blue"
        rightIcon={<FiShare2 fontSize={25} />}
        width="100%"
        maxW="400px"
        justifyContent={"space-between"}
      >
        Gerar Arquivo
      </Button>
    </Flex>
  );
};

export default ModalRecord;
