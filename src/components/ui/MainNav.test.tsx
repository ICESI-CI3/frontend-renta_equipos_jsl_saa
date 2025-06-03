import { render, screen } from '@testing-library/react';
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn(),
    replace: jest.fn(),
    pathname: '/',
  }),
}));
import MainNav from './MainNav';

describe('MainNav', () => {
  it('renderiza la navegación principal', () => {
    render(<MainNav />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
