import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,
  colors: {
    brand: {
      100: "#EDE8FC",
    },
    mode: {
      light: "white",
      dark: "#10062d",
    },
  },
});
