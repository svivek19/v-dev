import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Ask from "./pages/Ask";
import Login from "./pages/Login";
import QuestionDetails from "./pages/QuestionDetails";
import Roadmap from "./pages/Roadmap";
import { ToastProvider } from "react-toast-notifications";

const AppContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <ToastProvider autoDismiss={true} autoDismissTimeout={3000}>
      <div className="flex h-screen">
        {location.pathname !== "/" && (
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        )}
        <div className="flex-1 flex flex-col">
          {location.pathname !== "/" && (
            <Navbar toggleSidebar={toggleSidebar} />
          )}
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/ask" element={<Ask />} />
              <Route
                path="/question-details/:id"
                element={<QuestionDetails />}
              />
              <Route path="/roadmap-ai" element={<Roadmap />} />
            </Routes>
          </div>
        </div>
      </div>
    </ToastProvider>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
