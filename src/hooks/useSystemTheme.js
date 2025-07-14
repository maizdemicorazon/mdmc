import { useState, useEffect, useCallback } from 'react';

export const useAdvancedTheme = (storageKey = 'app-theme') => {
  const [systemTheme, setSystemTheme] = useState('light');
  const [userPreference, setUserPreference] = useState(null); // null = seguir sistema

  // Detectar tema del sistema
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const updateSystemTheme = (e) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    // Establecer valor inicial
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');

    // Escuchar cambios
    mediaQuery.addEventListener('change', updateSystemTheme);

    return () => {
      mediaQuery.removeEventListener('change', updateSystemTheme);
    };
  }, []);

  // Cargar preferencia guardada
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const saved = localStorage.getItem(storageKey);
      if (saved && ['light', 'dark', 'system'].includes(saved)) {
        setUserPreference(saved === 'system' ? null : saved);
      }
    } catch (error) {
      console.warn('Error loading theme preference:', error);
    }
  }, [storageKey]);

  // Guardar preferencia
  const savePreference = useCallback((theme) => {
    try {
      localStorage.setItem(storageKey, theme);
    } catch (error) {
      console.warn('Error saving theme preference:', error);
    }
  }, [storageKey]);

  // Funciones para cambiar tema
  const setTheme = useCallback((theme) => {
    if (theme === 'system') {
      setUserPreference(null);
      savePreference('system');
    } else if (['light', 'dark'].includes(theme)) {
      setUserPreference(theme);
      savePreference(theme);
    }
  }, [savePreference]);

  const toggleTheme = useCallback(() => {
    const currentTheme = userPreference || systemTheme;
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  }, [userPreference, systemTheme, setTheme]);

  const followSystem = useCallback(() => {
    setTheme('system');
  }, [setTheme]);

  // Tema efectivo (el que realmente se está usando)
  const effectiveTheme = userPreference || systemTheme;
  const isDarkMode = effectiveTheme === 'dark';
  const isFollowingSystem = userPreference === null;

  return {
    // Estados
    isDarkMode,
    isLightMode: !isDarkMode,
    theme: effectiveTheme,
    systemTheme,
    userPreference,
    isFollowingSystem,

    // Acciones
    setTheme,
    toggleTheme,
    followSystem,

    // Helpers
    setLight: () => setTheme('light'),
    setDark: () => setTheme('dark'),
  };
};