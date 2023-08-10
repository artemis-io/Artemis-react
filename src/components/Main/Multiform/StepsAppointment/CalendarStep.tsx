import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { AxiosRequestConfig } from "axios";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { apiMed } from "../../../../services/api";
import AppointmentConfirmButton from "../../../Style/Buttons/AppointmentConfirmButton";
import Calendar from "../../Calendar/Calendar";
import { useAuth } from "../../../../hooks/useAuth";

export default function CalendarStep() {
  const { user } = useAuth();
  const [postDate, setPostdDate] = useState<string>();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableHours, setAvailableHours] = useState([]);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const toast = useToast();


  

  const id_doctor = useSelector(
    (state: any) => state.appointment.appointmentStep4Data.id_doctor
  );
  const type = useSelector(
    (state: any) => state.appointment.appointmentStep1Data.type
  );
  const query = useSelector(
    (state: any) => state.appointment.appointmentStep2Data.query
  );

  console.log(user?.id);
  console.log(id_doctor);
  console.log(type);
  console.log(query);

  const accessToken = localStorage.getItem("@virtumed-accessToken");

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const handleAppointment = async () => {
    try {
      const data = {
        id_patient: user?.id,
        id_doctor,
        date: postDate,
        type,
        multiple_users: false,
        query,
      };
      await apiMed.post(`/appointment`, data, config);
      toast({
        position: "top",
        title: "Sucesso",
        description: "Consulta agendada com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Erro ao fazer o POST:", error);
      console.log(user);
      toast({
        position: "top",
        title: "Erro",
        description: "Ocorreu um erro na sua solicitação.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableHours();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  const fetchAvailableHours = async () => {
    try {
      if (!selectedDate) {
        return;
      }

      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth() + 1;
      const day = selectedDate.getDate();

      const response = await apiMed.get(
        `/appointment/${id_doctor}/day-availability-doctor/${year}/${month}/${day}`,
        config
      );

      const filteredHours = response.data.filter((hourData: any) => {
        const [hourString] = hourData.hour.split(":");
        const hour = Number(hourString);
        return hour >= 13 && hour < 18 && hourData.available;
      });

      setAvailableHours(filteredHours);
    } catch (error) {
      console.error("Error fetching available hours:", error);
    }
  };

  const handleAppointmentClick = (hour: string) => {
    if (selectedDate) {
      const [hourString, minuteString] = hour.split(":");
      const selectedDateTime = new Date(selectedDate);

      const minute = Number(minuteString);
      const roundedMinute = Math.round(minute / 30) * 30;

      selectedDateTime.setHours(Number(hourString));
      selectedDateTime.setMinutes(roundedMinute);

      setPostdDate(selectedDateTime.toISOString());
      setSelectedHour(hour);
      console.log("date:", selectedDateTime.toISOString());
    }
  };

  const isDateSelected = !!selectedDate;

  return (
    <Box>
      <Calendar onDateSelected={setSelectedDate} selectedDate={selectedDate} />
      {isDateSelected && (
        <>
          <Center position="relative">
            <Grid templateColumns="repeat(3, 1fr)" gap={2}>
              {availableHours.map((hourData: any) =>
                hourData.available ? (
                  <GridItem key={hourData.hour}>
                    <Button
                      onClick={() => handleAppointmentClick(hourData.hour)}
                      fontWeight="bold"
                      fontSize="24px"
                      size="lg"
                      p={8}
                      borderRadius="lg"
                      boxShadow="0px 2px 2px 0px rgba(0, 0, 0, 0.10)"
                      bg={selectedHour === hourData.hour ? "#0078D7" : "white"}
                      color={
                        selectedHour === hourData.hour ? "white" : "#1795E0"
                      }
                    >
                      {hourData.hour}
                    </Button>
                  </GridItem>
                ) : null
              )}
            </Grid>
          </Center>
        </>
      )}
      <VStack>
        <AppointmentConfirmButton mt={8} onClick={handleAppointment}>
          {isDateSelected && postDate ? (
            <>
              Agendar -{" "}
              {format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}{" "}
              às {format(new Date(postDate), "HH:mm")}
            </>
          ) : (
            "Agendar"
          )}
        </AppointmentConfirmButton>
      </VStack>
    </Box>
  );
}
