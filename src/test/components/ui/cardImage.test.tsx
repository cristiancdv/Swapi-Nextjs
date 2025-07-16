import { render, screen } from '@testing-library/react'
import CardImage from '@/components/ui/CardImage'

jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ src, alt, width, height }: { src: string, alt: string, width: number, height: number }) => (
        <img src={src} alt={alt} width={width} height={height} />
    )
}))

describe("CardImage", () => {
it('should render the card image', () => { 
    const {src, alt, width, height} = {src: 'https://via.placeholder.com/150', alt: 'Test', width: 100, height: 100}
    render(<CardImage url={src} alt={alt} width={width} height={height} />)
    const image = screen.getByRole("img", {name: alt})
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', src)
    expect(image).toHaveAttribute('width', width.toString())
    expect(image).toHaveAttribute('height', height.toString())
})
})
