import { ChakraProvider } from "@chakra-ui/react";

import theme from "./theme/theme";
import AppRoutes from "./routes/index";
import AuthContextProvider from "./contexts/AuthContext";
import { Provider } from "react-redux";
import store from "./shared/reducer";

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
        <Provider store={store}>
          <AppRoutes />;
        </Provider>
      </AuthContextProvider>
    </ChakraProvider>
  );
};

export default App;
