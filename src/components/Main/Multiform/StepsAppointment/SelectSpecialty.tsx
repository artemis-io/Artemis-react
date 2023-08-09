import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Card,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setStep3Data } from "../../../../shared/reducer/AppointmentReducer";
import { apiMed } from "../../../../services/api";

export default function SelectSpecialty({ handleNextStep }: any) {
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const dispatch = useDispatch();

  const handleSubmit = (e: any) => {
    dispatch(setStep3Data({ speciality: e }));
    handleNextStep();
  };

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const response = await apiMed.get("/admin/all/speciality");
        setSpecialties(
          response.data.map(
            (speciality: { speciality: any }) => speciality.speciality
          )
        );
      } catch (error) {
        console.error("Erro ao obter especialidades:", error);
      }
    };

    fetchSpecialties();
  }, []);

  // Filter the specialties based on the search query
  const filteredSpecialties = specialties.filter((speciality) =>
    speciality.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box p={4}>
      <Heading color="#747B7D">Especialidade</Heading>
      <InputGroup mb={8} mt={4}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Pesquisar"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </InputGroup>

      <SimpleGrid columns={1} spacing={4}>
        {filteredSpecialties.map((speciality) => (
          <Card
            key={speciality}
            onClick={() => handleSubmit(speciality)}
            h={50}
            alignItems="center"
            justifyContent="center"
            boxShadow="0px 2px 2px 0px rgba(0, 0, 0, 0.10)"
            color="#494949"
            fontSize="16px"
            fontWeight="700"
          >
            {speciality}
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
}
