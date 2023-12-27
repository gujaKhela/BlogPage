// main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { MyArrayContextProvider } from "./contexts/MyArrayContext.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App.jsx";
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MyArrayContextProvider>

          <BrowserRouter>
            <App />
          </BrowserRouter>

        </MyArrayContextProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
