import React, { ReactNode, useState } from "react";
import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  useDisclosure,
  Image,
  Icon,
} from "@chakra-ui/react";

import LogoutModal from "./LogoutModal";
import { useAuth } from "../../hooks/useAuth";
import { NavItemProps, SidebarProps } from "../../shared/interface";
import { LinkItemsPatient } from "../../shared/constant";
import MobileNav from "./SideBar/MobileNav";

export default function PatientSidebar({ children }: { children: ReactNode }) {
  const { signOut } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); // Add this state

  const toggleLogoutModal = () => {
    setIsLogoutModalOpen((prev: any) => !prev); // Function to toggle the logout modal state
  };

  const handleLogout = async () => {
    signOut(); // Limpar a autenticação e o usuário corretamente
    toggleLogoutModal(); // Fechar o modal de logout
  };

  return (
    <Box minH="100vh">
      <SidebarContent
        onClose={() => onClose}
        toggleLogoutModal={() => {
          toggleLogoutModal();
        }}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="top"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent
            onClose={onClose}
            toggleLogoutModal={toggleLogoutModal}
          />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={toggleLogoutModal}
        onLogout={handleLogout}
      />

      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

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
        <Box></Box>
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
                  toggleLogoutModal(); // Show the logout modal instead of directly calling logout()
                } else {
                  onClose(); // Close the sidebar for other links
                }
              }}
            >
              <NavItem icon={link.icon}>{link.name}</NavItem>
            </Link>
          </li>
        ))}
      </ul>
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Link style={{ textDecoration: "none" }}>
      <Flex
        fontWeight="semibold"
        _focus={{ boxShadow: "none" }}
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
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};
