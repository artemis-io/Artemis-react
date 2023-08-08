import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Link,
  Image,
} from "@chakra-ui/react";

import { LinkItems } from "../../../shared/constant";
import { SidebarProps } from "../../../shared/interface";

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
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Image
          src="/assets/images/logo.png"
          alt="logo"
          maxWidth="150px"
          mt={4}
        />

        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <ul>
        {LinkItems.map((link) => (
          <li key={link.name}>
            <Flex
              color="#747B7D"
              align="center"
              p="4"
              mx="4"
              borderRadius="lg"
              role="group"
              cursor="pointer"
              _hover={{
                bg: "#0078D7",
                color: "white",
              }}
            >
              <Link
                fontWeight="semibold"
                style={{ textDecoration: "none" }}
                _focus={{ boxShadow: "none" }}
                href={link.to}
                onClick={() => {
                  if (link.name === "Desconectar") {
                    toggleLogoutModal(); // Show the logout modal instead of directly calling logout()
                  } else {
                    onClose(); // Close the sidebar for other links
                  }
                }}
              >
                {link.name}
              </Link>
            </Flex>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default SidebarContent;
