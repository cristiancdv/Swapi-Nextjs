import { fireEvent, render, screen } from '@testing-library/react'
import ErrorMessage from '@/components/ui/ErrorMessage'

describe("ErrorMessage", () => {
    it("should render the error message", () => {
        const onRetry = jest.fn();
        render(<ErrorMessage message="Error" title="Error in the request" onRetry={onRetry} />);
        expect(screen.getByText("Error in the request")).toBeInTheDocument();
        expect(screen.getByText("Error")).toBeInTheDocument();
        fireEvent.click(screen.getByText("Reintentar"));
        expect(onRetry).toHaveBeenCalledTimes(1);
    });
}); 