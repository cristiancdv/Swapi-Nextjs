import { render, screen } from "@testing-library/react";
import PlanetPage from "@/app/planets/page";

// mocks arriba o en setup
jest.mock('@/hooks/UseEntityData', () => ({
  useEntityAllData: jest.fn(() => ({
    data: {
      results: [{ 
        id: '1', 
        name: 'Tatooine', 
        description: 'Tatooine is a desert planet', 
        image: '/tatooine.jpg' 
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

describe("PlanetPage", () => {
  it("should render planet cards", () => {
    render(<PlanetPage />);
    expect(screen.getByText("Tatooine")).toBeInTheDocument();
    expect(screen.getByText("Tatooine is a desert planet")).toBeInTheDocument();
  });

  it("should render planet table", () => {
    render(<PlanetPage />);
    const toggleViewMode = jest.fn();
    const viewMode = 'table';
    toggleViewMode(viewMode);
    expect(screen.getByText("Tatooine")).toBeInTheDocument();
    expect(screen.getByText("Tatooine is a desert planet")).toBeInTheDocument();
  });
});
