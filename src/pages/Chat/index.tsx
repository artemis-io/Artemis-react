import { Box, Flex, IconButton, Text, Input, Button } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

interface ChatProps {
  recipientName: string;
  onGoBack: () => void;
}

const Chat: React.FC<ChatProps> = ({ recipientName, onGoBack }) => {
  return (
    <Box minHeight="100vh" position="relative">
      <Flex
        align="center"
        justify="space-between"
        p={4}
        borderBottom="1px solid gray"
      >
        <IconButton
          icon={<ArrowBackIcon />}
          aria-label="Voltar"
          onClick={onGoBack}
        />
        <Text fontWeight="bold">{recipientName}</Text>
        <Box w={6} />
      </Flex>

      {/* Conteúdo do chat aqui */}

      <Box
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        p={4}
        borderTop="1px solid gray"
        bg="white"
      >
        <Flex>
          <Input
            flex="1"
            placeholder="Digite sua mensagem..."
            roundedLeft="md"
            mr={2}
          />
          <Button colorScheme="blue" roundedRight="md" px={8}>
            Enviar
            <ArrowForwardIcon ml={2} />
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default Chat;
