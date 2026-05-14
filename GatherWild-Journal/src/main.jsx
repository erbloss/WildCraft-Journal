import React from "react";
import ReactDOM from "react-dom/client";
import LoginPage from "./features/auth/LoginPage";
import SignupPage from "@/features/auth/SignupPage";
import DashboardPage from "@/features/journal/DashboardPage";
import CreateEntryPage from "@/features/journal/CreateEntryPage";
import EditEntryPage from "@/features/journal/EditEntryPage";

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />, // *** CHANGE ****
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/signup",
        element: <SignupPage />,
    },
    {
        path: "/dashbpard",
        element: <DashboardPage />,
    },
    {
        path: "/entries",
        element: <CreateEntryPage />,
    },
    {
        path: "/entries/:id",
        element: <EditEntryPage />,
    },
    {
        path: "/entries/:id/edit ",
        element: <EditEntryPage />,
    },


]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);