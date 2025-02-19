import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Eye, EyeOff } from "lucide-react";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/dashboard');
    } catch (error) {
      console.error(error.message);
      setError("Failed to sign in with Google. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error(error.message);
      if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
        setError("Invalid email or password. Please try again.");
      } else {
        setError("Failed to sign in. Please check your credentials and try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white px-4 py-20">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <img src="/bock_logo.png" alt="Bock Docs" className="h-12" />
        </div>
        <form
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full transition-all duration-300"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-blue-600 dark:from-blue-400 dark:to-blue-600 text-transparent bg-clip-text">
            Welcome Back
          </h2>
          
          {error && (
            <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-primary dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <Link to="/forgot-password" className="text-xs text-primary dark:text-blue-400 hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-primary dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          <button
            type="submit"
            className={`w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300 font-medium ${
              isLoading ? "opacity-75 cursor-not-allowed" : "transform hover:-translate-y-1 hover:shadow-lg"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
          
          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
            <span className="mx-4 text-sm text-gray-500 dark:text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className={`w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-white py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 font-medium border border-gray-300 dark:border-gray-600 flex items-center justify-center ${
              isLoading ? "opacity-75 cursor-not-allowed" : "transform hover:-translate-y-1 hover:shadow-lg"
            }`}
            disabled={isLoading}
          >
            <img src="/google-icon.svg" alt="Google" className="w-5 h-5 mr-3" onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://www.google.com/favicon.ico";
            }} />
            Sign in with Google
          </button>
          
          <p className="mt-8 text-sm text-center text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary dark:text-blue-400 hover:underline font-medium">
              Sign Up
            </Link>
          </p>
        </form>
        
        <p className="mt-6 text-xs text-center text-gray-500 dark:text-gray-400">
          By signing in, you agree to our{" "}
          <Link to="/terms" className="text-primary dark:text-blue-400 hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-primary dark:text-blue-400 hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;