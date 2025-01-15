import { createContext, ReactNode, useState } from "react";

interface ThemeContextType {
  isDarkTheme: boolean;
  setIsDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
