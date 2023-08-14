import { createSlice } from "@reduxjs/toolkit";
import { PaymentCardState } from "../interface";

const initialState: PaymentCardState = {
  paymentCardStep1Data: {
    price: "",
  },
  paymentCardStep2Data: {
    cpf: "",
    rg: "",
    gender: "",
    cep: "",
    address: "",
    number: "",
    state: "",
    district: "",
    city: "",
    NumeroParcela: "",
    phoneNumber: "",
  },
};

const CardSlice = createSlice({
  name: "Card",
  initialState,
  reducers: {
    setpaymentStep1Data(state, action) {
      state.paymentCardStep1Data = action.payload;
    },
    setpaymentStep2Data(state, action) {
      state.paymentCardStep2Data = action.payload;
    },
    submitPaymentData(state, action) {
      console.log(action.payload);
      return initialState;
    },
  },
});

export const { setpaymentStep1Data, setpaymentStep2Data, submitPaymentData } =
  CardSlice.actions;

export default CardSlice.reducer;
