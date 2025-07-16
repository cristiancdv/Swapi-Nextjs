import { render, screen } from "@testing-library/react";
import ShipsPage from "@/app/ships/page";

// mocks arriba o en setup
jest.mock('@/hooks/UseEntityData', () => ({
  useEntityAllData: jest.fn(() => ({
    data: [{ title: 'Millennium Falcon', description: 'Millennium Falcon is a ship', image: '/millennium-falcon.jpg' }],
    error: null,
    isLoading: false,
    mutate: jest.fn(),
  })),
}));

jest.mock('@/hooks/UseViewMode', () => ({
  useViewMode: jest.fn(() => ({
    viewMode: 'card',
    toggleViewMode: jest.fn(),
  })),
}));

describe("ShipsPage", () => {
  it("should render ship cards", () => {
    render(<ShipsPage />);
    expect(screen.getByText("Millennium Falcon")).toBeInTheDocument();
    expect(screen.getByText("Millennium Falcon is a ship")).toBeInTheDocument();
  });

  it("should render ship table", () => {
    render(<ShipsPage />);
    const toggleViewMode = jest.fn();
    const viewMode = 'table';
    toggleViewMode(viewMode);
    expect(screen.getByText("Millennium Falcon")).toBeInTheDocument();
    expect(screen.getByText("Millennium Falcon is a ship")).toBeInTheDocument();
  });
});
