import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage, LearnPage, PracticePage, PracticePageHash } from "../pages";

export const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/practice" element={<PracticePage />} />
            <Route path="/practice/hash" element={<PracticePageHash />} />

            <Route path="/" element={<HomePage />} />
            <Route path="/*" element={<Navigate to={"/"} />} />
        </Routes>
    );
};