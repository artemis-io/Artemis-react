import { IconButton, Flex, useColorModeValue, Image } from "@chakra-ui/react";

import { MobileProps } from "../../../shared/interface";

import { FiMenu } from "react-icons/fi";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const navigate = useNavigate(); // Use o hook useNavigate

  const handlePreviousPage = () => {
    navigate(-1); // Navegue para a página anterior
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
        onClick={handlePreviousPage}
        display={{ base: "flex", md: "none" }}
        variant="unstyled"
        aria-label="open menu"
        icon={<ArrowBackIcon />}
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
