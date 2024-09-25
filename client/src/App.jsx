import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Welcome from "./pages/Welcome";
import Operations from "./pages/Operations";

const queryClient = new QueryClient();

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/operations" element={<Operations />} />
        </Routes>
      </QueryClientProvider>
    </>
  );
}
