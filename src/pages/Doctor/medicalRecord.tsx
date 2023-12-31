import React, { useEffect, useState } from "react";
import { VStack, Badge } from "@chakra-ui/react";
import Sidebar from "../../components/Main/DoctorSideBar/Sidebar";
import CardHistoryPatient from "../../components/Style/Cards/CardHistoryPatient";
import { apiMed } from "../../services/api";
import { AUTH_TOKEN_STORAGE } from "../../shared/storage/config";
import { useParams } from "react-router-dom";
import { MedicalRecordDataPatient } from "../../shared/interface";

const MedicalRecord: React.FC = () => {
  const { id } = useParams();
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecordDataPatient[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auth = localStorage.getItem(AUTH_TOKEN_STORAGE);
        const response = await apiMed.get(
          `/appointment/history-infoPatient/${id}`,
          {
            headers: {
              Authorization: `Bearer ${auth}`,
            },
          }
        );

        const data = response.data;
        setMedicalRecords(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  const itemsByDate: { [date: string]: MedicalRecordDataPatient[] } = {};

  medicalRecords.forEach((record) => {
    const formattedDate = new Date(record.date).toLocaleDateString();
    if (!itemsByDate[formattedDate]) {
      itemsByDate[formattedDate] = [];
    }
    itemsByDate[formattedDate].push(record);
  });

  return (
    <Sidebar>
      <VStack spacing={6} p={4} align="stretch">
        {Object.entries(itemsByDate).map(([date, recordList]) => (
          <VStack key={date} align="stretch" spacing={4}>
            <Badge colorScheme="blue" p={2} alignSelf="flex-start">
              {date}
            </Badge>
            {recordList.map((record) => (
              <CardHistoryPatient
                key={record.id}
                id={record.id}
                history={record.history}
                city={record.patient.profile.city}
                district={record.patient.profile.district}
                number={record.patient.profile.number}
                state={record.patient.profile.state}
                type={record.type}
                query={record.query}
                patientName={record.patient.name}
                patientAvatar={record.patient.avatar_url}
                date={record.date}
                address={record.patient.profile.address}
              />
            ))}
          </VStack>
        ))}
      </VStack>
    </Sidebar>
  );
};

export default MedicalRecord;
