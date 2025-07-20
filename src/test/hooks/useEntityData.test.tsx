import { renderHook } from '@testing-library/react';
import { useEntityAllData, useEntityOneData } from '@/hooks/UseEntityData';
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
    it('should construct URL correctly with different endpoints', () => {
      const mockResponse = { data: [{ name: 'Luke' }] };
      mockUseSWR.mockReturnValue(mockResponse);

      const endpoint = 'people';
      const expectedUrl = config.apiUrl.endsWith('/')
        ? config.apiUrl + endpoint
        : config.apiUrl + '/' + endpoint;

      const { result } = renderHook(() => useEntityAllData(endpoint, 0));

      expect(mockUseSWR).toHaveBeenCalledWith(expectedUrl, expect.any(Function));
      expect(result.current).toEqual(mockResponse);
    });

    it('should add page parameter when page > 1', () => {
      const mockResponse = { data: [{ name: 'Leia' }] };
      mockUseSWR.mockReturnValue(mockResponse);

      const endpoint = 'people';
      const page = 2;
      const expectedUrl = (config.apiUrl.endsWith('/') 
        ? config.apiUrl + endpoint 
        : config.apiUrl + '/' + endpoint) + '?page=' + page;

      const { result } = renderHook(() => useEntityAllData(endpoint, page));

      expect(mockUseSWR).toHaveBeenCalledWith(expectedUrl, expect.any(Function));
      expect(result.current).toEqual(mockResponse);
    });
  });

  describe('Different Entity Types', () => {
    it('should work with different endpoints', () => {
      const testCases = [
        { endpoint: 'people', data: [{ name: 'Luke' }] },
        { endpoint: 'films', data: [{ title: 'A New Hope' }] },
        { endpoint: 'starships', data: [{ name: 'Falcon' }] },
        { endpoint: 'planets', data: [{ name: 'Tatooine' }] }
      ];

      testCases.forEach(({ endpoint, data }) => {
        const mockResponse = { data, isLoading: false, error: null };
        mockUseSWR.mockReturnValue(mockResponse);

        const { result } = renderHook(() => useEntityAllData(endpoint, 0));
        expect(result.current.data).toEqual(data);
      });
    });
  });

  describe('SWR Response States', () => {
    it('should handle loading state', () => {
      const mockResponse = { 
        data: null,
        isLoading: true,
        error: null
      };
      mockUseSWR.mockReturnValue(mockResponse);

      const { result } = renderHook(() => useEntityAllData('people', 0));

      expect(result.current.isLoading).toBe(true);
      expect(result.current.data).toBeNull();
    });

    it('should handle error state', () => {
      const mockError = new Error('API Error');
      const mockResponse = { 
        data: null,
        isLoading: false,
        error: mockError
      };
      mockUseSWR.mockReturnValue(mockResponse);

      const { result } = renderHook(() => useEntityAllData('people', 0));

      expect(result.current.error).toBe(mockError);
      expect(result.current.isLoading).toBe(false);
    });

    it('should handle success state', () => {
      const mockData = [{ name: 'Luke' }];
      const mockResponse = { 
        data: mockData,
        isLoading: false,
        error: null
      };
      mockUseSWR.mockReturnValue(mockResponse);

      const { result } = renderHook(() => useEntityAllData('people', 0));

      expect(result.current.data).toEqual(mockData);
      expect(result.current.error).toBeNull();
    });
  });
});

describe('useEntityOneData', () => {
  const mockUseSWR = swr.default as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('URL Construction', () => {
    it('should construct URL correctly with endpoint and id', () => {
      const mockResponse = { data: { name: 'Luke' } };
      mockUseSWR.mockReturnValue(mockResponse);

      const endpoint = 'people';
      const id = 1;
      const expectedUrl = config.apiUrl.endsWith('/')
        ? config.apiUrl + endpoint + '/' + id
        : config.apiUrl + '/' + endpoint + '/' + id;

      const { result } = renderHook(() => useEntityOneData(endpoint, id));

      expect(mockUseSWR).toHaveBeenCalledWith(expectedUrl, expect.any(Function));
      expect(result.current).toEqual(mockResponse);
    });

    it('should work with different entity types and ids', () => {
      const testCases = [
        { endpoint: 'people', id: 1, data: { name: 'Luke' } },
        { endpoint: 'films', id: 4, data: { title: 'A New Hope' } },
        { endpoint: 'starships', id: 10, data: { name: 'Falcon' } }
      ];

      testCases.forEach(({ endpoint, id, data }) => {
        const mockResponse = { data, isLoading: false, error: null };
        mockUseSWR.mockReturnValue(mockResponse);

        const { result } = renderHook(() => useEntityOneData(endpoint, id));
        expect(result.current.data).toEqual(data);
      });
    });
  });

  describe('SWR Response States', () => {
    it('should handle loading state', () => {
      const mockResponse = { 
        data: null,
        isLoading: true,
        error: null
      };
      mockUseSWR.mockReturnValue(mockResponse);

      const { result } = renderHook(() => useEntityOneData('people', 1));

      expect(result.current.isLoading).toBe(true);
      expect(result.current.data).toBeNull();
    });

    it('should handle error state', () => {
      const mockError = new Error('Entity not found');
      const mockResponse = { 
        data: null,
        isLoading: false,
        error: mockError
      };
      mockUseSWR.mockReturnValue(mockResponse);

      const { result } = renderHook(() => useEntityOneData('people', 999));

      expect(result.current.error).toBe(mockError);
      expect(result.current.isLoading).toBe(false);
    });

    it('should handle success state', () => {
      const mockData = { name: 'Luke', height: '172' };
      const mockResponse = { 
        data: mockData,
        isLoading: false,
        error: null
      };
      mockUseSWR.mockReturnValue(mockResponse);

      const { result } = renderHook(() => useEntityOneData('people', 1));

      expect(result.current.data).toEqual(mockData);
      expect(result.current.error).toBeNull();
    });
  });
});