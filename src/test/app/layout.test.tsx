import { render, screen } from '@testing-library/react';
import RootLayout from '@/app/layout';

jest.mock('@/app/layout', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>
  <nav>NavBar</nav>
  {children}
  <footer>Footer</footer>
  </>
}));



describe('RootLayout', () => {
  it('should render the layout with its components and children', () => {
    render(<RootLayout><div>Contenido principal</div></RootLayout>);
    expect(screen.getByText('Contenido principal')).toBeInTheDocument();
    expect(screen.getByText('NavBar')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

});