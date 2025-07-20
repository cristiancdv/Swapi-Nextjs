import { render, screen } from '@testing-library/react'
import Table from '@/components/ui/Table'


describe("Table", () => {
    it("should render the table", () => {
        const data = [
            { 
                id: '1',
                name: 'Luke Skywalker', 
                description: 'Altura: 172\nPeso: 77\nColor de pelo: blond\nColor de ojos: blue',
                image: 'luke.jpg'
            },
            { 
                id: '2',
                name: 'Darth Vader', 
                description: 'Altura: 202\nPeso: 136\nColor de pelo: none\nColor de ojos: yellow',
                image: 'vader.jpg'
            },
        ];
        const entity = "characters";
        render(<Table data={data} entity={entity} />);
        
        // Test that names are displayed
        expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
        expect(screen.getByText("Darth Vader")).toBeInTheDocument();
        
        // Test that parsed data is displayed
        expect(screen.getByText("172")).toBeInTheDocument();
        expect(screen.getByText("77")).toBeInTheDocument();
        expect(screen.getByText("blond")).toBeInTheDocument();
        expect(screen.getByText("blue")).toBeInTheDocument();
        
        // Test column headers
        expect(screen.getByText("ID")).toBeInTheDocument();
        expect(screen.getByText("NOMBRE")).toBeInTheDocument();
        expect(screen.getByText("ALTURA")).toBeInTheDocument();
        expect(screen.getByText("PESO")).toBeInTheDocument();
    });
});
