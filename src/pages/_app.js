import "@/styles/globals.css";
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { theme } from "../chakra/theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { TonConnectUIProvider } from '@tonconnect/ui-react';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

const manifestUrl = 'https://raw.githubusercontent.com/Knowledge-JO/ton-mining/main/public/manifest.json';

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </ColorModeProvider>
    </ChakraProvider>
  );
}
