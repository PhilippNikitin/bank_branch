import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import { QueryProvider } from "./providers/queryProvider/queryProvider";
import { AppRouter } from "./providers/routeProvider/AppRouter";
import { AppContainer, theme } from "./styles/global";
import "@fontsource/m-plus-1p/500.css";
import "@fontsource/m-plus-1p/800.css";

import "leaflet/dist/leaflet.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  //Task create loader for fallback
  <ErrorBoundary fallback={<div>Error</div>}>
    <BrowserRouter>
      <QueryProvider>
        <ChakraProvider theme={theme}>
          <AppContainer>
            <AppRouter />
          </AppContainer>
        </ChakraProvider>
      </QueryProvider>
    </BrowserRouter>
  </ErrorBoundary>
);
