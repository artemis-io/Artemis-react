import React, { useState } from "react";
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";
import { apiMed } from "../../../services/api";
import { SmallCloseIcon } from "@chakra-ui/icons";

const AvatarUploader = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const [imagePreview, setImagePreview] = useState(
    "/assets/images/profile.png"
  );

  // const handleRemoveImage = () => {
  //   setImagePreview("/assets/images/profile.png");
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     avatar_url: "",
  //   }));
  // };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setAvatarUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveAvatar = () => {
    setSelectedFile(null);
    setAvatarUrl(null);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        await apiMed.post("/user/upload", formData);

        // Exemplo simulado de atualização
        // Simulando uma pausa de 2 segundos para dar a sensação de envio
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Limpando o estado após o envio
        setSelectedFile(null);
        setAvatarUrl(null);
      } catch (error) {
        console.error("Erro ao fazer upload:", error);
      }
    }
  };

  return (
    <Flex direction="column" align="center">
      <FormControl marginTop={10}>
        <Center>
          <FormLabel fontWeight="bold">Imagem de Perfil</FormLabel>
        </Center>

        <Stack direction={["column", "row"]} spacing={6}>
          {imagePreview && (
            <Center>
              <Box mt={4}>
                <Avatar size="xl" src={imagePreview}>
                  <AvatarBadge
                    as={IconButton}
                    size="sm"
                    rounded="full"
                    top="-10px"
                    colorScheme="red"
                    aria-label="remove Image"
                    // icon={<SmallCloseIcon onClick={} />}
                  />
                </Avatar>
              </Box>
            </Center>
          )}
          <Center>
            {/* <Input
                    variant="filled"
                    type="file"
                    accept="image/*"
                    name="avatar_url"
                    onChange={}
                  /> */}
          </Center>
        </Stack>
      </FormControl>
      <Box
        width="120px"
        height="120px"
        borderRadius="50%"
        overflow="hidden"
        position="relative"
      >
        {avatarUrl ? (
          <>
            <img
              src={avatarUrl}
              alt="Avatar"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <IconButton
              icon={<AiOutlineClose />}
              aria-label="Remover avatar"
              colorScheme="red"
              size="sm"
              position="absolute"
              top="5px"
              right="5px"
              onClick={handleRemoveAvatar}
            />
          </>
        ) : (
          <Text textAlign="center" mt="45%">
            Nenhum avatar
          </Text>
        )}
      </Box>
      <Input type="file" accept="image/*" onChange={handleFileChange} mt={3} />
      <Button
        onClick={handleUpload}
        colorScheme="blue"
        mt={3}
        isDisabled={!selectedFile}
      >
        Upload
      </Button>
    </Flex>
  );
};

export default AvatarUploader;
