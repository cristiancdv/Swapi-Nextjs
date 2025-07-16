import { renderHook, act } from '@testing-library/react';
import { useViewMode } from '@/hooks/UseViewMode';

describe('useViewMode', () => {
  it('should initialize with "card" viewMode', () => {
    const { result } = renderHook(() => useViewMode());
    expect(result.current.viewMode).toBe('card');
  });

  it('should toggle viewMode from "card" to "table"', () => {
    const { result } = renderHook(() => useViewMode());

    act(() => {
      result.current.toggleViewMode();
    });

    expect(result.current.viewMode).toBe('table');
  });

  it('should toggle viewMode back to "card"', () => {
    const { result } = renderHook(() => useViewMode());

    act(() => {
      result.current.toggleViewMode(); // card -> table
      result.current.toggleViewMode(); // table -> card
    });

    expect(result.current.viewMode).toBe('card');
  });
});
