import { Route, Routes } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Operations from "./pages/Operations";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/operations" element={<Operations />} />
      </Routes>
    </>
  );
}
