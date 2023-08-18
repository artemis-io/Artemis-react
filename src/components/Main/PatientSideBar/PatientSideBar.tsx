import React, { ReactNode, useState } from "react";
import { Box, Drawer, DrawerContent, useDisclosure } from "@chakra-ui/react";

import LogoutModal from "../LogoutModal";
import { useAuth } from "../../../hooks/useAuth";

import SidebarContent from "./PatientSidebarContent";
import MobileNav from "../Mobile/MobileNav";

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
