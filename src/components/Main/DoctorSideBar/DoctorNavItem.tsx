import { Flex, Icon } from "@chakra-ui/react";
import { NavItemProps } from "../../../shared/interface";

export const DoctorNavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
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
  );
};
