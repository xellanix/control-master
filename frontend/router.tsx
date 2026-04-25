import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/app/layout";
import HomePage from "@/app";
import MasterPage from "@/app/master";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="master" element={<MasterPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
