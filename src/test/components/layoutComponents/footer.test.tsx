import { render, screen } from "@testing-library/react";
import Footer from "@/components/layoutComponent/Footer";

describe('Footer', () => {
  it('should render the footer', () => {
    render(<Footer />);
    expect(screen.getByText('Todos los derechos reservados 2025')).toBeInTheDocument();
  });
});
