import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  FormControl,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  setStep3Data,
  submitDoctorData,
} from "../../../../shared/reducer/DoctorReducer";
import { DoctorStep3Data } from "../../../../shared/types";
import { useNavigate } from "react-router-dom";
import { apiMed } from "../../../../services/api";
import { useToast } from "@chakra-ui/react";
import StyledLabel from "../../Forms/StyledLabel";


function DoctorChose() {
  const router = useNavigate();
  const dispatch = useDispatch();

  const step1Data = useSelector((state: any) => state.doctor.doctorStep1Data);
  const step2Data = useSelector((state: any) => state.doctor.doctorStep2Data);
  const step3Data = useSelector((state: any) => state.doctor.doctorStep3Data);

  const [specialties, setSpecialties] = useState([]);
  const [selectedSpecialities, setSelectedSpecialities] = useState([]);
  const [step3, setStep3] = useState({
    crm: "",
    pricing: "",
    bio: "",
    speciality: [],
  });
  const toast = useToast();


  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const response = await apiMed.get("/admin/all/speciality");
        setSpecialties(response.data.map((item: any) => item.speciality));
      } catch (error) {
        console.error("Erro ao obter especialidades:", error);
      }
    };

    fetchSpecialties();
  }, []);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    setStep3((prevStep3) => ({
      ...prevStep3,
      [name]: value,
    }));

    dispatch(setStep3Data({ ...step3Data, [name]: value }));
  };

  const handleSpecialityChange = (speciality: any) => {
    setSelectedSpecialities((prevSelected: any) =>
      prevSelected.includes(speciality)
        ? prevSelected.filter((item: any) => item !== speciality)
        : [...prevSelected, speciality]
    );
  };

  const handleFinish = async (e: any) => {
    e.preventDefault();

    const formDataDoctor = {
      ...step1Data,
      ...step2Data,
      ...step3,
      speciality: selectedSpecialities,
    };

    console.log(JSON.stringify(formDataDoctor));

    try {
      await apiMed.post("/doctor", formDataDoctor);

      router("/doctor/homepage");
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        position: "top",
        description: "Algo deu errado, tente novamente.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Stack spacing={6} w="full" maxW="md" p={2}>
        <FormControl id="crm">
          <StyledLabel>CRM</StyledLabel>
          <Input
            variant="flushed"
            onChange={handleInputChange}
            value={step3.crm}
            name="crm"
            type="text"
          />
        </FormControl>
        <FormControl id="pricing">
          <StyledLabel>Preço da Consulta</StyledLabel>
          <Input
            variant="flushed"
            onChange={handleInputChange}
            value={step3.pricing}
            name="pricing"
            type="text"
          />
        </FormControl>
        <FormControl id="bio">
          <StyledLabel>Sobre você</StyledLabel>
          <Textarea
            variant="flushed"
            placeholder="Breve descrição sobre suas atividades"
            onChange={handleInputChange}
            value={step3.bio}
            name="bio"
            boxShadow="md"
            h="100px"
          />
        </FormControl>
        <FormControl id="speciality">
          <Accordion allowMultiple>
            <AccordionItem>
              <AccordionButton>
                <Box
                  as="span"
                  flex="1"
                  textAlign="left"
                  fontWeight="bold"
                  color="#494949"
                >
                  Especialidades Médicas
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Stack>
                  {specialties.map((speciality) => (
                    <Checkbox
                      key={speciality}
                      fontWeight="normal"
                      isChecked={selectedSpecialities.includes(speciality)}
                      onChange={() => handleSpecialityChange(speciality)}
                    >
                      {speciality}
                    </Checkbox>
                  ))}
                </Stack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </FormControl>
        <Button
          onClick={handleFinish}
          bg="blue.400"
          color="white"
          w="full"
          _hover={{
            bg: "blue.500",
          }}
        >
          Concluir Registro
        </Button>
      </Stack>
    </Box>
  );
}

export default DoctorChose;
