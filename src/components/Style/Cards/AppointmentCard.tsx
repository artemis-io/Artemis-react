import { Box, Flex, Text, Image, Grid } from '@chakra-ui/react';

const AppointmentCard = ({ totalAppointments }: { totalAppointments: number }) => {
  return (
    <Box bg="blue.500" p={4} borderRadius="md" w="90%">
      <Grid gridTemplateColumns="48px 1fr" alignItems="center" columnGap={2}>
        <Image src="/assets/images/agenda.png" alt="Agenda" boxSize="48px" />
        <Flex flexDirection="column" alignItems="flex-end">
          <Text color="white" fontWeight="bold" fontSize="xl" textAlign="right">
            Consultas do Dia
          </Text>
          <Text color="white" fontSize="4xl" textAlign="right">{totalAppointments}</Text>
        </Flex>
      </Grid>
    </Box>
  );
};

export default AppointmentCard;
