import { IconButton, Flex, useColorModeValue, Image } from "@chakra-ui/react";
import { MobileProps } from "../../../shared/interface";
import { FiHome, FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const router = useNavigate();
  
  const { user } = useAuth();
  const handleNav = () => {
    router(`../../${user?.role}/homepage`);
  };

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        onClick={handleNav}
        display={{ base: "flex", md: "none" }}
        variant="unstyled"
        aria-label="open menu"
        icon={<FiHome />}
      />

      <Image src="/assets/images/logo.png" alt="logo" maxWidth="150px" mt={4} />

      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="unstyled"
        aria-label="open menu"
        icon={<FiMenu />}
      />
    </Flex>
  );
};

export default MobileNav;
