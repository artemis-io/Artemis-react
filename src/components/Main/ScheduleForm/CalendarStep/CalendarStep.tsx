import React, { useState, useEffect } from "react";
import { Button, Center, Grid, GridItem, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { AxiosRequestConfig } from "axios";
import { apiMed } from "../../../../services/api";
import { useAuth } from "../../../../hooks/useAuth";
import Calendar from "../../Calendar/Calendar";
import AppointmentConfirmButton from "../../../Style/Buttons/AppointmentConfirmButton";

export default function CalendarStep() {
  const { user } = useAuth();
  const [postDate, setPostdDate] = useState<string>();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableHours, setAvailableHours] = useState([]);

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

      await apiMed.post(`api/appointment`, data, config);
    } catch (error) {
      console.error("Erro ao fazer o POST:", error);
    }
  };

  useEffect(() => {
    // Make the API request when the selectedDate changes
    if (selectedDate) {
      fetchAvailableHours();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  const fetchAvailableHours = async () => {
    try {
      if (!selectedDate) {
        return; // Exit the function if selectedDate is null
      }

      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth() + 1; // JavaScript months are zero-based
      const day = selectedDate.getDate();

      const response = await apiMed.get(
        `api/appointment/${id_doctor}/day-availability-doctor/${year}/${month}/${day}`,
        config
      );

      setAvailableHours(response.data);
    } catch (error) {
      // Handle error if the API request fails
      console.error("Error fetching available hours:", error);
    }
  };

  const handleAppointmentClick = (hour: string) => {
    if (selectedDate) {
      // Split the hour string into hours and minutes
      const [hourString, minuteString] = hour.split(":");
      const selectedDateTime = new Date(selectedDate);

      // Round the minute to the nearest half-hour
      const minute = Number(minuteString);
      const roundedMinute = Math.round(minute / 30) * 30;

      // Set the selected hour and rounded minute to the date object
      selectedDateTime.setHours(Number(hourString));
      selectedDateTime.setMinutes(roundedMinute);

      setPostdDate(selectedDateTime.toISOString());
      // Log the selected date and time in the desired format
      console.log("date:", selectedDateTime.toISOString());
    }
  };

  const isDateSelected = !!selectedDate;

  return (
    <>
      <Calendar onDateSelected={setSelectedDate} selectedDate={selectedDate} />
      {isDateSelected && (
        <>
          <Text mb={8} mt={4}>
            Selected Date: {selectedDate.toDateString()}
          </Text>
          <Center position="relative">
            <Grid templateColumns="repeat(3, 1fr)" gap={2}>
              {availableHours.map((hourData: any) =>
                hourData.available ? (
                  <GridItem key={hourData.hour}>
                    <Button
                      onClick={() => handleAppointmentClick(hourData.hour)}
                      color="#1795E0"
                      fontWeight="bold"
                      fontSize="24px"
                      size="lg"
                      p={8}
                      borderRadius="lg"
                      bg="white"
                      boxShadow="0px 2px 2px 0px rgba(0, 0, 0, 0.10)"
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
      <AppointmentConfirmButton mt={8} onClick={handleAppointment}>
        Agendar
      </AppointmentConfirmButton>
    </>
  );
}
