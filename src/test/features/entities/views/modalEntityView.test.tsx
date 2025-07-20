import { render, screen } from "@testing-library/react"
import ModalEntityView from "@/features/entities/views/ModalEntityView"

// Mock all the dependencies
jest.mock("@/hooks/UseEntityData", () => ({
    useEntityOneData: jest.fn()
}))

jest.mock("@/utils/translateKeys", () => ({
    translateKeys: jest.fn()
}))

jest.mock("@/components/ui/ErrorMessage", () => {
    return function MockErrorMessage({ message, onRetry }: { message: string, onRetry: () => void }) {
        return (
            <div data-testid="error-message">
                <p>{message}</p>
                <button onClick={onRetry}>Retry</button>
            </div>
        )
    }
})

jest.mock("@/components/ui/LoadingSpinner", () => {
    return function MockLoadingSpinner() {
        return <div data-testid="loading-spinner">Loading...</div>
    }
})

jest.mock("@/components/ui/Modal", () => {
    return function MockModal({ title, isOpen, onOpenChange, children }: { 
        title: string, 
        isOpen: boolean, 
        onOpenChange: () => void, 
        children: React.ReactNode 
    }) {
        return isOpen ? (
            <div data-testid="modal" role="dialog">
                <h1 data-testid="modal-title">{title}</h1>
                <div data-testid="modal-content">{children}</div>
                <button onClick={onOpenChange} data-testid="close-button">Close</button>
            </div>
        ) : null
    }
})

jest.mock("@/components/ui/Card", () => {
    return function MockCard({ title, description, image }: { 
        title: string, 
        description: string[], 
        image: string 
    }) {
        return (
            <div data-testid="card">
                <h2 data-testid="card-title">{title}</h2>
                <div data-testid="card-description">
                    {description.map((desc, index) => (
                        <p key={index}>{desc}</p>
                    ))}
                </div>
                <img src={image} alt={title} data-testid="card-image" />
            </div>
        )
    }
})

import { useEntityOneData } from "@/hooks/UseEntityData"
import { translateKeys } from "@/utils/translateKeys"

const mockUseEntityOneData = useEntityOneData as jest.MockedFunction<typeof useEntityOneData>
const mockTranslateKeys = translateKeys as jest.MockedFunction<typeof translateKeys>

describe("ModalEntityView", () => {
    const mockOnOpenChange = jest.fn()

    beforeEach(() => {
        mockOnOpenChange.mockClear()
        mockUseEntityOneData.mockClear()
        mockTranslateKeys.mockClear()
    })

    it("should render loading state when data is loading", () => {
        mockUseEntityOneData.mockReturnValue({
            data: null,
            error: null,
            isValidating: false,
            isLoading: true,
            mutate: jest.fn()
        })

        render(
            <ModalEntityView 
                entity="characters" 
                selectedId={1} 
                isOpen={true} 
                onOpenChange={mockOnOpenChange} 
            />
        )

        expect(screen.getByTestId("modal")).toBeInTheDocument()
        expect(screen.getByTestId("loading-spinner")).toBeInTheDocument()
        expect(screen.queryByTestId("card")).not.toBeInTheDocument()
        expect(screen.queryByTestId("error-message")).not.toBeInTheDocument()
    })

    it("should render error state when there is an error", () => {
        const mockMutate = jest.fn()
        mockUseEntityOneData.mockReturnValue({
            data: null,
            error: new Error("API Error"),
            isValidating: false,
            isLoading: false,
            mutate: mockMutate
        })

        render(
            <ModalEntityView 
                entity="characters" 
                selectedId={1} 
                isOpen={true} 
                onOpenChange={mockOnOpenChange} 
            />
        )

        expect(screen.getByTestId("modal")).toBeInTheDocument()
        expect(screen.getByTestId("error-message")).toBeInTheDocument()
        expect(screen.getByText("Error al cargar datos")).toBeInTheDocument()
        expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument()
        expect(screen.queryByTestId("card")).not.toBeInTheDocument()
    })

    it("should render data when loaded successfully", () => {
        const mockData = {
            id: 1,
            title: "Luke Skywalker", // Card uses data.title directly
            name: "Luke Skywalker",  // Modal title uses data.title || data.name
            height: "172",
            mass: "77"
        }

        const mockTranslatedData = {
            "Nombre": "Luke Skywalker",
            "Altura": "172",
            "Peso": "77"
        }

        mockUseEntityOneData.mockReturnValue({
            data: mockData,
            error: null,
            isValidating: false,
            isLoading: false,
            mutate: jest.fn()
        })

        mockTranslateKeys.mockReturnValue(mockTranslatedData)

        render(
            <ModalEntityView 
                entity="characters" 
                selectedId={1} 
                isOpen={true} 
                onOpenChange={mockOnOpenChange} 
            />
        )

        expect(screen.getByTestId("modal")).toBeInTheDocument()
        expect(screen.getByTestId("modal-title")).toHaveTextContent("Luke Skywalker")
        expect(screen.getByTestId("card")).toBeInTheDocument()
        expect(screen.getByTestId("card-title")).toHaveTextContent("Luke Skywalker")
        expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument()
        expect(screen.queryByTestId("error-message")).not.toBeInTheDocument()
        
        // Verify translateKeys was called
        expect(mockTranslateKeys).toHaveBeenCalledWith("characters", mockData)
    })

    it("should not render modal when isOpen is false", () => {
        mockUseEntityOneData.mockReturnValue({
            data: null,
            error: null,
            isValidating: false,
            isLoading: false,
            mutate: jest.fn()
        })

        render(
            <ModalEntityView 
                entity="characters" 
                selectedId={1} 
                isOpen={false} 
                onOpenChange={mockOnOpenChange} 
            />
        )

        expect(screen.queryByTestId("modal")).not.toBeInTheDocument()
    })

    it("should handle data with title instead of name", () => {
        const mockData = {
            id: 1,
            title: "A New Hope",
            director: "George Lucas"
        }

        const mockTranslatedData = {
            "Título": "A New Hope",
            "Director": "George Lucas"
        }

        mockUseEntityOneData.mockReturnValue({
            data: mockData,
            error: null,
            isValidating: false,
            isLoading: false,
            mutate: jest.fn()
        })

        mockTranslateKeys.mockReturnValue(mockTranslatedData)

        render(
            <ModalEntityView 
                entity="movies" 
                selectedId={1} 
                isOpen={true} 
                onOpenChange={mockOnOpenChange} 
            />
        )

        expect(screen.getByTestId("modal-title")).toHaveTextContent("A New Hope")
        expect(screen.getByTestId("card-title")).toHaveTextContent("A New Hope")
    })
})