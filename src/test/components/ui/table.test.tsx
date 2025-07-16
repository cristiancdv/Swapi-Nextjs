import { render, screen } from '@testing-library/react'
import Table from '@/components/ui/Table'


describe("Table", () => {
    it("should render the table", () => {
        const data = [
            { title: 'Luke Skywalker', description: 'Jedi' },
            { title: 'Darth Vader', description: 'Sith' },
        ];
        const entity = "characters";
        render(<Table data={data} entity={entity} />);
        expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
        expect(screen.getByText("Jedi")).toBeInTheDocument();
        expect(screen.getByText("Darth Vader")).toBeInTheDocument();
        expect(screen.getByText("Sith")).toBeInTheDocument();
    });
});
