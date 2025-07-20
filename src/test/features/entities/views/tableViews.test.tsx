import { render, screen } from "@testing-library/react";
import TableView from "@/features/entities/views/TableView";

describe("TableView", () => {
    it("should render the table view", () => {
        const data = [
            {
                id: "1",
                name: "Luke Skywalker",
                description: "Altura: 172\nPeso: 77\nColor de pelo: blond\nColor de ojos: blue",
                image: "https://via.placeholder.com/150",
            },
            {
                id: "2",
                name: "Darth Vader",
                description: "Altura: 202\nPeso: 136\nColor de pelo: none\nColor de ojos: yellow",
                image: "https://via.placeholder.com/151",
            },
            {
                id: "3",
                name: "Leia Organa",
                description: "Altura: 150\nPeso: 49\nColor de pelo: brown\nColor de ojos: brown",
                image: "https://via.placeholder.com/152",
            },
            {
                id: "4",
                name: "Han Solo",
                description: "Altura: 180\nPeso: 80\nColor de pelo: brown\nColor de ojos: brown",
                image: "https://via.placeholder.com/153",
            },
        ]
        render(<TableView data={data} entity="characters" />);
        
        // Test that names are displayed
        expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
        expect(screen.getByText("Darth Vader")).toBeInTheDocument();
        expect(screen.getByText("Leia Organa")).toBeInTheDocument();
        expect(screen.getByText("Han Solo")).toBeInTheDocument();
        
        // Test that parsed data is displayed
        expect(screen.getByText("172")).toBeInTheDocument();
        expect(screen.getByText("202")).toBeInTheDocument();
        expect(screen.getByText("150")).toBeInTheDocument();
        expect(screen.getByText("180")).toBeInTheDocument();
        
        // Test column headers
        expect(screen.getByText("ID")).toBeInTheDocument();
        expect(screen.getByText("NOMBRE")).toBeInTheDocument();
        expect(screen.getByText("ALTURA")).toBeInTheDocument();
        expect(screen.getByText("PESO")).toBeInTheDocument();
        });
});