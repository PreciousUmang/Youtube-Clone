import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import { useState } from "react";
import VideoDetails from "./pages/VideoDetails";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import CreateChannel from "./pages/CreateChannel";
import ChannelPage from "./pages/ChannelPage";


function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = (isOpen) => {
    setSidebarOpen(isOpen);
  };


  return (
    <>
      <Router>
        <Header onSidebarToggle={handleSidebarToggle} />
        <div
          className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? "ml-64" : "ml-0"
            } flex-1 bg-gray-100 p-4`}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/video/:videoId" element={<VideoDetails />} />

            {/* Login/Signup */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Channel */}
            <Route path="/create-channel" element={<CreateChannel />} />
            <Route path="/channel/:channelId" element={<ChannelPage />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App;