import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//

import { lazy, Suspense } from "react";
// Lazy load components
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
import AdminPannel from "./components/AdminPannel/admin.jsx";
import History from "./components/AdminPannel/history.jsx";
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
          <Suspense fallback={<div>Loading Manager...</div>}>
            <ManagerLayout />
          </Suspense>
        ),
      },
      ,
      {
        path: "/m-manager/:type/transaction/:id",
        element: (
          <Suspense fallback={<div>Loading Transaction...</div>}>
            <TransactionList />
          </Suspense>
        ),
      },
      ,
      {
        path: "/m-manager/add-new-item",
        element: (
          <Suspense fallback={<div>Loading Form...</div>}>
            <TransactionForm />
          </Suspense>
        ),
      },
      {
        path: "/m-manager/:type/transaction/:id/edit",
        element: (
          <Suspense fallback={<div>Loading Update Page...</div>}>
            <UpdateTransaction />
          </Suspense>
        ),
      },
      ,
    ],
  },
  { path: "/m-manager/secret/alahomora", element: <AdminPannel /> },
  { path: "/m-manager/secret/alahomora/transaction/:id", element: <History /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
