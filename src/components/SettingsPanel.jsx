import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMoon, FiSun, FiMonitor } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const SettingsPanel = ({ isOpen, onClose }) => {
  const { theme, setTheme } = useTheme();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-theme-bg-sec border-l border-theme-border z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-theme-border">
              <h2 className="font-playfair text-2xl font-semibold text-theme-text">Settings</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-theme-bg transition-colors text-theme-text-muted hover:text-theme-text"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 overflow-y-auto">
              {/* Appearance Section */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-theme-text-muted uppercase tracking-wider mb-4">
                  Appearance
                </h3>
                
                <div className="space-y-3">
                  {/* Dark (Black) Option */}
                  <button
                    onClick={() => setTheme('dark')}
                    className={`w-full flex items-center p-4 rounded-xl border transition-all duration-300 ${
                      theme === 'dark'
                        ? 'border-gold bg-gold/5 shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                        : 'border-theme-border hover:border-theme-border-hover bg-theme-bg'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-gold/20 text-gold' : 'bg-black text-gray-400'}`}>
                      <FiMoon className="w-5 h-5" />
                    </div>
                    <div className="ml-4 text-left">
                      <p className={`font-medium ${theme === 'dark' ? 'text-gold' : 'text-theme-text'}`}>Dark Mode</p>
                      <p className="text-xs text-theme-text-muted">Deep black background</p>
                    </div>
                    {theme === 'dark' && (
                      <div className="ml-auto w-2 h-2 rounded-full bg-gold" />
                    )}
                  </button>

                  {/* Dark Gray Option */}
                  <button
                    onClick={() => setTheme('dark-gray')}
                    className={`w-full flex items-center p-4 rounded-xl border transition-all duration-300 ${
                      theme === 'dark-gray'
                        ? 'border-gold bg-gold/5 shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                        : 'border-theme-border hover:border-theme-border-hover bg-theme-bg'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${theme === 'dark-gray' ? 'bg-gold/20 text-gold' : 'bg-gray-800 text-gray-400'}`}>
                      <FiMonitor className="w-5 h-5" />
                    </div>
                    <div className="ml-4 text-left">
                      <p className={`font-medium ${theme === 'dark-gray' ? 'text-gold' : 'text-theme-text'}`}>Dark Gray</p>
                      <p className="text-xs text-theme-text-muted">Softer contrast</p>
                    </div>
                    {theme === 'dark-gray' && (
                      <div className="ml-auto w-2 h-2 rounded-full bg-gold" />
                    )}
                  </button>

                  {/* Day Option */}
                  <button
                    onClick={() => setTheme('day')}
                    className={`w-full flex items-center p-4 rounded-xl border transition-all duration-300 ${
                      theme === 'day'
                        ? 'border-gold bg-gold/5 shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                        : 'border-theme-border hover:border-theme-border-hover bg-theme-bg'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${theme === 'day' ? 'bg-gold/20 text-gold' : 'bg-gray-100 text-gray-600'}`}>
                      <FiSun className="w-5 h-5" />
                    </div>
                    <div className="ml-4 text-left">
                      <p className={`font-medium ${theme === 'day' ? 'text-gold' : 'text-theme-text'}`}>Day Mode</p>
                      <p className="text-xs text-theme-text-muted">Clean white background</p>
                    </div>
                    {theme === 'day' && (
                      <div className="ml-auto w-2 h-2 rounded-full bg-gold" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="p-6 border-t border-theme-border bg-theme-bg">
              <p className="text-xs text-theme-text-muted text-center">
                RJ Captures Portfolio &copy; {new Date().getFullYear()}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SettingsPanel;
