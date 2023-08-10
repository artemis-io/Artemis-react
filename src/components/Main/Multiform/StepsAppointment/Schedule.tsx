import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Box } from "@chakra-ui/react";
import { Doctor } from "../../../../shared/interface";
import { apiMed } from "../../../../services/api";
import DoctorCard from "../../../Style/Cards/DoctorCard";
import CalendarStep from "./CalendarStep";


export default function Schedule() {
  const [doctor, setDoctor] = useState<Doctor | null>(null);

  const id = useSelector((state: any) => state.appointment.appointmentStep4Data.id_doctor);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await apiMed.get(`/user/doctor/${id}`);
        console.log(response.data);

        setDoctor(response.data);
      } catch (error) {
        console.error("Erro ao obter médicos:", error);
      }
    };

    fetchDoctor();
  }, [id]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      {doctor && (
        <DoctorCard id={doctor.id} name={doctor.name} doctor={doctor.doctor} />
      )}
      <CalendarStep />
    </Box>
  );
}
