import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Heading,
  Text,
  VStack,
  Image,
  Flex,
  Divider,
  Box,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { differenceInYears } from "date-fns";
import SearchBar from "../../components/Main/SearchBar";
import { apiMed } from "../../services/api";
import { AUTH_TOKEN_STORAGE } from "../../shared/storage/config";
import { AppointmentList } from "../../shared/types";
import Sidebar from "../../components/Main/DoctorSideBar/Sidebar";
import { useNavigate } from "react-router-dom";
import { LoadingCircle } from "../../components/Style/LoadingCircle";

const AlphabeticalListPage: React.FC = () => {
  const history = useNavigate();

  const handleNav = (id: string) => {
    history(`/doctor/medical-record/${id}`);
  };

  const [isLoading, setIsLoading] = useState(true);
  const [activeLetters, setActiveLetters] = useState<string[]>([]);
  const [appointments, setAppointment] = useState<AppointmentList[]>([]);

  const fetchPatients = useCallback(async () => {
    try {
      setIsLoading(true); 

      const auth = localStorage.getItem(AUTH_TOKEN_STORAGE);

      const response = await apiMed.get("/appointment/history-doctor", {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      });

      console.log(response.data);

      setAppointment(response.data);
      setIsLoading(false); 
    } catch (error) {
      console.error("Error fetching patients:", error);
      setIsLoading(false); 
    }
  }, []);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const handleAccordionClick = (letter: string) => {
    setActiveLetters((prevLetters) =>
      prevLetters.includes(letter)
        ? prevLetters.filter((activeLetter) => activeLetter !== letter)
        : [...prevLetters, letter]
    );
  };

  const renderPatientsByLetter = (letter: string) => {
    const filteredPatients = appointments.filter((appointment) =>
      appointment?.patient.name.startsWith(letter)
    );
    return (
      <VStack align="start" spacing={2} minW="100%">
        {filteredPatients.map((appointment) => (
          <div
            key={appointment.id}
            onClick={() => handleNav(appointment.id_patient)} 
          >
            <PatientCard appointment={appointment} />
          </div>
        ))}
      </VStack>
    );
  };

  const getPatientCountByLetter = (letter: string) => {
    const filteredPatients = appointments.filter((appointment) =>
      appointment?.patient?.name.startsWith(letter)
    );
    return filteredPatients.length;
  };

  return (
    <Sidebar>
      <Flex direction="column" align="center" justify="center" px={4}>
        <Heading size="lg" color="#747B7D" alignSelf="flex-start">
          Meus Pacientes
        </Heading>
        <SearchBar />
        <VStack align="start" w="100%" spacing={4} mt={5}>
          {isLoading ? ( 
            <LoadingCircle /> 
          ) : (
            Array.from(Array(26), (_, i) => String.fromCharCode(65 + i)).map(
              (letter) => (
                <AccordionComponent
                  key={letter}
                  letter={letter}
                  activeLetters={activeLetters}
                  handleAccordionClick={handleAccordionClick}
                  patientCount={getPatientCountByLetter(letter)}
                >
                  {renderPatientsByLetter(letter)}
                </AccordionComponent>
              )
            )
          )}
        </VStack>
      </Flex>
    </Sidebar>
  );
};

type AccordionProps = {
  letter: string;
  activeLetters: string[];
  handleAccordionClick: (letter: string) => void;
  patientCount: number;
  children: React.ReactNode;
};

const AccordionComponent: React.FC<AccordionProps> = ({
  letter,
  activeLetters,
  handleAccordionClick,
  patientCount,
  children,
}) => {
  const isOpen = activeLetters.includes(letter) || activeLetters.length === 0;

  return (
    <Accordion
      minW="100%"
      allowToggle
      onChange={() => handleAccordionClick(letter)}
    >
      <AccordionItem minW="90%">
        <AccordionButton>
          <Flex justifyContent="space-between" alignItems="center" w="100%">
            <Flex alignItems="center" w="100%">
              <Text fontSize="lg" fontWeight="bold">
                {letter}
              </Text>
              <Divider height="1px" mx={2} flex="1" bg="gray.300" />
            </Flex>
            <Flex flexDirection="row" alignItems="center">
              <Text fontSize="sm" color="gray.500">
                {patientCount}
              </Text>
              <Text fontSize="sm" color="gray.500">
                &nbsp;pacientes
              </Text>
              <AccordionIcon />
            </Flex>
          </Flex>
        </AccordionButton>
        <AccordionPanel>{isOpen && children}</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

type PatientCardProps = {
  appointment: AppointmentList;
};

const PatientCard: React.FC<PatientCardProps> = ({ appointment }) => {
  const age = useMemo(
    () =>
      differenceInYears(
        new Date(),
        new Date(appointment?.patient?.profile.dateOfBirth)
      ),
    [appointment.patient.profile.dateOfBirth]
  );

  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      w="100%"
      display="flex"
      height="90px"
      width="360px"
      padding="12px"
      _hover={{
        background: "gray.100",
        cursor: "pointer",
      }}
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
            src={appointment?.patient?.avatar_url}
            alt="Foto de perfil"
          />
        </GridItem>
        <GridItem area={"name"}>
          <Text fontSize="lg" fontWeight="bold">
            {appointment?.patient?.name}
          </Text>
        </GridItem>
        <GridItem area={"age"}>
          <Text fontSize="sm">{age} anos</Text>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default AlphabeticalListPage;
