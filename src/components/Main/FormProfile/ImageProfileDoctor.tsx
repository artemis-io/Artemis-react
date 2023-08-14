import React, { useEffect, useState } from "react";
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
  useToast,
} from "@chakra-ui/react";
import { apiMed } from "../../../services/api";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { AUTH_TOKEN_STORAGE } from "../../../shared/storage/config";

const AvatarUploader = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const item = localStorage.getItem(AUTH_TOKEN_STORAGE);
        const response = await apiMed.get("/auth/doctor", {
          headers: {
            Authorization: `Bearer ${item}`,
          },
        });

        setAvatarUrl(response.data.avatar_url);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);

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
      setLoading(true);
      console.log(selectedFile);
      const formData = new FormData();
      formData.append("file", selectedFile, selectedFile.name);
;

      try {
        const item = localStorage.getItem(AUTH_TOKEN_STORAGE);
        console.log("Data:",formData)
        await apiMed.post("/user/upload", formData, {
          headers: {
            Authorization: `Bearer ${item}`,
          },
        });

        toast({
          title: "Alterações salvas",
          description: "Suas alterações foram salvas com sucesso.",
          position: "top",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        console.error("Erro no upload:", error);
      }

      setLoading(false);
    }
  };

  return (
    <Flex direction="column" align="center">
      <FormControl marginTop={10}>
        <Center>
          <FormLabel fontWeight="bold">Profile Image</FormLabel>
        </Center>

        <Stack direction={["column", "row"]} spacing={6}>
          {avatarUrl && (
            <Center>
              <Box mt={4}>
                <Avatar size="xl" src={avatarUrl}>
                  <AvatarBadge
                    as={IconButton}
                    size="sm"
                    rounded="full"
                    top="-10px"
                    colorScheme="red"
                    aria-label="Remove Image"
                    onClick={handleRemoveAvatar}
                    icon={<SmallCloseIcon />}
                  />
                </Avatar>
              </Box>
            </Center>
          )}
          <Center>
            <Input
              variant="flushed"
              type="file"
              accept="image/*"
              name="avatar_url"
              onChange={handleFileChange}
            />
          </Center>
        </Stack>
      </FormControl>

      <Button
        onClick={handleUpload}
        colorScheme="blue"
        isLoading={loading}
        mt={3}
        isDisabled={!selectedFile}
      >
        Atualizar Foto
      </Button>
    </Flex>
  );
};

export default AvatarUploader;
