import { useState } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";
import { FiShare2 } from "react-icons/fi";

const MedicalRecord = () => {
  const [activeAccordionIndex, setActiveAccordionIndex] = useState(0);

  const handleAccordionClick = (index: number) => {
    if (index === activeAccordionIndex) {
      setActiveAccordionIndex(-1);
    } else {
      setActiveAccordionIndex(index);
    }
  };

  const handleGerarArquivo = () => {
    // Lógica para gerar o arquivo em PDF com os dados do paciente
  };

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
        <Grid templateColumns="repeat(5, 1fr)" gap={4}>
          <GridItem colSpan={2}>
            {" "}
            <Text fontWeight="bold">Paciente</Text>
            <Text mb={2}>{"paciente"}</Text>
          </GridItem>
          <GridItem colStart={4} colEnd={6}>
            {" "}
            <Text fontWeight="bold">Idade</Text>
            <Text mb={2}>{"paciente"}</Text>{" "}
          </GridItem>
        </Grid>
        <Flex flexDirection="column" alignItems="flex-start">
          <Text fontWeight="bold">Convênio</Text>
          <Text mb={2}>{"paciente"}</Text>
        </Flex>
        <Flex flexDirection="column" alignItems="flex-start">
          <Text fontWeight="bold">Sexo</Text>
          <Text mb={2}>{"paciente"}</Text>
        </Flex>
      </Box>

      <Accordion allowMultiple w="100%" maxW="400px">
        <AccordionItem>
          <h2>
            <AccordionButton
              bg={activeAccordionIndex === 0 ? "blue.500" : "blue.400"}
              color="white"
              borderRadius={10}
              py={3}
              mb={2}
              _hover={{ bg: "blue.600" }}
              onClick={() => handleAccordionClick(0)}
            >
              <Box flex="1" textAlign="left">
                Atestado
              </Box>
              <AccordionIcon
                transform={activeAccordionIndex === 0 ? "rotate(180deg)" : ""}
              />
            </AccordionButton>
          </h2>
          <AccordionPanel p={4}>Conteúdo do atestado</AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton
              bg={activeAccordionIndex === 1 ? "blue.500" : "blue.400"}
              color="white"
              borderRadius={10}
              py={3}
              mb={2}
              _hover={{ bg: "blue.600" }}
              onClick={() => handleAccordionClick(1)}
            >
              <Box flex="1" textAlign="left">
                Medicamento
              </Box>
              <AccordionIcon
                transform={activeAccordionIndex === 1 ? "rotate(180deg)" : ""}
              />
            </AccordionButton>
          </h2>
          <AccordionPanel p={4}>Conteúdo do medicamento</AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton
              bg={activeAccordionIndex === 2 ? "blue.500" : "blue.400"}
              color="white"
              borderRadius={10}
              py={3}
              mb={2}
              _hover={{ bg: "blue.600" }}
              onClick={() => handleAccordionClick(2)}
            >
              <Box flex="1" textAlign="left">
                Evolução
              </Box>
              <AccordionIcon
                transform={activeAccordionIndex === 2 ? "rotate(180deg)" : ""}
              />
            </AccordionButton>
          </h2>
          <AccordionPanel p={4}>Conteúdo da evolução</AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton
              bg={activeAccordionIndex === 4 ? "blue.500" : "blue.400"}
              color="white"
              borderRadius={10}
              py={3}
              mb={2}
              _hover={{ bg: "blue.600" }}
              onClick={() => handleAccordionClick(4)}
            >
              <Box flex="1" textAlign="left">
                Exames
              </Box>
              <AccordionIcon
                transform={activeAccordionIndex === 4 ? "rotate(180deg)" : ""}
              />
            </AccordionButton>
          </h2>
          <AccordionPanel p={4}>Conteúdo dos exames</AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Button
        mt={4}
        py={6}
        colorScheme="blue"
        rightIcon={<FiShare2 fontSize={25} />}
        width="100%"
        maxW="400px"
        justifyContent={"space-between"}
        onClick={handleGerarArquivo}
      >
        Gerar Arquivo
      </Button>
    </Flex>
  );
};

export default MedicalRecord;
