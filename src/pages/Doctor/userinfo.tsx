import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Box,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";

export default function userInfo() {
  return (
    <Box>
      <Box>
        <Stack spacing={4} w={"full"} maxW={"md"} p={4}>
          <Heading fontSize={{ base: "2xl", sm: "3xl" }}>Cadastro</Heading>
          <FormControl id="userName">
            <FormLabel>Foto do Perfil</FormLabel>
            <Stack direction={["column", "row"]} spacing={6}>
              <Center>
                <Avatar size="xl" src="https://bit.ly/sage-adebayo">
                  <AvatarBadge
                    as={IconButton}
                    size="sm"
                    rounded="full"
                    top="-10px"
                    colorScheme="red"
                    aria-label="remove Image"
                    icon={<SmallCloseIcon />}
                  />
                </Avatar>
              </Center>
              <Center w="full">
                <Button w="full" bg="#0078D7" color="#fafafa">
                  Enviar foto
                </Button>
              </Center>
            </Stack>
          </FormControl>

          <FormControl id="rg" isRequired>
            <FormLabel>RG</FormLabel>
            <Input
              variant="flushed"
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
          </FormControl>
          <FormControl id="cpf" isRequired>
            <FormLabel>CPF</FormLabel>
            <Input
              variant="flushed"
              placeholder="your-email@example.com"
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
          </FormControl>
          <FormControl id="cep" isRequired>
            <FormLabel>CEP</FormLabel>
            <Input
              variant="flushed"
              placeholder="00000-000"
              _placeholder={{ color: "gray.500" }}
              type="number"
            />
          </FormControl>
          <FormControl id="address" isRequired>
            <FormLabel>Endereço</FormLabel>
            <Input
              variant="flushed"
              placeholder="Rua..."
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
          </FormControl>
          <FormControl id="number" isRequired>
            <FormLabel>Número</FormLabel>
            <Input
              variant="flushed"
              _placeholder={{ color: "gray.500" }}
              type="number"
            />
          </FormControl>
          <FormControl id="state" isRequired>
            <FormLabel>Estado</FormLabel>
            <Input
              variant="flushed"
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
          </FormControl>
          <FormControl id="district" isRequired>
            <FormLabel>Bairro</FormLabel>
            <Input
              variant="flushed"
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
          </FormControl>
          <FormControl id="crm" isRequired>
            <FormLabel>CRM</FormLabel>
            <Input
              variant="flushed"
              _placeholder={{ color: "gray.500" }}
              type="number"
            />
          </FormControl>
          <FormControl id="specialty" isRequired>
            <FormLabel>Especialidade</FormLabel>
            <Input
              variant="flushed"
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
          </FormControl>
          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              bg={"blue.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "blue.500",
              }}
            >
              Registrar
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
