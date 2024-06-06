import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { HomePage, LeaderboardPage, LearnPage, LearnPageHash, LearnPageSteganography, LearnPagePhishing, MyRepositoryPage, PracticePage, PracticePageHashEasy, PracticePageHashHard, PracticePageSteganographyEasy, PracticePageSteganographyHard, PracticePagePhishingEasy, PracticePagePhishingHard, RepositoryPage, ProfilePage, SecurityPage, DeletePage, AdminRepositoryPage } from "../pages";

export const AuthRoutes = () => {
    const { role } = useSelector((state) => state.auth);

    return (
        <Routes>
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/learn/hash" element={<LearnPageHash />} />
            <Route path="/learn/steganography" element={<LearnPageSteganography />} />
            <Route path="/learn/phishing" element={<LearnPagePhishing />} />
            <Route path="/practice" element={<PracticePage />} />
            <Route path="/practice/hasheasy" element={<PracticePageHashEasy />} />
            <Route path="/practice/hashhard" element={<PracticePageHashHard />} />
            <Route path="/practice/steganographyeasy" element={<PracticePageSteganographyEasy />} />
            <Route path="/practice/steganographyhard" element={<PracticePageSteganographyHard />} />
            <Route path="/practice/phishingeasy" element={<PracticePagePhishingEasy />} />
            <Route path="/practice/phishinghard" element={<PracticePagePhishingHard />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/repository" element={<RepositoryPage />} />
            <Route path="/myrepository" element={<MyRepositoryPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="/delete" element={<DeletePage />} />
            {role === "admin" && <Route path="/admin" element={<AdminRepositoryPage />} />}
            
            <Route path="/" element={<HomePage />} />
            <Route path="/*" element={<Navigate to={"/"} />} />
        </Routes>
    );
};