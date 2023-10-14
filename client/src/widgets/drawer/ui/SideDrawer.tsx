import { Card, CardBody } from "@chakra-ui/react";
import { useState } from "react";
import { SideDrawerFilter } from "./SideDrawerFilter";

export const SideDrawer = () => {
  const [value, setValue] = useState("");

  return (
    <Card
      position={"absolute"}
      mt={"5"}
      maxWidth={"352px"}
      height={"85vh"}
      zIndex={"modal"}
      borderRadius={"16px"}
      padding={"24 16"}
      color={"#fff"}
      backgroundColor={"#1A1E23"}
      ml={"8"}
      overflow={"auto"}
      sx={{
        scrollbarWidth: "thin",
        scrollbarColor: "gray.300 transparent",
        "&::-webkit-scrollbar": {
          width: "6px",
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "gray.300",
          borderRadius: "3px",
        },
      }}
    >
      <CardBody height={"100%"}>
        {/* <SideDrawerSearch value={value} onInput={(e) => setValue(e.target.value)} /> */}
        <SideDrawerFilter />
        {/* <SideDrawerBankCard /> */}
      </CardBody>
    </Card>
  );
};
