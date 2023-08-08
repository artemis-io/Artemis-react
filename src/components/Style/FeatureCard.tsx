import { Box, Heading, Text } from "@chakra-ui/react";

// Component for Feature Card
export const FeatureCard = ({ icon, title, description }: any) => {
  return (
    <Box p={6} borderRadius="md" boxShadow="md">
      {icon}
      <Heading as="h4" size="md" mt={4} mb={2}>
        {title}
      </Heading>
      <Text color="gray.600">{description}</Text>
    </Box>
  );
};
