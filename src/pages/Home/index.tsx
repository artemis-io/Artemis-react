import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  IconButton,
  Image,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";

import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiMapPin,
  FiCalendar,
  FiHeart,
} from "react-icons/fi";
import { FeatureCard } from "../../components/Style/FeatureCard";
import { IconBox } from "../../components/Style/IconBox";

const Home = () => {
  return (
    <Box px={4} py={8} maxWidth="1200px" mx="auto">
      {/* Header */}
      <Center mb={8}>
        <Image src="/assets/images/logo.png" alt="logo" h="50px" />
      </Center>

      {/* Hero Section */}
      <Flex direction="column" alignItems="center" mb={12}>
        <Heading as="h2" size="2xl" textAlign="center" mb={4}>
          Bem-vindo à Minha Clínica Médica
        </Heading>
        <Text fontSize="lg" textAlign="center" mb={8}>
          Sua saúde é nossa prioridade. Oferecemos os melhores serviços médicos
          para cuidar de você e sua família.
        </Text>
        <Button as={Link} href="signIn" colorScheme="blue" size="lg">
          Saiba Mais
        </Button>
      </Flex>

      {/* Features Section */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} mb={12}>
        <FeatureCard
          icon={<IconBox icon={<FiMapPin />} bg="blue.500" />}
          title="Localização"
          description="Encontre-nos facilmente com nosso mapa interativo."
        />
        <FeatureCard
          icon={<IconBox icon={<FiCalendar />} bg="green.500" />}
          title="Agendamento"
          description="Agende consultas online com facilidade e rapidez."
        />
        <FeatureCard
          icon={<IconBox icon={<FiHeart />} bg="red.500" />}
          title="Cuidados Médicos"
          description="Equipe dedicada para fornecer os melhores cuidados médicos."
        />
      </SimpleGrid>

      {/* About Section */}
      <Flex
        direction={{ base: "column", md: "row" }}
        alignItems="center"
        mb={12}
      >
        <Box flex="1" pr={{ base: 0, md: 8 }}>
          <Heading as="h3" size="xl" mb={4}>
            Sobre Nós
          </Heading>
          <Text mb={4}>
            Somos uma clínica médica comprometida em fornecer serviços de
            qualidade e atendimento personalizado para nossos pacientes. Nossa
            equipe de médicos altamente qualificados está pronta para atender às
            suas necessidades de saúde.
          </Text>
          <Text>
            Estamos dedicados a melhorar a saúde e o bem-estar de todos os
            pacientes, proporcionando cuidados compassivos e abrangentes.
          </Text>
        </Box>
      </Flex>

      {/* Contact Section */}
      <Flex
        direction={{ base: "column", md: "row" }}
        alignItems="center"
        mb={12}
      >
        <Stack flex="1">
          <Heading as="h3" size="xl" mb={4}>
            Contate-nos
          </Heading>
          <Text mb={4}>
            Se você tiver alguma dúvida ou precisar de informações adicionais,
            sinta-se à vontade para nos contatar.
          </Text>
          <Button colorScheme="blue">Entre em Contato</Button>
        </Stack>
      </Flex>

      {/* Footer */}
      <Center py={4}>
        <IconButton
          as={Link}
          href="https://www.facebook.com/"
          aria-label="Facebook"
          icon={<FiFacebook />}
          isRound
          size="lg"
        />
        <IconButton
          as={Link}
          href="https://www.instagram.com/"
          aria-label="Instagram"
          icon={<FiInstagram />}
          isRound
          size="lg"
          mx={2}
        />
        <IconButton
          as={Link}
          href="https://twitter.com/"
          aria-label="Twitter"
          icon={<FiTwitter />}
          isRound
          size="lg"
        />
      </Center>
      <Center py={4}>
        <Text>© 2023 Minha Clínica Médica. Todos os direitos reservados.</Text>
      </Center>
    </Box>
  )
}

export default Home;
