import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Dashboard from "../Pages/Dashboard";

export const router = createBrowserRouter([
    {
        path: "/",
        element:<Login></Login>
    },
    {
    path:"/register",
    element:<Register></Register>
    },
    {
        path:"/dashboard",
        element:<Dashboard></Dashboard>
    }
])