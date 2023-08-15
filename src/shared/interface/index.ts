import { BoxProps, FlexProps } from "@chakra-ui/react";

import {
  AppointmentStep1Data,
  AppointmentStep2Data,
  AppointmentStep3Data,
  AppointmentStep4Data,
  AppointmentStep5Data,
  AppointmentStep6Data,
  DoctorStep1Data,
  DoctorStep2Data,
  DoctorStep3Data,
  PatientStep1Data,
  PatientStep2Data,
} from "../types";
import { IconType } from "react-icons";

export interface UserAuth {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar_url: string;
  first_time: boolean;
  tokens?: {
    accessToken?: string;
    refreshToken?: string;
  };
}

export interface DoctorInfo {
  id: string;
  name: string;
  doctor: {
    pricing: string;
    bio: string;
    speciality: string[];
  };
};

export interface MobileProps extends FlexProps {
  onOpen: () => void;
}

export interface SidebarProps extends BoxProps {
  onClose: () => void;
  toggleLogoutModal: () => void;
}

export interface NavItemProps extends FlexProps {
  icon: IconType;
}

export interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export interface FormState {
  appointmentStep1Data: AppointmentStep1Data;
  appointmentStep2Data: AppointmentStep2Data;
  appointmentStep3Data: AppointmentStep3Data;
  appointmentStep4Data: AppointmentStep4Data;
  appointmentStep5Data: AppointmentStep5Data;
  appointmentStep6Data: AppointmentStep6Data;
}

export interface DoctorState {
  doctorStep1Data: DoctorStep1Data;
  doctorStep2Data: DoctorStep2Data;
  doctorStep3Data: DoctorStep3Data;
}

export interface PatientState {
  patientStep1Data: PatientStep1Data;
  patientStep2Data: PatientStep2Data;
}

export interface Doctor {  
  id: string;
  name: string;
  avatar_url: string;
  doctor: {
    pricing: string;
    bio: string;
    speciality: string[];
    
  };
  profile: {
    gender: string;
  }
};

export interface Patient {
  id: string;
  name: string;
  email: string;
  profile: {
  state: string;
  dateOfBirth: string;
  city: string;
  gender: string;
  }
}