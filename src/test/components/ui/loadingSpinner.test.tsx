import { render, screen } from '@testing-library/react'
import LoadingSpinner from '@/components/ui/LoadingSpinner'


describe("LoadingSpinner", () => {
    it("should render the loading spinner", () => {
        render(<LoadingSpinner />);
        expect(screen.getByRole("img", {name: "Cargando…"})).toBeInTheDocument();
    });
});