import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Check sessionStorage or default to 'dark'
  // When someone opens the link in a new tab/session, it will always default to 'dark'
  const [theme, setTheme] = useState(() => {
    return sessionStorage.getItem('app-theme') || 'dark';
  });

  useEffect(() => {
    // Save to session storage for the current session only
    sessionStorage.setItem('app-theme', theme);
    
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
