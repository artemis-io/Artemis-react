// ./components/Form.tsx
import { useState } from "react";
import AppointmentType from "../../components/Main/Multiform/StepsAppointment/AppointmentType";
import AppointmentQuery from "../../components/Main/Multiform/StepsAppointment/AppointmentQuery";
import SelectSpecialty from "../../components/Main/Multiform/StepsAppointment/SelectSpecialty";
import DoctorList from "../../components/Main/Multiform/StepsAppointment/DoctorList";
import MedBio from "../../components/Main/Multiform/StepsAppointment/MedBio";
import Schedule from "../../components/Main/Multiform/StepsAppointment/Schedule";
import PatientSidebar from "../../components/Main/PatientSideBar/PatientSideBar";

const FormAppointment = () => {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  /* duplicar type: particular segue x type particular segue a outra sequência */
  return (
    <PatientSidebar>
      {step === 1 && <AppointmentType handleNextStep={handleNextStep} />}
      {step === 2 && <AppointmentQuery handleNextStep={handleNextStep} />}
      {step === 3 && <SelectSpecialty handleNextStep={handleNextStep} />}
      {step === 4 && <DoctorList handleNextStep={handleNextStep} />}
      {step === 5 && <MedBio handleNextStep={handleNextStep} />}
      {step === 6 && <Schedule />}
    </PatientSidebar>
  );
};

export default FormAppointment;
