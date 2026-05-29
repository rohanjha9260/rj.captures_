import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Check local storage or default to 'dark'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('app-theme') || 'dark'; // 'dark', 'dark-gray', 'day'
  });

  useEffect(() => {
    // Save to local storage
    localStorage.setItem('app-theme', theme);
    
    // Update the document root attribute for CSS variables
    if (theme === 'dark') {
      document.documentElement.removeAttribute('data-theme'); // default root
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
