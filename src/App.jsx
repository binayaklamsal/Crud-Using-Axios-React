import React from "react";
import { Link, Outlet, useRoutes } from "react-router-dom";
import InvoiceList from "./components/invoice/InvoiceList";
import "./App.css";
import AddInvoice from "./components/invoice/AddInvoice";
import EditInvoice from "./components/invoice/EditInvoice";

const App = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <Link to="/invoice">Invoice</Link>,
        },
        {
          path: "invoice",
          element: <Outlet />,
          children: [
            {
              index: true,
              element: <InvoiceList />,
            },
            {
              path: "add",
              element: <AddInvoice />,
            },
            {
              path: ":id",
              element: <EditInvoice />,
            },
          ],
        },
      ],
    },
  ]);
  return routes;
};

export default App;
