import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Divider,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

type AccordionDoctorsProps = {
  letter: string;
  activeLetters: string[];
  onAccordionClick: (letter: string) => void;
  renderDoctorsByLetter: (letter: string) => JSX.Element;
  getDoctorCountByLetter: (letter: string) => number;
};

const AccordionDoctors = ({
  letter,
  activeLetters,
  onAccordionClick,
  renderDoctorsByLetter,
  getDoctorCountByLetter,
}: AccordionDoctorsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [doctorCount, setDoctorCount] = useState(0);

  useEffect(() => {
    setDoctorCount(getDoctorCountByLetter(letter));
  }, [getDoctorCountByLetter, letter]);

  useEffect(() => {
    setIsOpen(activeLetters.includes(letter) || activeLetters.length === 0);
  }, [activeLetters, letter]);

  const handleAccordionButtonClick = () => {
    onAccordionClick(letter);
  };

  return (
    <Accordion minW="100%" key={letter} allowToggle>
      <AccordionItem minW="90%">
        <AccordionButton onClick={handleAccordionButtonClick}>
          <Flex justifyContent="space-between" alignItems="center" w="100%">
            <Flex alignItems="center" w="100%">
              <Text fontSize="lg" fontWeight="bold">
                {letter}
              </Text>
              <Divider height="1px" mx={2} flex="1" bg="gray.300" />
            </Flex>
            <Flex flexDirection="row" alignItems="center">
              <Text fontSize="sm" color="gray.500">
                {doctorCount}
              </Text>
              <Text fontSize="sm" color="gray.500">
                <>&nbsp;</>médicos
              </Text>
              <AccordionIcon />
            </Flex>
          </Flex>
        </AccordionButton>
        <AccordionPanel>
          {isOpen && renderDoctorsByLetter(letter)}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionDoctors;
