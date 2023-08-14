import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  VStack,
  Checkbox,
  CheckboxGroup,
  Stack,
  Textarea,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
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
  doctor: {
    pricing: string;
    bio: string;
    speciality: string[];
  };
}

const UpdateUser = () => {
  const router = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<UserData>({
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
  const [availableSpecialities, setAvailableSpecialities] = useState<string[]>(
    []
  );

  const fetchSpecialties = async () => {
    try {
      const response = await apiMed.get("/admin/all/speciality");
      setAvailableSpecialities(
        response.data.map((item: any) => item.speciality)
      );
    } catch (error) {
      console.error("Erro ao obter especialidades:", error);
    }
  };

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
        fetchSpecialties();
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

  const handleSpecialityChange = (selectedSpecialities: string[]) => {
    setFormData((prevData) => ({
      ...prevData,
      doctor: {
        ...prevData.doctor,
        speciality: selectedSpecialities,
      },
    }));
  };

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
  };

  const handleUpdateUser = async () => {
    try {
      setLoading(true);

      const item = localStorage.getItem(AUTH_TOKEN_STORAGE);
      const updatedUserData = {
        name: formData.name,
        cep: formData.profile.cep,
        address: formData.profile.address,
        number: formData.profile.number,
        state: formData.profile.state,
        district: formData.profile.district,
        city: formData.profile.city,
        pricing: formData.doctor.pricing,
        bio: formData.doctor.bio,
        speciality: formData.doctor.speciality,
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
            name="profile.cep"
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
            name="profile.address"
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
            name="profile.number"
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
            name="profile.state"
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
            name="profile.district"
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
            name="profile.city"
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
            name="doctor.pricing"
            value={formData.doctor.pricing}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="bio">
          <FormLabel fontWeight="bold">Bio</FormLabel>
          <Textarea
            variant="flushed"
            _placeholder={{ color: "gray.500" }}
            name="doctor.bio"
            value={formData.doctor.bio}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="speciality">
          
          <Accordion allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box fontWeight="bold" flex="1" textAlign="left">
                  Especialidades
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Stack>
              {availableSpecialities.map((speciality) => (
                <Checkbox
                  key={speciality}
                  value={speciality}
                  isChecked={formData.doctor.speciality.includes(speciality)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    handleSpecialityChange(
                      checked
                        ? [...formData.doctor.speciality, speciality]
                        : formData.doctor.speciality.filter((s) => s !== speciality)
                    );
                  }}
                >
                  {speciality}
                </Checkbox>
              ))};
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
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
