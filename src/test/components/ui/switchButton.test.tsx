import { render, screen } from '@testing-library/react';
import SwitchButton from '@/components/ui/SwitchButton';
import { useSwitch } from '@heroui/react';

// Mock the useSwitch hook
jest.mock('@heroui/react', () => ({
  useSwitch: jest.fn(),
  VisuallyHidden: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock the icon components
jest.mock('@/assets/icons/CardIcon', () => {
  return function CardIcon() {
    return <div data-testid="card-icon" />;
  };
});

jest.mock('@/assets/icons/ListIcon', () => {
  return function ListIcon() {
    return <div data-testid="list-icon" />;
  };
});

describe('SwitchButton', () => {
  const toggleMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component', () => {
    (useSwitch as jest.Mock).mockReturnValue({
      Component: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
      slots: { wrapper: jest.fn().mockReturnValue("") },
      getBaseProps: jest.fn().mockReturnValue({}),
      getInputProps: jest.fn().mockReturnValue({}),
      getWrapperProps: jest.fn().mockReturnValue({}),
    });

    render(<SwitchButton viewMode="card" toggleViewMode={toggleMock} />);
    expect(screen.getByTestId("card-icon")).toBeInTheDocument();
  });

  it('should show the correct icon according to viewMode', () => {
    (useSwitch as jest.Mock).mockReturnValue({
      Component: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
      slots: { wrapper: jest.fn().mockReturnValue("") },
      getBaseProps: jest.fn().mockReturnValue({}),
      getInputProps: jest.fn().mockReturnValue({}),
      getWrapperProps: jest.fn().mockReturnValue({}),
    });

    // When viewMode is 'card', it should show CardIcon
    const { rerender } = render(<SwitchButton viewMode="card" toggleViewMode={toggleMock} />);
    expect(screen.getByTestId("card-icon")).toBeInTheDocument();

    // When viewMode is 'table', it should show ListIcon
    rerender(<SwitchButton viewMode="table" toggleViewMode={toggleMock} />);
    expect(screen.getByTestId("list-icon")).toBeInTheDocument();
  });

  it('should call toggleViewMode when clicked', () => {
    const mockOnValueChange = jest.fn();
    (useSwitch as jest.Mock).mockReturnValue({
      Component: ({ children }: { children: React.ReactNode }) => <div onClick={mockOnValueChange}>{children}</div>,
      slots: { wrapper: jest.fn().mockReturnValue("") },
      getBaseProps: jest.fn().mockReturnValue({}),
      getInputProps: jest.fn().mockReturnValue({}),
      getWrapperProps: jest.fn().mockReturnValue({}),
    });

    render(<SwitchButton viewMode="card" toggleViewMode={toggleMock} />);
    
    // The useSwitch should be called with the correct parameters
    expect(useSwitch).toHaveBeenCalledWith({
      isSelected: true, // viewMode === 'card'
      onValueChange: toggleMock,
    });
  });

  it('should set isSelected correctly based on viewMode', () => {
    (useSwitch as jest.Mock).mockReturnValue({
      Component: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
      slots: { wrapper: jest.fn().mockReturnValue("") },
      getBaseProps: jest.fn().mockReturnValue({}),
      getInputProps: jest.fn().mockReturnValue({}),
      getWrapperProps: jest.fn().mockReturnValue({}),
    });

    // Test with viewMode 'card'
    render(<SwitchButton viewMode="card" toggleViewMode={toggleMock} />);
    expect(useSwitch).toHaveBeenCalledWith({
      isSelected: true, // viewMode === 'card'
      onValueChange: toggleMock,
    });

    // Test with viewMode 'table'
    render(<SwitchButton viewMode="table" toggleViewMode={toggleMock} />);
    expect(useSwitch).toHaveBeenCalledWith({
      isSelected: false, // viewMode !== 'card'
      onValueChange: toggleMock,
    });
  });
});
