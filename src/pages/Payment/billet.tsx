import { useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Select,
  Grid,
  GridItem,
  Stack,
  Card,
  CardHeader,
  CardBody,
} from "@chakra-ui/react";
import { format, addDays } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const statesList = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];

interface BoletoData {
  Valor: number;
  NumeroParcela: number;
  Nome: string;
  Identificador: string;
  Email: string;
  Telefone?: string;
  UF?: string;
  Cidade?: string;
  Logradouro?: string;
  Bairro?: string;
  Numero?: string;
  Complemento?: string;
  Cep?: string;
  NomeBeneficiario?: string;
  CpfBeneficiario?: string;
  Boleto_DataVencimento: Date;
}

const CardComponent: React.FC<BoletoData> = ({
  Valor,
  NumeroParcela,
  Nome,
  Identificador,
  Email,
  Boleto_DataVencimento,
}) => {
  return (
    <Box>
      <Heading size="md">Pedido Confirmado</Heading>
      <Card boxShadow="lg" borderRadius="12px" mt={4}>
        <Stack>
          <CardHeader fontWeight="bold">
            Seu pedido foi confirmado com sucesso!
          </CardHeader>
          <CardBody>
            <Stack justifyContent="space-between">
              <Text>
                Valor: <Text as="b">R$ {Valor}</Text>
              </Text>
              <Text>Vencimento: {Boleto_DataVencimento.toDateString()}</Text>

              <Text>Identificador: {Identificador}</Text>
              <Text>
                Email: <Text as="b">{Email}</Text>
              </Text>
            </Stack>

            <Stack mt={4}>
              <Text fontWeight="bold">
                Enviamos para seu e-mail os detalhes do pedido. Para realizar o
                pagamento, baixe o boleto no valor de R$
                {Valor}.
              </Text>
              <Button bg="#19A588" color="#fafafa">
                Baixar Boleto
              </Button>
            </Stack>
          </CardBody>
        </Stack>
      </Card>
    </Box>
  );
};

const BilletPage: React.FC = () => {
  const [formData, setFormData] = useState<BoletoData>({
    Valor: 0,
    NumeroParcela: 1,
    Nome: "",
    Identificador: "",
    Email: "",
    Boleto_DataVencimento: addDays(new Date(), 3),
  });
  const [loading, setLoading] = useState(false);
  const [showComponent, setShowComponent] = useState(false);

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
      toast.success("Boleto gerado com sucesso!");
      setShowComponent(true);
    } catch (error) {
      setLoading(false);
      toast.error("Ocorreu um erro na emissão do boleto");
    }
    console.log("Dados do boleto:", formData);
  };

  return (
    <Box p={4} display="flex" flexDir="column" alignItems="center">
      <Heading mb={4} color="#747B7D">
        Boleto
      </Heading>
      {showComponent ? (
        <CardComponent {...formData} />
      ) : (
        <form onSubmit={handleSubmit}>
          <Grid
            gridTemplateColumns="repeat(3, 1fr)"
            alignItems="center"
            columnGap={2}
          >
            <GridItem></GridItem>
            <GridItem>
              <FormControl mb={4}>
                <FormLabel fontWeight="bold">Vencimento</FormLabel>
                <Text>
                  {format(formData.Boleto_DataVencimento, "dd/MM/yyyy")}
                </Text>
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl mb={4} isDisabled>
                <FormLabel fontWeight="bold ">Parcelas</FormLabel>
                <Input
                  type="number"
                  name="NumeroParcela"
                  value={formData.NumeroParcela}
                  onChange={handleInputChange}
                  required
                />
              </FormControl>
            </GridItem>
          </Grid>
          <Grid
            gridTemplateColumns="repeat(3, 1fr)"
            alignItems="center"
            columnGap={2}
          >
            <GridItem colSpan={2}>
              <FormControl mb={4}>
                <FormLabel fontWeight="bold" color="#494949">
                  Nome
                </FormLabel>
                <Input
                  type="text"
                  name="Nome"
                  value={formData.Nome}
                  onChange={handleInputChange}
                  required
                />
              </FormControl>
            </GridItem>
            <FormControl mb={4}>
              <FormLabel fontWeight="bold" color="#494949">
                Valor
              </FormLabel>
              <Input
                type="number"
                name="Valor"
                value={formData.Valor}
                onChange={handleInputChange}
                required
              />
            </FormControl>
          </Grid>
          <Grid
            gridTemplateColumns="repeat(2, 1fr)"
            alignItems="center"
            columnGap={2}
          >
            <FormControl mb={4}>
              <FormLabel fontWeight="bold" color="#494949">
                CPF ou CNPJ
              </FormLabel>
              <Input
                type="text"
                name="Identificador"
                value={formData.Identificador}
                onChange={handleInputChange}
                required
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel fontWeight="bold" color="#494949">
                E-mail
              </FormLabel>
              <Input
                type="email"
                name="Email"
                value={formData.Email}
                onChange={handleInputChange}
                required
              />
            </FormControl>
          </Grid>
          <Grid
            gridTemplateColumns="repeat(3, 1fr)"
            alignItems="center"
            columnGap={2}
          >
            <GridItem colSpan={2}>
              <FormControl mb={4}>
                <FormLabel fontWeight="bold" color="#494949">
                  Cidade
                </FormLabel>
                <Input
                  type="text"
                  name="Cidade"
                  value={formData.Cidade}
                  onChange={handleInputChange}
                />
              </FormControl>
            </GridItem>
            <FormControl mb={4}>
              <FormLabel fontWeight="bold" color="#494949">
                Estado
              </FormLabel>
              <Select
                name="UF"
                value={formData.UF}
                onChange={handleStateChange}
                required
              >
                {statesList.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid
            gridTemplateColumns="repeat(3, 1fr)"
            alignItems="center"
            columnGap={2}
          >
            <GridItem colSpan={2}>
              <FormControl mb={4}>
                <FormLabel fontWeight="bold" color="#494949">
                  Logradouro
                </FormLabel>
                <Input
                  type="text"
                  name="Logradouro"
                  value={formData.Logradouro}
                  onChange={handleInputChange}
                />
              </FormControl>
            </GridItem>
            <FormControl mb={4}>
              <FormLabel fontWeight="bold" color="#494949">
                Bairro
              </FormLabel>
              <Input
                type="text"
                name="Bairro"
                value={formData.Bairro}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid
            gridTemplateColumns="repeat(3, 1fr)"
            alignItems="center"
            columnGap={2}
          >
            <FormControl mb={4}>
              <FormLabel fontWeight="bold" color="#494949">
                Número
              </FormLabel>
              <Input
                type="text"
                name="Numero"
                value={formData.Numero}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel fontWeight="bold" color="#494949">
                Complemento
              </FormLabel>
              <Input
                type="text"
                name="Complemento"
                value={formData.Complemento}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel fontWeight="bold" color="#494949">
                CEP
              </FormLabel>
              <Input
                type="text"
                name="Cep"
                value={formData.Cep}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              isLoading={loading}
              type="submit"
              bg={"#0078D7"}
              color={"white"}
              w="full"
              _hover={{
                bg: "blue.500",
              }}
            >
              Emitir Boleto
            </Button>
          </Stack>
        </form>
      )}

      <ToastContainer position="top-center" />
    </Box>
  );
};

export default BilletPage;
