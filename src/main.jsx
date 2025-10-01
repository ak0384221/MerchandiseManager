import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//

import { lazy, Suspense } from "react";
// Lazy load components
const AdminPannel = lazy(() => import("./components/AdminPannel/admin.jsx"));
const History = lazy(() => import("./components/AdminPannel/history.jsx"));
const ManagerLayout = lazy(() => import("./components/managerLayout.jsx"));
const TransactionForm = lazy(() =>
  import("./components/micro/transactionForm.jsx")
);
const UpdateTransaction = lazy(() =>
  import("./components/updateTransaction.jsx")
);
//
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import DataContextProvider from "./store/store.jsx";
import Fallback from "./components/fallback/fallback.jsx";
import TransactionDetails from "./components/TransactionDetails.jsx";
import Dashboard from "./dashboard.jsx";
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <ManagerLayout />,
      },

      ,
      {
        path: "/m-manager/transaction/:id",
        element: (
          <Suspense fallback={<Fallback />}>
            <TransactionDetails />
          </Suspense>
        ),
      },
      ,
      {
        path: "/m-manager/add-new-item",
        element: (
          <Suspense fallback={<Fallback />}>
            <TransactionForm />
          </Suspense>
        ),
      },
      {
        path: "/m-manager/transaction/:id/edit",
        element: (
          <Suspense fallback={<Fallback />}>
            <UpdateTransaction />
          </Suspense>
        ),
      },
      {
        path: "/m-manager/dashboard",
        element: (
          <Suspense fallback={<Fallback />}>
            <Dashboard />
          </Suspense>
        ),
      },
      ,
    ],
  },
  {
    path: "/secret/alahomora",
    element: (
      <Suspense fallback={<Fallback />}>
        <AdminPannel />
      </Suspense>
    ),
  },
  {
    path: "/secret/alahomora/transaction/:id",
    element: (
      <Suspense fallback={<Fallback />}>
        <History />
      </Suspense>
    ),
  },
  ,
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <DataContextProvider>
        <RouterProvider router={router} />
      </DataContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
