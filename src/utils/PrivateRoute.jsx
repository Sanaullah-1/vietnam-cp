import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import authService from "../services/auth.service";

const PrivateRoutes = () => {
    return authService.getCurrentUser() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;