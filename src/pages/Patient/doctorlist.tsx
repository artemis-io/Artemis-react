import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DoctorCard from "../../components/Style/Cards/DoctorCard";
import { DoctorInfo } from "../../shared/interface";
import { apiMed } from "../../services/api";

export default function DoctorList() {
  const router = useNavigate();
  const [searchName, setSearchName] = useState("");
  const [doctors, setDoctors] = useState<DoctorInfo[]>([]);
  const { speciality } = useParams();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        if (typeof speciality === "string") {
          const response = await apiMed.get(`/doctor/${speciality}`);
          setDoctors(response.data);
        }
      } catch (error) {
        console.error("Erro ao obter médicos:", error);
      }
    };

    fetchDoctors();
  }, [router, speciality]);

  const filteredDoctors = () => {
    let filtered = doctors;

    if (searchName) {
      filtered = filtered.filter((doctor) =>
        doctor.name.toLowerCase().startsWith(searchName.toLowerCase())
      );
    }

    return filtered;
  };

  return (
    <Box>
      <Heading size="lg" color="#747B7D">
        Médicos
      </Heading>
      <InputGroup mb={8} mt={4}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Pesquisar"
          onChange={(e) => setSearchName(e.target.value)}
        />
      </InputGroup>

      <VStack align="start" w="100%" spacing={4} mt={5}>
        {filteredDoctors().length > 0 ? (
          filteredDoctors().map((doctor) => (
            <DoctorCard
              key={doctor.id}
              id={doctor.id}
              name={doctor.name}
              doctor={doctor.doctor}
            />
          ))
        ) : (
          <Text>Não foram encontrados médicos.</Text>
        )}
      </VStack>
    </Box>
  );
}
