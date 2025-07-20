import { renderHook, act, waitFor } from '@testing-library/react';
import { useViewMode } from '@/hooks/UseViewMode';

// Mock document.cookie
Object.defineProperty(document, 'cookie', {
  writable: true,
  value: '',
});

describe('useViewMode', () => {
  beforeEach(() => {
    // Clear cookies before each test
    document.cookie = '';
  });

  it('should initialize with "card" viewMode', async () => {
    const { result } = renderHook(() => useViewMode());
    
    // Wait for hydration to complete
    await waitFor(() => {
      expect(result.current.isHydrated).toBe(true);
    });
    
    expect(result.current.viewMode).toBe('card');
  });

  it('should toggle viewMode from "card" to "table"', async () => {
    const { result } = renderHook(() => useViewMode());

    // Wait for hydration
    await waitFor(() => {
      expect(result.current.isHydrated).toBe(true);
    });

    act(() => {
      result.current.toggleViewMode();
    });

    expect(result.current.viewMode).toBe('table');
  });

  it('should toggle viewMode back to "card"', async () => {
    const { result } = renderHook(() => useViewMode());

    // Wait for hydration
    await waitFor(() => {
      expect(result.current.isHydrated).toBe(true);
    });

    act(() => {
      result.current.toggleViewMode(); // card -> table
    });

    expect(result.current.viewMode).toBe('table');

    act(() => {
      result.current.toggleViewMode(); // table -> card
    });

    expect(result.current.viewMode).toBe('card');
  });

  it('should restore viewMode from cookie', async () => {
    // Set a cookie value
    document.cookie = 'viewMode=table';

    const { result } = renderHook(() => useViewMode());

    // Wait for hydration
    await waitFor(() => {
      expect(result.current.isHydrated).toBe(true);
    });

    expect(result.current.viewMode).toBe('table');
  });
});
