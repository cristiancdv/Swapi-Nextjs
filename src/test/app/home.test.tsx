import { render, screen } from '@testing-library/react';
import Home from '@/app/page'; 
import styles from '@/styles/home.module.css'; 

describe('Home Page', () => {
  beforeEach(() => {
    render(<Home />);
  });

  it('should render the home page with main heading', () => {
    expect(
      screen.getByText(/Hola, soy Cristian Damian Vazquez/i)
    ).toBeInTheDocument();
    
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Hola, soy Cristian Damian Vazquez'
    );
  });

  it('should contain specific Star Wars themed content', () => {
    expect(
      screen.getByText(/rebeli[oó]n del código elegante/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/bugs y deadlines/i)).toBeInTheDocument();
    expect(screen.getByText(/arquitectura limpia/i)).toBeInTheDocument();
    expect(screen.getByText(/TL Jedi/i)).toBeInTheDocument();
    expect(screen.getByText(/que la Fuerza los acompañe/i)).toBeInTheDocument();
  });

  it('should apply the correct CSS classes and structure', () => {
    // Test main container classes
    const container = screen.getByText(/Hola, soy Cristian/i).closest('div[class*="perspective"]');
    expect(container).toHaveClass(styles.perspective);
    expect(container).toHaveClass('overflow-hidden', 'text-yellow-400');

    // Test animated content wrapper
    const animatedDiv = screen.getByText(/Hola, soy Cristian/i).parentElement;
    expect(animatedDiv).toHaveClass(styles['animate-crawl']);
    expect(animatedDiv).toHaveClass('w-full', 'text-justify', 'space-y-6', 'text-lg', 'leading-8');
  });

  it('should have the correct number and structure of paragraphs', () => {
    const paragraphs = screen.getAllByText(/^(?!Hola, soy Cristian).*/, { selector: 'p' });
    expect(paragraphs).toHaveLength(11);
    
    // Verify specific key paragraphs exist
    expect(screen.getByText(/En tiempos de bugs y deadlines/)).toBeInTheDocument();
    expect(screen.getByText(/Como líder técnico/)).toBeInTheDocument();
    expect(screen.getByText(/Esta página fue construida/)).toBeInTheDocument();
  });

  it('should have proper semantic structure', () => {
    // Check main heading exists and is properly structured
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('text-center', 'text-3xl', 'font-bold', 'mb-4');
    
    // Verify all paragraphs are properly rendered
    const allParagraphs = screen.getAllByText(/.*/, { selector: 'p' });
    expect(allParagraphs.length).toBeGreaterThanOrEqual(10);
  });

  it('should contain references to pets and droids', () => {
    expect(screen.getByText(/padawan Quiz/i)).toBeInTheDocument();
    expect(screen.getByText(/K3R0, G414, M1N0S y C0SM0S/)).toBeInTheDocument();
    expect(screen.getByText(/robogatitos/i)).toBeInTheDocument();
  });

  it('should mention technical practices and experience', () => {
    expect(screen.getByText(/TDD y el clean-code/i)).toBeInTheDocument();
    expect(screen.getByText(/más de 5 años de experiencia/i)).toBeInTheDocument();
    expect(screen.getByText(/principios del TDD/i)).toBeInTheDocument();
  });
});
