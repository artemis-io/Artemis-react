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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setStep3Data,
  submitDoctorData,
} from "../../../../shared/reducer/DoctorReducer";
import { apiMed } from "../../../../services/api";
import { DoctorStep3Data } from "../../../../shared/types";
import { useNavigate } from "react-router-dom";

export function DoctorChose() {
  const router = useNavigate();
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [step3, setStep3] = useState<DoctorStep3Data>({
    crm: "",
    speciality: [],
  });

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const response = await apiMed.get("/admin/all/speciality");
        setSpecialties(
          response.data.map(
            (speciality: { speciality: string }) => speciality.speciality
          )
        );
      } catch (error) {
        console.error("Erro ao obter especialidades:", error);
      }
    };

    fetchSpecialties();
  }, []);
  const dispatch = useDispatch();
  const step1Data = useSelector((state: any) => state.doctor.doctorStep1Data);
  const step2Data = useSelector((state: any) => state.doctor.doctorStep2Data);
  const step3Data = useSelector((state: any) => state.doctor.doctorStep3Data);
  console.log("2", step2Data);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStep3((prevFormData) => ({ ...prevFormData, [name]: value }));
    dispatch(setStep3Data({ ...step3, [name]: value }));
  };
  

  const handleSpecialityChange = (speciality: string) => {
    if (step3.speciality.includes(speciality)) {
      setStep3((prevFormData) => ({
        ...prevFormData,
        speciality: prevFormData.speciality.filter(
          (item) => item !== speciality
        ),
      }));
      dispatch(
        setStep3Data({
          ...step3Data,
          speciality: step3Data.speciality.filter((item: string) => item !== speciality),
        })
      );
    } else {
      setStep3((prevFormData) => ({
        ...prevFormData,
        speciality: [...prevFormData.speciality, speciality],
      }));
      dispatch(
        setStep3Data({
          ...step3Data,
          speciality: [...step3Data.speciality, speciality],
        })
      );
    }
  };

  const handleFinish = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const formDataDoctor = {
      ...step1Data,
      ...step2Data,
      ...step3Data,
    };
  console.log('FormData:', formDataDoctor)
    try {
      const response = await apiMed.post("/doctor", formDataDoctor, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log(response);
  
      router("/doctor/homepage");
    } catch (error) {
      console.error(error);
    }
  };
  


  return (
    <Box>
      <FormControl id="crm" isRequired>
        <FormLabel>CRM</FormLabel>
        <Input
          backgroundColor="white"
          onChange={handleInputChange}
          value={step3.crm}
          name="crm"
          type="number"
          boxShadow="md"
          borderColor="gray.300"
          _hover={{ borderColor: "blue.400" }}
          _focus={{ borderColor: "blue.400" }}
        />
      </FormControl>

              <AccordionPanel pb={4}>
                <Stack>
                  {specialties.map((speciality) => (
                    <Checkbox
                      key={speciality}
                      fontWeight="normal"
                      isChecked={step3.speciality.includes(speciality)}
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
          bg={"blue.400"}
          color={"white"}
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