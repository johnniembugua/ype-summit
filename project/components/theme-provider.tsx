'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type FontSize = 'sm' | 'base' | 'lg' | 'xl';
type HighContrast = boolean;

interface ThemeContextType {
  theme: Theme;
  fontSize: FontSize;
  highContrast: HighContrast;
  setTheme: (theme: Theme) => void;
  setFontSize: (size: FontSize) => void;
  setHighContrast: (enabled: boolean) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [fontSize, setFontSize] = useState<FontSize>('base');
  const [highContrast, setHighContrast] = useState<HighContrast>(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    const storedFontSize = localStorage.getItem('fontSize') as FontSize | null;
    const storedHighContrast = localStorage.getItem('highContrast') === 'true';

    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setTheme(systemTheme);
    }

    if (storedFontSize) {
      setFontSize(storedFontSize);
    }

    if (storedHighContrast) {
      setHighContrast(storedHighContrast);
    }
  }, []);

  // Apply theme and accessibility settings to the document
  useEffect(() => {
    const root = document.documentElement;
    
    // Apply theme
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Apply font size
    root.classList.remove('text-sm', 'text-base', 'text-lg', 'text-xl');
    root.classList.add(`text-${fontSize}`);

    // Apply high contrast
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Save to localStorage
    localStorage.setItem('theme', theme);
    localStorage.setItem('fontSize', fontSize);
    localStorage.setItem('highContrast', highContrast.toString());
  }, [theme, fontSize, highContrast]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const value = {
    theme,
    fontSize,
    highContrast,
    setTheme,
    setFontSize,
    setHighContrast,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
