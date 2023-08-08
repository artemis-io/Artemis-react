import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";

interface CardProps {
  name: string;
  spec: string;
  imageUrl: string;
  price: number;
  date: string;
}

const ScheduleResumeCard: React.FC<CardProps> = ({
  name,
  spec,
  imageUrl,
  price,
  date,
}) => (
  <Card
    direction={{ base: "column", sm: "row" }}
    overflow="hidden"
    boxShadow="1px 2px 2px 1px rgba(0, 0, 0, 0.25)"
  >
    <CardHeader>
      <Flex justifyContent="space-between" alignItems="flex-start">
        <Flex gap="4" alignItems="center">
          <Avatar
            name="Segun Adebayo"
            src="https://bit.ly/sage-adebayo"
            width="80px"
            height="120px"
            borderRadius="12px"
          />

          <Box>
            <Heading color="#494949" fontSize="16px" fontWeight="700">
              {name}
            </Heading>
            <Text color="#494949" fontSize="14px" fontWeight="300">
              {spec}
            </Text>
            <Box display="flex" gap={1} flexDirection="column">
              <Heading color="#494949" fontSize="16px">
                R${price},00
              </Heading>

              <Text color="#494949" fontSize="14px" fontWeight="300">
                {spec}
              </Text>
              <Text>
                {new Date(date)
                  .toLocaleDateString("pt-BR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })
                  .replace(/^\w/, (c) => c.toUpperCase())}{" "}
                às{" "}
                {new Date(date).toLocaleTimeString("pt-BR", {
                  hour: "numeric",
                  minute: "numeric",
                })}
              </Text>
            </Box>
          </Box>
        </Flex>
        <IconButton
          colorScheme="none"
          color="#747B7D"
          size="lg"
          aria-label="Delete Button"
          icon={<FiTrash2 />}
        />
      </Flex>
    </CardHeader>
  </Card>
);

export default ScheduleResumeCard;
