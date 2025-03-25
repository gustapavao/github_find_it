import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "@/pages/Profile";

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <Routes>
                    <Route path="/" element={<Profile />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
