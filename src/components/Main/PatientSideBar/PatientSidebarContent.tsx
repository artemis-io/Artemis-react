import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Link,
  Image,
} from "@chakra-ui/react";

import { LinkItemsPatient } from "../../../shared/constant";
import { SidebarProps } from "../../../shared/interface";
import { PatientNavItem } from "./PatientNavItem";

const SidebarContent = ({
  onClose,
  toggleLogoutModal,
  ...rest
}: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      borderBottom="1px"
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      bg={useColorModeValue("white", "gray.900")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex
        h="20"
        alignItems="center"
        mx="8"
        justifyContent="space-between"
        mb={4}
      >
        <Image
          src="/assets/images/logo.png"
          alt="logo"
          maxWidth="150px"
          mt={4}
        />

        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <ul>
        {LinkItemsPatient.map((link) => (
          <li key={link.name}>
            <Link
              href={link.to}
              style={{ textDecoration: "none" }}
              onClick={() => {
                if (link.name === "Desconectar") {
                  toggleLogoutModal();
                } else {
                  onClose();
                }
              }}
            >
              <PatientNavItem icon={link.icon}>{link.name}</PatientNavItem>
            </Link>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default SidebarContent;
