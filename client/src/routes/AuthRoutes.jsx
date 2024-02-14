import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage, LearnPage } from "../pages";

export const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="/learn" element={<LearnPage />} />

            <Route path="/" element={<HomePage />} />
            <Route path="/*" element={<Navigate to={"/"} />} />
        </Routes>
    );
};