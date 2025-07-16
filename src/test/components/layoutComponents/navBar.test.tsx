import { render, screen, fireEvent } from '@testing-library/react';
import Logo from '@/components/layoutComponent/Logo';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line jsx-a11y/alt-text
  default: (props: {src: string, alt: string}) => <img {...props} />,
}));

describe('Logo', () => {
  it('should render the logo and navigate to the home page when clicked', () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    const props = {
      width: 100,
      height: 100,
      src: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg',
      alt: 'Logo',
    };

    render(<Logo {...props} />);
    const logo = screen.getByRole('img', { name: props.alt });

    expect(logo).toBeInTheDocument();
    fireEvent.click(logo.parentElement!);
    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
