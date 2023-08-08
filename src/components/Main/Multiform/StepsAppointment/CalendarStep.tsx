import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setStep6Data } from "../../../../shared/reducer/AppointmentReducer";

const CalendarStep = ({ handleNextStep }: any) => {
  const dispatch = useDispatch();
  const [date, setDate] = useState("");

  const handleSubmit = (e: any) => {
    console.log(`teste: ${e}`);
    e.preventDefault();
    dispatch(setStep6Data({ date }));
    handleNextStep();
  };

  return (
    <Box>
      <Heading marginLeft={12}>Agende seu Horário</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel marginTop={14}>Data:</FormLabel>
          <Input
            marginTop={5}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Select Date and Time"
            type="datetime-local"
          />
        </FormControl>

        <Button type="submit" marginLeft={20} marginTop={8}>
          Agendar Consulta
        </Button>
      </form>
    </Box>
  );
};

export default CalendarStep;
