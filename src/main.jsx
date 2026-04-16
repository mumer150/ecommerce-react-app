import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { CartContext } from "./context/CartContext.jsx";
import { ToastContext } from "./context/ToastContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ToastContext>
      <CartContext>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </CartContext>
    </ToastContext>
  </BrowserRouter>,
);
