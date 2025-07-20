import { render, screen } from "@testing-library/react";
import CardsView from "@/features/entities/views/CardsView";

describe("CardViews", () => {
    it("should render the card views", () => {
        const data = [
            {
                id: "1",
                title: "Luke Skywalker",
                description: "Luke Skywalker is a character in the Star Wars franchise.",
                image: "https://via.placeholder.com/150",
            },
            {
                id: "2",
                title: "Darth Vader",
                description: "Darth Vader is a character in the Star Wars franchise.",
                image: "https://via.placeholder.com/151",
            },
            {
                id: "3",
                title: "Leia Organa",
                description: "Leia Organa is a character in the Star Wars franchise.",
                image: "https://via.placeholder.com/152",
            },
            {
                id: "4",
                title: "Han Solo",
                description: "Han Solo is a character in the Star Wars franchise.",
                image: "https://via.placeholder.com/153",
            },
        ]
        render(<CardsView data={data} entity="characters" />);
        expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
        expect(screen.getByText("Darth Vader")).toBeInTheDocument();
        expect(screen.getByText("Leia Organa")).toBeInTheDocument();
        expect(screen.getByText("Han Solo")).toBeInTheDocument();
        expect(screen.getByText("Luke Skywalker is a character in the Star Wars franchise.")).toBeInTheDocument();
        expect(screen.getByText("Darth Vader is a character in the Star Wars franchise.")).toBeInTheDocument();
        expect(screen.getByText("Leia Organa is a character in the Star Wars franchise.")).toBeInTheDocument();
        expect(screen.getByText("Han Solo is a character in the Star Wars franchise.")).toBeInTheDocument();
        // Images are commented out in Card component
        // expect(screen.getByAltText("Luke Skywalker")).toBeInTheDocument();
        // expect(screen.getByAltText("Darth Vader")).toBeInTheDocument();
        // expect(screen.getByAltText("Leia Organa")).toBeInTheDocument();
        // expect(screen.getByAltText("Han Solo")).toBeInTheDocument();

    });
});