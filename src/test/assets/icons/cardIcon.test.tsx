import { render, screen } from "@testing-library/react";
import CardIcon from "@/assets/icons/CardIcon";

describe("CardIcon", () => {
    it("should render the CardIcon component", () => {
        render(<CardIcon />);
        expect(screen.getByTestId("card-icon")).toBeInTheDocument();
    });
});

