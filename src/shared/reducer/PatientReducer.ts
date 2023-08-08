// ./store/Patient.ts

import { createSlice } from "@reduxjs/toolkit";
import { PatientState } from "../interface";

const initialState: PatientState = {
  patientStep1Data: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  patientStep2Data: {
    cpf: "",
    rg: "",
    cep: "",
    address: "",
    gender: "",
    number: "",
    state: "",
    district: "",
    city: "",
  },
};

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    setStep1Data(state, action) {
      state.patientStep1Data = action.payload;
    },
    setStep2Data(state, action) {
      state.patientStep2Data = action.payload;
    },
    submitPatientData(state, action) {
      console.log(action.payload);
      return initialState;
    },
  },
});

export const { setStep1Data, setStep2Data, submitPatientData } =
  patientSlice.actions;

export default patientSlice.reducer;
