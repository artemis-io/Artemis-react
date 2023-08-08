import React, { PropsWithChildren } from "react";
import { Box } from "@chakra-ui/react";

const PageWrapper: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <Box backgroundColor="#E9ECEF" minHeight="100vh">
      {children}
    </Box>
  );
};

export default PageWrapper;
