import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
} from "@chakra-ui/react";
import ConvCard from "../../components/Style/Cards/ConvCard";

export default function Convlist() {
  return (
    <Box p={4}>
      <Heading color="#747B7D">Selecione seu convênio</Heading>
      <InputGroup mb={8} mt={4}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input type="text" placeholder="Pesquisar Convênios" />
      </InputGroup>

      <SimpleGrid columns={[1, 2, 3]} spacing={4}>
        {/* Aqui você pode renderizar os cartões */}
        <ConvCard text="UNIMED" imageUrl={""}></ConvCard>
      </SimpleGrid>
    </Box>
  );
}
