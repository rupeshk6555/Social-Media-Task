import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "../routes/HomePage";
import DashboardPage from "../routes/DashboardPage";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/dashboard", element: <DashboardPage /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
