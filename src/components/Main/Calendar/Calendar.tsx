import { useMemo, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useMediaQuery } from "@chakra-ui/react";
import CalendarButton from "../../Style/Buttons/CalendarButton";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useDispatch } from "react-redux";
import { setStep6Data } from "../../../shared/reducer/AppointmentReducer";

interface CalendarWeek {
  week: number;
  days: Array<{
    date: dayjs.Dayjs;
    isDisabled: boolean;
  }>;
}

type CalendarWeeks = CalendarWeek[];

interface CalendarProps {
  selectedDate?: Date | null;
  onDateSelected: (date: Date) => void;
}

export default function Calendar({
  selectedDate,
  onDateSelected,
}: CalendarProps) {
  const dispatch = useDispatch();
  const [isSmallerThanMd] = useMediaQuery("(max-width: 48em)");
  const [isSmallerThanLg] = useMediaQuery("(max-width: 62em)");

  const handleSubmit = (e: any) => {
    console.log(`teste: ${e}`);
    dispatch(setStep6Data({ date: e }));
  };

  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set("date", 1);
  });

  function handlePreviousMonth() {
    const previousMonthDate = currentDate.subtract(1, "month");
    setCurrentDate(previousMonthDate);
  }

  function handleNextMonth() {
    const previousMonthDate = currentDate.add(1, "month");
    setCurrentDate(previousMonthDate);
  }

  const currentMonth = format(currentDate.toDate(), "MMMM", { locale: ptBR });

  const currentYear = currentDate.format("YYYY");

  const calendarWeeks = useMemo(() => {
    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, i) => {
      return currentDate.set("date", i + 1);
    });

    const firstWeekDay = currentDate.get("day");

    const previousMonthFillArray = Array.from({
      length: firstWeekDay,
    })
      .map((_, i) => {
        return currentDate.subtract(i + 1, "day");
      })
      .reverse();

    const lastDayinCurrentMonth = currentDate.set(
      "date",
      currentDate.daysInMonth()
    );

    const lastWeekDay = lastDayinCurrentMonth.get("day");

    const nextMonthFillArray = Array.from({
      length: 7 - (lastWeekDay + 1),
    }).map((_, i) => {
      return lastDayinCurrentMonth.add(i + 1, "day");
    });

    const calendarDays = [
      ...previousMonthFillArray.map((date) => {
        return { date, isDisabled: true };
      }),
      ...daysInMonthArray.map((date) => {
        return { date, isDisabled: date.endOf("day").isBefore(new Date()) };
      }),
      ...nextMonthFillArray.map((date) => {
        return { date, isDisabled: true };
      }),
    ];

    const calendarWeeks = calendarDays.reduce<CalendarWeeks>(
      (weeks, _, i, original) => {
        const isNewWeek = i % 7 === 0;

        if (isNewWeek) {
          weeks.push({
            week: i / 7 + 1,
            days: original.slice(i, i + 7),
          });
        }
        return weeks;
      },
      []
    );

    return calendarWeeks;
  }, [currentDate]);

  return (
    <Box p={2}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-around"
        mb={4}
        mt={2}
      >
        <IconButton
          bg="none"
          colorScheme="gray"
          aria-label="Previous month"
          icon={<ArrowLeftIcon />}
          onClick={handlePreviousMonth}
        />
        <Box
          bg="rgba(0, 120, 215, 0.79)"
          borderRadius="12px"
          w="300px"
          p={2}
          display="flex"
          justifyContent="space-between"
          color="#fafafa"
        >
          <Heading fontWeight="500" textTransform="capitalize">
            {currentMonth}
          </Heading>
          <Heading>{currentYear}</Heading>
        </Box>
        <IconButton
          bg="none"
          colorScheme="gray"
          aria-label="Next month"
          icon={<ArrowRightIcon />}
          onClick={handleNextMonth}
        />
      </Box>

      <Table size={isSmallerThanLg ? "sm" : "md"} mb={8}>
        <Thead>
          <Tr>
            <Th>DOM</Th>
            <Th>SEG</Th>
            <Th>TER</Th>
            <Th>QUA</Th>
            <Th>QUI</Th>
            <Th>SEX</Th>
            <Th>SÁB</Th>
          </Tr>
        </Thead>
        <Tbody>
          {calendarWeeks.map(({ week, days }) => {
            return (
              <Tr key={week}>
                {days.map(({ date, isDisabled }) => {
                  const isSelected =
                    selectedDate && date.isSame(selectedDate, "day");
                  return (
                    <Td key={date.toString()}>
                      <CalendarButton
                        isSelected={isSelected || false} // Provide a default value of false
                        onClick={() => onDateSelected(date.toDate())}
                        isDisabled={isDisabled}
                      >
                        {date.get("date")}
                      </CalendarButton>
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}
