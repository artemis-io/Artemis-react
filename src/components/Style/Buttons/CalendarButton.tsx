// components/PrimaryButton.tsx
import {
  AspectRatio,
  Button,
  ButtonProps,
  useMediaQuery,
} from "@chakra-ui/react";

interface CalendarButtonProps {
  isSelected: boolean;
  onClick: () => void;
  isDisabled: boolean;
  children: any;
}

const CalendarButton: React.FC<CalendarButtonProps> = ({
  children,
  isDisabled,
  isSelected,
  onClick,
  ...rest
}) => {
  const [isSmallerThanMd] = useMediaQuery("(max-width: 48em)");

  return (
    <AspectRatio h="35px" w="100%">
      <Button
        size="sm"
        boxShadow=".5px .5px .5px .5px rgba(0, 0, 0, 0.10)"
        onClick={onClick}
        fontSize={isSmallerThanMd ? "sm" : "md"}
        isDisabled={isDisabled}
        bg={isSelected ? "#0078D7" : "white"} // Change the background color conditionally
        color={isSelected ? "white" : "#0078D7"} // Adjust the text color
        {...rest}
      >
        {children}
      </Button>
    </AspectRatio>
  );
};

export default CalendarButton;
