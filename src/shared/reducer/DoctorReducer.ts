import { createSlice } from "@reduxjs/toolkit";
import { DoctorState } from "../interface";

const initialState: DoctorState = {
  doctorStep1Data: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  doctorStep2Data: {
    cpf: "",
    gender: "",
    rg: "",
    cep: "",
    address: "",
    number: "",
    state: "",
    district: "",
    city: "",
    dateOfBirth: "",
  },
  doctorStep3Data: {
    crm: "",
    pricing: "",
    bio: "",
    speciality: [],
  },
};

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    setStep1Data(state, action) {
      state.doctorStep1Data = action.payload;
    },
    setStep2Data(state, action) {
      state.doctorStep2Data = action.payload;
    },
    setStep3Data(state, action) {
      state.doctorStep3Data = action.payload;
    },
    submitDoctorData(state, action) {
      console.log(action.payload);
      return initialState;
    },
  },
});

export const { setStep1Data, setStep2Data, setStep3Data, submitDoctorData } =
  doctorSlice.actions;

export default doctorSlice.reducer;
