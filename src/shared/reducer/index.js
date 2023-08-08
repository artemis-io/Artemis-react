import { configureStore } from "@reduxjs/toolkit";

import DoctorReducer from "./DoctorReducer";
import PatientReducer from "./PatientReducer";
import AppointmentReducer from "./AppointmentReducer";

const store = configureStore({
  reducer: {
    appointment: AppointmentReducer,
    doctor: DoctorReducer,
    patient: PatientReducer,
  },
});

export default store;
