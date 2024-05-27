import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { HomePage, LeaderboardPage, LearnPage, MyRepositoryPage, PracticePage, PracticePageHashEasy, PracticePageSteganographyHard, RepositoryPage, ProfilePage, SecurityPage, DeletePage, AdminRepositoryPage } from "../pages";

export const AuthRoutes = () => {
    const { role } = useSelector((state) => state.auth);

    return (
        <Routes>
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/practice" element={<PracticePage />} />
            <Route path="/practice/hasheasy" element={<PracticePageHashEasy />} />
            <Route path="/practice/steganographyhard" element={<PracticePageSteganographyHard />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/repository" element={<RepositoryPage />} />
            <Route path="/myrepository" element={<MyRepositoryPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="/delete" element={<DeletePage />} />
            {role === "admin" && <Route path="/adminrepository" element={<AdminRepositoryPage />} />}
            
            <Route path="/" element={<HomePage />} />
            <Route path="/*" element={<Navigate to={"/"} />} />
        </Routes>
    );
};