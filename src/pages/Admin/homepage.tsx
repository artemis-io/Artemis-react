/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { VStack } from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth";
import { apiMed } from "../../services/api";
import Sidebar from "../../components/Main/DoctorSideBar/Sidebar";
import SearchBar from "../../components/Main/SearchBar";
import AppointmentCard from "../../components/Style/Cards/AppointmentCard";
import { AUTH_TOKEN_STORAGE } from "../../shared/storage/config";
import UpcomingAppointmentsDoctor from "../../components/Main/UpcomingAppointmentsDoctor";

const fetchData = async (userId: string) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  const item = localStorage.getItem(AUTH_TOKEN_STORAGE);

  const response = await apiMed.get(
    `/appointment/${userId}/day-appointment-doctor/${year}/${month}/${day}`,
    {
      headers: {
        Authorization: `Bearer ${item}`,
      },
    }
  );

  const { data } = response;
  return {
    totalAppointments: data.length,
    upcomingAppointments: data,
  };
};

const HomepageAdmin = () => {
  const { user } = useAuth();
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  useEffect(() => {
    if (user) {
      fetchData(user.id).then(({ totalAppointments, upcomingAppointments }) => {
        setTotalAppointments(totalAppointments);
        setUpcomingAppointments(upcomingAppointments);
      });
    }
  }, [user]);

  return (
    <Sidebar>
      <VStack spacing={5}>
        <SearchBar />
        <AppointmentCard totalAppointments={totalAppointments} />
        <UpcomingAppointmentsDoctor appointments={upcomingAppointments} />
      </VStack>
    </Sidebar>
  );
};

export default HomepageAdmin;
