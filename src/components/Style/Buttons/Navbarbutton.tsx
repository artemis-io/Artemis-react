// components/PrimaryButton.tsx
import { Button, ButtonProps } from "@chakra-ui/react";

const Navbarbutton: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <Button
      boxShadow="0px 2px 2px 0px rgba(0, 0, 0, 0.10)"
      borderRadius="8px"
      bg="#0078D7"
      h="56px"
      w='full'
      color="#fafafa"
      fontSize="16px"
      fontWeight="600"
      mb={2}
   
      {...rest}
    >
      {children}
    </Button>
  );
};

export default Navbarbutton;
