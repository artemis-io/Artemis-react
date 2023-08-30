import { useEffect, useState } from "react";
import {
  Box,
  Input,
  FormControl,
  FormLabel,
  Heading,
  Text,
  HStack,
  Flex,
  Stack,
  Divider,
  Container,
  SimpleGrid,
  Center,
} from "@chakra-ui/react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "../../utils/credit-card";
import PrimaryButton from "../../components/Style/Buttons/Primarybutton";
import PatientSidebar from "../../components/Main/PatientSideBar/PatientSideBar";
import { useSearchParams } from "react-router-dom";
import { apiMed } from "../../services/api";
import { AUTH_TOKEN_STORAGE } from "../../shared/storage/config";
import { PatientPaymentData } from "../../shared/types";

const PaymentPage = () => {
  const [paymentData, setPaymentData] = useState({
    urlretorno: "",
    chaveerp: "",
    valor: "",
    numeroparcela: 1,
    nome: "",
    identificador: "",
    email: "",
    cartaonome: "",
    cartaonumero: "",
    cartaovencimento: "",
    cartaocodigoseguranca: "",
  });
  const [loading, setLoading] = useState(false);
  const [idPatient, setIdPatient] = useState<string | null>(null);
  const [idDoctor, setIdDoctor] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const appointmentId = searchParams.get("appointmentId");
  const [patient, setPatient] = useState<PatientPaymentData | null>(null);
  const [pricing, setPricing] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointmentData = async () => {
      const token = localStorage.getItem(AUTH_TOKEN_STORAGE);
      try {
        const response = await apiMed.get(`/appointment/${appointmentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setIdPatient(response.data.id_patient);
        setIdDoctor(response.data.id_doctor);

        if (idPatient !== null) {
          try {
            const response = await apiMed.get(`/user/${idPatient}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            setPatient(response.data);
            console.log("User", response.data);
          } catch (error) {
            console.error("Erro ao obter dados:", error);
          }
        }
        if (idDoctor !== null) {
          try {
            const response = await apiMed.get(`/user/doctor/${idDoctor}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            setPricing(response.data.doctor.pricing);
          } catch (error) {
            console.error("Erro ao obter dados:", error);
          }
        }
      } catch (error) {
        console.error("Erro ao obter dados:", error);
      }
    };

    fetchAppointmentData();
  }, [appointmentId, idPatient, idDoctor , pricing]);

  const handleInputFocus = ({ target }: { target: { name: string } }) => {
    setPaymentData((prevState) => ({ ...prevState, focused: target.name }));
  };

  const handleInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;

    let formattedValue = value;
    if (name === "cartaonumero") {
      formattedValue = formatCreditCardNumber(value);
    } else if (name === "cartaovencimento") {
      formattedValue = formatExpirationDate(value);
    } else if (name === "cartaocodigoseguranca") {
      formattedValue = formatCVC(value);
    }
    setPaymentData((prevState) => ({ ...prevState, [name]: formattedValue }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(false);
      const data = {};
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <PatientSidebar>
      <Box position={"relative"}>
        <form onSubmit={handleSubmit}>
          <Container
            as={SimpleGrid}
            maxW={"7xl"}
            columns={{ base: 1, md: 2 }}
            spacing={{ base: 5, lg: 16 }}
            py={{ base: 2, sm: 10, lg: 10 }}
          >
            <Stack spacing={{ base: 4, md: 4 }}>
              <Heading color="#747B7D" fontSize="20px">
                Dados do cartão
              </Heading>

              <Box
                bg="#0078D7"
                flexDir="column"
                w="320px"
                h="180px"
                color="#fafafa"
                borderRadius="12px"
                p={4}
              >
                <Flex gap="0.1rem" flexDir="column" mt={16}>
                  <Text fontWeight="bold">
                    {paymentData.cartaonumero || "0000 0000 0000 0000"}
                  </Text>
                  <Text fontWeight="bold" textTransform="uppercase" mb={4}>
                    {paymentData.cartaonome || "João da Silva"}
                  </Text>
                </Flex>

                <Flex justify="space-between" alignItems="baseline">
                  <Flex flexDir="row" gap=".5rem">
                    <Text fontSize="sm">Validade</Text>
                    <Text fontWeight="bold" color="#ffffff">
                      {paymentData.cartaovencimento || "00/00"}
                    </Text>
                  </Flex>

                  <Flex flexDir="row">
                    <Flex flexDir="row" gap=".5rem">
                      <Text fontSize="sm">CVC</Text>
                      <Text fontWeight="bold" color="#ffffff">
                        {paymentData.cartaocodigoseguranca || "000"}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Box>

              <FormControl>
                <Input
                  placeholder="Número do cartão"
                  pattern="[\d| ]{16,22}"
                  name="cartaonumero"
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  value={paymentData.cartaonumero}
                  maxLength={19}
                  isRequired
                />
              </FormControl>
              <FormControl>
                <Input
                  placeholder="Nome impresso no cartão"
                  pattern="[a-z A-Z-]+"
                  name="cartaonome"
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  value={paymentData.cartaonome}
                  isRequired
                />
              </FormControl>
              <HStack>
                <FormControl>
                  <Input
                    placeholder="Validade"
                    pattern="\d\d/\d\d"
                    name="cartaovencimento"
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    value={paymentData.cartaovencimento}
                    isRequired
                  />
                </FormControl>

                <FormControl>
                  <Input
                    placeholder="CCV"
                    pattern="\d{3}"
                    name="cartaocodigoseguranca"
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    value={paymentData.cartaocodigoseguranca}
                    isRequired
                  />
                </FormControl>
              </HStack>
            </Stack>

            <Stack spacing={{ base: 4 }}>
              <Heading color="#747B7D" fontSize="20px">
                Dados Pessoais
              </Heading>
              <Box
                color="#494949"
                display="flex"
                flexDirection="column"
                gap={4}
              >
                <FormControl>
                  <Input
                    placeholder="Nome"
                    name="nome"
                    onChange={handleInputChange}
                    value={patient?.name}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontWeight="bold"></FormLabel>
                  <Input
                    placeholder="Identificador (CPF ou CNPJ)"
                    name="identificador"
                    onChange={handleInputChange}
                    value={patient?.profile.cpf}
                  />
                </FormControl>

                <FormControl>
                  <Input
                    placeholder="Email"
                    name="email"
                    onChange={handleInputChange}
                    value={patient?.email}
                    type="email"
                  />
                </FormControl>
              </Box>
              <Divider />
              <Flex justify="space-between" color="#494949" mt={8}>
                <Heading fontSize="20px">Total</Heading>
                <Heading fontSize="20px">{pricing}</Heading>
              </Flex>
              <Divider />
              <Center>
                <PrimaryButton
                  w="400px"
                  h="50px"
                  type="submit"
                  mt={8}
                  isLoading={loading}
                >
                  Pagar
                </PrimaryButton>
              </Center>
            </Stack>
          </Container>
        </form>
        <ToastContainer position="top-center" />
      </Box>
    </PatientSidebar>
  );
};

export default PaymentPage;
