import React from "react";
import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import "./styles/styles.css";

import PageContainer from "./components/layout/PageContainer";
import NotFoundPage from "./components/ui/NotFoundPage";
import ProtectedRoute from "./features/auth/ProtectedRoute";

import LoginPage from "./features/auth/LoginPage";
import SignupPage from "@/features/auth/SignupPage";
import SignoutPage from "./features/auth/SignoutPage";
import HomePage from "./features/HomePage";
import DashboardPage from "@/features/journal/DashboardPage";
import CreateEntryPage from "@/features/journal/CreateEntryPage";
import EditEntryPage from "@/features/journal/EditEntryPage";


const router = createBrowserRouter([
    {
        element: <PageContainer />,
        children: [{
            path: "/",
            element: <HomePage />,
        }]
    },

    {
        path: "/login",
        element: <LoginPage />,
    },

    {
        path: "/signup",
        element: <SignupPage />,
    },

    // Authentication layer
    {
        element: <ProtectedRoute />,

        children: [
            // Layout layer
            {
                element: <PageContainer />,

                children: [
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
                        path: "/edit/:id",
                        element: <EditEntryPage />,
                    },
                    {
                        path: "/signout",
                        element: <SignoutPage />,
                    },
                ],
            },
        ],
    },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);