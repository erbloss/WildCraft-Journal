/* 
Routing for app
*/

import { createBrowserRouter } from "react-router-dom";
//import LoginPage from "@/features/auth/LoginPage";
//import SignupPage from "@/features/auth/SignupPage";
//import DashboardPage from "@/features/journal/DashboardPage";
//import CreateEntryPage from "@/features/journal/CreateEntryPage";
//import EditEntryPage from "@/features/journal/EditEntryPage";


export default router = createBrowserRouter([
    {
        path: "/",
        element: <h1>GatherWild Journal</h1>, // change ***
    },
    /*,
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
    
    */
]);