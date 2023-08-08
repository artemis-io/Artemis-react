import { Box, Card, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { CardProps } from "../../../shared/types";

const ConvCard: React.FC<CardProps> = ({ text, imageUrl }) => {
  const router = useNavigate();

  const handleNav = (route: any) => {
    router(route);
  };
  return (
    <Card onClick={() => handleNav("/patient/doctorlist")}>
      <Box
        display="flex"
        height="100px"
        padding="24px 12px"
        justifyContent="center"
        alignItems="center"
        gap="22px"
        flexShrink={0}
        borderWidth="1px"
        borderRadius="12px"
        borderColor="gray.200"
        boxShadow="0px 2px 2px 0px rgba(0, 0, 0, 0.10)"
      >
        <Image src={imageUrl} alt="Imagem do Card" width="50px" height="50px" />

        <Text color="#494949" fontSize="16px" fontWeight="700">
          {text}
        </Text>
      </Box>
    </Card>
  );
};

export default ConvCard;
