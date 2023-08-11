import { ReactNode, useState } from "react";
import { Box, Drawer, DrawerContent, useDisclosure } from "@chakra-ui/react";

import MobileNav from "./MobileNav";
import LogoutModal from "../LogoutModal";
import SidebarContent from "./SidebarContent";

import { useAuth } from "../../../hooks/useAuth";

export default function Sidebar({ children }: { children: ReactNode }) {  
  const { signOut } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);


  const toggleLogoutModal = () => {
    setIsLogoutModalOpen((prev: any) => !prev); 
  };

  const handleLogout = async () => {
    signOut(); 
    toggleLogoutModal(); 
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
