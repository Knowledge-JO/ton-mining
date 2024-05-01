import "@/styles/globals.css";
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { theme } from "../chakra/theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TonConnectUIProvider } from "@tonconnect/ui-react";



const manifestUrl =
  "https://raw.githubusercontent.com/Knowledge-JO/ton-mining/main/public/manifest.json";

export default function App({ Component, pageProps }) {
  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <ChakraProvider theme={theme}>
        <ColorModeProvider>
          <Component {...pageProps} />
          <ToastContainer />
        </ColorModeProvider>
      </ChakraProvider>
    </TonConnectUIProvider>
  );
}
