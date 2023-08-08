import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: {
      100: "rgba(26,115,232,1)",
      80: "rgba(26,115,232,.8)"
    }
  },
  fonts: {
    body: "Inter, sans-serif"
  },
  styles: {
    global: {
      body: {
        backgroundColor: "#fafafa", // Define a cor de fundo global aqui
      }
    }
  }
});

export default theme;