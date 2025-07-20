import { render, screen, fireEvent } from "@testing-library/react";
import EntityView from "@/features/entities/views/EntityView";
import { useEntityAllData } from "@/hooks/UseEntityData";
import { useViewMode } from "@/hooks/UseViewMode";

jest.mock("@/hooks/UseEntityData");
jest.mock("@/hooks/UseViewMode");

jest.mock("@/features/entities/views/CardsView", () => {
  return function MockCardsView({ data }: { data: Array<{title: string, description: string, image: string}> }) {
    return <div data-testid="cards-view">CardsView: {data.length} items</div>;
  };
});

jest.mock("@/features/entities/views/TableView", () => {
  return function MockTableView({ data, entity }: { data: Array<{title: string, description: string, image: string}>, entity: string }) {
    return <div data-testid="table-view">TableView for {entity}: {data.length} items</div>;
  };
});

jest.mock("@/components/ui/SwitchButton", () => {
  return function MockSwitchButton({ viewMode, toggleViewMode }: { viewMode: string, toggleViewMode: () => void }) {
    return (
      <button 
        data-testid="switch-button" 
        onClick={toggleViewMode}
        data-view-mode={viewMode}
      >
        Toggle to {viewMode === 'card' ? 'table' : 'card'}
      </button>
    );
  };
});

jest.mock("@/components/ui/LoadingSpinner", () => {
  return function MockLoadingSpinner() {
    return <div data-testid="loading-spinner">Loading...</div>;
  };
});

jest.mock("@/components/ui/ErrorMessage", () => {
  return function MockErrorMessage({ message, onRetry }: { message: string, onRetry: () => void }) {
    return (
      <div data-testid="error-message">
        <span>{message}</span>
        <button onClick={onRetry}>Retry</button>
      </div>
    );
  };
});

jest.mock("@/components/ui/PaginationData", () => {
  return function MockPaginationData({ page, setPage, count }: { page: number, setPage: (page: number) => void, count: number }) {
    return (
      <div data-testid="pagination">
        <span>Page {page} of {Math.ceil(count / 10)}</span>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    );
  };
});

type EntityData = {
  results: Array<{title: string, description: string, image: string}>;
  count: number;
};
type SWRResponse<T> = {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  isValidating: boolean;
  mutate: jest.Mock;
};

const mockUseEntityAllData = useEntityAllData as jest.MockedFunction<typeof useEntityAllData>;
const mockUseViewMode = useViewMode as jest.MockedFunction<typeof useViewMode>;

describe("EntityView", () => {
  const mockMutate = jest.fn();
  const mockToggleViewMode = jest.fn();

  // Helper function to create mock SWR response
  const createMockSWRResponse = (data: EntityData | null, error: Error | null, isLoading: boolean): SWRResponse<EntityData> => ({
    data,
    error,
    isLoading,
    isValidating: false,
    mutate: mockMutate,
  });
  
  const mockData: EntityData = {
    results: [
      { title: "Luke Skywalker", description: "Jedi Knight", image: "/luke.jpg" },
      { title: "Leia Organa", description: "Princess", image: "/leia.jpg" },
      { title: "Han Solo", description: "Smuggler", image: "/han.jpg" },
    ],
    count: 3
  };

  const mockFilmData: EntityData = {
    results: [
      { title: "A New Hope", description: "Episode IV", image: "/ep4.jpg" },
      { title: "The Empire Strikes Back", description: "Episode V", image: "/ep5.jpg" },
    ],
    count: 2
  };

  const mockStarshipData: EntityData = {
    results: [
      { title: "Millennium Falcon", description: "YT-1300", image: "/falcon.jpg" },
      { title: "X-wing", description: "T-65", image: "/xwing.jpg" },
    ],
    count: 2
  };

  const mockPlanetData: EntityData = {
    results: [
      { title: "Tatooine", description: "Desert planet", image: "/tatooine.jpg" },
      { title: "Hoth", description: "Ice planet", image: "/hoth.jpg" },
    ],
    count: 2
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    mockUseViewMode.mockReturnValue({
      viewMode: 'card',
      toggleViewMode: mockToggleViewMode,
      isHydrated: true,
    });
  });

  describe("Loading State", () => {
    it("should show loading spinner when data is loading", () => {
      mockUseEntityAllData.mockReturnValue(createMockSWRResponse(null, null, true));

      render(<EntityView entity="characters" />);
      
      expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
  });

  describe("Error State", () => {
    it("should show error message when there is an error", () => {
      mockUseEntityAllData.mockReturnValue(createMockSWRResponse(null, new Error("Failed to fetch data"), false));

      render(<EntityView entity="characters" />);
      
      expect(screen.getByTestId("error-message")).toBeInTheDocument();
      expect(screen.getByText("Error al cargar datos")).toBeInTheDocument();
    });

    it("should call mutate when retry button is clicked", () => {
      mockUseEntityAllData.mockReturnValue(createMockSWRResponse(null, new Error("Failed to fetch data"), false));

      render(<EntityView entity="characters" />);
      
      const retryButton = screen.getByText("Retry");
      fireEvent.click(retryButton);
      
      expect(mockMutate).toHaveBeenCalledTimes(1);
    });
  });

  describe("No Data State", () => {
    it("should render only switch button when data is null", () => {
      mockUseEntityAllData.mockReturnValue(createMockSWRResponse(null, null, false));

      render(<EntityView entity="characters" />);
      
      expect(screen.getByTestId("switch-button")).toBeInTheDocument();
      expect(screen.queryByTestId("cards-view")).not.toBeInTheDocument();
      expect(screen.queryByTestId("table-view")).not.toBeInTheDocument();
    });
  });

  describe("Data Display", () => {
    it("should render CardsView when viewMode is 'card'", () => {
      mockUseEntityAllData.mockReturnValue(createMockSWRResponse(mockData, null, false));

      render(<EntityView entity="characters" />);
      
      expect(screen.getByTestId("cards-view")).toBeInTheDocument();
      expect(screen.getByText("CardsView: 3 items")).toBeInTheDocument();
    });

    it("should render TableView when viewMode is 'table'", () => {
      mockUseEntityAllData.mockReturnValue(createMockSWRResponse(mockData, null, false));
      mockUseViewMode.mockReturnValue({
        viewMode: 'table',
        toggleViewMode: mockToggleViewMode,
        isHydrated: true,
      });

      render(<EntityView entity="characters" />);
      
      expect(screen.getByTestId("table-view")).toBeInTheDocument();
      expect(screen.getByText("TableView for characters: 3 items")).toBeInTheDocument();
    });
  });

  describe("View Mode Toggle", () => {
    it("should render switch button", () => {
      mockUseEntityAllData.mockReturnValue(createMockSWRResponse(mockData, null, false));

      render(<EntityView entity="characters" />);
      
      expect(screen.getByTestId("switch-button")).toBeInTheDocument();
    });

    it("should call toggleViewMode when switch button is clicked", () => {
      mockUseEntityAllData.mockReturnValue(createMockSWRResponse(mockData, null, false));

      render(<EntityView entity="characters" />);
      
      const switchButton = screen.getByTestId("switch-button");
      fireEvent.click(switchButton);
      
      expect(mockToggleViewMode).toHaveBeenCalledTimes(1);
    });

    it("should display correct toggle text based on current view mode", () => {
      mockUseEntityAllData.mockReturnValue(createMockSWRResponse(mockData, null, false));

      // Test card mode
      const { rerender } = render(<EntityView entity="characters" />);
      expect(screen.getByText("Toggle to table")).toBeInTheDocument();

      // Test table mode
      mockUseViewMode.mockReturnValue({
        viewMode: 'table',
        toggleViewMode: mockToggleViewMode,
        isHydrated: true,
      });

      rerender(<EntityView entity="characters" />);
      expect(screen.getByText("Toggle to card")).toBeInTheDocument();
    });
  });

  describe("Pagination", () => {
    it("should render pagination when count > 10", () => {
      const largeDataSet = {
        results: mockData.results,
        count: 15
      };
      
      mockUseEntityAllData.mockReturnValue(createMockSWRResponse(largeDataSet, null, false));

      render(<EntityView entity="characters" />);
      
      expect(screen.getByTestId("pagination")).toBeInTheDocument();
      expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();
    });

    it("should not render pagination when count <= 10", () => {
      mockUseEntityAllData.mockReturnValue(createMockSWRResponse(mockData, null, false));

      render(<EntityView entity="characters" />);
      
      expect(screen.queryByTestId("pagination")).not.toBeInTheDocument();
    });
  });

  describe("Different Entity Types", () => {
    it("should handle characters entity", () => {
      mockUseEntityAllData.mockReturnValue(createMockSWRResponse(mockData, null, false));

      mockUseViewMode.mockReturnValue({
        viewMode: 'table',
        toggleViewMode: mockToggleViewMode,
        isHydrated: true,
      });

      render(<EntityView entity="characters" />);
      
      expect(screen.getByText("TableView for characters: 3 items")).toBeInTheDocument();
    });

    it("should handle films entity", () => {
      mockUseEntityAllData.mockReturnValue(createMockSWRResponse(mockFilmData, null, false));

      mockUseViewMode.mockReturnValue({
        viewMode: 'table',
        toggleViewMode: mockToggleViewMode,
        isHydrated: true,
      });

      render(<EntityView entity="movies" />);
      
      expect(screen.getByText("TableView for movies: 2 items")).toBeInTheDocument();
    });

    it("should handle starships entity", () => {
      mockUseEntityAllData.mockReturnValue(createMockSWRResponse(mockStarshipData, null, false));

      mockUseViewMode.mockReturnValue({
        viewMode: 'table',
        toggleViewMode: mockToggleViewMode,
        isHydrated: true,
      });

      render(<EntityView entity="ships" />);
      
      expect(screen.getByText("TableView for ships: 2 items")).toBeInTheDocument();
    });

    it("should handle planets entity", () => {
      mockUseEntityAllData.mockReturnValue(createMockSWRResponse(mockPlanetData, null, false));

      mockUseViewMode.mockReturnValue({
        viewMode: 'table',
        toggleViewMode: mockToggleViewMode,
        isHydrated: true,
      });

      render(<EntityView entity="planets" />);
      
      expect(screen.getByText("TableView for planets: 2 items")).toBeInTheDocument();
    });
  });

  describe("Layout and Styling", () => {
    it("should have correct container structure", () => {
      mockUseEntityAllData.mockReturnValue(createMockSWRResponse(mockData, null, false));

      render(<EntityView entity="characters" />);
      
      const container = screen.getByTestId("cards-view").parentElement;
      expect(container).toHaveClass("flex-1");
    });

    it("should have switch button positioned correctly", () => {
      mockUseEntityAllData.mockReturnValue(createMockSWRResponse(mockData, null, false));

      render(<EntityView entity="characters" />);
      
      const switchButtonContainer = screen.getByTestId("switch-button").parentElement;
      expect(switchButtonContainer).toHaveClass("flex", "justify-end", "mb-4");
    });
  });

  describe("Data Passing", () => {
    it("should pass correct data structure to CardsView", () => {
      const testData = {
        results: [
          { title: "Test Title", description: "Test Description", image: "/test.jpg" }
        ],
        count: 1
      };

      mockUseEntityAllData.mockReturnValue(createMockSWRResponse(testData, null, false));

      render(<EntityView entity="characters" />);
      
      expect(screen.getByText("CardsView: 1 items")).toBeInTheDocument();
    });

    it("should pass correct data structure to TableView", () => {
      const testData = {
        results: [
          { title: "Test Title", description: "Test Description", image: "/test.jpg" }
        ],
        count: 1
      };

      mockUseEntityAllData.mockReturnValue(createMockSWRResponse(testData, null, false));

      mockUseViewMode.mockReturnValue({
        viewMode: 'table',
        toggleViewMode: mockToggleViewMode,
        isHydrated: true,
      });

      render(<EntityView entity="characters" />);
      
      expect(screen.getByText("TableView for characters: 1 items")).toBeInTheDocument();
    });
  });

  describe("Hook Integration", () => {
    it("should call useEntityAllData with correct entity parameter", () => {
      mockUseEntityAllData.mockReturnValue(createMockSWRResponse(mockData, null, false));

      render(<EntityView entity="movies" />);
      
      expect(mockUseEntityAllData).toHaveBeenCalledWith("movies", 1);
    });

    it("should call useViewMode hook", () => {
      mockUseEntityAllData.mockReturnValue(createMockSWRResponse(mockData, null, false));

      render(<EntityView entity="characters" />);
      
      expect(mockUseViewMode).toHaveBeenCalled();
    });
  });
});
