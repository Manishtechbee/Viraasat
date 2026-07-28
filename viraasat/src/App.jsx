import { Toaster } from "react-hot-toast";
import AppRoutes from "./pages/routes/AppRoute";

export default function App() {
  return (
    <>
      <AppRoutes />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2800,
          style: {
            background: "#1f2937",
            color: "#fff",
            borderRadius: "12px",
          },
        }}
      />
    </>
  );
}