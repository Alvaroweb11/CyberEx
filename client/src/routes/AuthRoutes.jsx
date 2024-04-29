import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage, LeaderboardPage, LearnPage, MyRepositoryPage, PracticePage, PracticePageHash, PracticePageSteganography, RepositoryPage, AdminRepositoryPage } from "../pages";

export const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/practice" element={<PracticePage />} />
            <Route path="/practice/hash" element={<PracticePageHash />} />
            <Route path="/practice/steganography" element={<PracticePageSteganography />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/repository" element={<RepositoryPage />} />
            <Route path="/myrepository" element={<MyRepositoryPage />} />
            <Route path="/admin" element={<AdminRepositoryPage />} />
            {/* <Route path="/settings" element={<SettingsPage />} /> */}
            {/* <Route path="/profile" element={<ProfilePage />} /> */}

            <Route path="/" element={<HomePage />} />
            <Route path="/*" element={<Navigate to={"/"} />} />
        </Routes>
    );
};