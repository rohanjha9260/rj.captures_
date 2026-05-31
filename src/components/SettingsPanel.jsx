import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMoon, FiSun, FiCompass, FiDroplet, FiSunset } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const SettingsPanel = ({ isOpen, onClose }) => {
  const { theme, setTheme } = useTheme();

  const themesList = [
    {
      group: "Night Themes (Nature-Inspired)",
      items: [
        {
          id: 'dark',
          name: 'Golden Black',
          desc: 'Cinematic deep black & gold',
          icon: FiMoon,
          accentColor: '#d4af37',
          bgColor: '#050505'
        },
        {
          id: 'forest-dark',
          name: 'Forest Emerald',
          desc: 'Deep woods & moss green',
          icon: FiCompass,
          accentColor: '#52b788',
          bgColor: '#0b1a14'
        },
        {
          id: 'ocean-dark',
          name: 'Ocean Deep',
          desc: 'Abyss blue & coastal teal',
          icon: FiDroplet,
          accentColor: '#4ea8de',
          bgColor: '#031122'
        },
        {
          id: 'autumn-dark',
          name: 'Autumn Amber',
          desc: 'Charcoal & terracotta rust',
          icon: FiSunset,
          accentColor: '#f39c12',
          bgColor: '#180d07'
        }
      ]
    },
    {
      group: "Day Themes (Nature-Inspired)",
      items: [
        {
          id: 'day',
          name: 'Golden Desert',
          desc: 'Sunlit sand & gold accents',
          icon: FiSun,
          accentColor: '#d4af37',
          bgColor: '#ffffff'
        },
        {
          id: 'forest-light',
          name: 'Forest Sage',
          desc: 'Crisp morning mist & sage',
          icon: FiCompass,
          accentColor: '#2d6a4f',
          bgColor: '#f4fcf7'
        },
        {
          id: 'ocean-light',
          name: 'Ocean Breeze',
          desc: 'Clear sky blue & shore teal',
          icon: FiDroplet,
          accentColor: '#0077b6',
          bgColor: '#f0f7ff'
        },
        {
          id: 'autumn-light',
          name: 'Autumn Gold',
          desc: 'Crisp birch cream & maple rust',
          icon: FiSunset,
          accentColor: '#d35400',
          bgColor: '#fffbf7'
        }
      ]
    }
  ];

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
            <div className="p-6 flex-1 overflow-y-auto space-y-8">
              {themesList.map((group, groupIdx) => (
                <div key={groupIdx}>
                  <h3 className="text-xs font-semibold text-theme-text-muted uppercase tracking-wider mb-4">
                    {group.group}
                  </h3>
                  
                  <div className="space-y-3">
                    {group.items.map((item) => {
                      const IconComponent = item.icon;
                      const isSelected = theme === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setTheme(item.id)}
                          className={`w-full flex items-center p-4 rounded-xl border transition-all duration-300 ${
                            isSelected
                              ? 'border-gold bg-gold/5 shadow-[0_0_15px_rgba(var(--color-gold-rgb),0.15)] scale-[1.02]'
                              : 'border-theme-border hover:border-theme-border-hover bg-theme-bg hover:scale-[1.01]'
                          }`}
                        >
                          <div 
                            className="p-2 rounded-lg"
                            style={{ 
                              backgroundColor: isSelected ? 'rgba(var(--color-gold-rgb), 0.2)' : item.bgColor,
                              color: isSelected ? 'var(--color-gold)' : item.accentColor 
                            }}
                          >
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div className="ml-4 text-left">
                            <p className={`font-semibold text-sm ${isSelected ? 'text-gold font-bold' : 'text-theme-text'}`}>
                              {item.name}
                            </p>
                            <p className="text-xs text-theme-text-sec mt-0.5">{item.desc}</p>
                          </div>
                          {isSelected && (
                            <div className="ml-auto w-2 h-2 rounded-full bg-gold animate-pulse" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
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
