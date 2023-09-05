import { IconType } from "react-icons";
import { Appointment } from "../entities/appointments.entities";

export type DoctorImage = {
  id?: string;
  name?: string;
  specialty?: string;
  imageUrl?: string;
};

export type loginProps = {
  email: string;
  password: string;
};

export type LinkItemProps = {
  name: string;
  icon: IconType;
  to?: string;
};

export type AppointmentStep1Data = {
  type: string;
};

export type AppointmentStep2Data = {
  query: string;
};

export type AppointmentStep3Data = {
  speciality: string[];
};

export type AppointmentStep4Data = {
  id_doctor: string;
};

export type AppointmentStep5Data = {};

export type AppointmentStep6Data = {
  date: string;
};

export type DoctorStep1Data = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type DoctorStep2Data = {
  cpf: string;
  gender: string;
  rg: string;
  cep: string;
  address: string;
  number: string;
  state: string;
  district: string;
  city: string;
  dateOfBirth: string;
};

export type DoctorStep3Data = {
  crm: string;
  pricing: number | undefined | readonly string[] | string;
  bio: string;
  speciality: string[];
};

export type PatientStep1Data = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type PatientStep2Data = {
  cpf: string;
  rg: string;
  cep: string;
  address: string;
  gender: string;
  number: string;
  state: string;
  district: string;
  city: string;
  dateOfBirth: string;
};

export type AppointmentRecordList = {
  id: string;
  id_patient: string;
  id_doctor: string;
  type: string;
  query: string;
  date: string;
  doctor: {
    name: string;
    avatar_url: string;
    profile: {
      dateOfBirth: Date;
    };
  };
};

export type AppointmentList = {
  id: string;
  id_patient: string;
  id_doctor: string;
  type: string;
  query: string;
  date: string;
  patient: {
    name: string;
    avatar_url: string;
    profile: {
      dateOfBirth: Date;
    };
  };
};

export type CardProps = {
  text: string;
  imageUrl: string;
};

export type CardCompleteProps = {
  appointments: Appointment[];
};

export type PatientPaymentData = {
  name: string;
  email: string;
  profile: {
    cpf: string;
  };
};

export type PaymentCardStep1Data = {};

export type PaymentCardStep2Data = {};
