import { Box, Card, Heading, Link, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { apiMed } from "../../services/api";

export default function Convlist() {
  const [specialties, setSpecialties] = useState<string[]>([]);

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const response = await apiMed.get("/api/admin/all/speciality");
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

  return (
    <Box p={4}>
      <Heading color="#747B7D">Especialidade</Heading>
      {/* <InputGroup mb={8} mt={4}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input type="text" placeholder="Pesquisar" />
      </InputGroup> */}

      <SimpleGrid columns={1} spacing={4}>
        {specialties.map((speciality) => (
          <Link href={`/doctorlist/${speciality}`} key={speciality}>
            <Card
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
          </Link>
        ))}
      </SimpleGrid>
    </Box>
  );
}
