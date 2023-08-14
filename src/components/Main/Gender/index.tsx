import { Select } from "@chakra-ui/react";
import { FiArrowDown } from "react-icons/fi";

export const GenderSelect = ({ value, onChange }: any) => {
  return (
    <Select
      icon={<FiArrowDown />}
      placeholder="Gênero"
      onChange={onChange}
      value={value}
    >
      <option value="male">Masculino</option>
      <option value="female">Feminino</option>
    </Select>
  );
};
