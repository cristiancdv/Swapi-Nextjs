import { render, screen, fireEvent } from "@testing-library/react";
import SwitchButton from "@/components/ui/SwitchButton";
import { useSwitch } from "@heroui/react";


jest.mock("@/assets/icons/CardIcon", () => {
  const CardIcon = () => <div data-testid="card-icon" />;
  CardIcon.displayName = "CardIcon";
  return CardIcon;
});
jest.mock("@/assets/icons/ListIcon", () => {
  const ListIcon = () => <div data-testid="list-icon" />;
  ListIcon.displayName = "ListIcon";
  return ListIcon;
});

jest.mock("@heroui/react", () => ({
    useSwitch: jest.fn(),
    VisuallyHidden: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe("SwitchButton", () => {
  beforeEach(() => {
    (useSwitch as jest.Mock).mockClear();
  });

  it("should show the correct icon according to viewMode", () => {
    const toggleMock = jest.fn();
    
    (useSwitch as jest.Mock).mockReturnValue({
      Component: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
      slots: { wrapper: jest.fn().mockReturnValue("") },
      isSelected: true,
      getBaseProps: jest.fn().mockReturnValue({}),
      getInputProps: jest.fn().mockReturnValue({}),
      getWrapperProps: jest.fn().mockReturnValue({}),
    });

    const { rerender } = render(<SwitchButton viewMode="card" toggleViewMode={toggleMock} />);
    expect(screen.getByTestId("list-icon")).toBeInTheDocument();

    (useSwitch as jest.Mock).mockReturnValue({
      Component: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
      slots: { wrapper: jest.fn().mockReturnValue("") },
      isSelected: false,
      getBaseProps: jest.fn().mockReturnValue({}),
      getInputProps: jest.fn().mockReturnValue({}),
      getWrapperProps: jest.fn().mockReturnValue({}),
    });

    rerender(<SwitchButton viewMode="list" toggleViewMode={toggleMock} />);
    expect(screen.getByTestId("card-icon")).toBeInTheDocument();
  });

  it("should call toggleViewMode when clicking", () => {
    const toggleMock = jest.fn();
    
    (useSwitch as jest.Mock).mockReturnValue({
      Component: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
      slots: { wrapper: jest.fn().mockReturnValue("") },
      isSelected: false,
      getBaseProps: jest.fn().mockReturnValue({}),
      getInputProps: jest.fn().mockReturnValue({ 
        role: "switch", 
        type: "checkbox",
        onClick: toggleMock 
      }),
      getWrapperProps: jest.fn().mockReturnValue({}),
    });

    render(<SwitchButton viewMode="card" toggleViewMode={toggleMock} />);

    const button = screen.getByRole("switch");
    fireEvent.click(button);

    expect(toggleMock).toHaveBeenCalledTimes(1);
  });
});
