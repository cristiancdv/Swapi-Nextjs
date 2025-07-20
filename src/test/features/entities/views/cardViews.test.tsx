import { render, screen, fireEvent } from "@testing-library/react";
import CardsView from "@/features/entities/views/CardsView";

// Mock Card component
jest.mock("@/components/ui/Card", () => {
    return function MockCard({ title, description }: { title: string; description: string[] }) {
        return (
            <div data-testid="card">
                <h2 data-testid="card-title">{title}</h2>
                <div data-testid="card-description">
                    {description.map((desc, index) => (
                        <p key={index} data-testid="card-desc-line">{desc}</p>
                    ))}
                </div>
            </div>
        );
    };
});

describe("CardsView", () => {
    const mockSetSelectedId = jest.fn();
    const mockOnOpen = jest.fn();

    const mockCharactersData = [
        {
            id: "1",
            name: "Luke Skywalker",
            description: "Height: 172cm\nMass: 77kg\nHair color: blond",
        },
        {
            id: "2",
            name: "Darth Vader", 
            description: "Height: 202cm\nMass: 136kg\nHair color: none",
        },
        {
            id: "3",
            name: "Leia Organa",
            description: "Height: 150cm\nMass: 49kg\nHair color: brown",
        },
    ];

    const mockMoviesData = [
        {
            id: "4",
            title: "A New Hope",
            description: "Episode: IV\nDirector: George Lucas\nProducer: Gary Kurtz",
        },
        {
            id: "5", 
            title: "The Empire Strikes Back",
            description: "Episode: V\nDirector: Irvin Kershner\nProducer: Gary Kurtz",
        },
    ];

    beforeEach(() => {
        mockSetSelectedId.mockClear();
        mockOnOpen.mockClear();
    });

    it("should render cards with character data", () => {
        render(
            <CardsView 
                data={mockCharactersData} 
                setSelectedId={mockSetSelectedId}
                onOpen={mockOnOpen}
            />
        );

        // Check that character names are displayed
        expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
        expect(screen.getByText("Darth Vader")).toBeInTheDocument();
        expect(screen.getByText("Leia Organa")).toBeInTheDocument();

        // Check that all cards are rendered
        const cards = screen.getAllByTestId("card");
        expect(cards).toHaveLength(3);
    });

    it("should render cards with movie data using titles", () => {
        render(
            <CardsView 
                data={mockMoviesData} 
                setSelectedId={mockSetSelectedId}
                onOpen={mockOnOpen}
            />
        );

        // Check that movie titles are displayed
        expect(screen.getByText("A New Hope")).toBeInTheDocument();
        expect(screen.getByText("The Empire Strikes Back")).toBeInTheDocument();

        const cards = screen.getAllByTestId("card");
        expect(cards).toHaveLength(2);
    });

    it("should split descriptions into multiple lines", () => {
        render(
            <CardsView 
                data={[mockCharactersData[0]]} 
                setSelectedId={mockSetSelectedId}
                onOpen={mockOnOpen}
            />
        );

        // Check that description is split by newlines
        expect(screen.getByText("Height: 172cm")).toBeInTheDocument();
        expect(screen.getByText("Mass: 77kg")).toBeInTheDocument();
        expect(screen.getByText("Hair color: blond")).toBeInTheDocument();

        // Should have 3 description lines
        const descLines = screen.getAllByTestId("card-desc-line");
        expect(descLines).toHaveLength(3);
    });

    it("should call setSelectedId and onOpen when card is clicked", () => {
        render(
            <CardsView 
                data={mockCharactersData} 
                setSelectedId={mockSetSelectedId}
                onOpen={mockOnOpen}
            />
        );

        // Find the first card container (div with click handler)
        const cardContainers = screen.getAllByRole("generic").filter(el => 
            el.className.includes("bg-gray-800")
        );
        
        // Click on the first card
        fireEvent.click(cardContainers[0]);

        // Verify callbacks were called
        expect(mockSetSelectedId).toHaveBeenCalledWith(1);
        expect(mockOnOpen).toHaveBeenCalledTimes(1);
    });

    it("should handle clicks on different cards correctly", () => {
        render(
            <CardsView 
                data={mockCharactersData} 
                setSelectedId={mockSetSelectedId}
                onOpen={mockOnOpen}
            />
        );

        const cardContainers = screen.getAllByRole("generic").filter(el => 
            el.className.includes("bg-gray-800")
        );

        // Click on second card
        fireEvent.click(cardContainers[1]);
        expect(mockSetSelectedId).toHaveBeenCalledWith(2);

        // Click on third card
        fireEvent.click(cardContainers[2]);
        expect(mockSetSelectedId).toHaveBeenCalledWith(3);

        expect(mockOnOpen).toHaveBeenCalledTimes(2);
    });

    it("should handle empty data gracefully", () => {
        render(
            <CardsView 
                data={[]} 
                setSelectedId={mockSetSelectedId}
                onOpen={mockOnOpen}
            />
        );

        // Should render grid but no cards
        const cards = screen.queryAllByTestId("card");
        expect(cards).toHaveLength(0);
    });

    it("should handle data without name or title by showing empty title", () => {
        const dataWithoutNameOrTitle = [
            {
                id: "1",
                description: "Some description without name or title",
            }
        ];

        render(
            <CardsView 
                data={dataWithoutNameOrTitle} 
                setSelectedId={mockSetSelectedId}
                onOpen={mockOnOpen}
            />
        );

        const card = screen.getByTestId("card");
        expect(card).toBeInTheDocument();
        
        // Title should be empty string when no name or title
        const cardTitle = screen.getByTestId("card-title");
        expect(cardTitle).toHaveTextContent("");
    });

    it("should prefer title over name when both are present", () => {
        const dataWithBothTitleAndName = [
            {
                id: "1",
                name: "Character Name",
                title: "Character Title",
                description: "Some description",
            }
        ];

        render(
            <CardsView 
                data={dataWithBothTitleAndName} 
                setSelectedId={mockSetSelectedId}
                onOpen={mockOnOpen}
            />
        );

        // Should display title, not name
        expect(screen.getByText("Character Title")).toBeInTheDocument();
        expect(screen.queryByText("Character Name")).not.toBeInTheDocument();
    });

    it("should not call callbacks when setSelectedId or onOpen are undefined", () => {
        const mockUndefinedSetSelectedId = undefined as unknown as (id: number) => void;
        const mockUndefinedOnOpen = undefined as unknown as () => void;
        
        render(
            <CardsView 
                data={[mockCharactersData[0]]} 
                setSelectedId={mockUndefinedSetSelectedId}
                onOpen={mockUndefinedOnOpen}
            />
        );

        const cardContainers = screen.getAllByRole("generic").filter(el => 
            el.className.includes("bg-gray-800")
        );

        // Click should not cause errors (the component has a guard clause)
        expect(() => fireEvent.click(cardContainers[0])).not.toThrow();
    });
});