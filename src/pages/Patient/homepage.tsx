/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Box, Text, Button, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { apiMed } from "../../services/api";
import { AUTH_TOKEN_STORAGE } from "../../shared/storage/config";
import UpcomingAppointments from "../../components/Main/UpcomingAppointments";
import PatientSidebar from "../../components/Main/PatientSideBar";

// Separate the fetchData function
const fetchData = async (
  userId: any,
  setTotalAppointments: any,
  setUpcomingAppointments: any
) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  const token = localStorage.getItem(AUTH_TOKEN_STORAGE);

  const response = await apiMed.get(
    `/appointment/${userId}/day-appointment-patient/${year}/${month}/${day}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const { data } = response;
  setTotalAppointments(data.length);
  setUpcomingAppointments(data);
};

export default function HomepagePatient() {
  const router = useNavigate();
  const { user } = useAuth();
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  // Fetch data when component mounts and when user changes
  useEffect(() => {
    if (user?.id) {
      fetchData(user.id, setTotalAppointments, setUpcomingAppointments);
    }
  }, [user]);

  const handleNav = () => {
    router("/patient/appointment");
  };

  return (
    <PatientSidebar>
      {totalAppointments > 0 ? (
        <VStack spacing={5}>
          <UpcomingAppointments appointments={upcomingAppointments} />
          <Button
            bg="#0078D7"
            w="300px"
            h="50px"
            color="#fafafa"
            fontSize="16px"
            onClick={handleNav}
          >
            Adicionar Novo Atendimento
          </Button>
        </VStack>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          height="80vh"
          justifyContent="center"
        >
          <Text
            mt="24px"
            fontSize="3xl"
            mb="36px"
            fontWeight={600}
            color="#747B7D"
            align="center"
          >
            Você ainda não agendou nenhum atendimento.
          </Text>

          <Button
            bg="#0078D7"
            w="293px"
            h="50px"
            color="#fafafa"
            fontSize="16px"
            onClick={handleNav}
          >
            Agendar Consulta
          </Button>
        </Box>
      )}
    </PatientSidebar>
  );
}
