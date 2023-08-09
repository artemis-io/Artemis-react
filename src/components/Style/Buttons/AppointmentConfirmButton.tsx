import { Button, ButtonProps } from "@chakra-ui/react";
import React from "react";

const AppointmentConfirmButton: React.FC<ButtonProps> = ({
  children,
  ...rest
}) => {
  return (
    <Button
      boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
      borderRadius="12px"
      bg="#0078D7"
      w="400px"
      h="50px"
      color="#fafafa"
      fontSize="16px"
      {...rest}
    >
      {children}
    </Button>
  );
};

export default AppointmentConfirmButton;
