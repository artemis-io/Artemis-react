// components/PrimaryButton.tsx
import { AspectRatio, Button, ButtonProps } from "@chakra-ui/react";

const CalendarButton: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <AspectRatio h="35px" w="100%">
      <Button
        size="sm"
        bg="white"
        color="#1795E0"
        boxShadow="1px 1px 1px 1px rgba(0, 0, 0, 0.10)"
        {...rest}
      >
        {children}
      </Button>
    </AspectRatio>
  );
};

export default CalendarButton;
