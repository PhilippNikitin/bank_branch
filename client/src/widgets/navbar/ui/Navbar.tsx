import { Box, Flex, useTheme } from "@chakra-ui/react";
import VtbLogo from "@/shared/assets/VtbLogo.svg?react";
export const Navbar = () => {
  const theme = useTheme();
  return (
    <Box width={"100vw"} bgColor={theme.colors.grey.vtb_hardgrey}>
      <Flex h={"64px"} alignItems={"center"} justifyContent={"space-between"}>
        <Box ml={"148px"}>
          {/* <Icon fill={"white"} height={"24px"} width={"72px"} as={VtbLogo} /> */}
          <VtbLogo fill="white" />
        </Box>
      </Flex>
    </Box>
  );
};
