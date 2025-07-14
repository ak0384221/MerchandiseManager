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
const TransactionList = lazy(() => import("./components/transaction.jsx"));
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
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <div className="text-4xl  h-[50vh] flex justify-center items-center text-[#035557] font-bold font-Inter capitalize text-center ">
            Choose a category
          </div>
        ),
      },
      ,
      {
        path: "/m-manager/:type",
        element: (
          <Suspense fallback={<Fallback />}>
            <ManagerLayout />
          </Suspense>
        ),
      },
      ,
      {
        path: "/m-manager/:type/transaction/:id",
        element: (
          <Suspense fallback={<Fallback />}>
            <TransactionList />
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
        path: "/m-manager/:type/transaction/:id/edit",
        element: (
          <Suspense fallback={<Fallback />}>
            <UpdateTransaction />
          </Suspense>
        ),
      },
      ,
    ],
  },
  {
    path: "/m-manager/secret/alahomora",
    element: (
      <Suspense fallback={<Fallback />}>
        <AdminPannel />
      </Suspense>
    ),
  },
  {
    path: "/m-manager/secret/alahomora/transaction/:id",
    element: (
      <Suspense fallback={<Fallback />}>
        ,
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
