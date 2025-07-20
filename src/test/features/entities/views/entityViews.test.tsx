import { render, screen, fireEvent } from "@testing-library/react";
import EntityView from "@/features/entities/views/EntityView";
import { useEntityAllData } from "@/hooks/UseEntityData";
import { useViewMode } from "@/hooks/UseViewMode";

jest.mock("@/hooks/UseEntityData");
jest.mock("@/hooks/UseViewMode");

// Mock @heroui/react useDisclosure hook
jest.mock("@heroui/react", () => ({
  useDisclosure: jest.fn()
}));

// Mock ModalEntityView
jest.mock("@/features/entities/views/ModalEntityView", () => {
  return function MockModalEntityView({ 
    isOpen, 
    onOpenChange, 
    selectedId, 
    entity 
  }: { 
    isOpen: boolean; 
    onOpenChange: () => void; 
    selectedId: number; 
    entity: string; 
  }) {
    return isOpen ? (
      <div data-testid="modal-entity-view">
        <span>Modal for {entity} - ID: {selectedId}</span>
        <button onClick={onOpenChange} data-testid="close-modal">Close</button>
      </div>
    ) : null;
  };
});

jest.mock("@/features/entities/views/CardsView", () => {
  return function MockCardsView({ 
    data, 
    setSelectedId, 
    onOpen 
  }: { 
    data: Array<{id: string, title?: string, name?: string, description: string}>; 
    setSelectedId: (id: number) => void;
    onOpen: () => void;
  }) {
    return (
      <div data-testid="cards-view">
        <span>CardsView: {data.length} items</span>
        <button 
          data-testid="card-item-0" 
          onClick={() => {
            setSelectedId(parseInt(data[0]?.id || "0"));
            onOpen();
          }}
        >
          Click Card {data[0]?.title || data[0]?.name}
        </button>
      </div>
    );
  };
});

jest.mock("@/features/entities/views/TableView", () => {
  return function MockTableView({ 
    data, 
    entity, 
    setSelectedId, 
    onOpen 
  }: { 
    data: Array<{id: string, title?: string, name?: string, description: string}>; 
    entity: string;
    setSelectedId: (id: number) => void;
    onOpen: () => void;
  }) {
    return (
      <div data-testid="table-view">
        <span>TableView for {entity}: {data.length} items</span>
        <button 
          data-testid="table-row-0" 
          onClick={() => {
            setSelectedId(parseInt(data[0]?.id || "0"));
            onOpen();
          }}
        >
          Click Row {data[0]?.title || data[0]?.name}
        </button>
      </div>
    );
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
  results: Array<{id: string, title?: string, name?: string, description: string, image?: string}>;
  count: number;
};

type SWRResponse<T> = {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  isValidating: boolean;
  mutate: jest.Mock;
};

import { useDisclosure } from "@heroui/react";

const mockUseEntityAllData = useEntityAllData as jest.MockedFunction<typeof useEntityAllData>;
const mockUseViewMode = useViewMode as jest.MockedFunction<typeof useViewMode>;
const mockUseDisclosure = useDisclosure as jest.MockedFunction<typeof useDisclosure>;

describe("EntityView", () => {
  const mockMutate = jest.fn();
  const mockToggleViewMode = jest.fn();
  const mockOnOpen = jest.fn();
  const mockOnOpenChange = jest.fn();

  // Helper function to create mock SWR response
  const createMockSWRResponse = (data: EntityData | null, error: Error | null, isLoading: boolean, isValidating = false): SWRResponse<EntityData> => ({
    data,
    error,
    isLoading,
    isValidating,
    mutate: mockMutate,
  });
  
  const mockData: EntityData = {
    results: [
      { id: "1", name: "Luke Skywalker", description: "Jedi Knight", image: "/luke.jpg" },
      { id: "2", name: "Leia Organa", description: "Princess", image: "/leia.jpg" },
      { id: "3", name: "Han Solo", description: "Smuggler", image: "/han.jpg" },
    ],
    count: 3
  };

  const mockMovieData: EntityData = {
    results: [
      { id: "4", title: "A New Hope", description: "Episode IV", image: "/ep4.jpg" },
      { id: "5", title: "The Empire Strikes Back", description: "Episode V", image: "/ep5.jpg" },
    ],
    count: 2
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock console.log to avoid noise in tests
    jest.spyOn(console, 'log').mockImplementation();
    
    mockUseViewMode.mockReturnValue({
      viewMode: 'card',
      toggleViewMode: mockToggleViewMode,
      isHydrated: true,
    });

    mockUseDisclosure.mockReturnValue({
      isOpen: false,
      onOpen: mockOnOpen,
      onClose: jest.fn(),
      onOpenChange: mockOnOpenChange,
      isControlled: false,
      getButtonProps: jest.fn(),
      getDisclosureProps: jest.fn(),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Loading State", () => {
    it("should show loading spinner when data is loading", () => {
      mockUseEntityAllData.mockReturnValue(createMockSWRResponse(null, null, true));

      render(<EntityView entity="characters" />);
      
      expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("should show loading spinner when validating without existing data", () => {
      mockUseEntityAllData.mockReturnValue(createMockSWRResponse(null, null, false, true));

      render(<EntityView entity="characters" />);
      
      expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    });

    it("should not show loading spinner when validating with existing data", () => {
      mockUseEntityAllData.mockReturnValue(createMockSWRResponse(mockData, null, false, true));

      render(<EntityView entity="characters" />);
      
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
      expect(screen.getByTestId("cards-view")).toBeInTheDocument();
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

  describe("Modal Functionality", () => {
    it("should not render modal when isOpen is false", () => {
      mockUseEntityAllData.mockReturnValue(createMockSWRResponse(mockData, null, false));

      render(<EntityView entity="characters" />);
      
      expect(screen.queryByTestId("modal-entity-view")).not.toBeInTheDocument();
    });

    it("should render modal when isOpen is true", () => {
      mockUseEntityAllData.mockReturnValue(createMockSWRResponse(mockData, null, false));
      mockUseDisclosure.mockReturnValue({
        isOpen: true,
        onOpen: mockOnOpen,
        onClose: jest.fn(),
        onOpenChange: mockOnOpenChange,
        isControlled: false,
        getButtonProps: jest.fn(),
        getDisclosureProps: jest.fn(),
      });

      render(<EntityView entity="characters" />);
      
      expect(screen.getByTestId("modal-entity-view")).toBeInTheDocument();
      expect(screen.getByText("Modal for characters - ID: 0")).toBeInTheDocument();
    });

    it("should pass correct props to ModalEntityView", () => {
      mockUseEntityAllData.mockReturnValue(createMockSWRResponse(mockMovieData, null, false));
      mockUseDisclosure.mockReturnValue({
        isOpen: true,
        onOpen: mockOnOpen,
        onClose: jest.fn(),
        onOpenChange: mockOnOpenChange,
        isControlled: false,
        getButtonProps: jest.fn(),
        getDisclosureProps: jest.fn(),
      });

      render(<EntityView entity="movies" />);
      
      expect(screen.getByText("Modal for movies - ID: 0")).toBeInTheDocument();
    });
  });

  describe("Card and Table Interactions", () => {
    it("should handle card click and open modal in CardsView", () => {
      mockUseEntityAllData.mockReturnValue(createMockSWRResponse(mockData, null, false));

      render(<EntityView entity="characters" />);
      
      const cardButton = screen.getByTestId("card-item-0");
      fireEvent.click(cardButton);
      
      expect(mockOnOpen).toHaveBeenCalledTimes(1);
    });

    it("should handle table row click and open modal in TableView", () => {
      mockUseEntityAllData.mockReturnValue(createMockSWRResponse(mockData, null, false));
      mockUseViewMode.mockReturnValue({
        viewMode: 'table',
        toggleViewMode: mockToggleViewMode,
        isHydrated: true,
      });

      render(<EntityView entity="characters" />);
      
      const tableButton = screen.getByTestId("table-row-0");
      fireEvent.click(tableButton);
      
      expect(mockOnOpen).toHaveBeenCalledTimes(1);
    });

    it("should pass setSelectedId and onOpen to CardsView", () => {
      mockUseEntityAllData.mockReturnValue(createMockSWRResponse(mockData, null, false));

      render(<EntityView entity="characters" />);
      
      // Verify the props are passed by checking if click works
      expect(screen.getByText("Click Card Luke Skywalker")).toBeInTheDocument();
    });

    it("should pass setSelectedId and onOpen to TableView", () => {
      mockUseEntityAllData.mockReturnValue(createMockSWRResponse(mockData, null, false));
      mockUseViewMode.mockReturnValue({
        viewMode: 'table',
        toggleViewMode: mockToggleViewMode,
        isHydrated: true,
      });

      render(<EntityView entity="characters" />);
      
      // Verify the props are passed by checking if click works
      expect(screen.getByText("Click Row Luke Skywalker")).toBeInTheDocument();
    });
  });

  describe("Switch Button", () => {
    it("should not render switch button when not hydrated", () => {
      mockUseEntityAllData.mockReturnValue(createMockSWRResponse(mockData, null, false));
      mockUseViewMode.mockReturnValue({
        viewMode: 'card',
        toggleViewMode: mockToggleViewMode,
        isHydrated: false,
      });

      render(<EntityView entity="characters" />);
      
      expect(screen.queryByTestId("switch-button")).not.toBeInTheDocument();
    });

    it("should render switch button when hydrated", () => {
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

    it("should handle movies entity", () => {
      mockUseEntityAllData.mockReturnValue(createMockSWRResponse(mockMovieData, null, false));
      mockUseViewMode.mockReturnValue({
        viewMode: 'table',
        toggleViewMode: mockToggleViewMode,
        isHydrated: true,
      });

      render(<EntityView entity="movies" />);
      
      expect(screen.getByText("TableView for movies: 2 items")).toBeInTheDocument();
    });
  });

  describe("Hook Integration", () => {
    it("should call useEntityAllData with correct entity and page parameters", () => {
      mockUseEntityAllData.mockReturnValue(createMockSWRResponse(mockData, null, false));

      render(<EntityView entity="movies" />);
      
      expect(mockUseEntityAllData).toHaveBeenCalledWith("movies", 1);
    });

    it("should call useViewMode hook", () => {
      mockUseEntityAllData.mockReturnValue(createMockSWRResponse(mockData, null, false));

      render(<EntityView entity="characters" />);
      
      expect(mockUseViewMode).toHaveBeenCalled();
    });

    it("should call useDisclosure hook", () => {
      mockUseEntityAllData.mockReturnValue(createMockSWRResponse(mockData, null, false));

      render(<EntityView entity="characters" />);
      
      expect(mockUseDisclosure).toHaveBeenCalled();
    });
  });
});
