import { FormLabel, FormLabelProps } from "@chakra-ui/react";

const StyledLabel: React.FC<FormLabelProps> = ({ children, ...rest }) => {
  return (
    <FormLabel fontWeight="bold" color="#494949" {...rest}>
      {children}
    </FormLabel>
  );
};

export default StyledLabel;