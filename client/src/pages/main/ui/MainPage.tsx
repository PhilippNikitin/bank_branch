// import { YMap } from "@/shared/ui/Map";
// import { YMap } from "@/entities/map/ui/Map";
import { Box } from "@chakra-ui/react";
import { SideDrawer } from "@/widgets/drawer/ui/SideDrawer";
import { Navbar } from "@/widgets/navbar";
import { LeafletMap } from "@/entities/map";
import { VisitModal } from "@/features/virtualQueue/virtualQueue";

export const MainPage = () => {
  return (
    <Box>
      <Navbar />
      <SideDrawer />
      <VisitModal isOpen={false} onClose={null} />
      <LeafletMap />
    </Box>
  );
};
