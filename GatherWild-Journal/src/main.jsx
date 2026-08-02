import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/styles.css";

import PageContainer from "./components/layout/PageContainer";

import LoginPage from "./features/auth/LoginPage";
import SignupPage from "@/features/auth/SignupPage";
import SignoutPage from "./features/auth/SignoutPage";

import DashboardPage from "@/features/journal/DashboardPage";
import CreateEntryPage from "@/features/journal/CreateEntryPage";
import EditEntryPage from "@/features/journal/EditEntryPage";

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        element: <PageContainer />,
        children: [
            {
                path: "/",
                element: <DashboardPage />,
            },
            {
                path: "/dashboard",
                element: <DashboardPage />,
            },
            {
                path: "/entries",
                element: <CreateEntryPage />,
            },
            {
                path: "/edit",
                element: <EditEntryPage />,
            },
            {
                path: "/signout",
                element: <SignoutPage />,
            }
        ],
    },

    {
        path: "/login",
        element: <LoginPage />,
    },

    {
        path: "/signup",
        element: <SignupPage />,
    },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);