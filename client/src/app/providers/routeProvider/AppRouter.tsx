import { MainPage } from "@/pages/main";

import { useRoutes } from "react-router-dom";
export const AppRouter = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <MainPage />,
    },
  ]);
  return element;
};
