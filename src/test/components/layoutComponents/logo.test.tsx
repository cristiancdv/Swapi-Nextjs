import { fireEvent, render, screen } from '@testing-library/react';
import Logo from '@/components/layoutComponent/Logo';
import StarWarsLogo from "@/assets/images/StarWarsLogo.svg";

const mockPush = jest.fn();

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height }: { src: string, alt: string, width: number, height: number }) => (
    <img src={src} alt={alt} width={width} height={height} />
  )
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('Logo', () => {
  it('should render the image and navigate when clicked', () => {
    const props = {
      width: 100,
      height: 100,
      src: StarWarsLogo,
      alt: 'Logo',
    };

    render(<Logo {...props} />);
    const logo = screen.getByRole('img', { name: props.alt });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', props.src.toString());
    expect(logo).toHaveAttribute('width', props.width.toString());
    expect(logo).toHaveAttribute('height', props.height.toString());

    fireEvent.click(logo.parentElement!);
    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
