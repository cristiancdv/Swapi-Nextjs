"use client";
import { useState } from 'react';

export function useViewMode() {
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const toggleViewMode = () => {
    setViewMode((prev) => (prev === 'card' ? 'table' : 'card'));
  };
  return { viewMode, toggleViewMode };
}