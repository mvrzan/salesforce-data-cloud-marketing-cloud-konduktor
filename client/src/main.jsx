import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CustomizationProvider } from "@twilio-paste/core/customization";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CustomizationProvider>
        <App />
      </CustomizationProvider>
    </BrowserRouter>
  </StrictMode>
);
