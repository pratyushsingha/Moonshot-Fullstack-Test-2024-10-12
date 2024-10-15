import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import App from "./App.tsx";
import { EmailProvider } from "./context/EmailContext.tsx";
import EmailPage from "./pages/EmailPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/outlook",
    element: (
      <EmailProvider>
        <EmailPage />
      </EmailProvider>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
