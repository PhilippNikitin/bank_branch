import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import { QueryProvider } from "./providers/queryProvider/queryProvider";
import { AppRouter } from "./providers/routeProvider/AppRouter";
import "leaflet/dist/leaflet.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
  //Task create loader for fallback
  <ErrorBoundary fallback={<div>Error</div>}>
    <BrowserRouter>
      <QueryProvider>
        <ChakraProvider>
          <AppRouter />
        </ChakraProvider>
      </QueryProvider>
    </BrowserRouter>
  </ErrorBoundary>
);
