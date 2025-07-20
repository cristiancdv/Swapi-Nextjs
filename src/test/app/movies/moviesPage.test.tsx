import { render, screen } from "@testing-library/react";
import MoviesPage from "@/app/movies/page";

// mocks arriba o en setup
jest.mock('@/hooks/UseEntityData', () => ({
  useEntityAllData: jest.fn(() => ({
    data: {
      results: [{ 
        id: '1', 
        title: 'The Empire Strikes Back', 
        description: 'The Empire Back', 
        image: '/empire.jpg' 
      }],
      count: 1
    },
    error: null,
    isLoading: false,
    mutate: jest.fn(),
  })),
}));

jest.mock('@/hooks/UseViewMode', () => ({
  useViewMode: jest.fn(() => ({
    viewMode: 'card',
    toggleViewMode: jest.fn(),
  })),
}));

describe("MoviesPage", () => {
  it("should render movie cards", () => {
    render(<MoviesPage />);
    expect(screen.getByText("The Empire Strikes Back")).toBeInTheDocument();
    expect(screen.getByText("The Empire Back")).toBeInTheDocument();
  });

  it("should render movie table", () => {
    render(<MoviesPage />);
    const toggleViewMode = jest.fn();
    const viewMode = 'table';
    toggleViewMode(viewMode);
    expect(screen.getByText("The Empire Strikes Back")).toBeInTheDocument();
    expect(screen.getByText("The Empire Back")).toBeInTheDocument();
  });
});
