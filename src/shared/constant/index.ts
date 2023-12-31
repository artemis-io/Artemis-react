import {
  FiUsers,
  FiHome,
  FiCalendar,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { LinkItemProps } from "../types";

export const excludedRoutes = [
  "/",
  "/register",
  "/chat",
  "/security/register",
  "/security/login",
  "/404",
];

export const LinkItemsDoctor: Array<LinkItemProps> = [
  { name: "Dashboard", icon: FiHome, to: "/doctor/homepage" },
  // { name: "Agenda", icon: FiCalendar, to: "/patient/schedule" },
  { name: "Pacientes", icon: FiUsers, to: "/doctor/patients" },
  // { name: "Prontuário Eletrônico", icon: FiCompass, to: "/homepage" },
  // { name: "Chat", icon: FiMessageSquare, to: "/homepage" },
  { name: "Configurações", icon: FiSettings, to: "/doctor/profile" },
  { name: "Desconectar", icon: FiLogOut, to: undefined },
];

export const LinkItemsPatient: Array<LinkItemProps> = [
  { name: "Dashboard", icon: FiHome, to: "/patient/homepage" },
  // { name: "Médicos", icon: FiUsers, to: "/patient/doctorlist" },
  { name: "Agendar", icon: FiCalendar, to: "/patient/appointment" },
  { name: "Doutores", icon: FiUsers, to: "/patient/doctors" },
  // { name: "Chat", icon: FiMessageSquare, to: "/homepage" },
  { name: "Configurações", icon: FiSettings, to: "/patient/profile" },
  { name: "Desconectar", icon: FiLogOut, to: undefined },
];

export const maskInputCpf = [
  /\d/,
  /\d/,
  /\d/,
  ".",
  /\d/,
  /\d/,
  /\d/,
  ".",
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
];

export const maskInputRG = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];

export const maskInputCep = [
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  /\d/,
];
