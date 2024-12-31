'use client';

import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState<string | null>(null);

  // Helper function to get the current theme from cookies
  const getThemeFromCookies = (): string | null => {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [key, value] = cookie.trim().split('=');
      if (key === 'theme') {
        return decodeURIComponent(value);
      }
    }
    return null;
  };

  // Update theme when the component mounts or cookies change
  useEffect(() => {
    const updateTheme = () => {
      const currentTheme = getThemeFromCookies();
      setTheme(currentTheme);
    };

    updateTheme();

    // Optional: Listen for cookie changes (manual implementation)
    const interval = setInterval(updateTheme, 0); // Polling for cookie changes

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return theme;
};
