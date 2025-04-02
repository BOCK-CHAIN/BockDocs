import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, FileText, Lock, Users, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import useThemeStore from '../store/themeStore';
import { useAuth } from '../contexts/AuthContext';
import { FaInstagram, FaLinkedin, FaYoutube, FaTwitter, FaFacebook } from 'react-icons/fa';

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
      {/* Hero Section - Make responsive */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 lg:pb-20">
        <motion.div variants={itemVariants} className="space-y-4 sm:space-y-6 max-w-3xl mx-auto text-center">
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Welcome to <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Bock Docs</span>
          </h1>
          <p className={`text-lg sm:text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Create and edit documents with powerful features designed for professional use. Your ideas deserve the best tools.
          </p>
          <button 
            onClick={handleTryForFree}
            className="inline-flex items-center px-6 py-3 text-base sm:text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm transition-colors mx-auto"
          >
            Try it free <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </motion.div>
      </section>

      {/* Features Section - Make responsive */}
      <section className={`w-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} py-12 sm:py-16 lg:py-20`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Why Choose Bock Docs?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
                <feature.icon className={`w-8 h-8 sm:w-10 sm:h-10 mb-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{feature.title}</h3>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm sm:text-base`}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - Make responsive */}
      <footer className="bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 py-12 sm:py-16 border-t border-gray-100 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            <div>
              <h4 className="text-lg sm:text-xl font-bold mb-4 text-gray-900 dark:text-white">Bock Drive</h4>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Where Your Data Finds Its Home</p>
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-bold mb-4 text-gray-900 dark:text-white">Bock Suite</h4>
              <ul className="space-y-2">
                {['Bock Meet', 'Bock Drive', 'Bock Docs'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm sm:text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-bold mb-4 text-gray-900 dark:text-white">Legal</h4>
              <ul className="space-y-2">
                {['Privacy Policy', 'Terms of Service', 'Cookies Policy'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm sm:text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-bold mb-4 text-gray-900 dark:text-white">Connect</h4>
              <div className="flex space-x-4">
                {[
                  { icon: FaTwitter, url: 'https://x.com/BockBH' },
                  { icon: FaInstagram, url: 'https://www.instagram.com/bockbharath' },
                  { icon: FaFacebook, url: 'https://www.facebook.com/people/Bock/61555404186214/' },
                  { icon: FaLinkedin, url: 'https://www.linkedin.com/company/bockbharth/' },
                  { icon: FaYoutube, url: 'https://www.youtube.com/@bockbharath' }
                ].map((social) => (
                  <a 
                    key={social.url}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <social.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                ))}
              </div>
              <div className="mt-4">
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Email: info@bock.co.in</p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              © 2025 Bock Docs. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Hero;