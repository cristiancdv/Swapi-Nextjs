"use client";
import { useState, useEffect } from 'react';

export function useViewMode() {
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [isHydrated, setIsHydrated] = useState(false);

  // Función para leer cookie
  const getCookie = (name: string): string | null => {
    if (typeof document === 'undefined') {
      return null;
    }
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null;
    }
    return null;
  };

  // Función para escribir cookie
  const setCookie = (name: string, value: string, days: number = 30) => {
    if (typeof document === 'undefined') {
      return;
    }
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  };

  // Hidratar el estado desde la cookie
  useEffect(() => {
    const storedMode = getCookie('viewMode');
    if (storedMode === 'table' || storedMode === 'card') {
      setViewMode(storedMode);
    }
    setIsHydrated(true);
  }, []);

  const toggleViewMode = () => {
    setViewMode((prev) => {
      const newMode = prev === 'card' ? 'table' : 'card';
      setCookie('viewMode', newMode);
      return newMode;
    });
  };

  return { viewMode, toggleViewMode, isHydrated };
}