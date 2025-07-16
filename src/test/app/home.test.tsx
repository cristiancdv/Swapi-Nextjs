import { render, screen } from '@testing-library/react';
import Home from '@/app/page'; 
import styles from '@/styles/Home.module.css'; 

describe('Home Page', () => {
  it('should render the home page', () => {
    render(<Home />);
    expect(
      screen.getByText(/Hola, soy Cristian Damian Vazquez/i)
    ).toBeInTheDocument();
  });

  it('should contain paragraphs with references to Star Wars and Clean Code', () => {
    render(<Home />);
    expect(
      screen.getByText(/rebeli[oó]n del código/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/bugs y deadlines/i)).toBeInTheDocument();
    expect(screen.getByText(/arquitectura limpia/i)).toBeInTheDocument();
  });

  it('should apply the animation classes correctly', () => {
    render(<Home />);
    const animatedDiv = screen.getByText(/Hola, soy Cristian/i).parentElement;
    expect(animatedDiv).toHaveClass(styles['animate-crawl']);
    expect(animatedDiv?.className).toMatch(/w-\[60%\]/);
  });

  it('should have at least 10 paragraphs', () => {
    render(<Home />);
    const paragraphs = screen.getByText(/bugs y deadlines/i).parentElement?.children;
    expect(paragraphs?.length).toBeGreaterThanOrEqual(10);
  });
});
