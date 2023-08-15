"use client";

import React, { ReactNode } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Button,
} from "@chakra-ui/react";

import { IconType } from "react-icons";
import { ReactText } from "react";
import { BsChatSquareQuote } from "react-icons/bs";

interface MedicalRecordProps {
  children: React.ReactNode;
  onClick: () => void;
}
export default function MedicalRecord({
  onClick,
  children,
}: MedicalRecordProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      w="194px"
      justifyContent="space-between"
      fontWeight="bold"
      fontSize="lg"
      color="#fafafa"
      onClick={onClick}
    >
      {children}
  {/*     <Button onClick={onOpen}>teste</Button> */}
      <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>{children}</DrawerContent>
      </Drawer>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  closeMedicalRecord: () => void;
}

export const MedicalRecordContent = ({ closeMedicalRecord, ...rest }: SidebarProps) => {
  return (
    <Box
      display={{ base: "none", md: "block" }}
      bg="transparent"
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text> LOCAL DO PRONTUÁRIO</Text>
        <CloseButton
          display={{ base: "flex", md: "none" }}
          onClick={closeMedicalRecord}
        />
      </Flex>
    </Box>
  );
};
