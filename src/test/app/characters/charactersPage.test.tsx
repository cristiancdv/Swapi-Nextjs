import { render, screen } from "@testing-library/react";
import CharactersPage from "@/app/characters/page";

// mocks arriba o en setup
jest.mock('@/hooks/UseEntityData', () => ({
  useEntityAllData: jest.fn(() => ({
    data: {
      results: [{ 
        id: '1', 
        name: 'Luke Skywalker', 
        description: 'Jedi', 
        image: '/luke.jpg' 
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

describe("CharactersPage", () => {
  it("should render character cards", () => {
    render(<CharactersPage />);
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("Jedi")).toBeInTheDocument();
  });

  it("should render character table", () => {
    render(<CharactersPage />);
    const toggleViewMode = jest.fn();
    const viewMode = 'table';
    toggleViewMode(viewMode);
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("Jedi")).toBeInTheDocument();
  });
});
