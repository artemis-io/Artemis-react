import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Divider,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStep4Data } from "../../../../shared/reducer/AppointmentReducer";
import { apiMed } from "../../../../services/api";
import { LoadingCircle } from "../../../Style/LoadingCircle";

type Doctor = {
  id: string;
  name: string;
  doctor: {
    speciality: string[];
  };
};

type DoctorListProps = {
  handleNextStep: () => void;
};

const DoctorList = ({ handleNextStep }: DoctorListProps) => {
  const [activeLetters, setActiveLetters] = useState<string[]>([]);
  const doctorsRef = useRef<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const step3Data = useSelector(
    (state: any) => state.appointment.appointmentStep3Data.speciality
  );
    
  const handleSubmit = useCallback(
    (id_doctor: string, doctorName: string) => {
      dispatch(setStep4Data({ id_doctor, doctorName }));
      handleNextStep();
    },
    [dispatch, handleNextStep]
  );

  const fetchDoctors = useCallback(async () => {
    try {
      
      if (doctorsRef.current.length === 0) {
        const response = await apiMed.get(`/doctor/${step3Data}`);
        doctorsRef.current = response.data;
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    } catch (error) {
      console.error("Erro ao obter médicos:", error);
    }
  }, [step3Data]);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const handleAccordionClick = useCallback((letter: string) => {
    setActiveLetters((activeLetters) => {
      if (activeLetters.includes(letter)) {
        return activeLetters.filter((activeLetter) => activeLetter !== letter);
      } else {
        return [...activeLetters, letter];
      }
    });
  }, []);

  const renderDoctorsByLetter = useCallback(
    (letter: string) => {
      const filteredDoctors = doctorsRef.current.filter((doctor) =>
        doctor.name.startsWith(letter)
      );

      return (
        <VStack align="start" w="100%" spacing={4} mt={5}>
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <Button
                key={doctor.id}
                display="flex"
                height="80px"
                width="360px"
                padding="24px 12px"
                bg="white"
                alignItems="center"
                gap="22px"
                flexShrink={0}
                borderWidth="1px"
                borderRadius="20px"
                borderColor="gray.200"
                boxShadow="1px 1px 1px 1px rgba(0, 0, 0, 0.10)"
                onClick={() => handleSubmit(doctor.id, doctor.name)}
              >
                <Box>
                  <Heading color="#494949" fontSize="16px" fontWeight="700">
                    {doctor.name}
                  </Heading>
                  <Text color="#494949" fontSize="13px" fontWeight="300">
                    {doctor.doctor.speciality.join(", ")}
                  </Text>
                </Box>
              </Button>
            ))
          ) : (
            <Text>Não foram encontrados médicos com a letra {letter}.</Text>
          )}
        </VStack>
      );
    },
    [handleSubmit]
  );

  const getDoctorCountByLetter = useCallback((letter: string) => {
    const filteredDoctors = doctorsRef.current.filter((doctor) =>
      doctor.name.startsWith(letter)
    );
    return filteredDoctors.length;
  }, []);

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <Box>
      <Heading size="lg" color="#747B7D">
        Médicos - {step3Data}
      </Heading>

      <VStack align="start" w="100%" spacing={4} mt={5}>
        {Array.from(Array(26), (_, i) => String.fromCharCode(65 + i)).map(
          (letter) => (
            <Accordion minW="100%" key={letter} allowToggle>
              <AccordionItem minW="90%">
                <AccordionButton onClick={() => handleAccordionClick(letter)}>
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
                        {getDoctorCountByLetter(letter)}
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        <>&nbsp;</>médicos
                      </Text>
                      <AccordionIcon />
                    </Flex>
                  </Flex>
                </AccordionButton>
                <AccordionPanel>
                  {(activeLetters.includes(letter) ||
                    activeLetters.length === 0) &&
                    renderDoctorsByLetter(letter)}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          )
        )}
      </VStack>
    </Box>
  );
};

export default DoctorList;
