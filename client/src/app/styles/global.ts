import { extendTheme } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const AppContainer = styled.div`
  font-family: "M PLUS 1p", sans-serif;
`;

export const theme = extendTheme({
  fonts: {
    heading: "M PLUS 1p",
    body: "M PLUS 1p",
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "32px",
        fontSize: "14px",
        fontStyle: "normal",
        fontWeight: 500,
        lineHeight: "16px" /* 114.286% */,
        bgColor: "black ",
        _active: {
          bgColor: "#4789EB",
        },
        _hover: {
          bgColor: "#1C62DA",
        },
      },
      variants: {
        base: {
          letterSpacing: "-0.28px",
          height: "32px",
          size: "auto",
          border: "1px solid",
          paddingLeft: "20px",
          paddingRight: "20px",
        },
        secondary: {
          borderRadius: "8px",
        },
      },
    },
    defaultProps: {
      variant: "base",
    },
  },
  colors: {
    blue: {
      vtb_logo: "#009FDF",
      vtb_primary: "#4789EB",
      vtb_secondary: "#1C62DA",
    },
    grey: {
      vtb_lightgrey: "#8A96A8",
      vtb_midgrey: "#576375",
      vtb_midgrey2: "#414A58",
      vtb_hardgrey: "#2B313B",
    },
    darkGrey: {
      vtb_darkLight: "#2C2F37",
      vtb_darkHard: "#1A1E23",
    },
    red: {
      vtb_red: "#F5443A",
    },
    green: {
      vtb_green: "#15B16A",
    },
    pink: {
      vtb_pink: "#AF0D71",
    },
  },
});
