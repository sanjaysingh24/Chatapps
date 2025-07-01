import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Dashboard from "../Pages/Dashboard";
import LandingPage from "../Pages/MainHome";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<LandingPage></LandingPage>
    },
    {
        path: "/login",
        element:<Login></Login>
    },
    {
    path:"/register",
    element:<Register></Register>
    },
    {
        path:"/dashboard",
        element: <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
])