import { useRoutes } from "react-router-dom";
import { MainPage } from "@/pages/main";

export const AppRouter = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <MainPage />,
    },
  ]);
  return element;
};
