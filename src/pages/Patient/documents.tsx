import { useState, useRef } from "react";
import { Box, Flex, HStack, Heading, IconButton, Text } from "@chakra-ui/react";
import { AiOutlinePaperClip, AiOutlineCheckCircle } from "react-icons/ai";

const UploadPage = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isCardConfirmed, setCardConfirmed] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  const handleCardClick = (cardIndex: number) => {
    setSelectedCard(cardIndex === selectedCard ? null : cardIndex);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    // Simulando o envio do arquivo com um atraso de 2 segundos
    setTimeout(() => {
      // Aqui você pode realizar as operações desejadas com os arquivos enviados
      console.log("Arquivos enviados:", files);
      setCardConfirmed((prevState) =>
        prevState.map((confirmed, index) =>
          index === selectedCard ? true : confirmed
        )
      );
    }, 2000);
  };

  const handleUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Flex justify="center" align="center" h="60vh">
      <Box p="4">
        <Heading mb="20" size="lg" color="#747B7D">
          Documentação
        </Heading>
        <Flex direction="column" gap={4}>
          <Flex direction="row" gap={4}>
            <Card
              isSelected={selectedCard === 0}
              isConfirmed={isCardConfirmed[0]}
              onClick={() => handleCardClick(0)}
            >
              <Text>Anexar Guia de Autorização</Text>
            </Card>

            <Card
              isSelected={selectedCard === 1}
              isConfirmed={isCardConfirmed[1]}
              onClick={() => handleCardClick(1)}
            >
              <Text>Anexar Frente do RG</Text>
            </Card>
          </Flex>

          <HStack direction="row" gap={4}>
            <Card
              isSelected={selectedCard === 2}
              isConfirmed={isCardConfirmed[2]}
              onClick={() => handleCardClick(2)}
            >
              <Text>Anexar Verso do RG</Text>
            </Card>

            <Card
              isSelected={selectedCard === 3}
              isConfirmed={isCardConfirmed[3]}
              onClick={() => handleCardClick(3)}
            >
              <Text>Anexar Carteira do Convênio</Text>
            </Card>
          </HStack>
        </Flex>
      </Box>

      {selectedCard !== null && (
        <Box
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          zIndex="10"
          bg="rgba(0, 0, 0, 0.5)"
          display="flex"
          justifyContent="center"
          alignItems="center"
          onClick={() => setSelectedCard(null)}
        >
          <Box
            maxW="sm"
            p={4}
            bg="white"
            borderRadius="md"
            boxShadow="md"
            zIndex="11"
          >
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              style={{ display: "none" }}
              id="file-upload-input"
              ref={fileInputRef}
            />
            <label htmlFor="file-upload-input">
              <IconButton
                as="span"
                icon={<AiOutlinePaperClip />}
                aria-label="Upload Files"
                onClick={handleUploadButtonClick}
              />
            </label>
          </Box>
        </Box>
      )}
    </Flex>
  );
};

interface CardProps {
  isSelected: boolean;
  isConfirmed: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const Card = ({ isSelected, isConfirmed, onClick, children }: CardProps) => (
  <Box
    w="175px"
    h="175px"
    fontWeight="bold"
    fontSize="14px"
    textAlign="center"
    p={8}
    bg="#0078D7"
    color="#fafafa"
    borderWidth={isSelected ? "2px" : "1px"}
    borderRadius="md"
    borderColor={isSelected ? "blue.500" : "gray.300"}
    cursor="pointer"
    onClick={onClick}
    _hover={{ borderColor: isSelected ? "blue.600" : "gray.400" }}
  >
    <Flex align="center" gap="2" flexDirection="column">
      {isConfirmed ? (
        <AiOutlineCheckCircle color="green" />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="37"
          viewBox="0 0 35 37"
          fill="none"
        >
          <path
            d="M34.2495 13.7038C33.6539 13.1115 32.691 13.1141 32.0986 13.7096L13.8163 32.0908C11.4444 34.4627 7.5921 34.4627 5.21577 32.0876C2.84122 29.7119 2.84122 25.8595 5.21605 23.4847L24.0395 4.56232C25.5204 3.08155 27.9279 3.08155 29.4131 4.56553C30.8978 6.05023 30.8978 8.4575 29.4127 9.94262L13.8192 25.536C13.8182 25.537 13.8173 25.5382 13.8163 25.5392C13.2223 26.1299 12.2622 26.1292 11.6693 25.5363C11.0755 24.9424 11.0755 23.98 11.6693 23.3861L19.1962 15.8577C19.79 15.2637 19.79 14.3007 19.196 13.7068C18.602 13.113 17.639 13.1131 17.0451 13.7071L9.51837 21.2353C7.73674 23.017 7.73674 25.9054 9.51851 27.6871C11.3002 29.4688 14.1886 29.4688 15.9704 27.6871C15.9724 27.685 15.9741 27.6828 15.9761 27.6807L31.5635 12.0933C34.2364 9.42035 34.2364 5.08716 31.5635 2.4142C28.8901 -0.257206 24.5572 -0.257206 21.8858 2.4142L3.06237 21.3367C-0.497453 24.8965 -0.497454 30.6743 3.06493 34.2385C6.62967 37.8013 12.4075 37.8013 15.9701 34.2387L34.2553 15.8547C34.8476 15.2591 34.845 14.2962 34.2495 13.7038Z"
            fill="white"
          />
        </svg>
      )}
      {children}
    </Flex>
  </Box>
);

export default UploadPage;
