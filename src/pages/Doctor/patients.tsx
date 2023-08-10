import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Heading,
} from "@chakra-ui/react";
import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Text,
  VStack,
  Image,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { apiMed } from "../../services/api";
import SearchBar from "../../components/Main/SearchBar";
import { differenceInYears } from "date-fns";

type Patient = {
  id: string;
  name: string;
  avatar_url: string;
  profile: {
    dateOfBirth: Date;
  };
};

const AlphabeticalListPage: React.FC = () => {
  const [activeLetters, setActiveLetters] = useState<string[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await apiMed.get("/user/all");
        setPatients(response.data);
        console.log("response:", response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  const handleAccordionClick = (letter: string) => {
    if (activeLetters.includes(letter)) {
      setActiveLetters(
        activeLetters.filter((activeLetter) => activeLetter !== letter)
      );
    } else {
      setActiveLetters([...activeLetters, letter]);
    }
  };

  const renderPatientsByLetter = (letter: string) => {
    const filteredPatients = patients.filter((patient) =>
      patient.name.startsWith(letter)
    );
    return (
      <VStack align="start" spacing={2} minW="100%">
        {filteredPatients.map((patient) => (
          <Box
            key={patient.name}
            borderWidth="1px"
            borderRadius="md"
            w="100%"
            display="flex"
            height="90px"
            width="360px"
            padding="12px"
          >
            <Grid
              templateAreas={`"img name"
                                  "img age"`}
              gridTemplateRows={"30px 1fr"}
              gridTemplateColumns={"50px 260px"}
              gap={4}
            >
              <GridItem area={"img"}>
                <Image
                  boxSize="70px"
                  width="50px"
                  borderRadius={10}
                  objectFit="cover"
                  src={patient.avatar_url}
                  alt="Foto de perfil"
                />
              </GridItem>
              <GridItem area={"name"}>
                <Text fontSize="lg" fontWeight="bold">
                  {patient.name}
                </Text>
              </GridItem>
              <GridItem area={"age"}>
                <Text fontSize="sm">
                  {differenceInYears(
                    new Date(),
                    new Date(patient.profile.dateOfBirth)
                  )}{" "}
                  anos
                </Text>
              </GridItem>
              {/* <GridItem colStart={4} colEnd={6}>
                <Button bg="#E7EEF8" color="#0078D7" w="132px" h="24px">
                  Histórico
                </Button>
              </GridItem> */}
            </Grid>
            {/* <Text fontSize="sm">{patient.age}</Text> */}
          </Box>
        ))}
      </VStack>
    );
  };

  const getPatientCountByLetter = (letter: string) => {
    const filteredPatients = patients.filter((patient) =>
      patient.name.startsWith(letter)
    );
    return filteredPatients.length;
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="100vh"
      minW="100vw"
      px={4}
    >
      <Heading size="lg" color="#747B7D" alignSelf="flex-start">
        Pacientes
      </Heading>
      <SearchBar />
      <VStack align="start" w="100%" spacing={4} mt={5}>
        {Array.from(Array(26), (_, i) => String.fromCharCode(65 + i)).map(
          (letter) => (
            <Accordion
              key={letter}
              minW="100%"
              allowToggle
              onChange={(isOpen) => {
                if (isOpen) {
                  handleAccordionClick(letter);
                }
              }}
            >
              <AccordionItem minW="90%">
                <AccordionButton>
                  <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    w="100%"
                  >
                    <Flex alignItems="center" w="100%">
                      <Text fontSize="lg" fontWeight="bold">
                        {letter}
                      </Text>
                      <Divider height="1px" mx={2} flex="1" bg="gray.300" />
                    </Flex>
                    <Flex flexDirection="row" alignItems="center">
                      <Text fontSize="sm" color="gray.500">
                        {getPatientCountByLetter(letter)}
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        <>&nbsp;</>pacientes
                      </Text>
                      <AccordionIcon />
                    </Flex>
                  </Flex>
                </AccordionButton>
                <AccordionPanel>
                  {(activeLetters.includes(letter) ||
                    activeLetters.length === 0) &&
                    renderPatientsByLetter(letter)}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          )
        )}
      </VStack>
    </Flex>
  );
};

export default AlphabeticalListPage;
