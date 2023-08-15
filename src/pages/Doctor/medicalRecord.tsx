import React, { useEffect, useState } from "react";
import { VStack, Badge } from "@chakra-ui/react";
import Sidebar from "../../components/Main/SideBar/Sidebar";
import CardHistory from "../../components/Style/Cards/CardHistory";
import { apiMed } from "../../services/api";
import { AUTH_TOKEN_STORAGE } from "../../shared/storage/config";
import { useParams } from "react-router-dom";

export interface MedicalRecordData {
  id: string;
  type: string;
  query: string;
  date: string;
  history: {
    altura: string;
    anotacoes: string;
    freqcardiaca: string;
    glasgow: string;
    historiapatologica: string;
    tiposanguineo: string;
    medicamentos: string;
    historiadoenca: string;
    tax: string;
    imc: string;
    pressaoarterial: string;
    queixaprincipal: string;
    freqrespiratoria: string;
    peso: string;
    alergias: string;
  };
  patient: {
    name: string;
    avatar_url: string;
    profile: {
      address: string;
      state: string;
      district: string;
      city: string;
      number: string;
    };
  };
}

const MedicalRecord: React.FC = () => {
  const { id } = useParams();
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecordData[]>([]);

  useEffect(() => {
    // Fetch data from API and set it to medicalRecords state
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

  const itemsByDate: { [date: string]: MedicalRecordData[] } = {};

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
          <VStack key={date} align="stretch">
            <Badge colorScheme="blue" p={2} alignSelf="flex-start">
              {date}
            </Badge>
            {recordList.map((record) => (
              <CardHistory
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
