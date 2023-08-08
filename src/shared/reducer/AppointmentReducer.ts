// ./store/Appointement.ts
import { createSlice } from "@reduxjs/toolkit";
import { FormState } from "../interface";

const initialState: FormState = {
  appointmentStep1Data: {
    type: "",
  },
  appointmentStep2Data: {
    query: "",
  },
  appointmentStep3Data: {
    speciality: [],
  },
  appointmentStep4Data: {
    id_doctor: "",
  },
  appointmentStep5Data: {},
  appointmentStep6Data: {
    date: "",
  },
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    setStep1Data(state, action) {
      state.appointmentStep1Data = action.payload;
    },
    setStep2Data(state, action) {
      state.appointmentStep2Data = action.payload;
    },
    setStep3Data(state, action) {
      state.appointmentStep3Data = action.payload;
    },
    setStep4Data(state, action) {
      state.appointmentStep4Data = action.payload;
    },
    setStep5Data(state, action) {
      state.appointmentStep5Data = action.payload;
    },
    setStep6Data(state, action) {
      state.appointmentStep6Data = action.payload;
    },
    submitFormData(state, action) {
      console.log(action.payload);

      return initialState;
    },
  },
});

export const {
  setStep1Data,
  setStep2Data,
  setStep3Data,
  setStep4Data,
  setStep5Data,
  setStep6Data,
  submitFormData,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
