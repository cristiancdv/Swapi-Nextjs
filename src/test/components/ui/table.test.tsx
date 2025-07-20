import { render, screen, fireEvent } from '@testing-library/react'
import Table from '@/components/ui/Table'

// Mock HeroUI components
jest.mock("@heroui/react", () => ({
    TableBody: ({ children }: { children: React.ReactNode }) => <tbody data-testid="table-body">{children}</tbody>,
    TableCell: ({ children, className }: { children: React.ReactNode; className?: string }) => (
        <td className={className} data-testid="table-cell">{children}</td>
    ),
    TableColumn: ({ children }: { children: React.ReactNode }) => <div data-testid="table-column">{children}</div>,
    Table: ({ children, className }: { children: React.ReactNode; className?: string }) => (
        <div className={className} data-testid="table">{children}</div>
    ),
    TableHeader: ({ children }: { children: React.ReactNode }) => <div data-testid="table-header">{children}</div>,
    TableRow: ({ children, className, onClick }: { 
        children: React.ReactNode; 
        className?: string; 
        onClick?: () => void 
    }) => (
        <div className={className} onClick={onClick} data-testid="table-row">{children}</div>
    )
}))

describe("Table", () => {
    const mockSetSelectedId = jest.fn()
    const mockOnOpen = jest.fn()

    const mockCharactersData = [
        { 
            id: '1',
            name: 'Luke Skywalker', 
            description: 'Altura: 172\nPeso: 77\nColor de pelo: blond\nColor de ojos: blue',
            image: 'luke.jpg'
        },
        { 
            id: '2',
            name: 'Darth Vader', 
            description: 'Altura: 202\nPeso: 136\nColor de pelo: none\nColor de ojos: yellow',
            image: 'vader.jpg'
        },
    ]

    const mockMoviesData = [
        {
            id: '1',
            title: 'A New Hope',
            description: 'Episodio: IV\nDirector: George Lucas\nProductor: Gary Kurtz',
            image: 'episode4.jpg'
        }
    ]

    beforeEach(() => {
        mockSetSelectedId.mockClear()
        mockOnOpen.mockClear()
    })

    it("should render table with character data", () => {
        render(
            <Table 
                data={mockCharactersData} 
                entity="characters" 
                setSelectedId={mockSetSelectedId}
                onOpen={mockOnOpen}
            />
        )
        
        // Test that table structure is rendered
        expect(screen.getByTestId("table")).toBeInTheDocument()
        expect(screen.getByTestId("table-header")).toBeInTheDocument()
        expect(screen.getByTestId("table-body")).toBeInTheDocument()
        
        // Test that names are displayed
        expect(screen.getByText("Luke Skywalker")).toBeInTheDocument()
        expect(screen.getByText("Darth Vader")).toBeInTheDocument()
        
        // Test that parsed description data is displayed
        expect(screen.getByText("172")).toBeInTheDocument()
        expect(screen.getByText("77")).toBeInTheDocument()
        expect(screen.getByText("blond")).toBeInTheDocument()
        expect(screen.getByText("blue")).toBeInTheDocument()
    })

    it("should render table headers correctly for characters", () => {
        render(
            <Table 
                data={mockCharactersData} 
                entity="characters" 
                setSelectedId={mockSetSelectedId}
                onOpen={mockOnOpen}
            />
        )
        
        // Test column headers
        expect(screen.getByText("ID")).toBeInTheDocument()
        expect(screen.getByText("NOMBRE")).toBeInTheDocument()
        expect(screen.getByText("ALTURA")).toBeInTheDocument()
        expect(screen.getByText("PESO")).toBeInTheDocument()
        expect(screen.getByText("COLOR DE PELO")).toBeInTheDocument()
        expect(screen.getByText("COLOR DE OJOS")).toBeInTheDocument()
    })

    it("should handle movies data correctly", () => {
        render(
            <Table 
                data={mockMoviesData} 
                entity="movies" 
                setSelectedId={mockSetSelectedId}
                onOpen={mockOnOpen}
            />
        )
        
        // For movies, should use title instead of name
        expect(screen.getByText("A New Hope")).toBeInTheDocument()
        expect(screen.getByText("IV")).toBeInTheDocument()
        expect(screen.getByText("George Lucas")).toBeInTheDocument()
        expect(screen.getByText("Gary Kurtz")).toBeInTheDocument()
    })

    it("should call setSelectedId and onOpen when row is clicked", () => {
        render(
            <Table 
                data={mockCharactersData} 
                entity="characters" 
                setSelectedId={mockSetSelectedId}
                onOpen={mockOnOpen}
            />
        )
        
        // Find first row and click it
        const tableRows = screen.getAllByTestId("table-row")
        fireEvent.click(tableRows[0])
        
        // Verify functions were called
        expect(mockSetSelectedId).toHaveBeenCalledWith(1)
        expect(mockOnOpen).toHaveBeenCalledTimes(1)
    })

    it("should handle empty data gracefully", () => {
        render(
            <Table 
                data={[]} 
                entity="characters" 
                setSelectedId={mockSetSelectedId}
                onOpen={mockOnOpen}
            />
        )
        
        expect(screen.getByTestId("table")).toBeInTheDocument()
        expect(screen.getByTestId("table-header")).toBeInTheDocument()
        expect(screen.getByTestId("table-body")).toBeInTheDocument()
    })

    it("should filter out items without name or title", () => {
        const dataWithEmptyItems = [
            ...mockCharactersData,
            { 
                id: '3', 
                description: 'Some description',
                image: 'test.jpg'
                // No name or title - should be filtered out
            }
        ]
        
        render(
            <Table 
                data={dataWithEmptyItems} 
                entity="characters" 
                setSelectedId={mockSetSelectedId}
                onOpen={mockOnOpen}
            />
        )
        
        // Should only render 2 rows (the valid ones)
        const tableRows = screen.getAllByTestId("table-row")
        expect(tableRows).toHaveLength(2)
    })

    it("should handle malformed description gracefully", () => {
        const dataWithMalformedDescription = [
            { 
                id: '1',
                name: 'Test Character', 
                description: 'This is not properly formatted\nNo colons here\nRandom text',
                image: 'test.jpg'
            }
        ]
        
        render(
            <Table 
                data={dataWithMalformedDescription} 
                entity="characters" 
                setSelectedId={mockSetSelectedId}
                onOpen={mockOnOpen}
            />
        )
        
        expect(screen.getByText("Test Character")).toBeInTheDocument()
        // Should not crash with malformed description
    })
})
