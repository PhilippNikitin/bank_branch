// import { YMap } from "@/shared/ui/Map";
// import { YMap } from "@/entities/map/ui/Map";
import { Box } from "@chakra-ui/react";
import { SideDrawer } from "@/widgets/drawer/ui/SideDrawer";
import { Navbar } from "@/widgets/navbar";
import { useGetAllBanks } from "@/entities/bank";
import { YMap } from "@/shared/ui/Map";

export const MainPage = () => {
  
  return (
    <Box>
      <Navbar />
      <SideDrawer />
      {/* <YMap
        defaultState={{ center: [55.751574, 37.573856], zoom: 6 }}
        apiKey={import.meta.env.VITE_APP_API_KEY}
      /> */}

      <YMap
        defaultState={{ center: [55.751574, 37.573856], zoom: 6 }}
        apiKey={import.meta.env.VITE_APP_API_KEY}
      />
    </Box>
  );
};
