import { render, screen } from "@testing-library/react";
import ListIcon from "@/assets/icons/ListIcon";

describe("ListIcon", () => {
    it("should render the ListIcon component", () => {
        render(<ListIcon />);
        expect(screen.getByTestId("list-icon")).toBeInTheDocument();
    });
});

