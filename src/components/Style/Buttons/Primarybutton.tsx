// components/PrimaryButton.tsx
import { Button, ButtonProps } from "@chakra-ui/react";

const PrimaryButton: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <Button
    boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
    borderRadius="12px"
    bg="#0078D7"
    w="300px"
    h="72px"
    color="#fafafa"
    fontSize="20px"
    fontWeight='700'
      {...rest}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
