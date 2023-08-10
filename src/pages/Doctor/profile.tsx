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
  profile: {
    cep: string;
    address: string;
    number: string;
    state: string;
    district: string;
    city: string;
  };
  doctor: {
    pricing: string;
    bio: string;
    speciality: string[];
  };
}

export default function SettingsDoctor() {
  const router = useNavigate();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<UserData>({
    avatar_url: "",
    name: "",
    profile: {
      cep: "",
      address: "",
      number: "",
      state: "",
      district: "",
      city: "",
    },
    doctor: {
      pricing: "",
      bio: "",
      speciality: [],
    },
  });

  const [imagePreview, setImagePreview] = useState(
    "/assets/images/profile.png"
  );

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const item = localStorage.getItem(AUTH_TOKEN_STORAGE);
        const response = await apiMed.get("/auth/doctor", {
          headers: {
            Authorization: `Bearer ${item}`,
          },
        });
        console.log("Response:", response.data);
        console.log("Item:", item);
        const userData: UserData = response.data;
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
  
    if (name.includes("profile.")) {
      const profileField = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        profile: {
          ...prevData.profile,
          [profileField]: value,
        },
      }));
    } else if (name.includes("doctor.")) {
      const doctorField = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        doctor: {
          ...prevData.doctor,
          [doctorField]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    if (name === "avatar_url") {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        setImageFile(file);
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
      setLoading(true);
      const item = localStorage.getItem(AUTH_TOKEN_STORAGE);
      const formDataToSend = new FormData();
      
      formDataToSend.append("name", formData.name);
      
      // Append profile fields
      const profile = formData.profile;
      formDataToSend.append("profile[cep]", profile.cep);
      formDataToSend.append("profile[address]", profile.address);
      formDataToSend.append("profile[number]", profile.number);
      formDataToSend.append("profile[state]", profile.state);
      formDataToSend.append("profile[district]", profile.district);
      formDataToSend.append("profile[city]", profile.city);
      
      // Append doctor fields
      const doctor = formData.doctor;
      formDataToSend.append("doctor[pricing]", doctor.pricing);
      formDataToSend.append("doctor[bio]", doctor.bio);
      formDataToSend.append("doctor[speciality]", JSON.stringify(doctor.speciality));
      
      if (imageFile) {
        formDataToSend.append("avatar_url", imageFile);
        formDataToSend.append("Authorization", `Bearer ${item}`); // Include Authorization in FormData
        await handleUpdateImage(formDataToSend);
      } else {
        await apiMed.post("/doctor/update", formDataToSend, {
          headers: {
            Authorization: `Bearer ${item}`,
          },
        });
      }

      router("/doctor/homepage");
    } catch (error) {
      console.log("Error updating data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateImage = async (formDataImage: FormData) => {
    try {
      const item = localStorage.getItem(AUTH_TOKEN_STORAGE);
      
      await apiMed.post("/user/upload", formDataImage, {
        headers: {
          Authorization: `Bearer ${item}`,
        },
      });
    } catch (error) {
      console.log("Error updating image:", error);
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
            <FormLabel fontWeight="bold">Nome</FormLabel>
            <Input
              variant="flushed"
              _placeholder={{ color: "gray.500" }}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="cep">
            <FormLabel fontWeight="bold">CEP</FormLabel>
            <Input
              variant="flushed"
              _placeholder={{ color: "gray.500" }}
              type="text"
              name="cep"
              value={formData.profile.cep}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="address">
            <FormLabel fontWeight="bold">Endereço</FormLabel>
            <Input
              variant="flushed"
              _placeholder={{ color: "gray.500" }}
              type="text"
              name="address"
              value={formData.profile.address}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="number">
            <FormLabel fontWeight="bold">Número</FormLabel>
            <Input
              variant="flushed"
              _placeholder={{ color: "gray.500" }}
              type="text"
              name="number"
              value={formData.profile.number}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="state">
            <FormLabel fontWeight="bold">Estado</FormLabel>
            <Input
              variant="flushed"
              _placeholder={{ color: "gray.500" }}
              type="text"
              name="state"
              value={formData.profile.state}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="district">
            <FormLabel fontWeight="bold">Bairro</FormLabel>
            <Input
              variant="flushed"
              _placeholder={{ color: "gray.500" }}
              type="text"
              name="district"
              value={formData.profile.district}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="city">
            <FormLabel fontWeight="bold">Cidade</FormLabel>
            <Input
              variant="flushed"
              _placeholder={{ color: "gray.500" }}
              type="text"
              name="city"
              value={formData.profile.city}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="pricing">
            <FormLabel fontWeight="bold">Preço da Consulta</FormLabel>
            <Input
              variant="flushed"
              _placeholder={{ color: "gray.500" }}
              type="text"
              name="pricing"
              value={formData.doctor.pricing}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="bio">
            <FormLabel fontWeight="bold">Bio</FormLabel>
            <Input
              variant="flushed"
              _placeholder={{ color: "gray.500" }}
              type="textArea"
              name="bio"
              value={formData.doctor.bio}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="speciality">
            <FormLabel fontWeight="bold">Especialidade</FormLabel>
            <Input
              variant="flushed"
              _placeholder={{ color: "gray.500" }}
              type="text"
              name="speciality"
              value={formData.doctor.speciality.join(", ")}
              onChange={handleChange}
            />
          </FormControl>

          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              onClick={handleEdit}
              isLoading={loading}
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
