import { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Box,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { AUTH_TOKEN_STORAGE } from "../../shared/storage/config";
import { apiMed } from "../../services/api";
import { useNavigate } from "react-router-dom";

interface UserData {
  avatar_url: string;
  name: string;
  email: string;
}

export default function Settings() {
  const router = useNavigate();

  const [formData, setFormData] = useState<UserData>({
    avatar_url: "",
    name: "",
    email: "",
  });

  const [imagePreview, setImagePreview] = useState(
    "/assets/images/profile.png"
  );

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const item = localStorage.getItem(AUTH_TOKEN_STORAGE);
        const response = await apiMed.get("/api/auth", {
          headers: {
            Authorization: `Bearer ${item}`,
          },
        });
        console.log("Response:", response.data);
        console.log("Item:", item);
        // Replace with the actual API endpoint URL
        const userData: UserData = response.data; // Assuming the response contains the user data
        setFormData(userData);
        setImagePreview(userData.avatar_url || "/assets/images/profile.png");
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "avatar_url") {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setImagePreview(reader.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleRemoveImage = () => {
    setImagePreview("/assets/images/profile.png");
    setFormData((prevData) => ({
      ...prevData,
      avatar_url: "",
    }));
  };

  const handleEdit = async () => {
    try {
      // Send the formData to your API endpoint for updating the user data
      await apiMed.post("/api/user", formData); // Replace with the actual API endpoint URL
      router("/patient/homepage");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Box>
        <Stack spacing={4} w={"full"} maxW={"md"} p={6}>
          <Heading fontSize={{ base: "2xl", sm: "3xl" }}>
            Configurações de conta
          </Heading>
          <FormControl marginTop={10}>
            <Center>
              <FormLabel>Imagem de Perfil</FormLabel>
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
                        icon={<SmallCloseIcon onClick={handleRemoveImage} />}
                      />
                    </Avatar>
                  </Box>
                </Center>
              )}
              <Center>
                <Input
                  variant="filled"
                  type="file"
                  accept="image/*"
                  name="avatar_url"
                  onChange={handleChange}
                />
              </Center>
            </Stack>
          </FormControl>

          <FormControl id="name">
            <FormLabel>Nome</FormLabel>
            <Input
              variant="flushed"
              _placeholder={{ color: "gray.500" }}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Endereço</FormLabel>
            <Input
              variant="flushed"
              _placeholder={{ color: "gray.500" }}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormControl>

          {/* Add other form fields for other user-related data */}

          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              onClick={handleEdit}
              bg={"blue.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "blue.500",
              }}
            >
              Editar
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
