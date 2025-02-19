import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import useThemeStore from './store/themeStore';
import Header from "./components/Header";
import Hero from "./pages/Hero";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Editor from "./pages/Editor";
import DocumentPage from './pages/DocumentPage';

function App() {
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    // Apply dark mode class to root html element
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <Router>
      <AuthProvider>
        <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
          <Header />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/document/:id"
              element={
                <PrivateRoute>
                  <DocumentPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
