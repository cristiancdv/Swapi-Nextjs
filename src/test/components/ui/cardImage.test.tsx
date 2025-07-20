import { render, screen, waitFor } from '@testing-library/react'
import CardImage from '@/components/ui/CardImage'

jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ src, alt, width }: { src: string, alt: string, width: number }) => (
        <img src={src} alt={alt} width={width} />
    )
}))

// Mock the asset import
jest.mock("@/assets/characters/0.jpeg", () => ({
    __esModule: true,
    default: "test-image-url"
}))

describe("CardImage", () => {
it('should render the card image', async () => { 
    const {url, alt, width} = {url: 'characters/0.jpeg', alt: 'Test', width: 100}
    render(<CardImage url={url} alt={alt} width={width} />)
    
    // Wait for the async image loading to complete
    await waitFor(() => {
        const image = screen.getByRole("img", {name: alt})
        expect(image).toBeInTheDocument()
    })

    const image = screen.getByRole("img", {name: alt})
    expect(image).toHaveAttribute('src', 'test-image-url')
    expect(image).toHaveAttribute('width', width.toString())
})
})
