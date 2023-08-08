import { Button } from "@chakra-ui/react";

type FormButtonProps = {
  value: string;
  isSelected: boolean;
  onSelect: () => void;
};

const FormButton = ({ value, isSelected, onSelect }: FormButtonProps) => {
  return (
    <Button
      colorScheme="blue"
      onClick={onSelect}
      backgroundColor={isSelected ? "blue.500" : "gray.200"}
      color={isSelected ? "white" : "black"}
      _hover={{ bg: isSelected ? "blue.600" : "gray.300" }}
    >
      {value}
    </Button>
  );
};

export default FormButton;
