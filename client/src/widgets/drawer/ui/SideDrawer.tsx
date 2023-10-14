import { Card } from "@chakra-ui/react";
import { useState, useRef } from "react";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import { SideDrawerBankCard } from "./SideDrawerBankCard";
import { SideDrawerFilter } from "./SideDrawerFilter";
import SideDrawerSearch from "./SideDrawerSearch";

export const SideDrawer = () => {
  const refBank = useRef();
  const ref = useRef();
  const [value, setValue] = useState("");

  return (
    <Card
      position={"absolute"}
      mt={"5"}
      maxWidth={"382px"}
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
        // "&::-webkit-scrollbar-thumb": {
        //   background: "gray.300",
        //   borderRadius: "3px",
        // },
      }}
    >
      <Flippy flipOnClick={false} ref={refBank}>
        <FrontSide>
          <Flippy
            flipDirection="horizontal"
            isFlipped={true}
            flipOnClick={false}
            ref={ref}
          >
            <FrontSide>
              <SideDrawerSearch
                toggleMap={() => refBank.current.toggle()}
                value={value}
                onInput={(e) => setValue(e.target.value)}
                toggleFilter={() => ref.current.toggle()}
              />
            </FrontSide>
            <BackSide>
              <SideDrawerFilter toggleFilter={() => ref.current.toggle()} />
            </BackSide>
          </Flippy>
        </FrontSide>
        <BackSide>
          <SideDrawerBankCard toggleMap={() => refBank.current.toggle()} />
        </BackSide>
      </Flippy>
    </Card>
  );
};
