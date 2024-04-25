import React, { useState, ReactNode } from 'react';

export const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee",
    border: "3px solid gray"
  },
  dark: {
    foreground: "#ffffff",
    background: "#000",
    border:"solid gray"
  }
};

export const ThemeContext = React.createContext({
  theme: themes.dark,
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState(themes.dark);

  const toggleTheme = () => {
    setTheme(theme === themes.dark ? themes.light : themes.dark);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
