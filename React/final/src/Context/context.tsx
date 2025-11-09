import { useState, createContext, useContext, useEffect } from "react";
import type { ReactNode } from "react";

// Theme objects
const lightTheme = {
  background: "#ffffff",
  text: "#000000",
};

const darkTheme = {
  background: "#000000",
  text: "#ffffff",
};

// Type for theme context
interface ThemeContextType {
  theme: {};
  toggleTheme: () => void;
  isDark: boolean;
}

// Create Theme Context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);


export function ThemeProvider({ children }: {children: ReactNode;}) {
  // Initialize state from localStorage or default to false
  const [isDark, setIsDark] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('theme-preference');
      return savedTheme ? JSON.parse(savedTheme) : false;
    } catch (error) {
      console.error('Error loading theme from localStorage:', error);
      return false;
    }
  });

  const toggleTheme = () => setIsDark(!isDark);

  const theme = isDark ? darkTheme : lightTheme;
  console.log(typeof(theme))

  // Save theme preference to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('theme-preference', JSON.stringify(isDark));
    } catch (error) {
      console.error('Error saving theme to localStorage:', error);
    }
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use theme
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}



