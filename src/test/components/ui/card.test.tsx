import { render, screen } from '@testing-library/react'
import Card from '@/components/ui/Card'

describe("Card", () => {
it("should render the card", () => {
    const {title,description,image} = {title: "Test", description: "Test description", image: "https://via.placeholder.com/150"}
    render(<Card title={title} description={description} image={image} />)

    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText(description)).toBeInTheDocument()
    expect(screen.getByAltText(title)).toBeInTheDocument()
})
})