import { render, screen } from '@testing-library/react';
import NavItem from '@/components/layoutComponent/NavItem';
import { usePathname } from 'next/navigation';

// Mock de usePathname para controlar el contexto de ruta
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('NavItem', () => {
  const baseProps = {
    label: 'Películas',
    href: '/movies',
    className: 'cursor-pointer',
    classNameActive: 'text-yellow-400',
  };

  it('should render an active navItem if the pathname matches', () => {
    (usePathname as jest.Mock).mockReturnValue('/movies');

    render(<NavItem href={baseProps.href} label={baseProps.label} />);
    const navItem = screen.getByText(baseProps.label);

    expect(navItem).toBeInTheDocument();
    expect(navItem).toHaveAttribute('href', baseProps.href);
    expect(navItem.parentElement).toHaveClass(baseProps.className);
    expect(navItem.parentElement).toHaveClass(baseProps.classNameActive);
  });

  it('should render an inactive navItem if the pathname does not match', () => {
    (usePathname as jest.Mock).mockReturnValue('/characters');

    render(<NavItem href={baseProps.href} label={baseProps.label} />);
    const navItem = screen.getByText(baseProps.label);

    expect(navItem).toBeInTheDocument();
    expect(navItem).toHaveAttribute('href', baseProps.href);
    expect(navItem.parentElement).toHaveClass(baseProps.className);
    expect(navItem.parentElement).not.toHaveClass(baseProps.classNameActive);
  });
});
