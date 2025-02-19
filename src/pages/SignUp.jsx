import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Eye, EyeOff, User, Mail, Lock, Check, AlertCircle } from "lucide-react";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
      // Success will redirect in the AuthProvider
    } catch (error) {
      console.error(error.message);
      setError("Failed to sign up with Google. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error(error.message);
      setError("Failed to create an account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Password strength checker
  const getPasswordStrength = () => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const renderPasswordStrengthBar = () => {
    const strength = getPasswordStrength();
    return (
      <div className="mt-2">
        <div className="flex justify-between mb-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Password strength</span>
          <span>
            {strength === 0 ? "Weak" : 
             strength === 1 ? "Fair" : 
             strength === 2 ? "Good" : 
             strength === 3 ? "Strong" : "Very Strong"}
          </span>
        </div>
        <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full ${
              strength === 0 ? "bg-red-500 w-1/4" : 
              strength === 1 ? "bg-orange-500 w-2/4" : 
              strength === 2 ? "bg-yellow-500 w-3/4" : 
              "bg-green-500 w-full"
            } transition-all duration-300`}
          ></div>
        </div>
      </div>
    );
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
            Create Your Account
          </h2>
          
          {error && (
            <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg text-sm flex items-start">
              <AlertCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <User size={18} />
              </span>
              <input
                type="text"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-primary dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Mail size={18} />
              </span>
              <input
                type="email"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-primary dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Lock size={18} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-primary dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a secure password"
                required
                disabled={isLoading}
                minLength={8}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {password && renderPasswordStrengthBar()}
            <ul className="mt-3 space-y-1 text-xs text-gray-600 dark:text-gray-400">
              <li className="flex items-center">
                <span className={`mr-1 ${password.length >= 8 ? 'text-green-500' : 'text-gray-400'}`}>
                  {password.length >= 8 ? <Check size={12} /> : "○"}
                </span>
                At least 8 characters
              </li>
              <li className="flex items-center">
                <span className={`mr-1 ${/[A-Z]/.test(password) ? 'text-green-500' : 'text-gray-400'}`}>
                  {/[A-Z]/.test(password) ? <Check size={12} /> : "○"}
                </span>
                At least one uppercase letter
              </li>
              <li className="flex items-center">
                <span className={`mr-1 ${/[0-9]/.test(password) ? 'text-green-500' : 'text-gray-400'}`}>
                  {/[0-9]/.test(password) ? <Check size={12} /> : "○"}
                </span>
                At least one number
              </li>
              <li className="flex items-center">
                <span className={`mr-1 ${/[^A-Za-z0-9]/.test(password) ? 'text-green-500' : 'text-gray-400'}`}>
                  {/[^A-Za-z0-9]/.test(password) ? <Check size={12} /> : "○"}
                </span>
                At least one special character
              </li>
            </ul>
          </div>
          
          <button
            type="submit"
            className={`w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300 font-medium ${
              isLoading ? "opacity-75 cursor-not-allowed" : "transform hover:-translate-y-1 hover:shadow-lg"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </button>
          
          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
            <span className="mx-4 text-sm text-gray-500 dark:text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          
          <button
            type="button"
            onClick={handleGoogleSignUp}
            className={`w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-white py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 font-medium border border-gray-300 dark:border-gray-600 flex items-center justify-center ${
              isLoading ? "opacity-75 cursor-not-allowed" : "transform hover:-translate-y-1 hover:shadow-lg"
            }`}
            disabled={isLoading}
          >
            <img src="/google-icon.svg" alt="Google" className="w-5 h-5 mr-3" onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://www.google.com/favicon.ico";
            }} />
            Sign up with Google
          </button>
          
          <p className="mt-8 text-sm text-center text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link to="/signin" className="text-primary dark:text-blue-400 hover:underline font-medium">
              Sign In
            </Link>
          </p>
        </form>
        
        <p className="mt-6 text-xs text-center text-gray-500 dark:text-gray-400">
          By creating an account, you agree to our{" "}
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

export default SignUp;