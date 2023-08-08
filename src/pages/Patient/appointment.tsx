// ./components/Form.tsx
import { useState } from "react";
import AppointmentType from "../../components/Main/Multiform/StepsAppointment/AppointmentType";
import AppointmentQuery from "../../components/Main/Multiform/StepsAppointment/AppointmentQuery";
import SelectSpecialty from "../../components/Main/Multiform/StepsAppointment/SelectSpecialty";
import DoctorList from "../../components/Main/Multiform/StepsAppointment/DoctorList";
import MedBio from "../../components/Main/Multiform/StepsAppointment/MedBio";
import Schedule from "../../components/Main/Multiform/StepsAppointment/Schedule";
import Sidebar from "../../components/Main/SideBar/Sidebar";

const FormAppointment = () => {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  /* duplicar type: particular segue x type particular segue a outra sequência */
  return (
    <Sidebar>
      {step === 1 && <AppointmentType handleNextStep={handleNextStep} />}
      {step === 2 && <AppointmentQuery handleNextStep={handleNextStep} />}
      {step === 3 && <SelectSpecialty handleNextStep={handleNextStep} />}
      {step === 4 && <DoctorList handleNextStep={handleNextStep} />}
      {step === 5 && <MedBio handleNextStep={handleNextStep} />}
      {step === 6 && <Schedule />}
    </Sidebar>
  );
};

export default FormAppointment;
