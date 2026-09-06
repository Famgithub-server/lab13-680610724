import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// STEP 0 — จุดเริ่มต้นของแอป (ยังไม่มี router)
// เริ่มที่ STEP 1: ติดตั้ง react-router
// พอถึง STEP 2 เราจะเปลี่ยน <App /> เป็น <RouterProvider router={router} />
ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
