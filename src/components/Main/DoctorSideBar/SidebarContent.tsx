import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Link,
  Image,
} from "@chakra-ui/react";

import { LinkItemsDoctor } from "../../../shared/constant";
import { SidebarProps } from "../../../shared/interface";
import { DoctorNavItem } from "./DoctorNavItem";

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
        mb={4}
        alignItems="center"
        mx="8"
        justifyContent="space-between"
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
        {LinkItemsDoctor.map((link) => (
          <li key={link.name}>
            <Link
              fontWeight="semibold"
              style={{ textDecoration: "none" }}
              _focus={{ boxShadow: "none" }}
              href={link.to}
              onClick={() => {
                if (link.name === "Desconectar") {
                  toggleLogoutModal();
                } else {
                  onClose();
                }
              }}
            >
              <DoctorNavItem icon={link.icon}>{link.name}</DoctorNavItem>
            </Link>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default SidebarContent;
