import { render, screen } from "@testing-library/react"
import Modal from "@/components/ui/Modal"

interface MockProps {
    children: React.ReactNode;
    [key: string]: unknown;
}

interface MockModalContentProps {
    children: React.ReactNode | ((onClose: () => void) => React.ReactNode);
    [key: string]: unknown;
}

interface MockModalProps extends MockProps {
    isOpen: boolean;
}

interface MockButtonProps extends MockProps {
    onPress?: () => void;
}

// Mock HeroUI components
jest.mock("@heroui/react", () => ({
    Modal: ({ children, isOpen, className, ...props }: MockModalProps & { className?: string }) => 
        isOpen ? <div role="dialog" data-testid="modal" className={className} {...props}>{children}</div> : null,
    ModalContent: ({ children }: MockModalContentProps) => {
        // Simulate HeroUI ModalContent behavior where children is a function
        const mockOnClose = jest.fn()
        const content = typeof children === 'function' ? children(mockOnClose) : children
        return <div data-testid="modal-content">{content}</div>
    },
    ModalHeader: ({ children }: MockProps) => <div data-testid="modal-header">{children}</div>,
    ModalBody: ({ children }: MockProps) => <div data-testid="modal-body">{children}</div>,
    ModalFooter: ({ children }: MockProps) => <div data-testid="modal-footer">{children}</div>,
    Button: ({ children, onPress, ...props }: MockButtonProps) => (
        <button onClick={onPress} {...props}>{children}</button>
    )
}))

describe("Modal", () => {
    const mockOnOpenChange = jest.fn()

    beforeEach(() => {
        mockOnOpenChange.mockClear()
    })

    it("should render the modal when isOpen is true", () => {
        render(
            <Modal 
                isOpen={true} 
                onOpenChange={mockOnOpenChange}
                title="Test Modal"
            >
                <p>Modal content</p>
            </Modal>
        )
        
        const modal = screen.getByRole("dialog")
        expect(modal).toBeInTheDocument()
        
        expect(screen.getByText("Test Modal")).toBeInTheDocument()
        expect(screen.getByText("Modal content")).toBeInTheDocument()
        expect(screen.getByText("Close")).toBeInTheDocument()
    })

    it("should not render the modal when isOpen is false", () => {
        render(
            <Modal 
                isOpen={false} 
                onOpenChange={mockOnOpenChange}
                title="Test Modal"
            >
                <p>Modal content</p>
            </Modal>
        )
        
        const modal = screen.queryByRole("dialog")
        expect(modal).not.toBeInTheDocument()
    })
})