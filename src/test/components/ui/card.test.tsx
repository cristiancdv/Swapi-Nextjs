import { render, screen } from '@testing-library/react'
import Card from '@/components/ui/Card'

// Mock CardImage component
jest.mock('@/components/ui/CardImage', () => {
    return function MockCardImage({ url, alt, width }: { url: string; alt: string; width: number }) {
        return <img src={url} alt={alt} width={width} data-testid="card-image" />
    }
})

describe("Card", () => {
    it("should render card with title and description", () => {
        const title = "Luke Skywalker"
        const description = ["Height: 172cm", "Mass: 77kg"]
        
        render(<Card title={title} description={description} />)

        expect(screen.getByText(title)).toBeInTheDocument()
        expect(screen.getByText("Height: 172cm")).toBeInTheDocument()
        expect(screen.getByText("Mass: 77kg")).toBeInTheDocument()
    })

    it("should render card with image when image prop is provided", () => {
        const title = "Luke Skywalker"
        const description = ["Height: 172cm"]
        const image = "characters/0.jpeg"
        
        render(<Card title={title} description={description} image={image} />)

        expect(screen.getByText(title)).toBeInTheDocument()
        expect(screen.getByText("Height: 172cm")).toBeInTheDocument()
        
        const cardImage = screen.getByTestId("card-image")
        expect(cardImage).toBeInTheDocument()
        expect(cardImage).toHaveAttribute("src", image)
        expect(cardImage).toHaveAttribute("alt", "Luke Skywalker image")
        expect(cardImage).toHaveAttribute("width", "100")
    })

    it("should not render image when image prop is not provided", () => {
        const title = "Luke Skywalker"
        const description = ["Height: 172cm"]
        
        render(<Card title={title} description={description} />)

        expect(screen.getByText(title)).toBeInTheDocument()
        expect(screen.queryByTestId("card-image")).not.toBeInTheDocument()
    })

    it("should render multiple description lines correctly", () => {
        const title = "A New Hope"
        const description = [
            "Episode: IV",
            "Director: George Lucas", 
            "Release date: 1977-05-25",
            "Opening crawl: It is a period of civil war..."
        ]
        
        render(<Card title={title} description={description} />)

        expect(screen.getByText(title)).toBeInTheDocument()
        description.forEach(line => {
            expect(screen.getByText(line)).toBeInTheDocument()
        })
    })

    it("should handle empty description array", () => {
        const title = "Test Title"
        const description: string[] = []
        
        render(<Card title={title} description={description} />)

        expect(screen.getByText(title)).toBeInTheDocument()
        // Should not crash with empty description
    })
})