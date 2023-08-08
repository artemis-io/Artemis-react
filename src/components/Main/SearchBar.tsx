import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const SearchBar = ({ value, onChange }: any) => {
  const handleChange = (event: any) => {
    const newValue = event.target.value;
  };

  return (
    <Flex alignItems="center" bg="white" borderRadius="md" w="90%" mt={2}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.500" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Pesquisar"
          value={value}
          onChange={handleChange}
        />
      </InputGroup>
    </Flex>
  );
};

export default SearchBar;
