import { renderHook } from '@testing-library/react';
import { useEntityAllData } from '@/hooks/UseEntityData';
import * as swr from 'swr';
import config from '@/config/config';

jest.mock('swr');
jest.mock('@/services/fetchEntity', () => ({
  fetchEntity: jest.fn(),
}));

describe('useEntityAllData', () => {
  const mockUseSWR = swr.default as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('URL Construction', () => {
    it('should call useSWR with correct URL when apiUrl ends with slash', () => {
      const mockResponse = { data: { name: 'Luke' } };
      mockUseSWR.mockReturnValue(mockResponse);

      const endpoint = 'people/1';
      const expectedUrl = config.apiUrl.endsWith('/')
        ? config.apiUrl + endpoint
        : config.apiUrl + '/' + endpoint;

      const { result } = renderHook(() => useEntityAllData(endpoint));

      expect(mockUseSWR).toHaveBeenCalledWith(expectedUrl, expect.any(Function));
      expect(result.current).toEqual(mockResponse);
    });

    it('should call useSWR with correct URL when apiUrl does not end with slash', () => {
      const mockResponse = { data: { name: 'Leia' } };
      mockUseSWR.mockReturnValue(mockResponse);

      const endpoint = 'people/2';
      const expectedUrl = config.apiUrl.endsWith('/')
        ? config.apiUrl + endpoint
        : config.apiUrl + '/' + endpoint;

      const { result } = renderHook(() => useEntityAllData(endpoint));

      expect(mockUseSWR).toHaveBeenCalledWith(expectedUrl, expect.any(Function));
      expect(result.current).toEqual(mockResponse);
    });

    it('should handle empty endpoint', () => {
      const mockResponse = { data: [] };
      mockUseSWR.mockReturnValue(mockResponse);

      const endpoint = '';
      const expectedUrl = config.apiUrl.endsWith('/')
        ? config.apiUrl + endpoint
        : config.apiUrl + '/' + endpoint;

      const { result } = renderHook(() => useEntityAllData(endpoint));

      expect(mockUseSWR).toHaveBeenCalledWith(expectedUrl, expect.any(Function));
      expect(result.current).toEqual(mockResponse);
    });
  });

  describe('Different Entity Types', () => {
    it('should work with characters endpoint', () => {
      const mockResponse = { 
        data: [{ name: 'Luke', height: '172' }],
        isLoading: false,
        error: null
      };
      mockUseSWR.mockReturnValue(mockResponse);

      const endpoint = 'characters';
      const expectedUrl = config.apiUrl.endsWith('/')
        ? config.apiUrl + endpoint
        : config.apiUrl + '/' + endpoint;

      const { result } = renderHook(() => useEntityAllData(endpoint));

      expect(mockUseSWR).toHaveBeenCalledWith(expectedUrl, expect.any(Function));
      expect(result.current).toEqual(mockResponse);
    });

    it('should work with films endpoint', () => {
      const mockResponse = { 
        data: [{ title: 'A New Hope', episode_id: 4 }],
        isLoading: false,
        error: null
      };
      mockUseSWR.mockReturnValue(mockResponse);

      const endpoint = 'films';
      const expectedUrl = config.apiUrl.endsWith('/')
        ? config.apiUrl + endpoint
        : config.apiUrl + '/' + endpoint;

      const { result } = renderHook(() => useEntityAllData(endpoint));

      expect(mockUseSWR).toHaveBeenCalledWith(expectedUrl, expect.any(Function));
      expect(result.current).toEqual(mockResponse);
    });

    it('should work with starships endpoint', () => {
      const mockResponse = { 
        data: [{ name: 'Millennium Falcon', model: 'YT-1300' }],
        isLoading: false,
        error: null
      };
      mockUseSWR.mockReturnValue(mockResponse);

      const endpoint = 'starships';
      const expectedUrl = config.apiUrl.endsWith('/')
        ? config.apiUrl + endpoint
        : config.apiUrl + '/' + endpoint;

      const { result } = renderHook(() => useEntityAllData(endpoint));

      expect(mockUseSWR).toHaveBeenCalledWith(expectedUrl, expect.any(Function));
      expect(result.current).toEqual(mockResponse);
    });

    it('should work with planets endpoint', () => {
      const mockResponse = { 
        data: [{ name: 'Tatooine', climate: 'arid' }],
        isLoading: false,
        error: null
      };
      mockUseSWR.mockReturnValue(mockResponse);

      const endpoint = 'planets';
      const expectedUrl = config.apiUrl.endsWith('/')
        ? config.apiUrl + endpoint
        : config.apiUrl + '/' + endpoint;

      const { result } = renderHook(() => useEntityAllData(endpoint));

      expect(mockUseSWR).toHaveBeenCalledWith(expectedUrl, expect.any(Function));
      expect(result.current).toEqual(mockResponse);
    });
  });

  describe('SWR Response States', () => {
    it('should handle loading state', () => {
      const mockResponse = { 
        data: null,
        isLoading: true,
        error: null,
        isValidating: true
      };
      mockUseSWR.mockReturnValue(mockResponse);

      const endpoint = 'characters';
      const { result } = renderHook(() => useEntityAllData(endpoint));

      expect(result.current).toEqual(mockResponse);
      expect(result.current.isLoading).toBe(true);
      expect(result.current.data).toBeNull();
    });

    it('should handle error state', () => {
      const mockError = new Error('Failed to fetch data');
      const mockResponse = { 
        data: null,
        isLoading: false,
        error: mockError,
        isValidating: false
      };
      mockUseSWR.mockReturnValue(mockResponse);

      const endpoint = 'characters';
      const { result } = renderHook(() => useEntityAllData(endpoint));

      expect(result.current).toEqual(mockResponse);
      expect(result.current.error).toBe(mockError);
      expect(result.current.isLoading).toBe(false);
    });

    it('should handle success state with data', () => {
      const mockData = [{ name: 'Luke', height: '172' }];
      const mockResponse = { 
        data: mockData,
        isLoading: false,
        error: null,
        isValidating: false
      };
      mockUseSWR.mockReturnValue(mockResponse);

      const endpoint = 'characters';
      const { result } = renderHook(() => useEntityAllData(endpoint));

      expect(result.current).toEqual(mockResponse);
      expect(result.current.data).toEqual(mockData);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('should handle empty data response', () => {
      const mockResponse = { 
        data: [],
        isLoading: false,
        error: null,
        isValidating: false
      };
      mockUseSWR.mockReturnValue(mockResponse);

      const endpoint = 'characters';
      const { result } = renderHook(() => useEntityAllData(endpoint));

      expect(result.current).toEqual(mockResponse);
      expect(result.current.data).toEqual([]);
    });
  });

  describe('Function Calls', () => {
    it('should call useSWR only once per render', () => {
      const mockResponse = { data: { name: 'Luke' } };
      mockUseSWR.mockReturnValue(mockResponse);

      const endpoint = 'people/1';
      renderHook(() => useEntityAllData(endpoint));

      expect(mockUseSWR).toHaveBeenCalledTimes(1);
    });

    it('should call useSWR with different endpoints', () => {
      const mockResponse = { data: { name: 'Luke' } };
      mockUseSWR.mockReturnValue(mockResponse);

      const endpoint1 = 'people/1';
      const endpoint2 = 'people/2';

      renderHook(() => useEntityAllData(endpoint1));
      renderHook(() => useEntityAllData(endpoint2));

      expect(mockUseSWR).toHaveBeenCalledTimes(2);
      expect(mockUseSWR).toHaveBeenNthCalledWith(1, expect.stringContaining(endpoint1), expect.any(Function));
      expect(mockUseSWR).toHaveBeenNthCalledWith(2, expect.stringContaining(endpoint2), expect.any(Function));
    });
  });

  describe('Configuration Integration', () => {
    it('should use config.apiUrl correctly', () => {
      const mockResponse = { data: { name: 'Luke' } };
      mockUseSWR.mockReturnValue(mockResponse);

      const endpoint = 'test-endpoint';
      const expectedUrl = config.apiUrl.endsWith('/')
        ? config.apiUrl + endpoint
        : config.apiUrl + '/' + endpoint;

      renderHook(() => useEntityAllData(endpoint));

      expect(mockUseSWR).toHaveBeenCalledWith(expectedUrl, expect.any(Function));
    });

    it('should handle config.apiUrl with trailing slash', () => {
      const mockResponse = { data: { name: 'Luke' } };
      mockUseSWR.mockReturnValue(mockResponse);

      // Mock config to have trailing slash
      const originalApiUrl = config.apiUrl;
      Object.defineProperty(config, 'apiUrl', {
        value: 'https://api.example.com/',
        writable: true
      });

      const endpoint = 'test-endpoint';
      const expectedUrl = 'https://api.example.com/test-endpoint';

      renderHook(() => useEntityAllData(endpoint));

      expect(mockUseSWR).toHaveBeenCalledWith(expectedUrl, expect.any(Function));

      // Restore original config
      Object.defineProperty(config, 'apiUrl', {
        value: originalApiUrl,
        writable: true
      });
    });

    it('should handle config.apiUrl without trailing slash', () => {
      const mockResponse = { data: { name: 'Luke' } };
      mockUseSWR.mockReturnValue(mockResponse);

      // Mock config to not have trailing slash
      const originalApiUrl = config.apiUrl;
      Object.defineProperty(config, 'apiUrl', {
        value: 'https://api.example.com',
        writable: true
      });

      const endpoint = 'test-endpoint';
      const expectedUrl = 'https://api.example.com/test-endpoint';

      renderHook(() => useEntityAllData(endpoint));

      expect(mockUseSWR).toHaveBeenCalledWith(expectedUrl, expect.any(Function));

      // Restore original config
      Object.defineProperty(config, 'apiUrl', {
        value: originalApiUrl,
        writable: true
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle special characters in endpoint', () => {
      const mockResponse = { data: { name: 'Luke' } };
      mockUseSWR.mockReturnValue(mockResponse);

      const endpoint = 'people/1?format=json';
      const expectedUrl = config.apiUrl.endsWith('/')
        ? config.apiUrl + endpoint
        : config.apiUrl + '/' + endpoint;

      renderHook(() => useEntityAllData(endpoint));

      expect(mockUseSWR).toHaveBeenCalledWith(expectedUrl, expect.any(Function));
    });

    it('should handle numeric endpoint', () => {
      const mockResponse = { data: { name: 'Luke' } };
      mockUseSWR.mockReturnValue(mockResponse);

      const endpoint = '123';
      const expectedUrl = config.apiUrl.endsWith('/')
        ? config.apiUrl + endpoint
        : config.apiUrl + '/' + endpoint;

      renderHook(() => useEntityAllData(endpoint));

      expect(mockUseSWR).toHaveBeenCalledWith(expectedUrl, expect.any(Function));
    });

    it('should handle very long endpoint', () => {
      const mockResponse = { data: { name: 'Luke' } };
      mockUseSWR.mockReturnValue(mockResponse);

      const endpoint = 'a'.repeat(1000);
      const expectedUrl = config.apiUrl.endsWith('/')
        ? config.apiUrl + endpoint
        : config.apiUrl + '/' + endpoint;

      renderHook(() => useEntityAllData(endpoint));

      expect(mockUseSWR).toHaveBeenCalledWith(expectedUrl, expect.any(Function));
    });
  });
});
