import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  VStack,
} from "@chakra-ui/react";
import { apiMed } from "../../../services/api";
import { AUTH_TOKEN_STORAGE } from "../../../shared/storage/config";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

interface UserData {
  name: string;
  profile: {
    cep: string;
    address: string;
    number: string;
    state: string;
    district: string;
    city: string;
  };
}

const UpdateUser = () => {
  const router = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    name: "",
    profile: {
      cep: "",
      address: "",
      number: "",
      state: "",
      district: "",
      city: "",
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const item = localStorage.getItem(AUTH_TOKEN_STORAGE);
        const response = await apiMed.get("/auth/patient", {
          headers: {
            Authorization: `Bearer ${item}`,
          },
        });
        const userData: UserData = response.data;
        setUserData(userData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (
    field: keyof UserData | keyof UserData["profile"],
    value: string
  ) => {
    if (field in userData) {
      setUserData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    } else if (field.startsWith("profile.")) {
      const profileField = field.split(".")[1];
      setUserData((prevData) => ({
        ...prevData,
        profile: {
          ...prevData.profile,
          [profileField]: value,
        },
      }));
    }
  };

  const handleUpdateUser = async () => {
    try {
      setLoading(true);

      const item = localStorage.getItem(AUTH_TOKEN_STORAGE);
      const updatedUserData = {
        name: userData.name,
        cep: userData.profile.cep,
        address: userData.profile.address,
        number: userData.profile.number,
        state: userData.profile.state,
        district: userData.profile.district,
        city: userData.profile.city,
      };

      await apiMed.put(`/user/update`, updatedUserData, {
        headers: {
          Authorization: `Bearer ${item}`,
        },
      });

      setLoading(false);
      toast({
        title: "Alterações salvas",
        description: "Suas alterações foram salvas com sucesso.",
        position: "top",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      router("/patient/homepage");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={4} align="center">
        <FormControl id="name">
          <FormLabel fontWeight="bold">Nome</FormLabel>
          <Input
            variant="flushed"
            _placeholder={{ color: "gray.500" }}
            type="text"
            name="name"
            value={userData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </FormControl>
        <FormControl id="cep">
          <FormLabel fontWeight="bold">CEP</FormLabel>
          <Input
            variant="flushed"
            _placeholder={{ color: "gray.500" }}
            type="text"
            name="profile.cep"
            value={userData.profile.cep}
            onChange={(e) => handleInputChange("cep", e.target.value)}
          />
        </FormControl>
        <FormControl id="address">
          <FormLabel fontWeight="bold">Endereço</FormLabel>
          <Input
            variant="flushed"
            _placeholder={{ color: "gray.500" }}
            type="text"
            name="profile.address"
            value={userData.profile.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
          />
        </FormControl>
        <FormControl id="number">
          <FormLabel fontWeight="bold">Número</FormLabel>
          <Input
            variant="flushed"
            _placeholder={{ color: "gray.500" }}
            type="text"
            name="profile.number"
            value={userData.profile.number}
            onChange={(e) => handleInputChange("number", e.target.value)}
          />
        </FormControl>
        <FormControl id="state">
          <FormLabel fontWeight="bold">Estado</FormLabel>
          <Input
            variant="flushed"
            _placeholder={{ color: "gray.500" }}
            type="text"
            name="profile.state"
            value={userData.profile.state}
            onChange={(e) => handleInputChange("state", e.target.value)}
          />
        </FormControl>
        <FormControl id="district">
          <FormLabel fontWeight="bold">Bairro</FormLabel>
          <Input
            variant="flushed"
            _placeholder={{ color: "gray.500" }}
            type="text"
            name="profile.district"
            value={userData.profile.district}
            onChange={(e) => handleInputChange("district", e.target.value)}
          />
        </FormControl>
        <FormControl id="city">
          <FormLabel fontWeight="bold">Cidade</FormLabel>
          <Input
            variant="flushed"
            _placeholder={{ color: "gray.500" }}
            type="text"
            name="profile.city"
            value={userData.profile.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
          />
        </FormControl>
        <Button
          colorScheme="blue"
          isLoading={loading}
          onClick={handleUpdateUser}
        >
          Salvar
        </Button>
      </VStack>
    </Box>
  );
};

export default UpdateUser;
