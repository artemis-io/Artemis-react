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
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
  
    if (name.includes("profile.")) {
      const profileField = name.split(".")[1];
      setUserData((prevData) => ({
        ...prevData,
        profile: {
          ...prevData.profile,
          [profileField]: value,
        },
      }));
    } else {
      setUserData((prevData) => ({
        ...prevData,
        [name]: value,
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
