import { CustomizationProvider } from "@twilio-paste/core/customization";

import Heading from "./components/Heading/Heading";
import Body from "./components/Body/Body";

export default function App() {
  return (
    <CustomizationProvider
      elements={{
        ORANGE_BUTTON: {
          background: "orangered",
        },
      }}
    >
      <Heading />
      <Body />
    </CustomizationProvider>
  );
}
