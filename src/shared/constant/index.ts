import {
  FiMessageSquare,
  FiUsers,
  FiHome,
  FiCompass,
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

export const LinkItems: Array<LinkItemProps> = [
  { name: "Dashboard", icon: FiHome, to: "/patient/homepage" },
  { name: "Agenda", icon: FiCalendar, to: "/patient/schedule" },
  { name: "Pacientes", icon: FiUsers, to: "/homepage" },
  { name: "Médicos", icon: FiUsers, to: "/homepage" },
  { name: "Prontuário Eletrônico", icon: FiCompass, to: "/homepage" },
  { name: "Chat", icon: FiMessageSquare, to: "/homepage" },
  { name: "Configurações", icon: FiSettings, to: "/homepage" },
  { name: "Desconectar", icon: FiSettings, to: undefined },
];

export const LinkItemsPatient: Array<LinkItemProps> = [
  { name: "Dashboard", icon: FiHome, to: "/patient/homepage" },
  { name: "Médicos", icon: FiUsers, to: "/patient/doctorlist" },
  { name: "Chat", icon: FiMessageSquare, to: "/homepage" },
  { name: "Configurações", icon: FiSettings, to: "/homepage" },
  { name: "Desconectar", icon: FiLogOut, to: undefined },
];