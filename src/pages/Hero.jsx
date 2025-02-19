import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, FileText, Lock, Users, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import useThemeStore from '../store/themeStore';
import { useAuth } from '../contexts/AuthContext';

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

const Hero = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    // Ensure dark mode is applied to the entire page
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const handleTryForFree = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/signin');
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900 text-gray-100' : 'bg-white text-gray-800'}`}>
      {/* Hero Section */}
      <section className="w-full max-w-6xl mx-auto px-6 pt-24 pb-20">
        <motion.div variants={itemVariants} className="space-y-6 max-w-3xl">
          <h1 className={`text-6xl font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Welcome to <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Bock Docs</span>
          </h1>
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Create and edit documents with powerful features designed for professional use. Your ideas deserve the best tools.
          </p>
          <button 
            onClick={handleTryForFree}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium flex items-center gap-2 transition-colors"
          >
            Try it free <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className={`w-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} py-16`}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className={`text-3xl font-bold text-center mb-12 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Why Choose Bock Docs?
          </h2>
          <div className="grid grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: "Smart Document Features",
                description: "Intelligent suggestions, templates, and AI-powered editing assistance."
              },
              {
                icon: Users,
                title: "Professional Workflow",
                description: "Streamlined document management with intuitive controls."
              },
              {
                icon: Lock,
                title: "Enterprise Security",
                description: "Compliance-ready document management with advanced permissions."
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className={`${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'} p-6 rounded-lg shadow-sm`}
              >
                <feature.icon className={`w-10 h-10 mb-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-50 text-gray-600'} py-16`}>
        <div className="container mx-auto px-6 text-center">
          <p>© {new Date().getFullYear()} Bock Docs. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Hero;