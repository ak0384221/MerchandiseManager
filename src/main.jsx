import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Workflow from "./components/managerLayout.jsx";
import ManagerLayout from "./components/managerLayout.jsx";
import TransactionList from "./components/transaction.jsx";
import TransactionForm from "./components/micro/transactionForm.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/m-manager/:type",
        element: <ManagerLayout />,
      },
      {
        path: "/m-manager/:type/transaction/:id",
        element: <TransactionList />,
      },
      {
        path: "/m-manager/add-new-item",
        element: <TransactionForm />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
