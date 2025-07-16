import { render, screen } from "@testing-library/react";
import TableView from "@/features/entities/views/TableView";

describe("TableView", () => {
    it("should render the table view", () => {
        const data = [
            {
                title: "Luke Skywalker",
                description: "Luke Skywalker is a character in the Star Wars franchise.",
                image: "https://via.placeholder.com/150",
            },
            {
                title: "Darth Vader",
                description: "Darth Vader is a character in the Star Wars franchise.",
                image: "https://via.placeholder.com/151",
            },
            {
                title: "Leia Organa",
                description: "Leia Organa is a character in the Star Wars franchise.",
                image: "https://via.placeholder.com/152",
            },
            {
                title: "Han Solo",
                description: "Han Solo is a character in the Star Wars franchise.",
                image: "https://via.placeholder.com/153",
            },
        ]
        render(<TableView data={data} entity="characters" />);
        expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
        expect(screen.getByText("Darth Vader")).toBeInTheDocument();
        expect(screen.getByText("Leia Organa")).toBeInTheDocument();
        expect(screen.getByText("Han Solo")).toBeInTheDocument();
        expect(screen.getByText("Luke Skywalker is a character in the Star Wars franchise.")).toBeInTheDocument();
        expect(screen.getByText("Darth Vader is a character in the Star Wars franchise.")).toBeInTheDocument();
        expect(screen.getByText("Leia Organa is a character in the Star Wars franchise.")).toBeInTheDocument();
        expect(screen.getByText("Han Solo is a character in the Star Wars franchise.")).toBeInTheDocument();
        });
});