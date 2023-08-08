import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Navbarbutton from "../Style/Buttons/Navbarbutton";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      bg="#fafafa"
      color="white"
    >
      <Drawer isOpen={isOpen} placement="top" onClose={onClose}>
        <DrawerOverlay />

        <DrawerContent bg="#fafafa" color="white">
          <Flex alignItems={"flex-start"} p={4}>
            <IconButton
              icon={<CloseIcon />}
              onClick={onClose}
              aria-label={""}
              size="lg"
            />
          </Flex>
          <DrawerBody p={4}>
            <Flex direction="column" align="center">
              <Navbarbutton>Consultas</Navbarbutton>
              <Navbarbutton>Perfil</Navbarbutton>
              <Navbarbutton>Agendar Atendimento</Navbarbutton>
              <Navbarbutton>Consultar Agendamentos</Navbarbutton>
              <Navbarbutton>Configurações</Navbarbutton>
              <Navbarbutton>Desconectar</Navbarbutton>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Box display={{ base: "block", md: "none" }}>
        <IconButton
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          variant="ghost"
          onClick={isOpen ? onClose : onOpen}
          aria-label={""}
        />
      </Box>
    </Flex>
  );
};

export default Navbar;
