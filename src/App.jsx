import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import { useState } from "react";


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
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App;